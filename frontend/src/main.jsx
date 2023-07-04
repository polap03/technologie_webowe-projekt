import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import { Layout } from "@/components/Layout";
import { DashboardPage, CustomersPage } from "@/pages";
import { AddCustomerPage } from "./pages/AddCustomerPage";
import { EditCustomerPage } from "./pages/EditCustomerPage";
import { OrdersPage } from "./pages/OrdersPage/OrdersPage";
import { ProductsPage } from "./pages/ProductsPage/ProductsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "customers",
        element: <CustomersPage />,
      },
      {
        path: "add-customer",
        element: <AddCustomerPage />,
      },
      { path: "edit-customer/:id", 
        element: <EditCustomerPage />
      },
      { path: "orders",
        element: <OrdersPage />
      },
      { path: "products",
        element: <ProductsPage />
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
