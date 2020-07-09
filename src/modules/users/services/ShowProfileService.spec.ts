import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@test.com',
      password: '123456',
    });

    const profile = await showProfile.execute({ user_id: id });

    expect(profile.id).toBe(id);
  });

  it('should not be able to show profile for a non-existing user', async () => {
    await expect(
      showProfile.execute({ user_id: 'non-existing id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
