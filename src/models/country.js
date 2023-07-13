"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class country extends Model {
        static associate(models) {
            this.hasMany(models["blog"], { foreignKey: "id_country" });
        }
    }
    country.init(
        {
            name: DataTypes.STRING,
            code: DataTypes.STRING(3),
        },
        {
            sequelize,
            modelName: "country",
        }
    );
    return country;
};
