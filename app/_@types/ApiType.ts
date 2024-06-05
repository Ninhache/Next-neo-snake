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
