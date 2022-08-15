import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    //Hash the password
    //Generate the salt
    const salt = randomBytes(8).toString('hex');

    //Hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //Join the hashed result with salt
    const result = salt + '.' + hash.toString('hex');

    //create a user and save it
    const user = await this.userService.create(email, result);

    //return user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('bad password');
    }

    return user;
  }
}
