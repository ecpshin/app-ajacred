import { PeopleAlt, Search } from "@mui/icons-material";
import {
	InputAdornment,
	InputBase,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import * as locales from "@mui/material/locale";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { useMemo } from "react";
import useGeral from "../../hooks/useGeralContext";
import api from "../../service/api";
import estilos from "./styles";
import "./styles.css";

const estiloSearch = {
	search: { fontSize: "2.45rem", color: "#ff3401" },
	inputSearch: {
		width: "400px",
		height: "auto",
		borderRadius: "5px",
		padding: "8px 10px",
		marginBottom: "3px",
		border: "1px solid hsl(12, 100%, 80%)",
	},
};

export default function ListClients() {
	const { formatDate, token, useEffect, useState, clients, setClients } =
		useGeral();
	const [page, setPage] = useState(0);
	const [query, setQuery] = useState("");
	const [rowsPerPage, setRowsPerPage] = useState(7);
	const [locale, setLocale] = useState("ptBR");
	const theme = useTheme();
	const themeWithLocale = useMemo(
		() => createTheme(theme, locales[locale]),
		[locale, theme]
	);

	async function handleGetClients() {
		try {
			const response = await api.get("/clientes", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setClients(response.data);
		} catch (error) {
			console.log(error.response.data);
		}
	}

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	function handleChangeInput(e) {
		setQuery(e.target.value);
		console.log(query);
	}

	function handleSearch() {
		const localClientsList = [...clients];
		// eslint-disable-next-line array-callback-return
		const search = localClientsList.filter((client) => {
			if (query === "") {
				return client;
			} else if (
				client.nome.toLowerCase().includes(query.toLowerCase()) ||
				client.cpf.includes(query)
			) {
				return client;
			}
		});

		return search.length > 0 ? search : false;
	}

	useEffect(() => {
		function init() {
			handleGetClients();
		}
		init();
		setLocale("ptBR");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className='container-home_top'>
				<div
					style={{
						width: "auto",
						display: "flex",
						flexDirection: "row",
						alignItems: "flex-end",
						justifyContent: "flex-start",
						columnGap: "10px",
					}}
				>
					<PeopleAlt sx={{ fontSize: "3.8rem" }} />
					<Typography
						variant='h4'
						sx={{ fontSize: "2.4rem", fontWeight: 500 }}
					>
						Clientes Cadastrados
					</Typography>
				</div>
				<InputBase
					label='Pesquisar'
					size='small'
					sx={estiloSearch.inputSearch}
					value={query}
					onChange={handleChangeInput}
					endAdornment={
						<InputAdornment edge='end'>
							<Search sx={estiloSearch.search} />
						</InputAdornment>
					}
					onBlur={handleGetClients}
				/>
			</div>
			<Paper sx={{ width: "90%", overflow: "hidden" }}>
				<ThemeProvider theme={themeWithLocale}>
					<TableContainer sx={{ maxHeight: 440 }}>
						<Table stickyHeader aria-label='sticky table'>
							<TableHead>
								<TableRow>
									<TableCell style={estilos.th}>
										Nome
									</TableCell>
									<TableCell style={estilos.th}>
										CPF
									</TableCell>
									<TableCell style={estilos.th}>RG</TableCell>
									<TableCell style={estilos.th}>
										Data de Nascimento
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{handleSearch() &&
									handleSearch()
										.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
										)
										.map((client) => {
											return (
												<TableRow key={client.id}>
													<TableCell
														style={estilos.td}
													>
														{client.nome}
													</TableCell>
													<TableCell
														style={estilos.td}
													>
														{client.cpf}
													</TableCell>
													<TableCell
														style={estilos.td}
													>
														{client.rg}
													</TableCell>
													<TableCell
														style={estilos.td}
													>
														{formatDate(
															client.nascimento
														)}
													</TableCell>
												</TableRow>
											);
										})}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						className='MuiSvgIcon-root1'
						rowsPerPageOptions={[7, 10, 15]}
						component='div'
						count={clients.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</ThemeProvider>
			</Paper>
		</>
	);
}
