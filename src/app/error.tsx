"use client";

import React from "react";
import Error from "next/error";
import Sentry from "@sentry/nextjs";

const ErrorPage = (props: any) => {
  return (
    <div>
      <div>Error</div>
      <Error {...props} />
    </div>
  );
};

export default ErrorPage;

ErrorPage.getInitialProps = async (contextData: any) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);

  // This will contain the status code of the response
  return Error.getInitialProps(contextData);
};
