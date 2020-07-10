import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface RequestDTO {
  provider_id: string;
  month: number;
  year: number;
}

type ResponseDTO = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: RequestDTO): Promise<ResponseDTO> {
    const appointments = await this.appointmentsRepository.findAllAppointmentsInMonthFromProvider(
      { provider_id, month, year },
    );

    return appointments;
  }
}

export default ListProviderMonthAvailabilityService;
