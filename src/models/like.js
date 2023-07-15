"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class like extends Model {
        static associate(models) {
            this.belongsTo(models["user"], { foreignKey: "id_user" });
            this.belongsTo(models["blog"], { foreignKey: "id_blogs" });
        }
    }
    like.init(
        {
            id_user: DataTypes.UUID,
            id_blog: DataTypes.INTEGER,
            created_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "like",
        }
    );
    return like;
};
