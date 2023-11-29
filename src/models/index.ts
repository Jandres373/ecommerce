import Cart from "./cart.model";
import User from "./user.model";
import Category from "./category.model";
import Image from "./image.model";
import Product from "./product.model";
import Purchase from "./purchase.model";

// Alias para relaciones con la inicial en minúscula
User.hasMany(Cart, { foreignKey: 'userId', as: 'carts' });
Cart.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

Product.hasMany(Image, { foreignKey: 'productId', as: 'images' });
Image.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

User.hasMany(Purchase, { foreignKey: 'userId', as: 'purchases' });
Purchase.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Product.hasMany(Purchase, { foreignKey: 'productId', as: 'purchases' });
Purchase.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

Product.belongsToMany(Cart, { through: 'CartProducts', as: 'carts', foreignKey: 'productId' });
Cart.belongsToMany(Product, { through: 'CartProducts', as: 'product', foreignKey: 'cartId' });

