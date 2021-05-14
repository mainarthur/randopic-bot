const { EMPTY_STRING } = require('../constants')
const { isString } = require('../util/type')
const api = require('./api')
const PictureApi = require('./PictureApi')

const {
  BASE_APIS: { CAT: CAT_BASE_API_URL },
} = require('../../config.json')

class CatPictureApi extends PictureApi {
  async getRandomPicture() {
    const response = await api.get(CAT_BASE_API_URL)
    if (isString(response.data?.file)) {
      return response.data?.file
    }
    return EMPTY_STRING
  }
}

module.exports = CatPictureApi
