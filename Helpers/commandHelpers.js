const _ = require('lodash')


const parseCommand = (content) => {
    const command = _.trim(_.first(_.split(content, ' '))).toLowerCase()
    const query = _.trim(content.substring(content.indexOf(' ') + 1))
    return {command, query}
}


module.exports = {
    parseCommand
}
