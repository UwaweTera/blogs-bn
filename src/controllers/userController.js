import { User } from "../database/models";
import bcrypt from "bcrypt";
import JwtUtil from "../utils/generateToken";

class UserController {
  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      // check when user exist
      const userExist = await User.findOne({ where: { email } });
      if (userExist) {
        return res
          .status(401)
          .json({ status: 401, message: "Email already exist" });
      }
      // encrypt password
      const hashedPassword = await bcrypt.hash(password, 10);
      // create new user
      const user = await User.create({
        username: name,
        email,
        password: hashedPassword,
      });
      await user.save();
      return res.status(201).json({ status: 201, user });
    } catch (error) {
      // console.log(error);
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res
          .status(401)
          .json({ status: 401, message: "Email not found" });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid password" });
      }
      // create token

      const tokenUser = {
        id: user.id,
        name: user.username,
        email: user.email,
      };

      const token = JwtUtil.generate(tokenUser);
      return res.status(200).json({ status: 200, accessToken: token });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ status: 500, error: "Server error" });
    }
  }
}

export default UserController;
