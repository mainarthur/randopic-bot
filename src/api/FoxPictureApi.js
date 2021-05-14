const { EMPTY_STRING } = require('../constants')
const { isString } = require('../util/type')
const api = require('./api')
const PictureApi = require('./PictureApi')

const {
  BASE_APIS: { FOX: FOX_BASE_API_URL },
} = require('../../config.json')

class FoxPictureApi extends PictureApi {
  async getRandomPicture() {
    const response = await api.get(FOX_BASE_API_URL)
    if (isString(response.data?.image)) {
      return response.data?.image
    }
    return EMPTY_STRING
  }
}

module.exports = FoxPictureApi
