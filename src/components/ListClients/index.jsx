import {
	FolderShared,
	PeopleAlt,
	PersonAdd,
	Search,
} from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogContent,
	Grid,
	IconButton,
	InputAdornment,
	InputBase,
	InputLabel,
	MenuItem,
	Paper,
	Select,
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
import { Box } from "@mui/system";
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
	const {
		clients,
		setClients,
		formatDate,
		token,
		useEffect,
		useState,
		useNavigate,
		setCliente,
		open,
		setOpen,
	} = useGeral();
	const [page, setPage] = useState(0);
	const [query, setQuery] = useState("");
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [locale, setLocale] = useState("ptBR");
	const theme = useTheme();
	const themeWithLocale = useMemo(
		() => createTheme(theme, locales[locale]),
		[locale, theme]
	);
	const navigate = useNavigate();

	function handleGoClient(client) {
		console.log(client);
		setCliente(client);
		navigate("/cliente");
	}

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
				<div style={{ display: "flex", columnGap: "1.5rem" }}>
					<Button
						className='btn__cadastrar'
						startIcon={<PersonAdd style={{ fontSize: "2.8rem" }} />}
						onClick={() => setOpen(!open)}
					>
						Adicionar Cliente
					</Button>
					<InputBase
						label='Pesquisar'
						size='small'
						sx={estiloSearch.inputSearch}
						value={query}
						onChange={handleChangeInput}
						endAdornment={
							<InputAdornment position='end'>
								<Search sx={estiloSearch.search} />
							</InputAdornment>
						}
						onBlur={handleGetClients}
					/>
				</div>
			</div>
			<Paper sx={{ width: "90%", overflow: "hidden" }}>
				<ThemeProvider theme={themeWithLocale}>
					<TableContainer sx={{ maxHeight: 400 }}>
						<Table stickyHeader aria-label='sticky table'>
							<TableHead>
								<TableRow>
									<TableCell style={estilos.th}>#</TableCell>
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
														<IconButton
															sx={{
																all: "unset",
															}}
															onClick={() =>
																handleGoClient(
																	client
																)
															}
														>
															<FolderShared
																style={{
																	width: "23px",
																	height: "auto",
																	color: "#011557",
																	cursor: "pointer",
																}}
															/>
														</IconButton>
													</TableCell>
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
						rowsPerPageOptions={[5, 10, 15]}
						component='div'
						count={clients.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</ThemeProvider>
			</Paper>
			<Dialog open={open} onClose={() => setOpen(!open)}>
				<DialogContent>
					<Box>
						<Grid container xs={12}>
							<Grid item xs={12}>
								<InputBase
									name='nome'
									type='text'
									fullWidth
									sx={{ border: "1px solid #ccc" }}
									placeholder='Nome'
								/>
							</Grid>
							<Grid item xs={6}>
								<InputBase
									name='cpf'
									type='text'
									fullWidth
									sx={{ border: "1px solid #ccc" }}
									placeholder='CPF'
								/>
							</Grid>
							<Grid item xs={3}>
								<InputBase
									name='rg'
									type='text'
									sx={{ border: "1px solid #ccc" }}
									placeholder='RG'
								/>
							</Grid>
							<Grid item xs={3}>
								<InputBase
									name='expedicao'
									type='date'
									sx={{ border: "1px solid #ccc" }}
									title='Data da expedição'
								/>
							</Grid>
							<Grid item xs={3}>
								<InputBase
									name='nascimento'
									type='date'
									fullWidth
									sx={{ border: "1px solid #ccc" }}
									title='Data de nascimento'
								/>
							</Grid>
							<Grid item xs={9}>
								<InputBase
									name='naturalidade'
									sx={{ border: "1px solid #ccc" }}
									fullWidth
									placeholder='Naturalidade'
								/>
							</Grid>
							<Grid item xs={6}>
								<InputBase
									name='genitora'
									type='text'
									fullWidth
									sx={{ border: "1px solid #ccc" }}
									placeholder='Nome da mãe'
								/>
							</Grid>
							<Grid item xs={6}>
								<InputBase
									name='genitor'
									type='text'
									fullWidth
									sx={{ border: "1px solid #ccc" }}
									placeholder='Nome do pai'
								/>
							</Grid>
							<InputLabel>Sexo</InputLabel>
							<Select name='sexo' label='Sexo'>
								<MenuItem value='Masculino' selected={true}>
									Masculino
								</MenuItem>
								<MenuItem value='Feminino'>Feminino</MenuItem>
							</Select>
							<InputLabel>Estado Civil</InputLabel>
							<Select name='sexo' label='Sexo'>
								<MenuItem value='Solteiro(a)' selected={true}>
									Solteiro(a)
								</MenuItem>
								<MenuItem value='Casado(a)'>Casado(a)</MenuItem>
								<MenuItem value='Divorciado(a)'>
									Divorciado(a)
								</MenuItem>
							</Select>
						</Grid>
					</Box>
				</DialogContent>
			</Dialog>
		</>
	);
}
