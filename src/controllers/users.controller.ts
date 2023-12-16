import User from "../models/users.model";
import { Request, Response } from "express";
import ResponseCodes from "../utils/ResponseCodes";
import { generateFourDigitOtp } from "../helpers/common";
import nodemailer from "nodemailer";
import Otp from "../models/otps.model";
import { validateSignUpUser } from "../validations/users.validation";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ResetToken from "../models/resetTokens.model";

class UserController {
  static signUpUser = async (req: any, res: Response) => {
    try {
      const { email, role } = req.body;
      const validation = validateSignUpUser(req.body);
      const { error } = validation;

      if (error)
        return res
          .status(400)
          .send({ message: error.details[0].message.replace(/"/g, "") });

      const oldUser = await User.findOne({
        email: email,
        role: role,
      });

      if (oldUser && oldUser.role == role) {
        return res.status(200).json({
          success: false,
          response_code: ResponseCodes.EXIST_USER,
          data: null,
          message:
            "User with the provided details is already exists, please try to login",
        });
      } else {
        const user = new User({
          email: email,
          // password: bcrypt.hashSync(req?.body?.password, 10),
          role: role,
          status: "pending",
          is_verified: false,
        });
        await user.save().then(async () => {
          const otp = generateFourDigitOtp();
          console.log("otp", otp);
          const oldotp = await Otp.findOne({
            user: user._id,
            otp_type: "signUp",
          });
          if (oldotp) {
            await Otp.findOneAndDelete({
              user: user._id,
              otp_type: "signUp",
            });
          }
          const userOtp = new Otp({
            user: user._id,
            otp: otp,
            otp_type: "signUp",
          });
          userOtp.save();

          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "skypioneer03@gmail.com",
              pass: "zdfratrvbctxvrfp",
            },
          });

          var mailOptions = {
            from: "skypioneer03@gmail.com",
            to: email, // This is where you specify the recipient's email address
            subject: "Verification",
            text: `Your verification code is ${otp}`,
          };

          transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
              console.log("Error sending email:", error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });

          const token = jwt.sign(
            {
              user_id: user._id,
              is_verified: false,
              role: role,
            },
            process.env.JWT_TOKEN_SECRET as Secret,
            {
              expiresIn: "7d",
            }
          );

          return res.status(201).json({
            success: true,
            status: "PENDING",
            message: "Verification OTP has been sent to your email",
            response_code: ResponseCodes.CREATE_SUCCESS,
            data: {
              user: user,
              access_token: token,
            },
          });
        });
      }
      // Create a new questionnaire entry
    } catch (error) {
      console.log(
        `An error occurred during processing the request. More details: ${error}`
      );
      return res.status(500).json({
        success: false,
        data: null,
        message: "Internal server error",
        errors: error,
      });
    }
  };

  static signUpOtpVarify = async (req: any, res: Response) => {
    try {
      console.log(req.user);
      const user: any = await User.findOne({ _id: req.user.user_id });
      if (!user) {
        return res.status(404).json({
          success: false,
          response_code: ResponseCodes.USER_NOT_FOUND,
          message: "User not Found!",
        });
      }
      let otpUser: any = await Otp.findOne({
        user: req.user.user_id,
        otp_type: "signUp",
      }).populate("user", {
        email: true,
      });
      if (otpUser) {
        if (otpUser.otp == req?.body?.otp) {
          await User.findOneAndUpdate(
            { _id: otpUser.user._id }, // Specify the query here
            {
              status: "active",
              is_verified: true,
            }
          );
          const token = jwt.sign(
            {
              user_id: req.user._id,
              is_verified: true,
              role: req.user.role,
            },
            process.env.JWT_TOKEN_SECRET as Secret,
            {
              expiresIn: "7d",
            }
          );
          res.status(201).json({
            success: true,
            response_code: ResponseCodes.VERIFY_SUCCESS,
            data: { otpUser, access_token: token },
            message: "You have been successfully verified",
          });
        } else {
          res.status(200).json({
            success: false,
            response_code: ResponseCodes.OTP_IS_INCORRECT,
            data: null,
            message: "otp is incorrect!",
          });
        }
      } else {
        res.status(404).json({
          success: false,
          response_code: ResponseCodes.VERIFY_FAILED,
          data: null,
          message: "otp is expire, your verification failed!",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        data: null,
        message: "Internal server error",
        errors: error,
      });
      console.log(
        `An error occurred during processing the request. More details: ${error}`
      );
    }
  };

  static otpResend = async (req: any, res: any) => {
    try {
      const oldUser: any = await User.findOne({
        email: req.body.email,
      });

      if (!oldUser) {
        res.status(404).json({
          success: false,
          message: "User not found!",
          response_code: ResponseCodes.USER_NOT_FOUND,
        });
      }
      const otpUser: any = await Otp.findOne({
        user: oldUser._id,
      });
      console.log("otpUser", otpUser);

      if (!otpUser) {
        const otp = generateFourDigitOtp();
        console.log(otp);

        const userOtp = new Otp({
          user: oldUser._id,
          otp: otp,
        });
        userOtp.save();

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "skypioneer03@gmail.com",
            pass: "zdfratrvbctxvrfp",
          },
        });

        var mailOptions = {
          from: "skypioneer03@gmail.com",
          to: req?.body?.email,
          subject: "Verification",
          text: `Your verification code is ${otp}`,
        };

        transporter.sendMail(mailOptions, function (error: any, info: any) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
        res.json({
          success: true,
          status: "PENDING",
          response_code: ResponseCodes.VERIFICATION_OTP_SENT,
          message: "Verification OTP has been sent your email.",
          data: {
            user: req.body.email,
          },
        });
      } else {
        const delete_otp: any = await Otp.findByIdAndDelete({
          _id: otpUser._id,
        });
        console.log("delete_otp", delete_otp);

        if (delete_otp) {
          const otp = generateFourDigitOtp();
          console.log(otp);

          const userOtp = new Otp({
            user: oldUser._id,
            otp: otp,
          });
          userOtp.save();

          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "skypioneer03@gmail.com",
              pass: "zdfratrvbctxvrfp",
            },
          });

          var mailOptions = {
            from: "skypioneer03@gmail.com",
            to: req?.body?.email,
            subject: "Verification",
            text: `Your verification code is ${otp}`,
          };

          transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
              res.json({
                success: true,
                status: "PENDING",
                response_code: ResponseCodes.VERIFICATION_OTP_SENT,
                message: "Verification OTP has been sent your email.",
                data: {
                  user: req.body.email,
                },
              });
            }
          });
        } else {
          res.status(500).json({
            message: "Failed to send OTP!",
            ResponseCodes: ResponseCodes.SOMETHING_WENT_WRONG,
            data: req.body.email,
          });
        }
      }
    } catch (error) {}
  };

  static addRiderProfile = async (req: any, res: any) => {
    try {
      const { first_name, last_name, user_id } = req.body;
      const user: any = await User.findById({ _id: user_id });

      await user.updateOne({
        first_name: first_name,
        last_name: last_name,
      });
      user.save();

      return res.status(201).json({
        success: true,
        response_code: ResponseCodes.CREATE_SUCCESS,
        message: "User profile created successfully.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: null,
        message: "Internal server error",
        errors: error,
      });
      console.log(
        `An error occurred during processing the request. More details: ${error}`
      );
    }
  };

  static addDriverProfile = async (req: any, res: any) => {
    try {
      const { first_name, last_name, user_id } = req.body;
      const user: any = await User.findById({ _id: user_id });

      await user.updateOne({
        first_name: first_name,
        last_name: last_name,
      });
      user.save();

      return res.status(201).json({
        success: true,
        response_code: ResponseCodes.CREATE_SUCCESS,
        message: "User profile created successfully.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: null,
        message: "Internal server error",
        errors: error,
      });
      console.log(
        `An error occurred during processing the request. More details: ${error}`
      );
    }
  };

  static addDriverProfileDetail = async (req: any, res: any) => {
    try {
      console.log(req.files);

      const { user_id, licence_number, pancard_number, language } =
        req.body;

      const user: any = await User.findById({ _id: user_id });
      console.log("user", user);

      const updateFields: any = {
        licence_number: licence_number,
        pancard_number: pancard_number,
        language: language,
      };
      if (req.files && req.files.profile_photo && req.files.profile_photo[0]) {
        updateFields.profile_photo = `${process.env.BASE_URL}/${req.files.profile_photo[0].filename}`;
      }

      if (req.files && req.files.addhar_card && req.files.addhar_card[0]) {
        updateFields.addhar_card = `${process.env.BASE_URL}/${req.files.addhar_card[0].filename}`;
      }

      if (
        req.files &&
        req.files.vehicle_permit &&
        req.files.vehicle_permit[0]
      ) {
        updateFields.vehicle_permit = `${process.env.BASE_URL}/${req.files.vehicle_permit[0].filename}`;
      }
      await user.updateOne(updateFields);
      user.save();

      return res.status(201).json({
        success: true,
        response_code: ResponseCodes.CREATE_SUCCESS,
        message: "User profile created successfully.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        data: null,
        message: "Internal server error",
        errors: error,
      });
      console.log(
        `An error occurred during processing the request. More details: ${error}`
      );
    }
  };

  static signInUser = async (req: any, res: Response, next: any) => {
    try {
      const { email, role } = req.body;

      let user = await User.findOne({
        email: email,
        role: role,
      });

      if (!user) {
        return res.status(404).send({
          success: false,
          response_code: ResponseCodes.USER_NOT_FOUND,
          message:
            "User not found, Please check your credentials or sign up if you don't have an account yet",
        });
      }

      if (user.status == "active" && user.is_verified == true) {
        // if (!bcrypt.compareSync(password, user.password)) {
        //   return res.status(401).send({
        //     success: false,
        //     response_code: ResponseCodes.INVALID_CREDENTIALS,
        //     accessToken: null,
        //     message: "Invalid Password!",
        //   });
        // }
        const otp = generateFourDigitOtp();
        console.log("otp", otp);
        const oldotp = await Otp.findOne({
          user: user._id,
          otp_type: "signIn",
        });
        if (oldotp) {
          await Otp.findOneAndDelete({
            user: user._id,
            otp_type: "signIn",
          });
        }
        const userOtp = new Otp({
          user: user._id,
          otp: otp,
          otp_type: "signIn",
        });
        userOtp.save();

        await user.updateOne({
          is_login_verified: false,
        });
        user.save();

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "skypioneer03@gmail.com",
            pass: "zdfratrvbctxvrfp",
          },
        });

        var mailOptions = {
          from: "skypioneer03@gmail.com",
          to: email, // This is where you specify the recipient's email address
          subject: "Verification",
          text: `Your verification code is ${otp}`,
        };

        transporter.sendMail(mailOptions, function (error: any, info: any) {
          if (error) {
            console.log("Error sending email:", error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        const access_token = jwt.sign(
          {
            user_id: user._id,
            email: user.email,
            is_login_verified: false,
            role: user.role,
          },
          process.env.JWT_TOKEN_SECRET as Secret,
          { expiresIn: "7d" }
        );

        res.status(200).send({
          success: true,
          response_code: ResponseCodes.LOGIN_SUCCESS,
          data: { user, access_token },
          message: "You have successfully login",
        });
      } else {
        res.status(200).json({
          success: false,
          response_code: ResponseCodes.USER_VERIFIED_PENDING,
          message: "Your request has been pending for verify",
          data: user,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        response_code: ResponseCodes.INTERNAL_SERVER_ERROR,
        error: `${error}`,
        message: "Internal Server Error",
      });
      console.log(
        `An error occurred during processing the request. More details: ${error}`
      );
    }
  };

  static signInOtpVarify = async (req: any, res: Response) => {
    try {
      console.log(req.user);
      const user: any = await User.findOne({ _id: req.user.user_id });
      if (!user) {
        return res.status(404).json({
          success: false,
          response_code: ResponseCodes.USER_NOT_FOUND,
          message: "User not Found!",
        });
      }
      let otpUser: any = await Otp.findOne({
        user: req.user.user_id,
        otp_type: "signIn",
      }).populate("user", {
        email: true,
      });
      if (otpUser) {
        if (otpUser.otp == req?.body?.otp) {
          await User.findOneAndUpdate(
            { _id: otpUser.user._id }, // Specify the query here
            {
              $unset: { is_login_verified: 1 }, // Remove the "is_login_verified" field
            }
          );
          const token = jwt.sign(
            {
              user_id: req.user.user_id,
              is_verified: true,
              role: req.user.role,
            },
            process.env.JWT_TOKEN_SECRET as Secret,
            {
              expiresIn: "7d",
            }
          );
          res.status(201).json({
            success: true,
            response_code: ResponseCodes.VERIFY_SUCCESS,
            data: { otpUser, access_token: token },
            message: "You have been successfully verified",
          });
        } else {
          res.status(200).json({
            success: false,
            response_code: ResponseCodes.OTP_IS_INCORRECT,
            data: null,
            message: "otp is incorrect!",
          });
        }
      } else {
        res.status(404).json({
          success: false,
          response_code: ResponseCodes.VERIFY_FAILED,
          data: null,
          message: "otp is expire, your verification failed!",
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        data: null,
        message: "Internal server error",
        errors: error,
      });
      console.log(
        `An error occurred during processing the request. More details: ${error}`
      );
    }
  };

  static getUser = async (req: any, res: Response) => {
    try {
      const users = await User.find();
      res.status(201).json({
        success: true,
        count: users.length,
        message: "Users get successfully",
        response_code: ResponseCodes.GET_SUCCESS,
        data: users,
      });
    } catch (error) {
      console.log(
        `An error occurred during processing the request. More details: ${error}`
      );
      return res.status(200).json({
        success: false,
        data: null,
        errors: error,
        message: `Internal Server Error. Unable to retrieve question due to this following errors: ${error}`,
      });
    }
  };

  static deleteUser = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await User.findByIdAndDelete({ _id: id });
      if (user) {
        res.status(201).json({
          success: true,
          response_code: ResponseCodes.DELETE_SUCCESS,
          status: 1,
          message: "user successfully deleted.",
        });
      } else {
        res.status(200).json({
          success: false,
          response_code: ResponseCodes.DELETE_FAILED,
          status: 0,
          message: "something went wrong!",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: `${error}`,
        message: "Internal Server Error",
      });
      throw new Error(
        `Internal Server Error. Unable to delete subject due to this following errors: ${error}`
      );
    }
  };

  static updateUser = async (req: Request, res: Response, next: any) => {
    try {
      const updateProfession = await User.findByIdAndUpdate(req.params.id, {
        first_name: req?.body?.first_name,
        last_name: req?.body?.last_name,
        email: req?.body?.email,
        role: req?.body?.role,
      });
      if (updateProfession) {
        return res.status(201).json({
          success: true,
          response_code: ResponseCodes.UPDATE_SUCCESS,
          message: "User successfully edited.",
        });
      } else {
        return res.status(200).json({
          success: false,
          response_code: ResponseCodes.UPDATE_FAILED,
          message: "something went wrong",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: `${error}`,
        message: "Internal Server Error",
      });
      throw new Error(
        `Internal Server Error. Unable to delete category due to this following errors: ${error}`
      );
    }
  };

  static getUserById = async (req: Request, res: Response) => {
    try {
      const getResponseById = await User.findOne({
        _id: req.params.id,
      });
      return res.status(201).json({
        success: true,
        message: `Success`,
        data: getResponseById,
      });
    } catch (error) {
      console.log(
        `An error occurred during processing the request. More details: ${error}`
      );
      return res.status(200).json({
        success: false,
        data: null,
        errors: error,
        message: `Internal Server Error. Unable to retrieve question due to this following errors: ${error}`,
      });
    }
  };

  static forgotPassword = async (req: any, res: Response) => {
    const { email } = req.body;
    try {
      const user: any = await User.findOne({ email });
      console.log("user", user);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
          response_code: ResponseCodes.USER_NOT_FOUND,
          data: null,
        });
      }
      const resetTokenUser: any = await ResetToken.findOne({
        user_id: user._id,
      });
      if (!resetTokenUser) {
        // Generate a unique reset token
        const resetToken: any = jwt.sign(
          { email },
          process.env.FORGOT_PASSWORD_KEY as Secret,
          {
            expiresIn: "1h",
          }
        );

        // Save the reset token to the user's document in the database
        const reset_Token: any = new ResetToken({
          user_id: user._id,
          token: resetToken,
        });
        reset_Token.save();

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "skypioneer03@gmail.com",
            pass: "zdfratrvbctxvrfp",
          },
        });

        var mailOptions = {
          from: "skypioneer03@gmail.com",
          to: email,
          subject: "User Reset Password",
          text: `Click on the following link to reset your password: <a href="http://localhost:5000/user/reset-password/${resetToken}">click here <a/>.`,
        };

        transporter.sendMail(mailOptions, function (error: any, info: any) {
          if (error) {
            console.log(error);
            return res.status(500).json({
              success: true,
              response_code: ResponseCodes.MAIL_SENDED_FAILED,
              message: "Failed to send email",
            });
          }
          console.log("Email sent:", info.response);
          res.status(201).json({
            success: true,
            response_code: ResponseCodes.MAIL_SENDED_SUCCESS,
            message: "Password reset email sent.",
            data: reset_Token,
          });
        });
      } else {
        const delete_token: any = await ResetToken.findByIdAndDelete({
          _id: resetTokenUser._id,
        });
        if (delete_token) {
          // Generate a unique reset token
          const resetToken: any = jwt.sign(
            { email },
            process.env.FORGOT_PASSWORD_KEY as Secret,
            {
              expiresIn: "1h",
            }
          );

          // Save the reset token to the user's document in the database
          const reset_Token: any = new ResetToken({
            user_id: user._id,
            token: resetToken,
          });
          reset_Token.save();

          var transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "skypioneer03@gmail.com",
              pass: "zdfratrvbctxvrfp",
            },
          });

          var mailOptions = {
            from: "skypioneer03@gmail.com",
            to: email,
            subject: "User Reset Password",
            text: `Click on the following link to reset your password: <a href="http://localhost:5000/user/reset-password/${resetToken}">click here <a/>.`,
          };

          transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
              console.log(error);
              return res.status(500).json({
                success: true,
                response_code: ResponseCodes.MAIL_SENDED_FAILED,
                message: "Failed to send email",
              });
            }
            console.log("Email sent:", info.response);
            res.status(201).json({
              success: true,
              response_code: ResponseCodes.MAIL_SENDED_SUCCESS,
              message: "Password reset email sent.",
              data: reset_Token,
            });
          });
        } else {
          res.status(500).json({
            message: "Failed to send email!",
            ResponseCodes: ResponseCodes.SOMETHING_WENT_WRONG,
            data: req.body.email,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        response_code: ResponseCodes.INTERNAL_SERVER_ERROR,
        error: `${error}`,
        message: "Internal Server Error",
      });
      console.log(
        `An error occurred during processing the request. More details: ${error}`
      );
    }
  };

  static resetPassword = async (req: any, res: Response) => {
    try {
      const { token } = req.params;
      const { password } = req.body;

      const forgotPasswordKey = process.env.FORGOT_PASSWORD_KEY as Secret; // Ensure process.env.FORGOT_PASSWORD_KEY is a valid secret

      const decodedToken: any = jwt.verify(token, forgotPasswordKey);

      // Find the user with the corresponding email and reset token
      const user: any = await User.findOne({
        email: decodedToken.email,
      });
      if (!user) {
        return res.status(400).json({
          success: true,
          response_code: ResponseCodes.USER_NOT_FOUND,
          message: "user not found",
        });
      }
      const resetToken: any = await ResetToken.findOne({
        user_id: user._id,
      });

      if (!resetToken) {
        return res.status(400).json({
          success: false,
          response_code: ResponseCodes.TOKEN_EXPIRED,
          message: "Token Expired! Please resend the reset request",
        });
      } else {
        if (token === resetToken.token) {
          // Update the user's password and reset token
          user.password = bcrypt.hashSync(password, 10);
          await user.save();

          await ResetToken.findOneAndDelete({
            _id: resetToken._id,
          });

          return res.status(200).json({
            success: true,
            response_code: ResponseCodes.PASSWORD_RESET_SUCCESS,
            message: "Password reset successful.",
          });
        } else {
          return res.status(401).json({
            success: true,
            response_code: ResponseCodes.INVALID_TOKEN,
            message: "Invalid token",
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        response_code: ResponseCodes.INTERNAL_SERVER_ERROR,
        error: `${error}`,
        message: "Internal Server Error",
      });
      console.log(
        `An error occurred during processing the request. More details: ${error}`
      );
    }
  };
}

export default UserController;
