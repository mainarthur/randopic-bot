/**
 * @abstract
 */
class PictureApi {
  /**
   * @abstract
   *
   * @returns {Promise<string>}
   */
  async getRandomPicture() {
    throw new Error('Abstract Method')
  }
}

module.exports = PictureApi
