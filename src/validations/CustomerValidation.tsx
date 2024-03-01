import { array, object, string } from "yup";

const schema = object({
  name:
    string()
    .min(3, 'O campo nome deve conter, no mínimo, 3 caracteres.')
    .max(255, 'O campo nome deve conter, no máximo, 255 caracteres.')
    .required(),
  type:
    string()
    .oneOf(['Pessoa Física', 'Pessoa Jurídica'], 'Selecione um tipo válido.')
    .required('Selecione um tipo válido.'),
  doc:
    string().when('type', ([type], schema) => {
      return type ?
        schema.length(11, 'O CPF deve conter 11 caracteres.') :
        schema.length(14, 'O CNPJ deve conter 14 caracteres.');
    })
    .required('O campo de documento é obrigatório.'),
  tel:
    array()
    .test('phones', 'O telefone deve possuir 11 dígitos.', (phones) => {
      if (Array.isArray(phones)) {
        return phones.some(phone =>
          typeof phone === 'string' && phone.length === 11
        );
      }

      return false;
    })
});

export default schema;