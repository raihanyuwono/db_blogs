"use strict";
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
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            avatar: {
                type: DataTypes.TEXT,
                unique: true,
            },
            is_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "user",
            underscored: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            indexes: [
                { unique: true, fields: ["username"] },
                { unique: true, fields: ["email"] },
                { unique: true, fields: ["phone"] },
                { unique: true, fields: ["avatar"] },
            ],
        }
    );
    return user;
};
