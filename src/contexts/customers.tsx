import { ReactNode, createContext, useState } from "react";
import { api } from "../api";

type Customers = {
  id: number,
  name: string,
  type: string,
  doc: string,
  date: Date,
  tel: number[],
  is_active: boolean
};

type CustomersContextType = {
  customers: Customers[],
  getCustomers: () => Promise<void>
}

export const CustomersContext =
createContext<CustomersContextType | undefined>(undefined);

type CustomerProviderProps = {
  children: ReactNode
}

const CustomersProvider: React.FC<CustomerProviderProps> = ({ children }) => {
  const [customers, setCustomers] = useState<Customers[]>([]);

  const getCustomers = async () => {
    await api.get('/customers')
      .then(response => setCustomers(response.data))
      .catch(error => console.log(error));
  }

  return (
    <CustomersContext.Provider value={{
      customers,
      getCustomers
    }}>
      {children}
    </CustomersContext.Provider>
  )
}

export default CustomersProvider;