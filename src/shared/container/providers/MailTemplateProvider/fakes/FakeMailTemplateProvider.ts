import IMailTemplateProvider from '../models/IMailTemplateProvider';
import ParseMailTemplateDTO from '../dtos/ParseMailTemplateDTO';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: ParseMailTemplateDTO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
