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

const getUpdateUserPage = async (req, res) => {
  let id = req.params.id;

  let user = await userService.getUserById(id);
  let userData = {};
  if (user && user.length > 0) {
    userData = user[0];
  }

  console.log("get user: ", user);
  return res.render("user-update.ejs", { userData });
};

const handleUpdateUser = async (req, res) => {
  let email = req.body.email;
  let username = req.body.username;
  let id = req.body.id;

  await userService.updateUserInfor(email, username, id);
  return res.redirect("/user");
};

module.exports = {
  handleHelloWorld,
  handleUserPage,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
};
