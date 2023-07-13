"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    user.init(
        {
            id: DataTypes.UUID,
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            password: DataTypes.STRING,
            avatar: DataTypes.STRING,
            is_verified: DataTypes.BOOLEAN,
            created_at: DataTypes.DATE,
            modified_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "user",
        }
    );
    return user;
};
