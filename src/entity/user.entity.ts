import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// {
//   username: "jack",
//   password: "redballoon"
// }

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', comment: '用户的自增ID' })
  id: number;

  @Column('varchar', { name: 'username', comment: '用户名', length: 64 })
  username: string;

  @Column('varchar', {
    name: 'password',
    nullable: true,
    comment: '用户密码',
    length: 64,
  })
  password: string | null;
}
