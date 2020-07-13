import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list all appointments of a day from a provider', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2020, 6, 10, 11).getTime();
    });

    const provider = await fakeUsersRepository.create({
      name: 'Provider',
      email: 'provider@email.com',
      password: '123456',
    });

    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: provider.id,
      user_id: 'user_id',
      date: new Date(2020, 6, 10, 14, 0, 0),
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: provider.id,
      user_id: 'user_id',
      date: new Date(2020, 6, 10, 15, 0, 0),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: provider.id,
      year: 2020,
      month: 7,
      day: 10,
    });

    expect(appointments).toStrictEqual([appointment1, appointment2]);
  });
});
