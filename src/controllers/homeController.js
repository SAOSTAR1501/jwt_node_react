import userService from "../services/userService";

const handleHelloWorld = (req, res) => {
  const name = "Star";
  return res.render("home.ejs", { name });
};

const handleUserPage = async (req, res) => {
  let users = await userService.getUserList();
  // console.log("users: ", users);
  return res.render("user.ejs", { users });
};

const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  userService.createNewUser(email, username, password);

  return res.send("Created User!");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
};
