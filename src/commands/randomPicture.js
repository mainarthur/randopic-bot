const TelegramBot = require('node-telegram-bot-api')
const path = require('path')

const PictureApi = require('../api/PictureApi')
const bot = require('../bots/bot')
const { EMPTY_STRING } = require('../constants')
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
   * @param {Number} chatId
   *
   * @returns {Promise<TelegramBot.Message>}
   */
  async method(chatId) {
    const pictureUrl = await this.#api.getRandomPicture()

    if (pictureUrl === EMPTY_STRING) {
      return bot.sendMessage(chatId, 'Oops, picture not found')
    }

    if (path.extname(pictureUrl) === '.gif') {
      return bot.sendAnimation(chatId, pictureUrl)
    }

    return bot.sendPhoto(chatId, pictureUrl)
  }
}

module.exports = RandomPictureCommand
