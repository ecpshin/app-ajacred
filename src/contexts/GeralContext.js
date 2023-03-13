import { createContext } from 'react';
import useGeralProvider from '../hooks/useGeralProvider';

const GeralContext = createContext(useGeralProvider);

export function GeralContextProvider(props) {
  const geralProvider = useGeralProvider();
  return (
    <GeralContext.Provider value={geralProvider}>
      {props.children}
    </GeralContext.Provider>
  );
}

export default GeralContext;
