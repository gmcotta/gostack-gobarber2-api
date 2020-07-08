import IMailProvider from '../models/IMailProvider';
import SendMailDTO from '../dtos/SendMailDTO';

class FakeMailProvider implements IMailProvider {
  private messages: SendMailDTO[] = [];

  public async sendMail(message: SendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}

export default FakeMailProvider;
