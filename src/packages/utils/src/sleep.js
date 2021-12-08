/**
 * 等待 {ms} 毫秒
 * @param {number} ms - 毫秒
 * @returns {Promise}
 */
export default function sleep(ms= 1000) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
