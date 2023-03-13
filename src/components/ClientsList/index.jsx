import { ContactPage } from "@mui/icons-material";
import {
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import geralContext from "../../hooks/useGeralContext";
import api from "../../service/api";
import styles from "./styles";

function toStringDate(date) {
	return new Date(date).toLocaleDateString("pt-BR");
}

export default function ClientsList() {
	const { useEffect, useState, token } = geralContext();
	const [clients, setClients] = useState([]);

	async function handleGetClients() {
		try {
			const response = await api.get("/clientes", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setClients(response.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		function init() {
			handleGetClients();
		}
		init();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<Paper style={styles.paper}>
			<TableContainer
				sx={{
					width: "100%",
					height: "100%",
					overflow: "hidden",
					overflowY: "auto",
				}}
			>
				<Table stickyHeader>
					<TableHead>
						<TableRow>
							<TableCell style={styles.th}>#</TableCell>
							<TableCell style={styles.th}>Nome</TableCell>
							<TableCell align='center' style={styles.th}>
								CPF
							</TableCell>
							<TableCell align='center' style={styles.th}>
								RG
							</TableCell>
							<TableCell align='center' style={styles.th}>
								Data de Nascimento
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{clients.map((client) => (
							<TableRow key={client.id}>
								<TableCell align='center' style={styles.td}>
									<IconButton>
										<ContactPage
											style={{
												fontSize: "26px",
												color: "#3f51b5",
											}}
										/>
									</IconButton>
								</TableCell>
								<TableCell align='left' style={styles.td}>
									{client.nome}
								</TableCell>
								<TableCell
									align='center'
									width={"100px"}
									style={styles.td}
								>
									{client.cpf}
								</TableCell>
								<TableCell align='center' style={styles.td}>
									{client.rg}
								</TableCell>
								<TableCell align='center' style={styles.td}>
									{toStringDate(client.nascimento)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}
