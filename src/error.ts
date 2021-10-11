export enum ErrorCode {
  NOT_FOUND = 'NOT_FOUND',
  ETC = 'ETC',
}

export class CustomError extends Error {
  constructor(
    public readonly message: string,
    public readonly code: ErrorCode,
    public readonly cause?: Record<string, any>
  ) {
    super(message);
  }
}
