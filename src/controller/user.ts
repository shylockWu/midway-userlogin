import { UserModel } from '../model/user.model';
import { UserLoginDTO } from '../dto/user.dto';
// import { UserService } from '../service/user.service';
import { Controller, Inject, Post, Body } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Validate } from '@midwayjs/validate';
import { JwtService } from '@midwayjs/jwt';

@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userModel: UserModel;

  @Inject()
  jwt: JwtService;

  @Post('/login')
  @Validate()
  async Login(@Body() loginInfo: UserLoginDTO) {
    try {
      const res = await this.userModel.getUserByUsernameAndPassword(loginInfo);
      if (res) {
        const token = await this.jwt.sign({ username: loginInfo.username });
        return {
          code: 200,
          result: 'success',
          message: '登录成功',
          data: {
            token,
          },
        };
      } else {
        return {
          code: 400,
          result: 'error',
          message: '账号或密码不正确',
          data: null,
        };
      }
    } catch (error) {
      return {
        code: 400,
        result: 'error',
        message: '账号或密码不正确',
        data: null,
      };
    }
  }
}
