import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.query;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const appointments = await listProviderMonthAvailability.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
    });

    return response.json(appointments);
  }
}

export default ProviderMonthAvailabilityController;
