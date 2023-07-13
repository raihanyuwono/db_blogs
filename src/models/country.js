"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class country extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
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
