/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** HealthResponse */
export interface HealthResponse {
  /** Status */
  status: string;
}

/** SubscribeRequest */
export interface SubscribeRequest {
  /** Email */
  email: string;
  /** Name */
  name: string;
}

/** SubscribeResponse */
export interface SubscribeResponse {
  /** Message */
  message: string;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type CheckHealthData = HealthResponse;

export type SubscribeUserData = SubscribeResponse;

export type SubscribeUserError = HTTPValidationError;
