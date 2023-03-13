import {
	ArrowCircleRight,
	AssignmentTurnedIn,
	Cancel,
	EventBusy,
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
import cardStyle from "./styles";
import "./styles.css";

export default function CardHome({ quantidade, situacao, estilo, action }) {
	function handleRenderStyle(string) {
		return `card-status ${string}`;
	}

	return (
		<Card>
			<CardContent className={handleRenderStyle(estilo)}>
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
						) : estilo === "pendentes" ? (
							<PendingActions
								style={{
									color: "#c99628",
									fontSize: "55px",
								}}
							/>
						) : (
							<EventBusy
								style={{
									color: "#696969",
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
