"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.hasMany(models.Project, {
        foreignKey: "customerId",
        as: "projects",
        onDelete: "CASCADE",
      });
    }
  }
  Customer.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Customer",
      tableName: "Customer",
      timestamps: false, // Disable timestamps
    }
  );
  return Customer;
};
