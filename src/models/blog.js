"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class blog extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
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
