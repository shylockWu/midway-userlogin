import { MidwayConfig } from '@midwayjs/core';
import { UserEntity } from '../entity/user.entity';
export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1659683877391_3110',
  koa: {
    port: 7001,
    globalPrefix: 'api', // 添加统一前缀
  },
  typeorm: {
    dataSource: {
      default: {
        /**
         * 单数据库实例
         */
        type: 'sqlite',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'root',
        dropSchema: true,
        database: ':memory:',
        synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true
        logging: false,

        // 配置实体模型
        entities: [UserEntity],
      },
    },
  },
  jwt: {
    secret: 'e6602f9e-5477-40da-a13a-5f4a836a01d1', // fs.readFileSync('xxxxx.key') 此处使用的是某一时刻的uuid
    expiresIn: '2d', // https://github.com/vercel/ms
  },
} as MidwayConfig;
