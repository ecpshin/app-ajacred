import { useContext } from "react";
import GeralContext from "../contexts/GeralContext";

export default function useGeralContext() {
	return useContext(GeralContext);
}
