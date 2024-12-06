const cds = require('@sap/cds');

module.exports = class CatalogService extends cds.ApplicationService {
  async init() {
    // 1 órdenes con el detalle del cliente
    this.on('getOrdersWithCustomerDetails', async () => {
      const orders = await SELECT.from('Orders')
        .columns('ID', 'Customer.Name', 'Customer.Contact', 'TotalAmount');
      return orders;
    });

    // 2. Obtener los empleados que reportan al manager "2"
    this.on('getEmployeesReportingToManager', async () => {
      const employees = await SELECT.from('Employees')
        .where({ ManagerID: 2 })
        .columns('ID', 'FirstName', 'LastName', 'Department');
      return employees;
    });

    // 3 productos que tienen stock (inventario)
    this.on('getProductsWithStock', async () => {
      const productsInStock = await SELECT.from('Products')
        .where('Stock > 0')
        .columns('ID', 'Name', 'Stock', 'Price');
      return productsInStock;
    });

    // 4  SIN stock
    this.on('getProductsWithoutStock', async () => {
      const productsNoStock = await SELECT.from('Products')
        .where('Stock = 0')
        .columns('ID', 'Name');
      return productsNoStock;
    });

    // 5.  5 productos más caros
    this.on('getTop5ExpensiveProducts', async () => {
      const topProducts = await SELECT.from('Products')
        .orderBy('Price desc')
        .limit(5)
        .columns('ID', 'Name', 'Price');
      return topProducts;
    });

    // 6. Encontrar órdenes enviadas a "Germany"
    this.on('getOrdersToGermany', async () => {
      const orders = await SELECT.from('Orders')
        .where({ 'ShippingAddress.Country': 'Germany' })
        .columns('ID', 'Customer.Name', 'TotalAmount', 'ShippingAddress');
      return orders;
    });

    // 7.  "Beverages"
    this.on('getBeverageProducts', async () => {
      const beverageProducts = await SELECT.from('Products')
        .where({ 'Category.Name': 'Beverages' })
        .columns('Name', 'Price');
      return beverageProducts;
    });

    return super.init();
  }
};

//  definición de esquema para referencia
const schema = {
  Products: {
    ID: 'Integer',
    Name: 'String',
    Stock: 'Integer',
    Price: 'Decimal',
    Category: {
      Name: 'String'
    }
  },
  Orders: {
    ID: 'Integer',
    Customer: {
      Name: 'String',
      Contact: 'String'
    },
    TotalAmount: 'Decimal',
    ShippingAddress: {
      Country: 'String'
    }
  },
  Employees: {
    ID: 'Integer',
    FirstName: 'String',
    LastName: 'String', 
    Department: 'String',
    ManagerID: 'Integer'
  }
};