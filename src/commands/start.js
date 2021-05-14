const bot = require('../bots/bot')
const t18g = require('../locales')

const Command = require('./Command')

class StartCommand extends Command {
  constructor() {
    super()
  }

  /**
   * @returns {import('node-telegram-bot-api').ChatAction}
   */
  get action() {
    return 'typing'
  }

  /**
   * @param {import('./Command').Payload} payload
   */
  async method({ chatId, locale }) {
    return bot.sendMessage(chatId, t18g(locale)`start`, {
      parse_mode: 'HTML',
    })
  }
}

module.exports = StartCommand
