import db from "../models/index";
import bcrypt from "bcrypt";
import { Op } from "sequelize";
import { getGroupWithRoles } from "./jwt_service";
import { createJWT } from "../middlewares/jwt";
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();

const hashPassword = (userPassword) => {
  let hashedPassword = bcrypt.hashSync(userPassword, salt);

  return hashedPassword;
};

const checkEmailExist = async (email) => {
  let user = await db.User.findOne({ where: { email: email } });
  if (user) return true;
  return false;
};
const checkPhoneExist = async (phone) => {
  let user = await db.User.findOne({ where: { phone: phone } });
  if (user) return true;
  return false;
};

const registerNewUser = async (rawUserData) => {
  try {
    //check email/phonenumber are exist
    let isEmailExisted = await checkEmailExist(rawUserData.email);
    if (isEmailExisted === true) {
      return {
        EM: "Email already exists.",
        EC: 1,
      };
    }
    let isPhoneExisted = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExisted === true) {
      return {
        EM: "Phone number is already in use.",
        EC: 1,
      };
    }

    if (rawUserData.password && rawUserData.password.length < 4) {
      return {
        EM: "Your password must have at least 4 characters.",
        EC: -1,
      };
    }
    //hash user password
    let hashedPassword = hashPassword(rawUserData.password);
    //create new user
    await db.User.create({
      email: rawUserData.email,
      phone: rawUserData.phone,
      username: rawUserData.username,
      password: hashedPassword,
      groupId: 4,
    });
    return {
      EM: "A user created successfully!",
      EC: 0,
    };
  } catch (err) {
    console.log("error: ", err);
    return {
      EM: "Something wrong in service...",
      EC: -2,
    };
  }
};

const checkPassword = (inputPassword, hashedPassword) => {
  return bcrypt.compareSync(inputPassword, hashedPassword);
};

const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });

    if (user) {
      console.log("Found user.");
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword === true) {
        //let token

        //test role
        let groupWithRoles = await getGroupWithRoles(user);

        let payload = {
          email: user.email,
          groupWithRoles,
          expiresIn: process.env.JWT_EXPIRES_IN,
        };

        let token = createJWT(payload);

        return {
          EM: "OK!",
          EC: 0,
          DT: {
            access_token: token,
            data: groupWithRoles,
          },
        };
      }
    }
    console.log(
      "Input user with email/phone:",
      rawData.valueLogin,
      ", password: ",
      rawData.password
    );
    return {
      EM: "Your email/phone number or password is incorrect.",
      EC: 1,
      DT: "",
    };
  } catch (err) {
    return {
      EM: "Login error!",
      EC: -1,
    };
  }
};

module.exports = {
  registerNewUser,
  handleUserLogin,
  hashPassword,
  checkEmailExist,
  checkPhoneExist,
};
