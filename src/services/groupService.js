import db from "../models/index";

const getGroups = async () => {
  try {
    let data = await db.Group.findAll({ order: [["name", "ASC"]] });
    return {
      EM: "Get groups ok",
      EC: 0,
      DT: data,
    };
  } catch (err) {
    console.log(err);
    return {
      EM: "error from service",
      EC: 1,
      DT: [],
    };
  }
};

module.exports = {
  getGroups,
};
