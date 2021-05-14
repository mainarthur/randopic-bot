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
  const { date } = message
  const { id: chatId } = message.chat
  const { id: userId } = message.from ?? {}

  if (!commandsRoutes[command.commandName]) return

  /**
   * @type {Command}
   */
  const commandHandler = commandsRoutes[command.commandName]

  if (commandHandler.action) {
    await bot.sendChatAction(chatId, commandHandler.action)
  }

  /**
   * @type {TelegramBot.Message}
   */
  const responseMessage = await commandHandler.method(
    chatId,
    command.argument,
    message,
  )

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
