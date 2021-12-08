import {MongoClient as InternalMongoClient} from 'mongodb'

class Logger {
  log = console.log
  error = console.error
}


const DEFAULT_OPTIONS = {
  logger: new Logger()
}

/**
 *  Mongo 客戶端
 */
export default class MongoClient {
  constructor(options = {}) {
    const {logger} = {
      ...DEFAULT_OPTIONS,
      ...options,
    }

    this.logger = logger
    this.client = null
    this.isConnected = false
  }

  /**
   * 連線到 Mongo 服務器
   * @param {string}  connectInfo.uri - Mongo 服務器的 URI
   * @returns {Promise}
   */
  connect = async (connectInfo) => {
    const {uri} = connectInfo

    this.client = new InternalMongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    await this.client.connect()

    this.isConnected = true
    this.logger.log(`連線到 Mongo 服務器成功`)
  }

  /**
   * 取消連線到 Mongo 服務器
   * @returns {Promise}
   */
  disconnect = async () => {
    if (!this.isConnected) {
      return
    }

    await this.client.close()
    this.isConnected = false
    this.logger.log(`取消連線到 Mongo 服務器成功`)
  }

  /**
   * 根據 query 取得一筆資料
   * @param {string} database - 資料庫名稱
   * @param {string} collection - Collection 名稱
   * @param {string} query - Query
   */
  findOne = async (database, collection, query) => {
    if (!this.isConnected) {
      throw new Error('尚未連線到 Mongo 服務器')
    }

    return await this.client.db(database).collection(collection).find(query).limit(1).next()
  }

  /**
   * 根據 query 取得資料
   * @param {string} database - 資料庫名稱
   * @param {string} collection - Collection 名稱
   * @param {string} query - Query
   */
  find = async (database, collection, query) => {
    if (!this.isConnected) {
      throw new Error('尚未連線到 Mongo 服務器')
    }

    return await this.client.db(database).collection(collection).find(query).toArray()
  }
}
