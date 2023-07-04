import { MainNav } from "@/components/MainNav";
import { navigationLinks } from "../config/navigationLinks";
import { UserNav } from "./CustomersPage/components/UserNav";
import { API_CUSTOMERS_URL } from "../config/apiURL";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const fetchCustomers = () => 
  fetch(API_CUSTOMERS_URL).then((res) => res.json());

export const EditCustomerPage = () => {
    const [customer, setCustomer] = useState({});

    const {id} = useParams();

    const navigate = useNavigate();

    const navigateBack = () => {
        navigate("/customers")
    };

    useEffect(() => {
        fetch(API_CUSTOMERS_URL + `/${id}`)
            .then((res) => res.json())
            .then((data) => setCustomer(data));
    }, []);

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      switch (name) {
        case "firstname":
          setCustomer({ ...customer, name: value });
          break;  
        case "lastname":
          setCustomer({ ...customer, surname: value });
          break;
        case "email":
          setCustomer({ ...customer, email: value });
          break;
        case "phoneNumber":
          setCustomer({ ...customer, phone_number: value });
          break;
        default:
          break;
      }
    };

    const handleSubmit = (event) => {
      event.preventDefault();


      fetch(API_CUSTOMERS_URL + `/${id}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: customer.name,
            surname: customer.surname,
            email: customer.email,
            phone_number: customer.phone_number,
        }),
    }).then((res) => res.json());


    navigateBack();
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-md shadow-lg p-6 max-w-lg w-full">
                <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Edit customer</h2>
                    <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={navigateBack}
                    >
                        Close
                    </button>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="firstname" className="w-32">
              First name:
            </label>
            <input
              className="border border-gray-300 rounded-md px-4 py-2"
              type="text"
              id="firstname"
              name="firstname"
              value={customer.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastname" className="w-32">
              Last name:
            </label>
            <input
              className="border border-gray-300 rounded-md px-4 py-2"
              type="text"
              id="lastname"
              name="lastname"
              value={customer.surname}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="w-32">
              Email:
            </label>
            <input
              className="border border-gray-300 rounded-md px-4 py-2"
              type="email"
              id="email"
              name="email"
              value={customer.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="w-32">
              Phone number:
            </label>
            <input
              className="border border-gray-300 rounded-md px-4 py-2"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={customer.phone_number}
              onChange={handleInputChange}
            />
          </div>
                    <div className="flex justify-center">
                        <button
                            className="bg-black text-white px-4 py-2 rounded-md"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
