/**
 * 反轉色碼
 * @param colorCode
 */
export default function invertColor(colorCode) {
  colorCode = convertToCSSHexColorCode(colorCode)

  // invert color components
  const r = (255 - parseInt(colorCode.slice(0, 2), 16)).toString(16).toUpperCase()
  const g = (255 - parseInt(colorCode.slice(2, 4), 16)).toString(16).toUpperCase()
  const b = (255 - parseInt(colorCode.slice(4, 6), 16)).toString(16).toUpperCase()

  // 補零
  return '#' + padZero(r, 2) + padZero(g, 2) + padZero(b, 2)
}

/**
 * 轉為 CSS Hex 色碼 (https://www.w3schools.com/css/css_colors_hex.asp)
 * @param colorCode
 */
function convertToCSSHexColorCode(colorCode) {
  if (colorCode.indexOf('#') === 0) {
    colorCode = colorCode.slice(1)
  }

  // 轉為 6 位字碼
  if (colorCode.length === 3) {
    colorCode = colorCode[0] + colorCode[0] + colorCode[1] + colorCode[1] + colorCode[2] + colorCode[2]
  }

  if (colorCode.length !== 6) {
    throw new Error('不合法的色碼')
  }

  return colorCode
}


function padZero(str, len) {
  len = len || 2
  const zeros = new Array(len).join('0')
  return (zeros + str).slice(-len)
}
