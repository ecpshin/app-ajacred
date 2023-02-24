import { InputBase } from "@mui/material";
import { useEffect } from "react";
import useGeralContext from "../../hooks/useGeralContext";

export default function Inputs({ type, name, defaultValue, placeholder }) {
	const { form, setForm } = useGeralContext();

	const initForm = () => {
		setForm({
			nome: "",
			cpf: "",
		});
	};

	const handleChange = (prop) => (event) => {
		event.preventDefault();
		setForm({ ...form, [prop]: event.target.value });
		console.log(form);
		return;
	};

	useEffect(() => {
		initForm();
		return;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<InputBase
			name={name}
			type={type}
			onChange={handleChange(name)}
			defaultValue={form[name]}
			placeholder={placeholder}
			style={{
				border: "1px solid #c3c3c3",
				padding: "8px",
				borderRadius: "5px",
			}}
		/>
	);
}
