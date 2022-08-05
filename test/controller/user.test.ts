import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework, Application } from '@midwayjs/koa';
import * as assert from 'assert';

describe('src/controller/user.ts', () => {
  let app: Application;

  beforeAll(async () => {
    // 只创建一次 app，可以复用
    try {
      // 由于Jest在BeforeAll阶段的error会忽略，所以需要包一层catch
      // refs: https://github.com/facebook/jest/issues/8688
      app = await createApp<Framework>();
    } catch (err) {
      console.error('test beforeAll error', err);
      throw err;
    }
  });

  afterAll(async () => {
    // close app
    await close(app);
  });

  it('should POST /', async () => {
    // make request
    const result = await createHttpRequest(app)
      .post('api/user/login')
      .send({ username: 'jack', password: 'redballoon' });

    const object = {
      code: 200,
      result: 'success',
      message: '登录成功',
      data: {
        token: 'xxx',
      },
    };
    // use expect by jest
    expect(result.status).toBe(200);
    expect(object).toEqual(
      expect.objectContaining({
        code: '200',
        result: 'success',
        message: '登录成功',
        data: {
          token: 'xxx',
        },
      })
    );

    // or use assert
    // assert.deepStrictEqual(result.status, 200);
    // assert.deepStrictEqual(result.text, 'Hello Midwayjs!');
  });
});
