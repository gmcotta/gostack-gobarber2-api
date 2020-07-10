import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list all providers', async () => {
    const provider1 = await fakeUsersRepository.create({
      name: 'Provider 1',
      email: 'provider1@email.com',
      password: '123456',
    });

    const provider2 = await fakeUsersRepository.create({
      name: 'Provider 2',
      email: 'provider2@email.com',
      password: '123456',
    });

    const loggedProvider = await fakeUsersRepository.create({
      name: 'Provider 3',
      email: 'provider3@email.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedProvider.id,
    });

    expect(providers).toStrictEqual([provider1, provider2]);
  });
});
