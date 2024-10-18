"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // A Project belongs to a Customer
      Project.belongsTo(models.Customer, {
        foreignKey: "customerId",
        as: "customer",
        onDelete: "CASCADE", // when customer is deleted, also delete all associated projects
      });
    }
  }

  Project.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      customerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Project",
      tableName: "Project",
      timestamps: false, // Disable createdAt and updatedAt columns
    }
  );

  return Project;
};
