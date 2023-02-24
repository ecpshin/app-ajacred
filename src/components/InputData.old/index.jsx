import { FormControl, FormLabel, TextField } from "@mui/material";
import useGeralContext from "../../hooks/useGeralContext";
import "./styles.css";

export default function InputData({ id, name, label, type }) {
	const { formClient, handleChangeCliente } = useGeralContext();

	return (
		<FormControl fullWidth>
			<FormLabel
				sx={{
					width: "100%",
					textAlign: "left",
					fontSize: "1.2rem",
					fontWeight: 600,
					color: "#000",
					m: 0.5,
				}}
			>
				{label}
			</FormLabel>
			<TextField
				id={id}
				name={name}
				type={type}
				value={formClient[name]}
				onChange={handleChangeCliente(name)}
				variant='outlined'
				size='small'
				title={`Digite ${label}`}
				fullWidth
			/>
		</FormControl>
	);
}
