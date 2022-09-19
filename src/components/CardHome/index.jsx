import {
	ArrowCircleRight,
	AssignmentTurnedIn,
	Cancel,
	KeyboardAlt,
	PendingActions,
} from "@mui/icons-material";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	IconButton,
	Typography,
} from "@mui/material";

export default function CardHome({ quantidade, situacao, estilo, action }) {
	const cardStyle = {
		aprovados: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			gap: "15px",
			color: "#0d7e29",
			backgroundColor: "#28A745",
		},
		reprovados: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			gap: "15px",
			color: "#AF0F0F",
			backgroundColor: " #fd0019",
		},
		pendentes: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			gap: "15px",
			color: "#c99628",
			backgroundColor: "#fff700",
		},
		digitados: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			gap: "15px",
			color: "#0049bf",
			backgroundColor: "#88aae2",
		},
		actionOk: {
			color: "#e5f3f5",
			backgroundColor: "#0d7e29",
		},
		actionDigitados: {
			color: "#c99628",
			backgroundColor: "#0049bf",
		},
		actionPendente: {
			color: "#c99628",
			backgroundColor: "#c99628",
		},
		actionCancel: {
			color: "#f5e5e5",
			backgroundColor: " #AF0F0F",
		},
	};
	return (
		<Card>
			<CardContent style={cardStyle[estilo]}>
				<div style={{ textAlign: "center" }}>
					<Typography variant='h3' element='h2'>
						{quantidade}
					</Typography>
					<Typography variant='h4' element='h4'>
						{situacao}
					</Typography>
				</div>
				<div className='card__icon'>
					<IconButton>
						{estilo === "reprovados" ? (
							<Cancel
								style={{
									color: "#af0f0f",
									fontSize: "55px",
								}}
							/>
						) : estilo === "aprovados" ? (
							<AssignmentTurnedIn
								style={{
									color: "green",
									fontSize: "55px",
								}}
							/>
						) : estilo === "digitados" ? (
							<KeyboardAlt
								style={{
									color: "#0049bf",
									fontSize: "55px",
								}}
							/>
						) : (
							<PendingActions
								style={{
									color: "#c99628",
									fontSize: "55px",
								}}
							/>
						)}
					</IconButton>
				</div>
			</CardContent>
			<CardActions style={cardStyle[action]}>
				<Button
					endIcon={<ArrowCircleRight />}
					style={{
						color: "white",
						fontWeight: "bold",
						fontSize: "1.4rem",
					}}
				>
					Mais informações
				</Button>
			</CardActions>
		</Card>
	);
}
