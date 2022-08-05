import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserLoginDTO } from '../dto/user.dto';

export class UserModel {
  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  /**
   * 根据用户名和密码获取用户信息
   * @param username {String} 用户名
   * @param password {String} 用户密码
   */
  async getUserByUsernameAndPassword(
    userLoginInfo: UserLoginDTO
  ): Promise<UserEntity> {
    const res = await this.userRepo.find({
      where: {
        username: userLoginInfo.username,
        password: userLoginInfo.password,
      },
    });
    return res[0];
  }
}
