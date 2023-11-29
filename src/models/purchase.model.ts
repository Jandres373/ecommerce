import sequelize from "../database/db_config";
import { Model, DataTypes } from 'sequelize'

class Purchase extends Model {
  userId!: number;
  productId!: number;
  quantity!: number;
}

Purchase.init({
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

export default Purchase;