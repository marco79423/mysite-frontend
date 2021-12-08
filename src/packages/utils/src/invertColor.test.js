import invertColor from './invertColor'

describe('invertColor', () => {

  it('黑色會回傳白色', () => {
    expect(invertColor('#000000')).toBe('#FFFFFF')
  })

  it('支援 3 碼的色碼', () => {
    expect(invertColor('#000')).toBe('#FFFFFF')
  })

  it('支援前面不加 # 的色碼', () => {
    expect(invertColor('000')).toBe('#FFFFFF')
  })

  it('支援前面不加 # 的色碼', () => {
    expect(invertColor('#123456')).toBe('#EDCBA9')
  })
})
