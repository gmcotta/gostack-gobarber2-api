import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list of available hours of a day from a provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 6, 10, 9, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 6, 10, 10, 0, 0),
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: '1',
      year: 2020,
      month: 7,
      day: 10,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: true },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: true },
      ]),
    );
  });
});
