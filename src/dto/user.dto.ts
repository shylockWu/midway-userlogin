import { Rule, RuleType } from '@midwayjs/validate';

export class UserLoginDTO {
  @Rule(RuleType.required())
  username: string;

  @Rule(RuleType.required())
  password: string;
}
