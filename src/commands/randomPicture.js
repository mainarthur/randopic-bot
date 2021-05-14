const TelegramBot = require('node-telegram-bot-api')
const path = require('path')

const PictureApi = require('../api/PictureApi')
const bot = require('../bots/bot')
const { EMPTY_STRING } = require('../constants')
const t18g = require('../locales')
const Command = require('./Command')

class RandomPictureCommand extends Command {
  /**
   * @type {PictureApi}
   */
  #api
  /**
   * @param {PictureApi} api
   */
  constructor(api) {
    super()
    this.#api = api
  }

  /**
   * @returns {TelegramBot.ChatAction}
   */
  get action() {
    return 'upload_photo'
  }

  /**
   *
   * @param {import('./Command').Payload} payload
   *
   * @returns {Promise<TelegramBot.Message>}
   */
  async method({ chatId, locale }) {
    const pictureUrl = await this.#api.getRandomPicture()

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
