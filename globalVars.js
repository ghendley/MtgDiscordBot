const {ENABLE_COLLECTIONS, ENABLE_WISHLISTS, ENABLE_DECKS, ENABLE_ROSEWATTA} = process.env

module.exports = {
    USE_DB: ENABLE_COLLECTIONS === 'true' || ENABLE_WISHLISTS === 'true' || ENABLE_DECKS === 'true',
    COLLECTIONS_ENABLED: ENABLE_COLLECTIONS === 'true',
    WISHLISTS_ENABLED: ENABLE_WISHLISTS === 'true',
    DECKS_ENABLED: ENABLE_DECKS === 'true',
    ROSEWATTA_ENABLED: ENABLE_ROSEWATTA === 'true',
    CARDS_PER_PAGE: 4,
    KEYWORDS_WIKI_URL : 'https://annex.fandom.com/wiki/List_of_Magic:_The_Gathering_keywords',
    CACHE_TIME_SECONDS: 60 * 60,
    MS_BEFORE_DB_UPDATE_REQUIRED: 14 * 24 * 60 * 60 * 1000
}
