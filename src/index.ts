import app from './app'
import sequelize from './database/db_config'
import './models/index'

const port = 8080

async function start() {
  try {

    await sequelize.sync()
    console.log('conexion a la db exitosa')

    app.listen(port)
    console.log(`estoy escuchando al puerto: ${port}`)

  } catch (error) {

    console.error(error)
  }
}

start()