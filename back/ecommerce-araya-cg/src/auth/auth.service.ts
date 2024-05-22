import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { Users } from '../entities/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  getAuth() {
    return 'Get all auth';
  }
  async signIn(email: string, password: string) {
    if (!email || !password)
      throw new BadRequestException('Credenciales incorrectas');

    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new BadRequestException('Credenciales incorrectas');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      throw new BadRequestException('Credenciales incorrectas');

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Usuario logueado correctamente',
      token
    }
  }

  async signUp(user: Partial<Users>) {
    const { email, password } = user;

    const foundUser = await this.userRepository.getUserByEmail(email);
    if (foundUser) throw new BadRequestException('El mail ya esta registrado');

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
    });
  }
}
