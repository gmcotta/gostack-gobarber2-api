import { getRepository } from 'typeorm';

import User from '../models/Users';

interface RequestDTO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkEmailExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkEmailExists) {
      throw new Error('Email address is already in use.');
    }

    const user = usersRepository.create({ name, email, password });

    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;
