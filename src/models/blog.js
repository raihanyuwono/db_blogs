"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class blog extends Model {
        static associate(models) {
            this.hasMany(models["like"], { foreignKey: "id_blog" });
            this.belongsTo(models["user"], { as:"author", foreignKey: "id_user" });
            this.belongsTo(models["category"], { as:"_category",foreignKey: "id_category" });
            this.belongsTo(models["country"], { as: "_country", foreignKey: "id_country" });
        }
    }
    blog.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING(500),
                allowNull: false,
            },
            keywords: DataTypes.STRING,
            url_img: DataTypes.TEXT,
            url_video: DataTypes.TEXT,
            id_user: DataTypes.UUID,
            id_category: DataTypes.INTEGER,
            id_country: DataTypes.INTEGER,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "blog",
            underscored: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
        }
    );
    return blog;
};
