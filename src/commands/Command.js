const TelegramBot = require('node-telegram-bot-api')
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
   * @param {Number} [chatId]
   * @param {String} [argument]
   * @param {TelegramBot.Message} [message]
   *
   * @returns {Promise<Object>}
   */
  async method(chatId, argument, message) {
    throw new Error('Asbtract method')

    return {}
  }
}

module.exports = Command
