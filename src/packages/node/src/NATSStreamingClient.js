import {connect} from 'node-nats-streaming'

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
 * @callback stanSubscriptionCallback
 * @param {string} subject - 訊息的 Subject
 * @param {string} messageBody - 訊息的內容
 * @param {Date} info.timestamp - NATS 收到的時間
 */


/**
 *  NATS Streaming 客戶端
 */
export default class NATSStreamingClient {
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
   * 連線到 NATS Streaming 服務器
   * @param {string}  connectInfo.url - 連到 NATS Streaming 服務器的路由 (如： nats://localhost:4222)
   * @param {string}  connectInfo.clusterID - 連到服務器使用的 Cluster ID
   * @param {string}  connectInfo.clientID - 連到服務器使用的 Client ID，要確保每個連到 NATS Streaming 服務器的客戶端都不相同
   * @param {string}  connectInfo.token - 連到服務器使用的 Token
   * @returns {Promise}
   */
  connect = async (connectInfo) => {
    const {url, clusterID, clientID, token} = connectInfo

    this.client = connect(clusterID, clientID, {
      url: url,
      token: token
    })

    await new Promise(resolve => {
      this.client.on('connect', () => {
        this.isConnected = true
        this.logger.log(`連線到 NATS Streaming 服務器 (${url})`)
        resolve()
      })

      this.client.on('close', () => {
        this.isConnected = false
        this.logger.log('與 NATS Streaming 服務器連線的已關閉')
      })
    })
  }

  /**
   * 取消連線到 NATS Streaming 服務器
   * @returns {Promise}
   */
  disconnect = async () => {
    if (!this.isConnected) {
      return
    }

    this.logger.log(`取消連線到 NATS Streaming 服務器`)
    for (const channel of this.subscriptions.keys()) {
      await this.unsubscribe(channel)
    }
    await this.client.close()
    this.client = null
    this.isConnected = false
  }

  /**
   * 取得 NATS Streaming 訂閱連線的設定，可以用來設定訂閱時的參數
   *  @example
   *  const opts = client.getSubscriptionOptions().setStartWithLastReceived()
   *  subscription = client.subscribe(topic, cb, opts)
   * @returns {object}
   */
  getSubscriptionOptions = () => {
    return this.client.subscriptionOptions()
  }

  /**
   * 發送訊息
   * @param {string} channel - 要訂閱的 Channel (Channels are subjects clients send data to and consume from)
   * @param {string} messageBody - 要傳的訊息
   * @returns {Promise}
   */
  publish = async (channel, messageBody) => {
    if (!this.isConnected) {
      throw new Error('尚未連線到目標 NATS Streaming 服務器')
    }

    this.client.publish(channel, messageBody)
    this.logger.log(`發布訊息 (長度： ${messageBody.length}，開頭為： ${this._getSummarizedMessage(messageBody)}) 至頻道 ${channel}`)
  }


  /**
   * 訂閱 Channel
   * @param {string} channel - 要訂閱的 Channel (Channels are subjects clients send data to and consume from)
   * @param {stanSubscriptionCallback} callback - 要接收的訊息 callback
   * @param {object} opts - 訂閱的設定 (使用 getSubscriptionOptions 取得)
   * @returns {Promise}
   */
  subscribe = async (channel, callback, opts = undefined) => {
    if (!this.isConnected) {
      throw new Error('尚未連線到目標 NATS Streaming 服務器')
    }

    const subscriptionID = this._getSubscriptionID()
    this.subscriptions.set(subscriptionID, this.client.subscribe(channel, opts))
    this.logger.log(`訂閱頻道 ${channel}`)

    this.subscriptions.get(subscriptionID).on('message', (msg) => {
      const [subject, messageBody] = [msg.getSubject(), msg.getData()]
      const info = {
        timestamp: msg.getTimestamp(),
      }
      callback(subject, messageBody, info)
      this.logger.log(`收到 ${subject} 的新訊息 (長度： ${messageBody.length}，開頭為： ${this._getSummarizedMessage(messageBody)})`)
    })

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
