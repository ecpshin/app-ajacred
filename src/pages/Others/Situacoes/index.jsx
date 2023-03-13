import { Card, CardContent } from "@mui/material";
import Header from "../../../components/Header";
import InputData from "../../../components/Inputs";
import geralContext from "../../../hooks/useGeralContext";
import "../styles.css";

export default function Situacoes() {
	const { form, setForm } = geralContext();

	const handleOnSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className='container-home'>
			<Header />
			<main className='container-home_main'>
				<h1>Outros</h1>
				<Card sx={{ width: "400px", display: "flex" }}>
					<CardContent sx={{ width: "100%", display: "flex" }}>
						<form
							onSubmit={(e) => handleOnSubmit(e)}
							className='form'
						>
							<InputData
								type={"text"}
								name={"nome"}
								form={form}
								setForm={setForm}
								placeholder={"Nome"}
							/>
							<button type='reset' className='btn-cancel'>
								Cancelar
							</button>
							<button type='submit' className='btn-success'>
								Salvar
							</button>
						</form>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
