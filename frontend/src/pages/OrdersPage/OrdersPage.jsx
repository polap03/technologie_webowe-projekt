import { MainNav } from "@/components/MainNav";
import { DataTable } from "./components/DataTable";
import { OrderColumns } from "./components/Columns";
import { UserNav } from "./components/UserNav";
import { navigationLinks } from "../../config/navigationLinks";
import { API_ORDERS_URL } from "../../config/apiURL";
import { API_CUSTOMERS_URL } from "../../config/apiURL";
import { useState, useEffect } from "react";

export const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch(API_ORDERS_URL)
      .then((res) => res.json())
      .then((data) => setOrders(data));
    fetch(API_CUSTOMERS_URL)
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <MainNav className="mx-6" links={navigationLinks} />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
          <DataTable
            data={orders.map((order) => ({
              id: order.id,
              fullname: `${customers.find(customer => customer.id === order.customer_id)?.name} ${customers.find(customer => customer.id === order.customer_id)?.surname}`,
              productId: order.product_id,
            }))}
            columns={OrderColumns}
          />
        </div>
      </div>
    </div>
  );
};
