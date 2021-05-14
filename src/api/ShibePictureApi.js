const { EMPTY_STRING } = require('../constants')
const { isString } = require('../util/type')
const api = require('./api')
const PictureApi = require('./PictureApi')

const {
  BASE_APIS: { SHIBE: SHIBE_BASE_API_URL },
} = require('../../config.json')

class ShibePictureApi extends PictureApi {
  async getRandomPicture() {
    const response = await api.get(SHIBE_BASE_API_URL)
    if (Array.isArray(response.data)) {
      if (isString(response.data[0])) {
        return response.data[0]
      }
    }
    return EMPTY_STRING
  }
}

module.exports = ShibePictureApi
