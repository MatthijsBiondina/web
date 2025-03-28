/**
 * API Error Handler - Extracts error codes for routing decisions
 */

export const handleApiError = (error) => {
  if (error.response?.status === 403) {
    const errorCode = error.response.data.detail?.code;
    const errorMessage = error.response.data.detail?.message || "An error occurred";

    // Create a custom error object with code
    const customError = new Error(errorMessage);
    customError.code = errorCode;
    customError.status = 403;

    return customError;
  }

  // Handle other error types
  const customError = new Error(
    error.response?.data?.detail?.message || error.message || "An error occurred"
  );

  if (error.response?.status) {
    customError.status = error.response.status;
  }

  return customError;
};
