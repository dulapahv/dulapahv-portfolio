import * as Sentry from "@sentry/nextjs";

// Replace "YourCustomErrorComponent" with your custom error component!
YourCustomErrorComponent.getInitialProps = async (contextData) => {
  await Sentry.captureUnderscoreErrorException(contextData);

  // ...other getInitialProps code
};
