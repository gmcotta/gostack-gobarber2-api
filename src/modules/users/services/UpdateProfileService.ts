import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/Users';
import passwordRouter from '../infra/http/routes/passwords.routes';

interface RequestDTO {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: RequestDTO): Promise<User | undefined> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('This e-mail is already registered.');
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('You need to type the old password to update it.');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );
      if (!checkOldPassword) {
        throw new AppError(
          'You need to type the old password correctly to update it.',
        );
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
