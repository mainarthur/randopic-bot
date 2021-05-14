const { EMPTY_STRING } = require('../constants')
const { isString } = require('../util/type')
const api = require('./api')
const PictureApi = require('./PictureApi')

const FOX_API_BASE_URL = 'https://randomfox.ca/floof/'

class FoxPictureApi extends PictureApi {
  async getRandomPicture() {
    const resposne = await api.get(FOX_API_BASE_URL)
    if (isString(resposne.data?.image)) {
      return resposne.data?.image
    }
    return EMPTY_STRING
  }
}

module.exports = FoxPictureApi
