export class CommonResponse<T> {
  isSuccess: boolean;
  status: number;
  errorMessage: string;
  data: T;
}