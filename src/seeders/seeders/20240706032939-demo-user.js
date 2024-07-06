"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     *
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "saostar1501@gmail.com",
          username: "saostar",
          password: "saoooo",
        },
        {
          email: "saostar1501@gmail.com",
          username: "saostar1",
          password: "saoooo",
        },
        {
          email: "saostar1501@gmail.com",
          username: "saostar2",
          password: "saoooo",
        },
        {
          email: "saostar1501@gmail.com",
          username: "saostar3",
          password: "saoooo",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
