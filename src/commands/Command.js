const TelegramBot = require('node-telegram-bot-api')

/**
 * @typedef {Object} Payload
 * @property {Number} [chatId]
 * @property {String} [argument]
 * @property {String} [locale]
 * @property {TelegramBot.Message} [message]
 */

/**
 * @abstract
 */
class Command {
  /**
   * @abstract
   *
   * @returns {TelegramBot.ChatAction}
   */
  get action() {
    throw new Error('Abstract property')
    return 'typing'
  }

  /**
   * @abstract
   *
   * @param {Payload} payload
   *
   * @returns {Promise<Object>}
   */
  async method(payload) {
    throw new Error('Asbtract method')

    return {}
  }
}

module.exports = Command
