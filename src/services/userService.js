import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models/index";
import { where } from "sequelize";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  let hashedPassword = bcrypt.hashSync(userPassword, salt);

  return hashedPassword;
};

const createNewUser = async (email, username, password) => {
  let hashedPassword = hashPassword(password);

  try {
    db.User.create({
      email: email,
      username: username,
      password: hashedPassword,
    });
  } catch (err) {
    console.log("Error at create new user: ", err);
  }
};

const getUserList = async () => {
  let users = [];

  users = await db.User.findAll();
  return users;
};

const deleteUser = async (id) => {
  await db.User.destroy({ where: { id: id } });
};

const getUserById = async (id) => {
  let user = await db.User.findOne({ where: { id: id } });
  return user.get({ plain: true });
};

const updateUserInfor = async (email, username, id) => {
  await db.User.update(
    { email: email, username: username },
    {
      where: { id: id },
    }
  );
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
