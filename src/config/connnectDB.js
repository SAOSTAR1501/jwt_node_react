const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("jwt_node_react", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has established successfully.");
  } catch (err) {
    console.log("unable to connecet to the database", err);
  }
};

export default connection;
