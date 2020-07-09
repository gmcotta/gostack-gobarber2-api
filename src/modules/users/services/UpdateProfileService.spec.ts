import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User 1',
      email: 'user1@test.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'User 2',
      email: 'user2@test.com',
    });

    expect(updatedUser?.name).toBe('User 2');
    expect(updatedUser?.email).toBe('user2@test.com');
  });

  it('should not be able to update profile for a non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing user',
        name: 'User',
        email: 'user@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update email with an existing one', async () => {
    await fakeUsersRepository.create({
      name: 'User 1',
      email: 'user1@test.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'User 2',
      email: 'user2@test.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'User 3',
        email: 'user1@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User 1',
      email: 'user1@test.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'User 2',
      email: 'user2@test.com',
      old_password: '123456',
      password: '1234567',
    });

    expect(updatedUser?.password).toBe('1234567');
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User 1',
      email: 'user1@test.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'User 2',
        email: 'user2@test.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User 1',
      email: 'user1@test.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'User 2',
        email: 'user2@test.com',
        old_password: 'wrong',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
