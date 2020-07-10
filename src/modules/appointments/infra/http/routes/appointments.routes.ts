import { Router } from 'express';

import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

const appointmentController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/schedule', providerAppointmentsController.index);
appointmentsRouter.post('/', appointmentController.create);

export default appointmentsRouter;
