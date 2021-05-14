const { EMPTY_STRING } = require('../constants')
const { isString } = require('../util/type')
const api = require('./api')
const PictureApi = require('./PictureApi')

const {
  BASE_APIS: { DOG: DOG_BASE_API_URL },
} = require('../../config.json')

class DogPictureApi extends PictureApi {
  async getRandomPicture() {
    const response = await api.get(DOG_BASE_API_URL)
    if (isString(response.data?.url)) {
      return response.data?.url
    }
    return EMPTY_STRING
  }
}

module.exports = DogPictureApi
