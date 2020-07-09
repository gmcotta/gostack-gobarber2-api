import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService();
  });

  it('should be able to list of available days of a month from a provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 6, 10, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 6, 10, 10, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: '1',
      date: new Date(2020, 6, 11, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      user_id: '1',
      year: 2020,
      month: 7,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 9, available: true },
        { day: 10, available: false },
        { day: 11, available: false },
        { day: 12, available: true },
      ]),
    );
  });
});
