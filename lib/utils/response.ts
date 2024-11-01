export type RejectedType = {
  success: false;
  message: string;
  errorMessage?: string;
  [key: string]: any;
};

export type BaseApiResponseType<R = Record<string, any>> = {
  code: number;
  message: string;
  response?: R;
};

export type SuccessApiResponseType<
  T,
  R = Record<string, any>,
> = BaseApiResponseType<R> & {
  success: true;
  data: T;
};

export type ErrorApiResponseType<R = Record<string, any>> =
  BaseApiResponseType<R> & {
    success: false;
    error: any;
    errorMessage?: string;
  };

export type ApiResponseType<T, R = Record<string, any>> =
  | SuccessApiResponseType<T, R>
  | ErrorApiResponseType<R>;

export type PromiseApiResponseType<T, R = Record<string, any>> = Promise<
  ApiResponseType<T, R>
>;

export interface IBaseApiResponse<T, R = Record<string, any>> {
  success: boolean;
  code: number;
  message: string;
  data: T;
  response?: R;
  error: any;
  errorMessage?: string;
}

export class BaseApiResponse<T, R = Record<string, any>>
  implements IBaseApiResponse<T, R>
{
  success: boolean;
  code: number;
  message: string;
  data!: T;
  error: any;
  response?: R;
  errorMessage?: string | undefined;

  constructor(response: ApiResponseType<T, R>) {
    this.success = response.success;
    this.code = response.code;
    this.message = response.message;

    if (response.response) {
      this.response = response.response;
    }

    if (response.success) {
      this.data = response.data;
    } else {
      this.error = response.error;
      this.errorMessage = getErrorMessage(response);
    }
  }

  toJson(): ApiResponseType<T, R> {
    return {
      success: this.success,
      code: this.code,
      message: this.message,
      data: this.data,
      error: this.error,
      response: this.response,
      errorMessage: this.errorMessage,
    };
  }
}

const CookieOptionsMap: Record<string, string> = {
  Expires: "expires",
  "Max-Age": "maxAge",
  Domain: "domain",
  Path: "path",
  Secure: "secure",
};

export const extractSetCookie = (cookies: string[]) => {
  const results: {
    key: string;
    value: string;
    options: Record<string, string>;
  }[] = [];

  for (const cookie of cookies) {
    const cookieParts = cookie.split(";");
    const [key, value] = cookieParts[0].split("=");
    const options: Record<string, string> = cookieParts
      .slice(1)
      .reduce((acc, part) => {
        const [key, value] = part.split("=");

        if (key in CookieOptionsMap && value) {
          return {
            ...acc,
            [CookieOptionsMap[key]]: value,
          };
        }

        return acc;
      }, {});

    results.push({ key, value, options });
  }

  return results;
};

export const getErrorMessage = (err: RejectedType): string => {
  const errorData =
    err?.data ?? (err?.response?.data as Record<string, any> | null);

  const errorMessage1 =
    typeof err?.error === "object" && err?.error !== null
      ? Object.values(err.error)?.[0]
      : err?.error || err?.message;

  const errorMessage2 =
    typeof errorData === "object" && errorData !== null
      ? Object.values(errorData)?.[0]
      : errorData;

  return errorMessage2 ?? errorMessage1 ?? "Terjadi kesalahan";
};
