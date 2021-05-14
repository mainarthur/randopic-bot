const { EMPTY_STRING } = require('../constants')
const { isString } = require('../util/type')
const api = require('./api')
const PictureApi = require('./PictureApi')

const CAT_API_BASE_URL = 'https://aws.random.cat/meow'

class CatPictureApi extends PictureApi {
  async getRandomPicture() {
    const resposne = await api.get(CAT_API_BASE_URL)
    if (isString(resposne.data?.file)) {
      return resposne.data?.file
    }
    return EMPTY_STRING
  }
}

module.exports = CatPictureApi
