import { ChangeEvent, useContext, useEffect, useState } from "react";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import schema from "../../validations/CustomerValidation";
import { CustomersContext } from "../../contexts/customers";

const Register = () => {
  const navigate = useNavigate();

  const { customers, getCustomers } = useContext(CustomersContext)!;

  const currentDate = new Date().toISOString().split('T')[0];

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [doc, setDoc] = useState('');
  const [phones, setPhones] = useState(['']);
  const [phone, setPhone] = useState('');

  useEffect(() => {
    getCustomers();
  }, [])

  const addPhoneInput = () => {
    setPhones([...phones, phone]);
    setPhone('');
  }

  const removePhone = (index: any) => {
    const newPhones = [...phones];
    newPhones.splice(index, 1);
    setPhones(newPhones);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const checkCPF = customers.some(customer =>
        customer.type === 'Pessoa Física' && customer.doc === doc
      );
      const checkCNPJ = customers.some(customer =>
        customer.type === 'Pessoa Jurídica' && customer.doc === doc
      );
      
      if (checkCPF || checkCNPJ) {
        console.log('Este documento já existe.');
        return;
      }

      await schema.validate({
        name: name,
        type: type,
        doc: doc,
        tel: phones
      });

      await api.post('/customers', {
        name: name,
        type: type,
        doc: doc,
        date: currentDate,
        tel: phones
      })
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.log(error);        
        })

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome Completo</label><br/>
      <input
        type='text'
        placeholder='Digite seu nome'
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <br/>
      <label>Tipo</label><br/>
      <select
        value={type}
        onChange={event => setType(event.target.value)}
      >
        <option value=''>Selecione...</option>
        <option value='Pessoa Física'>Pessoa Física</option>
        <option value='Pessoa Jurídica'>Pessoa Jurídica</option>
      </select>
      <br/>
      {type === 'Pessoa Física' && (
        <>
          <label>CPF (sem caracteres especiais)</label><br/>
          <input
            type='text'
            placeholder='Digite seu CPF'
            value={doc}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setDoc(event.target.value)
            }
          />
        </>
      )}
      {type === 'Pessoa Jurídica' && (
        <>
          <label>CNPJ (sem caracteres especiais)</label><br/>
          <input
            type='text'
            placeholder='Digite seu CNPJ'
            value={doc}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setDoc(event.target.value)
            }
          />
        </>
      )}
      <br/>
      <label>Data de Cadastro</label><br/>
      <input
        type='date'
        value={currentDate}
        readOnly
      />
      <br/>
      <label>Telefone (sem caracteres especiais)</label><br/>
      {phones.map((phone, index) => (
        <div key={index}>
          <input
            type='tel'
            placeholder='Digite seu telefone'
            value={phones[index]}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const newPhones = [...phones];
              newPhones[index] = event.target.value;
              setPhones(newPhones);
            }}
          />
          <button onClick={() => {removePhone(index)}}>Excluir</button>
        </div>
      ))}
      <button onClick={addPhoneInput}>Add tel</button>
      <input type='submit' value='Cadastrar' />
    </form>
  );
}

export default Register;