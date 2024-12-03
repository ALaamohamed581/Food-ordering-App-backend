import * as paypal from '@paypal/checkout-server-sdk';
export default () =>
  new paypal.core.PayPalHttpClient(
    new paypal.core.SandboxEnvironment(
      process.env.PAYPAL_CLIENT_ID,
      process.env.PAYPAL_CLIENT_SECRET,
    ),
  );
