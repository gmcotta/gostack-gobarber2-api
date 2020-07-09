interface RequestDTO {
  user_id: string;
  month: number;
  year: number;
}

type ResponseDTO = Array<{
  day: number;
  available: boolean;
}>;

class ListProviderMonthAvailabilityService {
  constructor() {}

  public async execute({
    user_id,
    month,
    year,
  }: RequestDTO): Promise<ResponseDTO> {
    return [{ day: 1, available: true }];
  }
}

export default ListProviderMonthAvailabilityService;
