import { AxiosError } from 'axios';

export const stringifyValues = (objectItem: unknown): string => {
  try {
    return JSON.stringify(objectItem);
  } catch (error: unknown) {
    return `${objectItem}`;
  }
};

export const getIsConnected = (): boolean | null => {
  try {
    return navigator.onLine;
  } catch (error: unknown) {
    return null;
  }
};

export const getUserAgent = (): string => {
  try {
    return navigator.userAgent.toString();
  } catch (error: unknown) {
    return '';
  }
};

export const STATUS_CODE_NOT_MODIFIED = 304;

export const getDurationRequest = (error: AxiosError): number | null => {
  try {
    // @ts-ignore
    if (error?.config?.metadata?.startTime) {
      // @ts-ignore
      return new Date() - error.config.metadata.startTime;
    }
    return null;
  } catch (err: unknown) {
    return null;
  }
};

type useScreenSizeResponseType = { innerWidth: number; innerHeight: number };

export const getScreenSize = (): useScreenSizeResponseType => {
  try {
    const { innerWidth, innerHeight } = window;
    return {
      innerWidth: innerWidth || 0,
      innerHeight: innerHeight || 0,
    };
  } catch (error: unknown) {
    return {
      innerWidth: 0,
      innerHeight: 0,
    };
  }
};

const getErrorMessageName = (errorMessage: string) =>
  errorMessage.includes('request failed') ? '' : ` as message ${errorMessage}`;

export const ReportAxiosError = async (error: AxiosError, apiName: string): Promise<void> => {
  if (!NEXT_PUBLIC_SENTRY_IS_ENABLED) {
    return;
  }

  const isOnline = getIsConnected();
  const userAgent = getUserAgent();
  const sizes = getScreenSize();
  const durationRequest = getDurationRequest(error);
  const errorCode = error?.code;

  if (!error?.response && !error?.request && !error?.config) {
    Log.logError(error);
    return;
  }

  const code = error?.code;
  const errorMessage = error?.message || '';
  const requestUrl = error?.config?.url || '';
  const requestMethod = error?.config?.method?.toUpperCase() || 'UNKNOWN';
  const requestHeaders = error?.config?.headers || {};
  const requestData = error?.config?.data || {};
  const requestParams = error?.config?.params || {};

  let responseStatus = 0;
  let responseData = null;
  let responseHeaders = null;

  if (error?.response) {
    responseStatus = error?.response?.status || 0;
    responseData = error?.response?.data;
    responseHeaders = error?.response?.headers;
  }

  if (shouldBeIgnoreErrors(code, errorMessage, responseStatus)) {
    return;
  }

  const fingerprint = [requestMethod, requestUrl, responseStatus?.toString() || '0', errorMessage];

  if (getMappedErrors({ responseData, responseStatus, requestUrl, requestMethod } as ErrorMappingParams)) {
    return;
  }

  const errorProcessed = {
    errorMessage: stringifyValues(errorMessage).toLowerCase(),
    requestUrl,
    requestMethod,
    requestHeaders: stringifyValues(requestHeaders),
    requestData: stringifyValues(requestData),
    requestParams: stringifyValues(requestParams),
    responseStatus,
    code: stringifyValues(code),
    responseData: stringifyValues(responseData),
    responseHeaders: stringifyValues(responseHeaders),
  };

  Sentry.withScope((scope) => {
    scope.setTag('type', 'requestError');
    scope.setTag('apiName', apiName);

    scope.setExtra('errorCode', errorCode);
    scope.setExtra('sizes', sizes);
    scope.setExtra('userAgent', userAgent);
    scope.setExtra('isOnline', isOnline);
    scope.setExtra('durationRequest', durationRequest);
    scope.setExtra('errorMessage', errorProcessed.errorMessage);
    scope.setExtra('requestUrl', errorProcessed.requestUrl);
    scope.setExtra('requestMethod', errorProcessed.requestMethod);
    scope.setExtra('requestHeaders', errorProcessed.requestHeaders);
    scope.setExtra('requestData', errorProcessed.requestData);
    scope.setExtra('requestParams', errorProcessed.requestParams);
    scope.setExtra('code', errorProcessed.code);
    scope.setExtra('responseStatus', errorProcessed.responseStatus);
    scope.setExtra('responseData', errorProcessed.responseData);
    scope.setExtra('responseHeaders', errorProcessed.responseHeaders);

    scope.setFingerprint(fingerprint);

    const errorMessageOnlyDifferentFromDefault = getErrorMessageName(errorProcessed.errorMessage);

    Log.logError(
      new Error(
        `Request Error ${errorProcessed.requestMethod} ${errorProcessed.requestUrl} -> ${errorProcessed.responseStatus}${errorMessageOnlyDifferentFromDefault} ${code} isOnline=${isOnline}`,
      ),
    );
  });
};
