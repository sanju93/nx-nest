import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ type: String })
  userName: string;

  @ApiProperty({ type: String })
  password: string;
}

export class UserModel {
  @ApiProperty({
    type: String,
  })
  userName: string;

  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({ type: String })
  password: string;
}

export interface IUserModel {
  userName: string;
  email: string;
  password: string;
}
