export type Response = {
  response: {status: number};
};

export const getStatusFromError = (e: any): number => {
  return (e as Response).response.status;
};
