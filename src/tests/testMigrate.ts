import sequelize from "../database/db_config";
import User from "../models/user.model";
import Category from "../models/category.model";
import Cart from "../models/cart.model";
import Product from "../models/product.model";
import Image from "../models/image.model";

const main = async () => {
  try {
    console.log('Hola, estoy funcionando antes de los tests :P');

    // En caso de que sea necesario, se crea un usuario antes de correr los tests
    const newUser = {
      firstName: "julian",
      lastName: "mosquera",
      email: "jam@gmail.com",
      password: "123123",
      phone: "123123123123",
    };
    await User.create(newUser);

    const newCategory = {
      name: "Categoría Falsa",
    };
    await Category.create(newCategory);

    const newProduct = {
      title: "Producto Falso",
      description: "Este es un producto de ejemplo.",
      categoryId: 1,
      brand: "Marca Ficticia",
      price: 50,
    };
    await Product.create(newProduct);

    const newCart = {
      userId: 1,
      productId: 1,
      quantity: 1,
    };
    await Cart.create(newCart);

    const newImage = {
      url:
        "https://th.bing.com/th/id/R.59b6fdaa765d2f53aca0fc990ab6f7f5?rik=2beiqcFcsR%2bjjw&pid=ImgRaw&r=0",
      productId: 1,
    };
    await Image.create(newImage);

    await sequelize.sync(); 

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
