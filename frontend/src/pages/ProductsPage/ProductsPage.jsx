import { MainNav } from "@/components/MainNav";
import { DataTable } from "./components/DataTable";
import { ProductColumns } from "./components/Columns";
import { UserNav } from "./components/UserNav";
import { navigationLinks } from "../../config/navigationLinks";
import { API_PRODUCTS_URL } from "../../config/apiURL";
import { useState, useEffect } from "react";

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(API_PRODUCTS_URL)
      .then((res) => res.json())
      .then((data) => setProducts(data));
    
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
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
          <DataTable
            data={products.map((product) => ({
              id: product.id,
              name: product.name,
              price: `$${product.price.toFixed(2)}`,
             }))}
            columns={ProductColumns}
          />
        </div>
      </div>
    </div>
  );
};
