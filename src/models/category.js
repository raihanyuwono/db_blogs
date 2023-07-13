"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class category extends Model {
        static associate(models) {
            this.hasMany(models["blogs"], { foreignKey: "id_category" });
        }
    }
    category.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "category",
        }
    );
    return category;
};
