export function handleApiError(error: any, defaultMessage: string) {
  let message = defaultMessage;

  if (error.message) {
    message = (error as any).message;
  }

  return {
    error: true,
    message,
  };
}
