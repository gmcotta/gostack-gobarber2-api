import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllAppointmentsInMonthFromProviderDTO from '../dtos/IFindAllAppointmentsInMonthFromProviderDTO';
import IFindAllAppointmentsInDayFromProviderDTO from '../dtos/IFindAllAppointmentsInDayFromProviderDTO';

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllAppointmentsInMonthFromProvider(
    data: IFindAllAppointmentsInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllAppointmentsInDayFromProvider(
    data: IFindAllAppointmentsInDayFromProviderDTO,
  ): Promise<Appointment[]>;
}

export default IAppointmentsRepository;
