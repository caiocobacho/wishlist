import Redis from 'ioredis';

import redisCfg from '../config/redis';

class Cache {
  constructor() {
    this.redis = new Redis({
      host: redisCfg.host,
      port: redisCfg.port,
      keyPrefix: 'cache:',
    });
  }

  // EX -> Tempo em segundos

  async set(key, value) {
    return this.redis.set(key, JSON.stringify(value), 'EX', 60 * 60 * 24);
  }

  async get(key) {
    const cached = await this.redis.get(key);

    return cached ? JSON.parse(cached) : null;
  }

  invalidate(key) {
    return this.redis.del(key);
  }

  async invalidatePrefix(prefix) {
    const keys = await this.redis.keys(`cache:${prefix}:*`);

    const keysWithoutPrefix = keys.map(key => key.replace('cache:', ''));

    return this.redis.del(keysWithoutPrefix);
  }
}

export default new Cache();
