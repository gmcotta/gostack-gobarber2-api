import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface RequestDTO {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type ResponseDTO = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: RequestDTO): Promise<ResponseDTO> {
    const appointments = await this.appointmentsRepository.findAllAppointmentsInDayFromProvider(
      { provider_id, day, month, year },
    );

    const eachHourArray = Array.from({ length: 10 }, (_, index) => index + 8);
    const availability = eachHourArray.map(hour => {
      const appointmentsInHour = appointments.find(appointment => {
        return getHours(appointment.date) === hour;
      });

      const currentDate = new Date(Date.now());
      const compareDate = new Date(year, month - 1, day, hour);

      return {
        hour,
        available: !appointmentsInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}

export default ListProviderDayAvailabilityService;
