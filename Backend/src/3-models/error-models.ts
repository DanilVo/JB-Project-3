import StatusCode from './status-codes';

export class ClientError {
  public constructor(public readonly message: string, public readonly status: number) {}
}

export class RouteNotFoundError extends ClientError {
  public constructor(route: string) {
    super(`Route ${route} not exist`, StatusCode.NotFound);
  }
}

export class ResourceNotFoundError extends ClientError {
  public constructor(id: number) {
    super(`Resource with id ${id} not found`, StatusCode.NotFound);
  }
}

export class ValidationError extends ClientError {
  public constructor(message: string) {
    super(message, StatusCode.UnprocessableEntity);
  }
}

export class UnauthorizedError extends ClientError {
  public constructor(message: string) {
    super(message, StatusCode.Unauthorized);
  }
}
