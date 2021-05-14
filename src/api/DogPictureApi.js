const { EMPTY_STRING } = require('../constants')
const { isString } = require('../util/type')
const api = require('./api')
const PictureApi = require('./PictureApi')

const DOG_API_BASE_URL = 'https://random.dog/woof.json'

class DogPictureApi extends PictureApi {
  async getRandomPicture() {
    const resposne = await api.get(DOG_API_BASE_URL)
    if (isString(resposne.data?.url)) {
      return resposne.data?.url
    }
    return EMPTY_STRING
  }
}

module.exports = DogPictureApi
