import { Model, DataTypes } from "sequelize";
import sequelize from "../database/db_config";

class Image extends Model {
  url!: string;
  productId!: number;
}

Image.init({
  url: {
    type: DataTypes.STRING,
  },
  productId: {
    type: DataTypes.INTEGER,
  }
},{sequelize, modelName: "Image", tableName: "images"})

export default Image;