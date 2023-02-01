const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define("user", {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email:          {type: DataTypes.STRING, unique: true},
    password:       {type: DataTypes.STRING},
    role:           {type: DataTypes.STRING, defaultValue: "USER"}
});

const Shop = sequelize.define("shop", {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:           {type: DataTypes.STRING},
    country:        {type: DataTypes.STRING},
    city:           {type: DataTypes.STRING},
    street:         {type: DataTypes.STRING},
    house:          {type: DataTypes.STRING},
    flat:           {type: DataTypes.STRING}
});

const Product = sequelize.define("product", {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:           {type: DataTypes.STRING, unique: true}    
});

const Shop_Product = sequelize.define("shop_product", {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count:          {type: DataTypes.INTEGER, defaultValue: 0}
});

const Product_Rate = sequelize.define("product_rate", {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

const Order = sequelize. define("order", {
    id:             {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}, 
    count:          {type: DataTypes.INTEGER},
    status:         {type: DataTypes.STRING}
});

Shop.belongsToMany(Product, {through: Shop_Product});
Product.belongsToMany(Shop, {through: Shop_Product});

User.hasMany(Product_Rate);
Product_Rate.belongsTo(User);

Product.hasMany(Product_Rate);
Product_Rate.belongsTo(Product);

Shop.hasMany(Order);
Order.belongsTo(Shop);

Product.hasMany(Order);
Order.belongsTo(Product);

module.exports = {
    User, Shop, Product, Shop_Product, Product_Rate, Order
};