import sequelize from "../database/db_config";
import { Model, DataTypes } from 'sequelize'
import Product from "./product.model";

class Cart extends Model {
  userId!: number;
  productId!: number;
  quantity!: number;
  product?: any;
}

Cart.init({
  userId: {
    type: DataTypes.INTEGER,
  },
  productId: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  }
},{sequelize, modelName: "Cart", tableName: "carts"})

export default Cart;