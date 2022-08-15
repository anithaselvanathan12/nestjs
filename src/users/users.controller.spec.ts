import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeAuthService: Partial<AuthService>;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    fakeAuthService = {
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      // signup: ()=>{}
    };

    fakeUserService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'adsf@asdf.com',
          password: 'asdfsdf',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: 'asdfsdf' } as User]);
      },
      // remove: ()=>{}
      // update: ()=>{}
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('find all users returns list of users with the given email', async () => {
    const users = await controller.findAllUsers('test4@test.com');
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('test4@test.com');
  });

  it('find user with id', async () => {
    const users = await controller.findUser('1');
    expect(users).toBeDefined();
  });

  it('find user with id not found', async () => {
    fakeUserService.findOne = () => null;
    try {
      const users = await controller.findUser('1');
    } catch (err) {}
  });

  it('sign in user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      {
        email: 'adsf@asdf.com',
        password: 'asdfsdf',
      },
      session,
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
