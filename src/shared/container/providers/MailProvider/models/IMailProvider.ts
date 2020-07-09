import SendMailDTO from '../dtos/SendMailDTO';

export default interface IMailProvider {
  sendMail(message: SendMailDTO): Promise<void>;
}
