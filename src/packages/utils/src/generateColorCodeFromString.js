/**
 * 將指定字串轉為色碼 (相同字串會轉為相同色碼
 * @param {string} str - 將要轉為色碼的字串
 * @returns {string}
 */
export default function generateColorCodeFromString(str) {
  // 將字串轉為哈希數
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0 // Convert to 32bit integer
  }

  // 限制哈希數的大小
  hash = hash & 0x00FFFFFF

  // 將數字轉為十六進位數
  let c = hash
    .toString(16)
    .toUpperCase()

  // 轉為字串並補零
  c = '00000'.substring(0, 6 - c.length) + c

  return '#' + c
}
