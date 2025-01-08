export interface AppError {
  message: string; // Description of the error
  status?: number; // HTTP status code (if available)
}
