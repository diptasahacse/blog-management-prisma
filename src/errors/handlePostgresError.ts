import { IError } from "../types/common";

const handlePostgresError = (error: any): IError[] => {
  const errorData: IError = {
    message: error.message,
  };
  const code = error.cause.code;
  switch (code) {
    case "23001":
      errorData.message =
        "Cannot delete this item while it has associated data.";
      break;
    case "23505":
      errorData.message = "Duplicate entry";
      break;
    case "23503":
      errorData.message = "Foreign key violation";
      break;
    case "23502":
      errorData.message = "Not null violation";
      break;
    case "23502":
      errorData.message = "Not null violation";
      break;
    default:
      errorData.message = error.message;
      break;
  }

  return [errorData];
};
export default handlePostgresError;
