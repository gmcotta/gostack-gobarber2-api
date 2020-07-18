export default {
  jwt: {
    secret: process.env.APP_SECRET || '3ff32233052ce510e67827ebe0733392',
    expiresIn: '1d',
  },
};
