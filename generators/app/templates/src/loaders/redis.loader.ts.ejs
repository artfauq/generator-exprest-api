import redis, { RedisClient } from 'redis';
import { Container } from 'typedi';
import { Config } from '../config';

/**
 * Redis client initializer
 */
export default function initRedis(): Promise<RedisClient> {
  const config = Container.get<Config>('config');

  // Create Redis client
  const redisClient = redis.createClient(config.redis.port, config.redis.host);

  return new Promise((resolve, reject) => {
    redisClient
      .on('connect', () => resolve(redisClient))
      .on('error', err => reject(new Error(`failed to initialize redis client. ${err}`)));
  });
}
