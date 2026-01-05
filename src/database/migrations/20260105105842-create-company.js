'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('companies', {
      companyId: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      companyDescription: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      industryType: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyLogoUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyWebsiteUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      companyLocation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contactEmail: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contactPhone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('companies');
  },
};
