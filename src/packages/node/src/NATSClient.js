import {connect, StringCodec} from 'nats'

import {generateID} from '@paji-sdk/utils'

class Logger {
  log = console.log
  error = console.error
}


const DEFAULT_OPTIONS = {
  logger: new Logger()
}

/**
 * 訂閱的 Callback
 * @callback natsSubscriptionCallback
 * @param {string} subject - 訊息的 Subject
 * @param {string} messageBody - 訊息的內容
 */


/**
 *  NATS 客戶端
 */
export default class NATSClient {
  constructor(options = {}) {
    const {logger} = {
      ...DEFAULT_OPTIONS,
      ...options,
    }

    this.logger = logger
    this.client = null
    this.isConnected = false
    this.subscriptions = new Map()
  }

  /**
   * 連線到 NATS  服務器
   * @param {object}  connInfo
   * @param {string}  connInfo.url - 連到 NATS  服務器的路由 (如： nats://localhost:4222)
   * @returns {Promise}
   */
  connect = async (connInfo) => {
    const {url} = connInfo

    this.client = await connect({
      servers: url
    })
    this.isConnected = true
    this.logger.log(`連線到 NATS 服務器 (${url})`)
  }

  /**
   * 取消連線到 NATS 服務器
   * @returns {Promise}
   */
  disconnect = async () => {
    if (!this.isConnected) {
      return
    }

    this.logger.log(`取消連線到 NATS 服務器`)
    for (const channel of this.subscriptions.keys()) {
      await this.unsubscribe(channel)
    }
    await this.client.close()
    this.client = null
    this.isConnected = false
    this.logger.log('與 NATS 服務器連線的已關閉')
  }

  /**
   * 發送訊息
   * @param {string} channel - 要訂閱的 Channel (Channels are subjects clients send data to and consume from)
   * @param {string} messageBody - 要傳的訊息
   * @returns {Promise}
   */
  publish = async (channel, messageBody) => {
    if (!this.isConnected) {
      throw new Error('尚未連線到目標 NATS 服務器')
    }

    const sc = StringCodec()
    await this.client.publish(channel, sc.encode(messageBody))
    this.logger.log(`發布訊息 (長度： ${messageBody.length}，開頭為： ${this._getSummarizedMessage(messageBody)}) 至頻道 ${channel}`)
  }


  /**
   * 訂閱 Channel
   * @param {string} channel - 要訂閱的 Channel (Channels are subjects clients send data to and consume from)
   * @param {natsSubscriptionCallback} callback - 要接收的訊息 callback
   * @returns {Promise}
   */
  subscribe = async (channel, callback) => {
    if (!this.isConnected) {
      throw new Error('尚未連線到目標 NATS 服務器')
    }

    const sc = StringCodec()
    const subscriptionID = this._getSubscriptionID()
    this.subscriptions.set(subscriptionID, this.client.subscribe(channel, {
      callback: (_, msg) => {
        const [subject, messageBody] = [msg.subject, sc.decode(msg.data)]
        callback(subject, messageBody)
        this.logger.log(`收到 ${subject} 的新訊息 (長度： ${messageBody.length}，開頭為： ${this._getSummarizedMessage(messageBody)})`)
      }
    }))
    this.logger.log(`訂閱頻道 ${channel}`)
    return subscriptionID
  }

  /**
   * 取消訂閱 Channel
   * @param {string} subscriptionID - 訂閱的 ID
   * @returns {Promise}
   */
  unsubscribe = async (subscriptionID) => {
    if (!this.isConnected) {
      return
    }

    if (this.subscriptions.has(subscriptionID)) {
      this.subscriptions.get(subscriptionID).unsubscribe()
      this.subscriptions.delete(subscriptionID)
    }

    this.logger.log(`取消訂閱 ${subscriptionID}`)
  }

  _getSummarizedMessage = (messageBody, length = 20) => {
    if (messageBody.length > length) {
      return `${messageBody.substring(0, length - 3)}...`
    } else {
      return messageBody
    }
  }

  _getSubscriptionID = () => {
    while (true) {
      const id = generateID()
      if (!this.subscriptions.has(id)) {
        return id
      }
    }
  }
}
