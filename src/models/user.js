"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        static associate(models) {
            this.hasMany(models["blogs"], { foreignKey: "id_user" });
            this.hasMany(models["likes"], { foreignKey: "id_user" });
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
