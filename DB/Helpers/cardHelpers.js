const Card = require('../Models/card')

const {USE_DB, MS_BEFORE_DB_UPDATE_REQUIRED} = require('../../globalVars')


const retrieveCardFromDb = async (cardId) => {
    if (USE_DB) {
        return Card.findOne({id: cardId})
    } else {
        return null
    }
}

const cardRequiresDbUpsert = async (card) => {
    if (USE_DB) {
        if (card.updatedAt && card.updatedAt < (Date.now() - MS_BEFORE_DB_UPDATE_REQUIRED)) {
            return true
        }

        const foundCard = await Card.findOne({id: card.id})
        return !foundCard || foundCard.updatedAt < (Date.now() - MS_BEFORE_DB_UPDATE_REQUIRED)
    }
    return false
}

const upsertCardInDb = async (card) => {
    if (USE_DB) {
        await Card.findOneAndUpdate({id: card.id}, new Card(card), {upsert: true})
    }
}

const upsertCardInDbIfNecessary = async (card) => {
    if (USE_DB) {
        if (await cardRequiresDbUpsert(card)) {
            await upsertCardInDb(card)
        }
    }
}


module.exports = {
    retrieveCardFromDb,
    cardRequiresDbUpsert,
    upsertCardInDb,
    upsertCardInDbIfNecessary
}