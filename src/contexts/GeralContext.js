import { createContext } from "react";
import useGeralContextProvider from "../hooks/useGeralContextProvider";

const GeralContext = createContext(useGeralContextProvider);

export function GeralContextProvider(props) {
  const geralContextProvider = useGeralContextProvider();
  return (
    <GeralContext.Provider value={geralContextProvider}>
      {props.children}
    </GeralContext.Provider>
  );
}

export default GeralContext;
