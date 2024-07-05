import bcrypt from "bcrypt";
import mysql from "mysql2/promise";
import bluebird from "bluebird";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  let hashedPassword = bcrypt.hashSync(userPassword, salt);

  return hashedPassword;
};

const createNewUser = (email, username, password) => {
  let hashedPassword = hashPassword(password);

  //   connection.query(
  //     "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
  //     [email, username, hashedPassword],
  //     function (err, results, fields) {
  //       if (err) {
  //         console.log(err);
  //       }
  //     }
  //   );
};

const getUserList = async () => {
  let users = [];
  //   return connection.query(
  //     "SELECT * FROM users",
  //     function (err, results, fields) {
  //       if (err) {
  //         console.log(err);
  //         return users;
  //       }
  //       users = results;
  //       console.log(">> run get user list: ", users);
  //       return users;
  //     }
  //   );
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt_node_react",
    Promise: bluebird,
  });
  try {
    const [rows] = await connection.execute("SELECT * FROM users");
    return rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createNewUser,
  getUserList,
};
