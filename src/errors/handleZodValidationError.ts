import { ZodError } from "zod";
import { IError } from "../types/common";

const handleZodValidationError = (error: ZodError): IError[] => {
  const { issues } = error;
  const errors: IError[] = issues.map((issue) => {
    const errorData: IError = {
      message: issue.message,
    };
    const field = issue.path[issue.path.length - 1];
    if (field) {
      errorData.field = field as string;
    }
    return errorData;
  });
  return errors;
};
export default handleZodValidationError;
