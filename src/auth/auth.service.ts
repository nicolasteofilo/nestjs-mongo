import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { justNumbers } from 'src/utils/justNumbers';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(id: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByName(id);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const name = user._doc.name;
    const id = String(user._doc._id);

    const payload = { username: name, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUserByToken(token: string) {
    const [, tokenValue] = token.split(' ');
    try {
      const { sub } = this.jwtService.verify(tokenValue);

      const user = await this.usersService.findOne(sub);

      if (!user) {
        throw new HttpException('User not found', 401);
      }

      return user;
    } catch (e) {
      throw new HttpException('Invalid token!', 401);
    }
  }
}
