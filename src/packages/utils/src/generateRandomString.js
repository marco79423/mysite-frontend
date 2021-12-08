const DEFAULT_LENGTH = 6
const DEFAULT_CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

/**
 * 產生随機亂數
 * @param {object=} config - 參數設定
 * @param {number=} config.length - 字串長度
 * @param {number=} config.charset - 字元集
 * @returns {string}
 */
export default function generateRandomString(config = {}) {
  const {length = DEFAULT_LENGTH, charset = DEFAULT_CHARSET} = config || {}

  let result = ''
  const charsetLength = charset.length
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charsetLength))
  }
  return result
}
