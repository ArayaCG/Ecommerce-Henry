import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UserRole } from '../../users/roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('No se envió token');

    const secret = process.env.JWT_SECRET;

    try {
      const user = this.jwtService.verify(token, { secret });
      if (!user) {
        throw new UnauthorizedException('Error al validar el token');
      }

      user.exp = new Date(user.exp * 1000);
      user.roles = user.role === 'admin' ? [UserRole.Admin] : [UserRole.User];
      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token no valido');
    }
  }
}
