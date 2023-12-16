import Joi from "joi";

export const validateSignUpUser = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().required().trim().max(100),
    role: Joi.string().required().trim(),
    // password: Joi.string()
    //   .required()
    //   .min(8)  // Minimum length for a strong password
    //   .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    //   .message('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.')
  });
  return schema.validate(data);
};
