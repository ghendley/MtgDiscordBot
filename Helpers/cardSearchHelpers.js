const scry = require('scryfall-sdk')
const md5 = require('md5')
const NodeCache = require('node-cache')

const {retrieveCardFromDb, insertCardInDbIfNotExists, cardRequiresDbUpsert, upsertCardInDb} = require('../DB/Helpers/cardHelpers')

const {CARDS_PER_PAGE, CACHE_TIME_SECONDS} = require('../globalVars')
const {GAMETYPE_FILTER} = process.env

const SEARCH_CACHE_PREFIX = 'search___'
const LOOKUP_BY_ID_CACHE_PREFIX = 'lookupById___'
const cache = new NodeCache({stdTTL: CACHE_TIME_SECONDS})


const cleanCardFaces = (card) => {
    if (card.card_faces) {
        if (card.card_faces.length > 1) {
            card.card_faces = card.card_faces.map(face => {
                face.card_faces = []
                return face
            })
        } else {
            card.card_faces = []
        }
    }
    return card
}

const searchCards = async (searchTerm, page = 1) => {
    const queryHash = md5(searchTerm)
    const cacheKey = SEARCH_CACHE_PREFIX + queryHash
    return await searchCardsByHash(cacheKey, page, searchTerm)
}

const searchCardsByHash = async (queryHash, page = 1, searchTerm = null) => {
    const cacheKey = SEARCH_CACHE_PREFIX + queryHash

    let cards = cache.get(cacheKey)

    if (!cards) {
        if (searchTerm) {
            cards = await scry.Cards.search(searchTerm, {unique: 'cards', order: 'usd'}).waitForAll()
            cards = cards.filter(card => card.games.includes(GAMETYPE_FILTER))
            cards = cards.map(cleanCardFaces)

            for (const card of cards) {
                await insertCardInDbIfNotExists(card)
            }

            cache.set(cacheKey, cards)
        } else {
            return {cards: [], totalPages: 0, totalCards: 0, queryHash: queryHash}
        }
    }

    const pagedCards = cards.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE)

    return {cards: pagedCards, totalCards: cards.length, totalPages: Math.ceil(cards.length / CARDS_PER_PAGE), queryHash: queryHash}
}

const lookupCardById = async (cardId) => {
    const cacheKey = LOOKUP_BY_ID_CACHE_PREFIX + cardId

    let foundCard = cache.get(cacheKey) ?? await retrieveCardFromDb(cardId)

    if (!foundCard || !foundCard.rulings || await cardRequiresDbUpsert(foundCard)) {
        foundCard = await scry.Cards.byId(cardId)

        if (!foundCard || !foundCard.games.includes(GAMETYPE_FILTER)) {
            return null
        }

        foundCard = cleanCardFaces(foundCard)
        foundCard.rulings = await foundCard.getRulings()

        await upsertCardInDb(foundCard)
        cache.set(cacheKey, foundCard)
    }

    return foundCard
}


module.exports = {
    searchCards,
    searchCardsByHash,
    lookupCardById
}
