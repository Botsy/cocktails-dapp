import { AppError } from '@tools/types/common';
import axios from 'axios';

// Helper function to normalize API errors
export const handleAppError = (error: unknown): AppError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
    };
  }
  return { message: 'An unexpected error occurred' };
};
