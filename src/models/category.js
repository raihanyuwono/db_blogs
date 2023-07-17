"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class category extends Model {
        static associate(models) {
            this.hasMany(models["blog"], { foreignKey: "id_category" });
        }
    }
    category.init(
        {
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "category",
            timestamps: false,
        }
    );
    return category;
};
