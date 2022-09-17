import { createContext } from "react";
import useGeralContextProvider from "../hooks/useGeralContextProvider";

const GeralContext = createContext(useGeralContextProvider);

export function GeralContextProvider(props) {
	const geralProvider = useGeralContextProvider();
	return (
		<GeralContext.Provider value={geralProvider}>
			{props.children}
		</GeralContext.Provider>
	);
}

export default GeralContext;
