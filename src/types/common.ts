export interface IError {
  field?: string;
  message: string;
}

export interface IGenericResponse<T = undefined> {
  success: boolean;
  message: string;
  status: number;
  data?: T;
  errors?: IError[];
}
