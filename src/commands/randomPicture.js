const path = require('path')

const bot = require('../bots/bot')
const { EMPTY_STRING } = require('../constants')
const t18g = require('../locales')
const Command = require('./Command')

class RandomPictureCommand extends Command {
  /**
   * @param {import('../api/PictureApi')} api
   */
  constructor(api) {
    super()
    this.api = api
  }

  /**
   * @returns {import('node-telegram-bot-api').ChatAction}
   */
  get action() {
    return 'upload_photo'
  }

  /**
   *
   * @param {import('./Command').Payload} payload
   *
   * @returns {Promise<import('node-telegram-bot-api').Message>}
   */
  async method({ chatId, locale }) {
    const pictureUrl = await this.api.getRandomPicture()

    if (pictureUrl === EMPTY_STRING) {
      return bot.sendMessage(chatId, t18g(locale)`pictire_not_found`, {
        parse_mode: 'HTML',
      })
    }

    if (path.extname(pictureUrl) === '.gif') {
      return bot.sendAnimation(chatId, pictureUrl)
    }

    return bot.sendPhoto(chatId, pictureUrl)
  }
}

module.exports = RandomPictureCommand
