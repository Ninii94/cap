namespace my.ecommerce;

entity Products {
  key ID: Integer;
  name: String(100);
  description: String(255);
  price: Decimal(10,2);
  stock: Integer;
  category: Association to Categories;
}

entity Categories {
  key ID: Integer;
  name: String(50);
  products: Composition of many Products on products.category = $self;
}

entity Employees {
  key ID: Integer;
  firstName: String(50);
  lastName: String(50);
  email: String(100);
  department: String(50);
  manager: Association to Employees;
  reportsTo: Composition of many Employees on reportsTo.manager = $self;
}

entity Customers {
  key ID: Integer;
  name: String(100);
  email: String(100);
  address: String(255);
  country: String(50);
}

entity Orders {
  key ID: Integer;
  customer: Association to Customers;
  orderDate: Date;
  totalAmount: Decimal(12,2);
  status: String(20);
  items: Composition of many OrderItems on items.order = $self;
  shippingAddress: {
    street: String(100);
    city: String(50);
    country: String(50);
    postalCode: String(20);
  }
}

entity OrderItems {
  key ID: Integer;
  order: Association to Orders;
  product: Association to Products;
  quantity: Integer;
  unitPrice: Decimal(10,2);
}
