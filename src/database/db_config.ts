import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()
const DB = process.env.DATABASE_URL || " "

const sequelize = new Sequelize(DB, {logging:false});

export default sequelize;