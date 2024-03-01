import './App.css'
import CustomersProvider from './contexts/customers';
import RoutesApp from './routes';

const App = () => {
  return (
    <>
      <CustomersProvider>
        <RoutesApp />
      </CustomersProvider>
    </>
  );
}

export default App;
