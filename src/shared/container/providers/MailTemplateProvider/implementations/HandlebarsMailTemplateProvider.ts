import handlebars from 'handlebars';

import IMailTemplateProvider from '../models/IMailTemplateProvider';
import ParseMailTemplateDTO from '../dtos/ParseMailTemplateDTO';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: ParseMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}

export default HandlebarsMailTemplateProvider;
