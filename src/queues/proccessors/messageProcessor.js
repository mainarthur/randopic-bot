const commandParser = require('../../util/commandParser')
const logger = require('../../logger')
const commandExecuter = require('./executers/commandExecuter')
/**
 *  @param {import('bull').Job<import("node-telegram-bot-api").Message>}  job
 */
const messageJobProcessor = async (job) => {
  try {
    /**
     * @type { {data: import('node-telegram-bot-api').Message}}
     */
    const { data: message } = job

    const command = commandParser(message)

    if (command) {
      await commandExecuter(command, message)
    }
  } catch (err) {
    logger.err(err)
  }
}

module.exports = messageJobProcessor
