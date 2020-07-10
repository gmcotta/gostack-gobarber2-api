import { Router } from 'express';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthentication);
providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider-id/month-availability',
  providerMonthAvailabilityController.index,
);
providersRouter.get(
  '/:provider-id/day-availability',
  providerDayAvailabilityController.index,
);

export default providersRouter;
