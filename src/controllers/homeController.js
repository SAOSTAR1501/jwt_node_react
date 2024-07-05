import userService from "../services/userService";

const handleHelloWorld = (req, res) => {
  const name = "Star";
  return res.render("home.ejs", { name });
};

const handleUserPage = (req, res) => {
  return res.render("user.ejs");
};

const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  // userService.createNewUser(email, username, password);
  userService.getUserList();

  return res.send("Created User!");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
};
