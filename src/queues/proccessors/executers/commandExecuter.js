const bot = require('../../../bots/bot')

const Command = require('../../../types/Command')
const Timedelta = require('../../../types/Timedelta')

const { snakeCase } = require('../../../util/case')
const commandsRoutes = require('../../../commands')
const logger = require('../../../logger')

/**
 *
 * @param {Command} command
 * @param {import('node-telegram-bot-api').Message} message
 */
const commandExecuter = async (command, message) => {
  const { date } = message
  const { id: chatId } = message.chat
  const { id: userId } = message.from ?? {}

  if (!commandsRoutes[command.commandName]) return

  const commandHandler = commandsRoutes[command.commandName]

  if (commandHandler.action) {
    await bot.sendChatAction(chatId, commandHandler.action)
  }

  /**
   * @type {import('node-telegram-bot-api').Message}
   */
  const responseMessage = await commandHandler.method(command.argument, message)

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
