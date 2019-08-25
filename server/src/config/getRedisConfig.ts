export function getRedisConfig() {
  return {
    host: process.env.REDISHOST || "localhost",
    port: process.env.REDISPORT ? parseInt(process.env.REDISPORT, 10) : 6379
  };
}
