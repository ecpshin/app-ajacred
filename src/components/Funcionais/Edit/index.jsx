import {
	DialogActions,
	DialogContent,
	Grid,
	InputBase,
	TextareaAutosize,
} from "@mui/material";
import useGeralContext from "../../../hooks/useGeralContext";

const styles = {
	form: {
		width: "400px",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-start",
		gap: "0.5rem",
	},
	actions: {
		width: "100%",
		display: "flex",
		flexDirection: "row",
		borderTop: "1px solid #ccc",
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
		gap: "0.8rem",
	},
	inputs: {
		width: "100%",
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

export default function EditFuncionais({ funcional, setOpen }) {
	const { cliente, useState } = useGeralContext();
	const { nrbeneficio, emails, senhas, phone1, phone2, phone3, phone4 } =
		funcional;
	const [form, setForm] = useState({
		nrbeneficio,
		emails,
		senhas,
		phone1,
		phone2,
		phone3,
		phone4,
	});

	function handleChange(prop, event) {
		const { value } = event.target;
		setForm({ ...form, [prop]: value });
	}

	function handleSubmit(event) {
		event.preventDefault();
		console.log(form, cliente.id);
	}

	return (
		<div>
			<DialogContent style={styles.titles}>
				Editar informações funcionais
			</DialogContent>
			<form onSubmit={handleSubmit} style={styles.form}>
				<DialogContent style={styles.content}>
					<label style={styles.label}>Benefícios</label>
					<TextareaAutosize
						minRows={3}
						onChange={(e) => handleChange("nrbeneficio", e)}
						defaultValue={form.nrbeneficio}
					/>
					<label style={styles.label}>Emails</label>
					<TextareaAutosize
						minRows={3}
						onChange={(e) => handleChange("emails", e)}
						defaultValue={form.emails}
					/>
					<label style={styles.label}>Senhas</label>
					<TextareaAutosize
						minRows={3}
						onChange={(e) => handleChange("senhas", e)}
						defaultValue={form.senhas}
					/>
					<Grid container spacing={2}>
						<Grid item xs={6} style={styles.content}>
							<label style={styles.label}>Principal</label>
							<InputBase
								type='text'
								onChange={(e) => handleChange("phone1", e)}
								defaultValue={form.phone1}
								style={styles.inputs}
							/>
							<label style={styles.label}>Recado</label>
							<InputBase
								type='text'
								onChange={(e) => handleChange("phone2", e)}
								defaultValue={form.phone2}
								style={styles.inputs}
							/>
						</Grid>
						<Grid item xs={6} style={styles.content}>
							<label style={styles.label}>Contato 3</label>
							<InputBase
								type='text'
								onChange={(e) => handleChange("phone3", e)}
								defaultValue={form.phone3}
								style={styles.inputs}
							/>
							<label style={styles.label}>Contato 4</label>
							<InputBase
								type='text'
								onChange={(e) => handleChange("phone4", e)}
								defaultValue={form.phone4}
								style={styles.inputs}
							/>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions style={styles.actions}>
					<button
						style={styles.buttonCancel}
						onClick={() => setOpen(false)}
					>
						Cancelar
					</button>
					<button style={styles.buttonSuccess} onClick={handleSubmit}>
						Salvar
					</button>
				</DialogActions>
			</form>
		</div>
	);
}
