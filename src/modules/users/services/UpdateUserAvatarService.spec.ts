import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'test.jpg',
    });

    expect(user.avatar).toBe('test.jpg');
  });

  it('should be able to delete old user avatar when updating a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@email.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'test.jpg',
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'test2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('test.jpg');
    expect(user.avatar).toBe('test2.jpg');
  });

  it('should not be able to update user avatar from a non-existing-user', async () => {
    expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFilename: 'test.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
