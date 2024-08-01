import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({example:'a0befb0e-9fe3-4cc5-b3fd-0eb8f7980cf3', description:'уникальный идентификатор пользователя'})
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({description:'имя пользователя', example:'Саша'})
  @Column()
  name: string;
  @ApiProperty({example:'user01@mail.ru', description:'email пользователя'})
  @Column({unique:true})
  email: string;
  @ApiProperty({example:'User.001', description:'пароль пользователя'})
  @Column()
  password: string;
  @ApiProperty({description:'refresh-токен пользователя',
    example:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzIwNjIxNzQ3LCJleHAiOjE3MjA2MjE4MDd9.ZuRo-f6nqOF0YDLeU-VkStET7DHqxSENHsy1eag0VaM'})
  @Column({nullable:true})
  refresh_token: string;
  @ApiProperty({example:'2024.01.01Т00.00.00', description:'время последнего обновления refresh-токена'})
  @Column({nullable:true})
  updated_date:Date;
}