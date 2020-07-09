import ParseMailTemplateDTO from '../dtos/ParseMailTemplateDTO';

interface IMailTemplateProvider {
  parse(data: ParseMailTemplateDTO): Promise<string>;
}

export default IMailTemplateProvider;
