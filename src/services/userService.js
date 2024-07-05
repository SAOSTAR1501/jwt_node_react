import bcrypt from "bcrypt";
import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "jwt_node_react",
});

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
  let hashedPassword = bcrypt.hashSync(userPassword, salt);

  return hashedPassword;
};

const createNewUser = (email, username, password) => {
  let hashedPassword = hashPassword(password);

  connection.query(
    "INSERT INTO users (email, username, password) VALUES (?, ?, ?)",
    [email, username, hashedPassword],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
};

const getUserList = () => {
  let users = [];
  connection.query("SELECT * FROM users", function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log("users: ", results);
  });
};

module.exports = {
  createNewUser,
  getUserList,
};
