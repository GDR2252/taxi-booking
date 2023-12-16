 import { AnyARecord } from "dns";
import jwt, { Secret } from "jsonwebtoken";
import ResponseCodes from "../utils/ResponseCodes";

const config = process.env;

const verifyToken = (req: any, res: any, next: any) => {
  if (!req.headers.authorization) {
    return res.status(403).send("A token is required for authentication");
  }

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET as Secret);

    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Unable to decode token.",
      code: ResponseCodes.INVALID_TOKEN,
      message: "Invalid Token.",
    });
  }
  return next();
};

const is_Login = (req: any, res: any, next: any) => {
  if (!req.headers.authorization) {
    return res.status(403).send("A token is required for authentication");
  }

  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_TOKEN_SECRET as Secret
    );
    if (decoded.is_verified == true) {
      req.user = decoded;
    } else {
      return res.status(401).json({
        success: false,
        error: "Unauthorized API Call.",
        message: "Unauthorized",
        response_code: ResponseCodes.UNAUTHORIZED,
      });
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: "Unable to decode token.",
      code: ResponseCodes.INVALID_TOKEN,
      message: "Invalid Token.",
    });
  }
  return next();
};

export { verifyToken, is_Login };
