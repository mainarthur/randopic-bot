const { EMPTY_STRING } = require('../constants')
const { isString } = require('../util/type')
const api = require('./api')
const PictureApi = require('./PictureApi')

const SHIBE_API_BASE_URL =
  'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true'

class ShibePictureApi extends PictureApi {
  async getRandomPicture() {
    const resposne = await api.get(SHIBE_API_BASE_URL)
    if (Array.isArray(resposne.data)) {
      if (isString(resposne.data[0])) {
        return resposne.data[0]
      }
    }
    return EMPTY_STRING
  }
}

module.exports = ShibePictureApi
