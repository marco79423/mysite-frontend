import Redis from 'ioredis'

class Logger {
  log = console.log
  error = console.error
}


const DEFAULT_OPTIONS = {
  logger: new Logger()
}

/**
 *  Redis Cluster 客戶端
 */
export default class RedisClusterClient {
  constructor(options = {}) {
    const {logger} = {
      ...DEFAULT_OPTIONS,
      ...options,
    }

    this.logger = logger
    this.clients = []
    this.clusterClient = null
    this.isConnected = false
  }

  /**
   * 連線到 Redis Cluster 服務器
   * @param {string[]}  connectInfo.nodes - 連到 Redis Cluster 服務器的節點
   * @param {string}  connectInfo.password - 連到服務器使用的密碼
   * @returns {Promise}
   */
  connect = async (connectInfo) => {
    const {nodes, password} = connectInfo

    this.clients = nodes.map(node => new Redis({...node, password}))
    this.clusterClient = new Redis.Cluster(nodes, {
      redisOptions: {
        password: password,
      }
    })

    this.isConnected = true
    this.logger.log(`連線到 Redis Cluster 服務器成功`)
  }

  /**
   * 取消連線到 Redis Cluster 服務器
   * @returns {Promise}
   */
  disconnect = async () => {
    if (!this.isConnected) {
      return
    }

    for (const client of this.clients) {
      await client.disconnect()
    }
    await this.clusterClient.disconnect()

    this.clients = []
    this.clusterClient = null
    this.logger.log(`取消連線到 Redis Cluster 服務器成功`)
  }

  /**
   * 取得 Redis Cluster 的所有 Key
   * @param {string} pattern
   */
  getKeys = async (pattern) => {
    if (!this.isConnected) {
      throw new Error('尚未連線到 Redis 服務器')
    }

    const keysArray = await Promise
      .all(this.clients.map(client => client.keys(pattern)))

    return [].concat(...keysArray)
  }

  /**
   * 使用 Key 取得 Redis 值 (字串)
   * @param name
   * @return {Promise<string>}
   */
  get = async name => {
    if (!this.isConnected) {
      throw new Error('尚未連線到 Redis 服務器')
    }

    return await this.clusterClient.get(name)
  }

  /**
   * 使用 Key 取得 Redis 值 (buffer)
   * @param name
   * @return {Promise<Buffer>}
   */
  getBuffer = async name => {
    if (!this.isConnected) {
      throw new Error('尚未連線到 Redis 服務器')
    }

    return await this.clusterClient.getBuffer(name)
  }

  /**
   * 使用 hgetall 取得 Redis 值
   * @param name
   * @return {Promise<*>}
   */
  hgetall = async name => {
    if (!this.isConnected) {
      throw new Error('尚未連線到 Redis 服務器')
    }

    return await this.clusterClient.hgetall(name)
  }
}
