const { comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

class AuthController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!password) {
        throw { name: "BadRequest", message: "Password is required" };
      }
      await User.create({ email, password });
      res.status(201).json({ message: "Register Successful" });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { name: "BadRequest", message: "Email is required" };
      }
      if (!password) {
        throw { name: "BadRequest", message: "Password is required" };
      }
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: "Unauthorized", message: "Invalid email or password" };
      }

      const comparePw = comparePassword(password, user.password);

      if (!comparePw) {
        throw { name: "Unauthorized", message: "Invalid email or password" };
      }

      const access_token = signToken({ id: user.id });

      res.json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const { clientToken } = req.body;

      const ticket = await client.verifyIdToken({
        idToken: clientToken,
        audience: process.env.CLIENT_ID,
      });

      if (!ticket) {
        throw { name: "BadRequest", message: "Invalid Google token" };
      }

      const payload = ticket.getPayload();

      let user = await User.findOne({
        where: {
          googleId: payload.sub,
        },
      });

      if (!user) {
        user = await User.create({
          googleId: payload.sub,
          name: payload.name,
          email: payload.email,
          profilePicture: payload.picture,
        });
      }

      const access_token = signToken({ id: user.id });
      res.json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
