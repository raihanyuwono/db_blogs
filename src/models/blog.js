"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class blog extends Model {
        static associate(models) {
            this.hasMany(models["likes"], { foreignKey: "id_blog" });
            this.belongsTo(models["users"], { foreignKey: "id_user" });
            this.belongsTo(models["categories"], { foreignKey: "id_category" });
            this.belongsTo(models["countries"], { foreignKey: "id_country" });
        }
    }
    blog.init(
        {
            id: DataTypes.INTEGER,
            title: DataTypes.STRING,
            content: DataTypes.STRING(500),
            keywords: DataTypes.STRING,
            url_img: DataTypes.TEXT,
            url_video: DataTypes.TEXT,
            id_user: DataTypes.UUID,
            id_category: DataTypes.INTEGER,
            id_country: DataTypes.INTEGER,
            created_at: DataTypes.DATE,
            modified_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "blog",
        }
    );
    return blog;
};
