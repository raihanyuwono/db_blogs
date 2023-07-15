"use strict";
const {v4: uuidv4} = require('uuid');
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        static associate(models) {
            this.hasMany(models["blog"], { foreignKey: "id_user" });
            this.hasMany(models["like"], { foreignKey: "id_user" });
        }
    }
    user.init(
        {
            id: {
                DataTypes: DataTypes.UUID,
                defaultValue: uuidv4(),
            },
            username: DataTypes.STRING,
            email: DataTypes.STRING,
            phone: DataTypes.STRING,
            password: DataTypes.STRING,
            avatar: DataTypes.STRING,
            is_verified: DataTypes.BOOLEAN,
            created_at: {
                type: DataTypes.DATETIME,
                defaultValue: DataTypes.NOW,
            },
            modified_at: {
                type: DataTypes.DATETIME,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: "user",
        }
    );
    return user;
};
