import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ type: String })
  userName: string;

  @ApiProperty({ type: String })
  password: string;
}
