import { Injectable } from '@nestjs/common';
import { HashService } from '../common/services/hash.service';

@Injectable()
export class AuthService {
  constructor(private hashService: HashService) {}

  async validateUser(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    if (user && await this.hashService.comparePassword(password, user.password)) {
      return user;
    }
    return null;
  }
}
