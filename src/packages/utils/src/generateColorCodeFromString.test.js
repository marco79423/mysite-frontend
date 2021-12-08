import generateColorCodeFromString from './generateColorCodeFromString'
import generateRandomString from './generateRandomString'


describe('generateColorCodeFromString', () => {

  const isValidColorCode = (str) => {
    return /#[0-9A-F]{6}/.test(str)
  }

  it('給空字串能回傳合法色碼', () => {
    expect(isValidColorCode(generateColorCodeFromString(''))).toBeTruthy()
  })

  it('給隨意字串都能回傳合法色碼', () => {
    for (let i = 0; i < 100; i++) {
      const randomString = generateRandomString({length: i})
      expect(isValidColorCode(generateColorCodeFromString(randomString))).toBeTruthy()
    }
  })
})
