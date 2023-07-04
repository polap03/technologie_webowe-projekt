import { MainNav } from "@/components/MainNav";
import { navigationLinks } from "../config/navigationLinks";
import { UserNav } from "./CustomersPage/components/UserNav";
import { API_CUSTOMERS_URL } from "../config/apiURL";
import { useState } from "react";

export const fetchCustomers = () => 
  fetch(API_CUSTOMERS_URL).then((res) => res.json());

export const AddCustomerPage = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      switch (name) {
        case "firstname":
          setFirstName(value);
          break;  
        case "lastname":
          setLastName(value);
          break;
        case "email":
          setEmail(value);
          break;
        case "phoneNumber":
          setPhoneNumber(value);
          break;
        default:
          break;
      }
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(firstname, lastname, email, phoneNumber);
      fetch(API_CUSTOMERS_URL, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: firstname,
            surname: lastname,
            email: email,
            phone_number: phoneNumber,
        }),
    }).then((res) => res.json());
    setLastName("");
    setFirstName("");
    setEmail("");
    setPhoneNumber("");
    };


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
          <h2 className="text-3xl font-bold tracking-tight">Add customer</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
          <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
            <label htmlFor="firstname">First name:</label>
            <input className="border border-grey-300 rounded-md px-4 py-1" type="text" id="firstname" name="firstname" value={firstname} onChange={handleInputChange}/>
            <label htmlFor="lastname">Last name:</label>
            <input className="border border-grey-300 rounded-md px-4 py-1" type="text" id="lastname" name="lastname" value={lastname} onChange={handleInputChange} />
            <label htmlFor="email">Email:</label>
            <input className="border border-grey-300 rounded-md px-4 py-1" type="email" id="email" name="email" value={email} onChange={handleInputChange}/>
            <label htmlFor="phoneNumber">Phone number:</label>
            <input className="border border-grey-300 rounded-md px-4 py-1" type="text" id="phoneNumber" name="phoneNumber" value={phoneNumber} onChange={handleInputChange}/>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div align="center"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  width: "150px",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "none",
                }}
              >
                <button type="submit">Add Customer</button>
              </div>
            </div>

          </form>
          
        </div>
      </div>
    </div>
  );
};
