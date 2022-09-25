import { Paper, Typography } from "@mui/material";
import CardHome from "../../components/CardHome";
import Header from "../../components/Header";
import useGeralContext from "../../hooks/useGeralContext";
import "./styles.css";

function Home() {
	const { token, useEffect, useNavigate, useState } = useGeralContext();
	const navigate = useNavigate();
	const [data, setData] = useState(
		new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
	);

	function handleRefreshDate() {
		setData(
			new Date().toLocaleString("pt-BR", {
				timeZone: "America/Recife",
			})
		);
	}

	useEffect(() => {
		setInterval(handleRefreshDate, 1000);
	}, [data]);

	useEffect(() => {
		!token && navigate("/");
	}, [token, navigate]);

	return (
		<div className='container__home'>
			<Header />
			<main className='main__content'>
				<Paper
					style={{
						width: "98%",
						height: "auto",
						padding: "2rem",
						marginTop: "2rem",
						display: "flex",
						alignItems: "center",
						flexDirection: "row",
						justifyContent: "space-between",
						gap: "15px",
					}}
				>
					<Typography
						variant='h1'
						component='h4'
						sx={{
							fontSize: "2.6rem",
							color: "#000",
							fontWeight: "400",
						}}
					>
						Painel de Administração
					</Typography>
					<Typography
						variant='h1'
						component='h4'
						sx={{
							fontSize: "1.6rem",
							color: "#000",
							fontWeight: "400",
						}}
					>
						{data}
					</Typography>
				</Paper>

				<Paper
					elevation={0}
					style={{
						width: "98%",
						height: "auto",
						padding: "3.5rem",
						marginTop: "2rem",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						flexDirection: "row",
						gap: "15px",
						borderRadius: "1rem",
						border: "1px solid #c3c3c3",
					}}
				>
					<div className='cards__home'>
						<CardHome
							quantidade={25}
							situacao={"Digitados"}
							estilo={"digitados"}
							action={"actionDigitados"}
						/>
						<CardHome
							quantidade={25}
							situacao={"Aprovados"}
							estilo={"aprovados"}
							action={"actionOk"}
						/>
						<CardHome
							quantidade={25}
							situacao={"Pendentes"}
							estilo={"pendentes"}
							action={"actionPendente"}
						/>
						<CardHome
							quantidade={25}
							situacao={"Reprovados"}
							estilo={"reprovados"}
							action={"actionCancel"}
						/>
						<CardHome
							quantidade={25}
							situacao={"Vencidos"}
							estilo={"vencidos"}
							action={"actionVencidos"}
						/>
					</div>
				</Paper>
			</main>
		</div>
	);
}

export default Home;
