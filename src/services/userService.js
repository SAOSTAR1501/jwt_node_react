import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  let hashedPassword = bcrypt.hashSync(userPassword, salt);

  return hashedPassword;
};

const createNewUser = async (email, username, password) => {
  let hashedPassword = hashPassword(password);
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt_node_react",
    Promise: bluebird,
  });
  try {
    const [rows] = await connection.execute(
      "INSERT INTO user (email, username, password) VALUES (?, ?, ?)",
      [email, username, hashedPassword]
    );
  } catch (err) {
    console.log("Error at create new user: ", err);
  }
};

const getUserList = async () => {
  let user = [];

  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt_node_react",
    Promise: bluebird,
  });
  try {
    const [rows] = await connection.execute("SELECT * FROM user");
    return rows;
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt_node_react",
    Promise: bluebird,
  });
  try {
    const [rows] = await connection.execute("DELETE FROM user WHERE id = ?", [
      id,
    ]);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

const getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt_node_react",
    Promise: bluebird,
  });
  try {
    const [rows] = await connection.execute("SELECT * FROM user WHERE id = ?", [
      id,
    ]);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

const updateUserInfor = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt_node_react",
    Promise: bluebird,
  });
  try {
    const [rows] = await connection.execute(
      "UPDATE user SET email = ?, username = ? WHERE id = ? ",
      [email, username, id]
    );
    return rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
