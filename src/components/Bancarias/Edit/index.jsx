import { Search } from "@mui/icons-material";
import {
	Button,
	DialogActions,
	DialogContent,
	DialogTitle,
	InputBase,
	SvgIcon,
} from "@mui/material";
import useGeralContext from "../../../hooks/useGeralContext";
import api from "../../../service/api";

const styles = {
	form: {
		width: "400px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-start",
		gap: "1rem",
	},
	actions: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		borderTop: "1px solid #ccc",
		padding: "1rem 2rem",
	},
	buttonCancel: {
		width: "75px",
		height: "35px",
		border: "none",
		backgroundColor: "grey",
		color: "#fff",
		borderRadius: "5px",
	},
	buttonSuccess: {
		width: "75px",
		height: "35px",
		border: "none",
		backgroundColor: "#fa5700",
		color: "#fff",
		borderRadius: "5px",
	},
	content: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		gap: "1rem",
	},
	inputs: {
		width: "100%",
		height: "35px",
		padding: "0 1rem",
		borderRadius: "5px",
		border: "1px solid #ccc",
	},
	inputSearch: {
		width: "30%",
		height: "35px",
		padding: "0 1rem",
		borderRadius: "5px",
		border: "1px solid #ccc",
	},
	label: {
		color: "#fa5700",
	},
	titles: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: "100%",
		color: "#fa5700",
		fontSize: "1.8rem",
		fontWeight: "600",
		borderBottom: "1px solid #ccc",
		padding: "10px",
	},
};

export default function EditBancarias({ title, setOpen, bancaria }) {
	const {
		cliente,
		token,
		setBancarias,
		removeBancarias,
		useNavigate,
		useState,
	} = useGeralContext();
	const [form, setForm] = useState({
		id: bancaria.id,
		codigo: "",
		banco: bancaria.banco,
		agencia: bancaria.agencia,
		conta: bancaria.conta,
		tipo: bancaria.tipo,
		operacao: bancaria.operacao,
		cliente_id: cliente.id,
	});

	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();
		console.log(cliente.id);
	}

	const handleChange = (name) => (event) => {
		event.preventDefault();
		setForm({ ...form, [name]: event.target.value });
	};

	const handleSearch = async () => {
		try {
			const response = await api.get(`/banco/${form.codigo}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const { codigo, nome } = response.data;
			form.banco = `${codigo}-${nome}`;
			removeBancarias();
			setBancarias({ ...form });
			navigate("/cliente");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<DialogTitle id='form-dialog-title' style={styles.titles}>
				Atualizar Informações {title}
			</DialogTitle>
			<form onSubmit={handleSubmit} style={styles.form}>
				<DialogContent style={styles.content}>
					<label htmlFor='banco' style={styles.label}>
						Banco
					</label>
					<div style={{ display: "flex", gap: "1rem" }}>
						<InputBase
							id='codigo'
							type='text'
							value={form.codigo}
							onChange={handleChange("codigo")}
							style={styles.inputSearch}
							size='small'
							endAdornment={
								<SvgIcon
									component={Search}
									onClick={handleSearch}
									style={{ cursor: "pointer" }}
								/>
							}
						/>
						<InputBase
							id='banco'
							type='text'
							value={form.banco}
							onChange={handleChange("banco")}
							style={styles.inputs}
						/>
					</div>
					<label htmlFor='agencia' style={styles.label}>
						Agência
					</label>
					<InputBase
						id='agencia'
						type='text'
						value={form.agencia}
						onChange={handleChange("agencia")}
						style={styles.inputs}
					/>
					<label htmlFor='conta' style={styles.label}>
						Conta
					</label>
					<InputBase
						id='conta'
						type='text'
						value={form.conta}
						onChange={handleChange("conta")}
						style={styles.inputs}
					/>
					<label htmlFor='tipo' style={styles.label}>
						Tipo
					</label>
					<InputBase
						id='tipo'
						type='text'
						value={form.tipo}
						onChange={handleChange("tipo")}
						style={styles.inputs}
					/>
					<label htmlFor='operacao' style={styles.label}>
						Operação
					</label>
					<InputBase
						id='operacao'
						type='text'
						value={form.operacao}
						onChange={handleChange("operacao")}
						style={styles.inputs}
					/>
				</DialogContent>
				<DialogActions style={styles.actions}>
					<Button
						onClick={() => setOpen(false)}
						style={styles.buttonCancel}
					>
						Cancelar
					</Button>
					<Button onClick={handleSubmit} style={styles.buttonSuccess}>
						Confirmar
					</Button>
				</DialogActions>
			</form>
		</div>
	);
}
