const Card = require('../Models/card')

const {USE_DB, MS_BEFORE_DB_UPDATE_REQUIRED} = require('../../globalVars')


const retrieveCardFromDb = async (cardId) => {
    if (!USE_DB) {
        return null
    }

    return Card.findOne({id: cardId})
}

const cardRequiresDbUpsert = async (card) => {
    if (!USE_DB) {
        return false
    }

    if (card.updatedAt && card.updatedAt < (Date.now() - MS_BEFORE_DB_UPDATE_REQUIRED)) {
        return true
    }

    const foundCard = await Card.findOne({id: card.id})
    return !foundCard || foundCard.updatedAt < (Date.now() - MS_BEFORE_DB_UPDATE_REQUIRED)
}

const upsertCardInDb = async (card) => {
    if (!USE_DB) {
        return
    }

    await Card.findOneAndUpdate({id: card.id}, card, {upsert: true})
}

const insertCardInDbIfNotExists = async (card) => {
    if (!USE_DB) {
        return
    }

    const foundCard = await Card.findOne({id: card.id})
    if (!foundCard) {
        await Card.create(card)
    }
}


module.exports = {
    retrieveCardFromDb,
    cardRequiresDbUpsert,
    upsertCardInDb,
    insertCardInDbIfNotExists
}
