from fastapi import APIRouter, HTTPException, Query

from .storage import get_customers_storage, get_orders_storage, get_products_storage
from .schema import CustomerCreateSchema, CustomerUpdateSchema, Customer, Order, Product

router = APIRouter()

CUSTOMERS_STORAGE = get_customers_storage()
ORDERS_STORAGE = get_orders_storage()
PRODUCTS_STORAGE = get_products_storage()

max_id = len(CUSTOMERS_STORAGE) + 1

@router.get("/customers/")
async def get_customers() -> list[Customer]:
    return list(get_customers_storage().values())


@router.get("/customers/{customer_id}")
async def get_customer(customer_id: int) -> Customer:
    try:
        return CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )


@router.patch("/customers/{customer_id}")
async def update_customer(
    customer_id: int, updated_customer: CustomerUpdateSchema
) -> Customer:
    existing_customer = None
    try:
        existing_customer = CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )
    if not updated_customer.name and not updated_customer.surname and not updated_customer.email and not updated_customer.phone_number:
        raise HTTPException(
            status_code=422, detail="Must contain at least one non-empty field."
        )
    if updated_customer.name:
        existing_customer.name = updated_customer.name

    if updated_customer.surname:
        existing_customer.surname = updated_customer.surname

    if updated_customer.email:
        existing_customer.email = updated_customer.email

    if updated_customer.phone_number:
        existing_customer.phone_number = updated_customer.phone_number

    return existing_customer


@router.delete("/customers/{customer_id}")
async def delete_customer(customer_id: int) -> None:
    try:

        del CUSTOMERS_STORAGE[customer_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Customer with ID={customer_id} does not exist."
        )

@router.post("/customers/")
async def create_customer(customer: CustomerCreateSchema) -> Customer:
    global max_id
    id = max_id
    max_id += 1
    new_customer = Customer(**customer.dict(), id=id)
    CUSTOMERS_STORAGE[id] = new_customer
    return new_customer

@router.get("/orders")
async def get_products() -> list[Order]:
    return list(ORDERS_STORAGE.values())

@router.get("/orders/{order_id}")
async def get_order(order_id: int) -> Order:
    try:
        return ORDERS_STORAGE[order_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Order with ID={order_id} does not exist."
        )
    
@router.get("/products")
async def get_products() -> list[Product]:
    return list(PRODUCTS_STORAGE.values())

@router.get("/products/{product_id}")
async def get_product(product_id: int) -> Product:
    try:
        return PRODUCTS_STORAGE[product_id]
    except KeyError:
        raise HTTPException(
            status_code=404, detail=f"Product with ID={product_id} does not exist."
        )
