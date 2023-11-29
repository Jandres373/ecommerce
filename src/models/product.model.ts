import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db_config";

class Product extends Model {
  id!: number;
  title!: string;
  description!: string;
  categoryId!: number;
  brand!: string;
  price!: number;
}

Product.init({
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  categoryId: {
    type: DataTypes.INTEGER,
  },
  brand: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
  }
}, {
  sequelize,
  modelName: "Product",
  tableName: "products",
})

export default Product;