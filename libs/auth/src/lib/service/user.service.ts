import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IUserModel } from '../models/auth.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UsersRepository) {}

  createUser(user: IUserModel) {
    return this.userRepository.createUser(user);
  }
}
