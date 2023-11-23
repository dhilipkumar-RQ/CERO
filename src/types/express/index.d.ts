

declare global {
    interface User {
        user_email: string
        user_id: string
        company_id: string,
        role: string,
    }
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
export {}