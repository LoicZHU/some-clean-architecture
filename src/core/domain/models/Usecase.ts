export interface Usecase<TParams, TResponse> {
    execute(request?: TParams): Promise<TResponse> | TResponse;
}
