using { my.ecommerce as db } from './schema';

@path: '/catalog'
service CatalogService {
  entity Products as projection on db.Products;
  entity Categories as projection on db.Categories;
  entity Employees as projection on db.Employees;
  entity Customers as projection on db.Customers;
  entity Orders as projection on db.Orders;

  function getProductsWithoutStock() returns many Products;
  function getTop5ExpensiveProducts() returns many Products;
  function getOrdersToGermany() returns many Orders;
}

# srv/catalog-service.js - Implementación de Servicios
const cds = require('@sap/cds');

module.exports = async (srv) => {
  const { Products, Orders } = srv;

  // Productos sin stock
  srv.on('getProductsWithoutStock', async () => {
    return await SELECT.from(Products)
      .where('stock = 0')
      .columns('ID', 'name', 'price');
  });

  // Top 5 productos más caros
  srv.on('getTop5ExpensiveProducts', async () => {
    return await SELECT.from(Products)
      .orderBy('price desc')
      .limit(5)
      .columns('ID', 'name', 'price');
  });

  //  Órdenes a Alemania
  srv.on('getOrdersToGermany', async () => {
    return await SELECT.from(Orders)
      .where({ 'shippingAddress.country': 'Germany' });
  });
}
