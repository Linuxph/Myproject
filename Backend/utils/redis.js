const Redis = require('ioredis');

let redis;

if (process.env.REDIS_URL) {
  redis = new Redis(process.env.REDIS_URL, {
    lazyConnect: true,
    enableOfflineQueue: false,
    retryStrategy: () => null, // don't retry — fail fast
  });

  redis.on('connect', () => console.log('Connected to Redis'));
  redis.on('error', (err) => console.warn('Redis unavailable, caching disabled:', err.message));
} else {
  // No Redis configured — use a no-op fallback so the app still works
  redis = {
    get: async () => null,
    setex: async () => null,
    del: async () => null,
  };
  console.log('REDIS_URL not set — running without cache');
}

module.exports = redis;
