import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../entities/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRole } from './roles.enum';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });
    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }

  async seedAdmin(){
    const existingAdmin = await this.usersRepository.findOne({ where: { role: UserRole.Admin } });
    if (existingAdmin) {
      console.log('Ya existe un super admin en la base de datos.');
      return;
    }

    const admin = new Users();
    admin.name = 'Admin';
    admin.email = 'admin@example.com';
    admin.password = await bcrypt.hash('@dM1n123', 10); 

    await this.usersRepository.save(admin);

    await this.usersRepository.update(admin.id, { role: UserRole.Admin });

    return 'Admin creado exitosamente';
  }

  async getUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user)
      throw new NotFoundException(`No se encontró el usario con ID: ${id}`);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async createUser(user: Partial<Users>) {
    const newUser = await this.usersRepository.save(user);
    const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });
    const { password, ...userNoPassword } = dbUser;
    return userNoPassword;
  }

  async updateUser(id: string, user: Partial<Users>) {
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOneBy({ id });
    const { password, ...userNoPassword } = updatedUser;
    return userNoPassword.id;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    this.usersRepository.remove(user);
    const { password, ...userNoPassword } = user;
    return userNoPassword.id;
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
