import db from "../models/index";
import {
  checkEmailExist,
  checkPhoneExist,
  hashPassword,
} from "./loginRegisterService";

const getAllUser = async () => {
  let data = {
    EM: "",
    EC: "",
    DT: "",
  };

  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
      nest: true,
    });
    if (users) {
      return {
        EM: "get all user success",
        EC: 0,
        DT: users,
      };
    } else {
      return {
        EM: "get all user success",
        EC: 0,
        DT: [],
      };
    }
  } catch (err) {
    console.log(err);
    return {
      EM: "fail to get all users",
      EC: 1,
      DT: [],
    };
  }
};

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;
    const { count, rows } = await db.User.findAndCountAll({
      offset: offset,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: { model: db.Group, attributes: ["name", "description", "id"] },
      nest: true,
      order: [["id", "DESC"]],
    });

    let totalPages = Math.ceil(count / limit);

    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    // console.log(data);
    return {
      EM: "fetch users successfully!",
      EC: 0,
      DT: data,
    };
  } catch (err) {
    console.log(err);
    return {
      EM: "fail to get users",
      EC: 1,
      DT: [],
    };
  }
};

const createNewUser = async (data) => {
  try {
    //check email, phone number
    let isEmailExisted = await checkEmailExist(data.email);
    if (isEmailExisted === true) {
      return {
        EM: "Email already exists.",
        EC: 1,
        DT: "email",
      };
    }
    let isPhoneExisted = await checkPhoneExist(data.phone);
    if (isPhoneExisted === true) {
      return {
        EM: "Phone number is already in use.",
        EC: 1,
        DT: "phone",
      };
    }
    //hash password
    let hashedPassword = hashPassword(data.password);
    await db.User.create({ ...data, password: hashedPassword });
    return {
      EM: "create user oke!",
      EC: 0,
      DT: [],
    };
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (data) => {
  // console.log(data);
  try {
    if (!data.groupId) {
      return {
        EM: "Error with empty group!",
        EC: 1,
        DT: "group",
      };
    }
    let user = await db.User.findOne({ where: { id: data.id } });
    // console.log(user);
    if (user) {
      //update
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId,
      });
      return {
        EM: "Updata user success!",
        EC: 0,
        DT: "",
      };
    } else {
      //not found
      return {
        EM: "User not found!",
        EC: 1,
        DT: "",
      };
    }
  } catch (err) {
    console.log(err);
    return {
      EM: "Something wrong with services!",
      EC: 1,
      DT: [],
    };
  }
};

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });

    if (user) {
      await user.destroy();
      return {
        EM: "delete user ok",
        EC: 0,
        DT: [],
      };
    } else {
      return {
        EM: "user not found",
        EC: 1,
        DT: [],
      };
    }
  } catch (err) {
    console.log(err);
    return {
      EM: "fail to delete user",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  getAllUser,
  getUserWithPagination,
  createNewUser,
  updateUser,
  deleteUser,
};
