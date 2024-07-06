import userService from "../services/userService";

const handleHelloWorld = (req, res) => {
  const name = "Star";
  return res.render("home.ejs", { name });
};

const handleUserPage = async (req, res) => {
  let users = await userService.getUserList();
  // console.log("users: ", users);
  await userService.deleteUser(8);
  return res.render("user.ejs", { users });
};

const handleCreateNewUser = (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let password = req.body.password;

  userService.createNewUser(email, username, password);

  return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  console.log(" >>> check id: ", req.params.id);

  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
};
