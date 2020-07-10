import express, { Router } from 'express';

import uploadConfig from '@config/upload';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordsRouter from '@modules/users/infra/http/routes/passwords.routes';
import profilesRouter from '@modules/users/infra/http/routes/profiles.routes';
import providersRouter from '@modules/appointments/infra/http/routes/providers.routes';

const routes = Router();

routes.use('/files', express.static(uploadConfig.uploadsFolder));
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordsRouter);
routes.use('/profile', profilesRouter);
routes.use('/providers', providersRouter);

export default routes;
