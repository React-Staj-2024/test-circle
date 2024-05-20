export type CreateUserIdResponse = {
  data: {
    id: string;
    status: string;
    createDate: string;
    pinStatus: string;
    pinDetails: {
      failedAttempts: number;
    };
    securityQuestionStatus: string;
    securityQuestionDetails: {
      failedAttempts: number;
    };
    authMode: string;
  };
};
