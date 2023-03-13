import { createContext } from 'react';
import useFormularioProvider from '../hooks/useFormularioProvider';

const FormularioContext = createContext(useFormularioProvider);

export function FormularioContextProvider(props) {
  const formularioProvider = useFormularioProvider();
  return (
    <FormularioContext.Provider value={formularioProvider}>
      {props.children}
    </FormularioContext.Provider>
  );
}

export default FormularioContext;
