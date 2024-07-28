import loginRegisterService from "../services/loginRegisterService";

const testApi = (req, res) => {
  return res.status(200).json({
    message: "OK",
    data: "test api",
  });
};

const handleRegister = async (req, res) => {
  try {
    // req.body: email, phone, username, password
    if (
      !req.body.email ||
      !req.body.phone ||
      !req.body.username ||
      !req.body.password
    ) {
      return res.status(200).json({
        EM: "missing required parameters", //error message
        EC: "1", //error code
        DT: "", //data
      });
    }

    //services: create user
    let data = await loginRegisterService.registerNewUser(req.body);

    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT, //data
    });
  } catch (err) {
    return res.status(500).json({
      EM: "error from server", //error message
      EC: "-1", //error code
      DT: "", //data
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await loginRegisterService.handleUserLogin(req.body);
    res.cookie("jwt", data.DT.access_token, { httpOnly: true });
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT, //data
    });
  } catch (err) {
    console.log("error: ", err);
    return res.status(500).json({
      EM: "error from server", //error message
      EC: "-1", //error code
      DT: "", //data
    });
  }
};

module.exports = {
  testApi,
  handleRegister,
  handleLogin,
};
