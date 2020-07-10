import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllAppointmentsInMonthFromProviderDTO from '../dtos/IFindAllAppointmentsInMonthFromProviderDTO';

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllAppointmentsInMonthFromProvider(
    data: IFindAllAppointmentsInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
}

export default IAppointmentsRepository;
