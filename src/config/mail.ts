interface MailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'gmcotta34@gmail.com',
      name: 'Gustavo Teste',
    },
  },
} as MailConfig;
