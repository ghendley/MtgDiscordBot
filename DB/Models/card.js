const mongoose = require('mongoose')


const CardSchema = new mongoose.Schema(
    {
        object: {
            type: String,
        },
        id: {
            type: String,
            required: true
        },
        oracle_id: {
            type: String
        },
        multiverse_ids: {
            type: [Number]
        },
        arena_id: {
            type: Number
        },
        mtgo_id: {
            type: Number
        },
        tcgplayer_id: {
            type: Number
        },
        cardmarket_id: {
            type: Number
        },
        name: {
            type: String,
            required: true,
        },
        lang: {
            type: String,
        },
        released_at: {
            type: Date
        },
        uri: {
            type: String
        },
        scryfall_uri: {
            type: String
        },
        layout: {
            type: String
        },
        highres_image: {
            type: Boolean
        },
        image_status: {
            type: String
        },
        image_uris: {
            type: Object
        },
        mana_cost: {
            type: String
        },
        cmc: {
            type: Number
        },
        type_line: {
            type: String
        },
        oracle_text: {
            type: String
        },
        power: {
            type: String
        },
        toughness: {
            type: String
        },
        colors: {
            type: Array
        },
        color_identity: {
            type: Array
        },
        keywords: {
            type: Array
        },
        card_faces: {
            type: Array
        },
        all_parts: {
            type: Array
        },
        legalities: {
            type: Object
        },
        games: {
            type: Array
        },
        reserved: {
            type: Boolean
        },
        foil: {
            type: Boolean
        },
        nonfoil: {
            type: Boolean
        },
        finishes: {
            type: Array
        },
        oversized: {
            type: Boolean
        },
        promo: {
            type: Boolean
        },
        reprint: {
            type: Boolean
        },
        variation: {
            type: Boolean
        },
        set_id: {
            type: String
        },
        set: {
            type: String
        },
        set_name: {
            type: String
        },
        set_type: {
            type: String
        },
        set_uri: {
            type: String
        },
        set_search_uri: {
            type: String
        },
        scryfall_set_uri: {
            type: String
        },
        rulings_uri: {
            type: String
        },
        rulings: {
            type: Array,
            default: undefined
        },
        prints_search_uri: {
            type: String
        },
        collector_number: {
            type: String
        },
        digital: {
            type: Boolean
        },
        rarity: {
            type: String
        },
        card_back_id: {
            type: String
        },
        artist: {
            type: String
        },
        artist_ids: {
            type: Array
        },
        illustration_id: {
            type: String
        },
        border_color: {
            type: String
        },
        frame: {
            type: String
        },
        frame_effects: {
            type: Array
        },
        security_stamp: {
            type: String
        },
        full_art: {
            type: Boolean
        },
        textless: {
            type: Boolean
        },
        booster: {
            type: Boolean
        },
        story_spotlight: {
            type: Boolean
        },
        promo_types: {
            type: Array
        },
        edhrec_rank: {
            type: Number
        },
        penny_rank: {
            type: Number
        },
        preview: {
            type: Object
        },
        prices: {
            type: Object
        },
        related_uris: {
            type: Object
        },
        purchase_uris: {
            type: Object
        }
    },
    {timestamps: {createdAt: 'createdAt', updatedAt: 'updatedAt'}}
)


module.exports = mongoose.model('Card', CardSchema)
