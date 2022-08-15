import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;
  beforeEach(async () => {
    const users: User[] = [];
    fakeUserService = {
      find: (email) => {
        const filteredUsers = users.filter((object) => object.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email, password) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user with salted and hashed password', async () => {
    const user = await service.signup('test4@test.com', 'test');

    expect(user.password).not.toEqual('test');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user tries to signup with same email', async () => {
    await service.signup('test4@test.com', 'test');
    try {
      await service.signup('test4@test.com', 'test');
    } catch (err) {}
  });

  it('throw error if tries to login with unused email', async () => {
    try {
      await service.signup('testdfsdf4@tessdfsdft.com', 'tesasdasdt');
    } catch (err) {}
  });

  it('throw error if tries to login with invalid password', async () => {
    await service.signup('test45@test.com', 'test');
    try {
      await service.signin('test45@test.com', 'tesasdasdt');
    } catch (err) {}
  });

  it('throw error if tries to login with valid password', async () => {
    await service.signup('test45@test.com', 'test');
    await service.signin('test45@test.com', 'test');
  });
});
