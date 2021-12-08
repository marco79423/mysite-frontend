import sleep from './sleep'

jest.useFakeTimers()

describe('sleep', () => {

  it('能夠等待指定秒數的時間', done => {
    const callback = jest.fn()

    sleep(1000).then(() => {
      callback()
      expect(callback).toHaveBeenCalledTimes(1)
      done()
    })

    expect(callback).not.toBeCalled()
    jest.advanceTimersByTime(1000)
  })
})
