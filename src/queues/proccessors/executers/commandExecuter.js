const TelegramBot = require('node-telegram-bot-api')

const bot = require('../../../bots/bot')

const UserCommand = require('../../../types/UserCommand')
const Timedelta = require('../../../types/Timedelta')

const commandsRoutes = require('../../../commands')
const logger = require('../../../logger')
const Command = require('../../../commands/Command')

/**
 *
 * @param {UserCommand} command
 * @param {TelegramBot.Message} message
 */
const commandExecuter = async (command, message) => {
  const { commandName, argument } = command
  const { date } = message
  const { id: chatId } = message.chat
  const { id: userId, language_code: locale } = message.from ?? {}

  if (!commandsRoutes[commandName]) return

  /**
   * @type {Command}
   */
  const commandHandler = commandsRoutes[commandName]

  if (commandHandler.action) {
    await bot.sendChatAction(chatId, commandHandler.action)
  }

  /**
   * @type {TelegramBot.Message}
   */
  const responseMessage = await commandHandler.method({
    chatId,
    argument,
    message,
    locale,
  })

  logger.log(
    `[${new Date().toLocaleString()}]${
      userId
        ? `[#id${userId}]${userId !== chatId ? `[#cid${chatId}]` : ''}`
        : ''
    } ${command} ${
      responseMessage ? new Timedelta(date, responseMessage.date) : ''
    }`,
  )
}

module.exports = commandExecuter
