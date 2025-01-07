export enum WebTypeEnum {
  WEB_2 = 'web2',
  WEB_3 = 'web3',
}

export interface AppError {
  message: string; // Description of the error
  status?: number; // HTTP status code (if available)
}
