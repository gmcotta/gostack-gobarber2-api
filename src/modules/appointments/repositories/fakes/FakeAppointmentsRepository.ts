import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllAppointmentsInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllAppointmentsInMonthFromProviderDTO';
import IFindAllAppointmentsInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllAppointmentsInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), provider_id, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async findAllAppointmentsInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllAppointmentsInMonthFromProviderDTO): Promise<Appointment[]> {
    const findAppointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return findAppointments;
  }

  public async findAllAppointmentsInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllAppointmentsInDayFromProviderDTO): Promise<Appointment[]> {
    const findAppointments = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return findAppointments;
  }
}

export default AppointmentsRepository;
