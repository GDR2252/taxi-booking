export interface IApiResponse<T> {
  access_token: any;
  success?: any;
  response_code?: any;
  // "error-code"?: string | number;
  message?: string | string[];
  // "hash-key"?: string;
  data?: any;
  error?: any;
}
