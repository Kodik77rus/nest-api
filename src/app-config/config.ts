import { registerAs } from '@nestjs/config';

export default registerAs('app-config', () => ({
  port: parseInt(process.env.PORT, 10) || 8080,
  jwt: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '15m',
  },

  database: {
    user: process.env.MONGO_USERNAME,
    userPwd: process.env.MONGO_PASSWORD,
    host: process.env.DATABASE_HOST,
    dbName: process.env.DB_NAME,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
}));
