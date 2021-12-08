import generateRandomString from './generateRandomString'

beforeEach(() => {
  jest.spyOn(global.Math, 'random')
    .mockReturnValueOnce(0.1)
    .mockReturnValueOnce(0.2)
    .mockReturnValueOnce(0.3)
    .mockReturnValueOnce(0.4)
    .mockReturnValueOnce(0.5)
    .mockReturnValueOnce(0.6)
})

afterEach(() => {
  jest.spyOn(global.Math, 'random').mockRestore()
})

describe('generateRandomString', () => {

  it('會回傳亂數字串', () => {
    expect(generateRandomString()).toBe('GMSYfl')
  })

  it('指定長度，會根據指定長度回傳亂數', () => {
    expect(generateRandomString({length: 3})).toBe('GMS')
  })

  it('指定字符集，會根據指定字符集回傳亂數', () => {
    expect(generateRandomString({charset: 'ABC'})).toBe('AAABBB')
  })
})
