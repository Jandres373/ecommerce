// Import necessary modules and configurations
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/db_config';

// Define the model
class Category extends Model {
  public name!: string;
}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'Category', 
    tableName: 'categories', 
  }
);

// Definir las relaciones   



export default Category;