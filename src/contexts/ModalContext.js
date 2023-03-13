import { createContext } from 'react';
import useModalContextProvider from '../hooks/useModalContextProvider';

const ModalContext = createContext(useModalContextProvider);

export function ModalContextProvider(props) {
  const provider = useModalContextProvider();
  return (
    <ModalContext.Provider value={provider}>
      {props.children}
    </ModalContext.Provider>
  );
}

export default ModalContext;
