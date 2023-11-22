import { Request,Response,NextFunction } from "express"

export const validator = (schema:any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const options = {
            abortEarly: false, // Collect all errors, not just the first one
            allowUnknown: true, // Ignore unknown keys in the input data
            stripUnknown: true, // Remove unknown keys from the validated data
        };
        await schema.validateAsync(req, options)
        next()
      } catch (error) {
        next(error)
      }
    }
  }