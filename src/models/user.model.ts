import { DataTypes, Model } from "sequelize";
import sequelize from "../database/db_config";

class User extends Model {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  phone!: string;
}

User.init({
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true, 
    validate: {
      isEmail: true 
    }
  },
  password: {
    type: DataTypes.STRING,
    
  },
  phone: {
    type: DataTypes.STRING,
    
  }
},
{
  sequelize,
  modelName: 'User', 
  tableName: 'users' 
});



export default User;
