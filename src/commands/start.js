const TelegramBot = require('node-telegram-bot-api')
const bot = require('../bots/bot')

const Command = require('./Command')

class StartCommand extends Command {
  constructor() {
    super()
  }

  /**
   * @returns {TelegramBot.ChatAction}
   */
  get action() {
    return 'typing'
  }

  /**
   * @param {Number} chatId
   */
  async method(chatId) {
    return bot.sendMessage(chatId, 'Hi!')
  }
}

module.exports = StartCommand
