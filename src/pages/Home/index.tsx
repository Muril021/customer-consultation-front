import { useContext, useEffect, useState } from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link } from "react-router-dom";
import { CustomersContext } from "../../contexts/customers";

const Home = () => {
  const [search, setSearch] = useState('');

  const { customers, getCustomers } = useContext(CustomersContext)!;

  useEffect(() => {
    getCustomers();
  }, [])

  return (
    <>
      <h1>Lista de clientes</h1>
      <h3>Pesquisar Cliente</h3>
      <input
        type="text"
        placeholder="Digite o nome do cliente"
        value={search}
        onChange={event => setSearch(event.target.value)}
      />
      <hr/>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Data Cadastro</th>
            <th>Contato</th>
            <th>Ativo</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {customers
            .filter(customer => 
              customer.name.toLowerCase().includes(search.toLowerCase())
            )  
            .map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{new Date(customer.date).toLocaleDateString()}</td>
                <td>
                  {customer.tel.map((uTel, index) => (
                    <div key={index}>{uTel}</div>
                  ))}
                </td>
                <td>
                  {customer.is_active === true ?
                    <CheckCircleOutlineIcon style={{
                      fontSize: 'small',
                      color: 'green'
                      }}
                    /> :
                    <HighlightOffIcon style={{
                      fontSize: 'small',
                      color: 'red'
                      }}
                    />
                  }
                </td>
                <td>
                <Link to={``} style={{color: 'blue'}}>
                  <ModeEditOutlineOutlinedIcon />
                </Link>
                <Link to={``} style={{color: 'red'}}>
                  <DeleteOutlineOutlinedIcon />
                </Link>
              </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  );
}

export default Home;