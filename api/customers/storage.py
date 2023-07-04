from functools import lru_cache

from .schema import Customer, Order, Product

CustomerStorageType = dict[int, Customer]
OrderStorageType = dict[int, Order]
ProductStorageType = dict[int, Product]

CUSTOMERS: CustomerStorageType = {}
ORDERS: OrderStorageType = {1: Order(id=1, customer_id=1, product_id=1), 2: Order(id=2, customer_id=2, product_id=2), 3: Order(id=3, customer_id=3, product_id=3)}
PRODUCTS: ProductStorageType = {1: Product(id=1, name="Product 1", price=100.00), 2: Product(id=2, name="Product 2", price=200.00), 3: Product(id=3, name="Product 3", price=300.00)}


@lru_cache(maxsize=1)
def get_customers_storage() -> CustomerStorageType:
    return CUSTOMERS
@lru_cache(maxsize=1)
def get_orders_storage() -> OrderStorageType:
    return ORDERS
@lru_cache(maxsize=1)
def get_products_storage() -> ProductStorageType:
    return PRODUCTS


