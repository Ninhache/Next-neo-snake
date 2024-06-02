export interface ApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

export interface ApiErrorResponse extends ApiResponse {
  success: false;
}

export interface ApiSuccessResponse extends ApiResponse {
  success: true;
}

export interface LoginSuccessResponse extends ApiSuccessResponse {
  success: true;
  statusCode: number;
  accessToken: string;
  refreshToken: string;
  username: string;
}

export interface SignupSuccessResponse extends ApiSuccessResponse {
  success: true;
}

export interface RefreshResponse extends ApiSuccessResponse {
  accessToken: string;
}
