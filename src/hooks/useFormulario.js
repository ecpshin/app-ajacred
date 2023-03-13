import { useContext } from 'react';
import FormularioContext from '../contexts/FormulariosContext';

export default function useFormulario() {
  return useContext(FormularioContext);
}
