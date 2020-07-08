import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be recover the password using email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'User',
      email: 'user@test.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'user@test.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to a non-existing user recovers its password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'user@test.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('shall be able to generate a token after generate a forgot password email', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'User',
      email: 'user@test.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'user@test.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
