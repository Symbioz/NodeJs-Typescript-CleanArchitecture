export interface Usecase<RequestType = unknown, ResultType = unknown> {
  execute(requestType?: RequestType): ResultType
}
