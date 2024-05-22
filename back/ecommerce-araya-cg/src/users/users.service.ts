import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from '../entities/users.entity';


@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }
  seedAdmin() {
    return this.usersRepository.seedAdmin();
  }
  getUser(id: string) {
    return this.usersRepository.getUserById(id);
  }
  createUser(user: Partial<Users>) {
    return this.usersRepository.createUser(user);
  }
  updateUser(id: string, user: Partial<Users>) {
    return this.usersRepository.updateUser(id, user);
  }
  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
