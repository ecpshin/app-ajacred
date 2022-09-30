import { Cancel, Save } from "@mui/icons-material";
import {
	Button,
	FormControl,
	FormLabel,
	Grid,
	MenuItem,
	Paper,
	Select,
	TextareaAutosize,
	Typography,
} from "@mui/material";
import Header from "../../components/Header";
import InputData from "../../components/InputData";
import useGeralContext from "../../hooks/useGeralContext";
import "./styles.css";

const typography = {
	textAlign: "center",
	marginBottom: "20px",
	backgroundColor: "#fa5700",
	padding: "10px",
	color: "#fff",
	borderRadius: "5px",
};

export default function Client() {
	const { formClient, setFormClient } = useGeralContext();

	const handleSelectEstadoCivil = (event) => {
		setFormClient({ ...formClient, estadoCivil: event.target.value });
	};

	const handleSelectSexo = (event) => {
		setFormClient({ ...formClient, sexo: event.target.value });
	};

	const handleChangeTextArea = (prop) => (event) => {
		setFormClient({ ...formClient, [prop]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(formClient);
	};

	return (
		<div className='container-home'>
			<Header />
			<main className='container-home_main'>
				<Paper elevation={3} className='paper'>
					<form
						onSubmit={handleSubmit}
						style={{
							display: "flex",
							flexDirection: "column",
							rowGap: "20px",
						}}
					>
						<Grid
							container
							columnSpacing={1}
							style={{ rowGap: "1rem" }}
						>
							<Grid item xs={12}>
								<Typography
									variant='h4'
									component='h2'
									style={typography}
								>
									Dados Pessoais
								</Typography>
							</Grid>
							<Grid item xs={4}>
								<InputData
									id={"nome"}
									name={"nome"}
									label={"Nome"}
									type={"text"}
								/>
							</Grid>
							<Grid item xs={4}>
								<InputData
									id={"cpf"}
									name={"cpf"}
									label={"CPF"}
									type={"text"}
								/>
							</Grid>
							<Grid item xs={4}>
								<InputData
									id={"nascimento"}
									name={"nascimento"}
									label={"Data de Nascimento"}
									type={"date"}
								/>
							</Grid>
							<Grid item xs={4}>
								<InputData
									id={"rg"}
									name={"rg"}
									label={"RG"}
									type={"text"}
								/>
							</Grid>
							<Grid item xs={4}>
								<InputData
									id={"expedicao"}
									name='expedicao'
									label={"Data de Expedição"}
									type={"date"}
								/>
							</Grid>
							<Grid item xs={4}>
								<InputData
									id={"naturalidade"}
									name={"naturalidade"}
									label={"Naturalidade"}
									type={"text"}
								/>
							</Grid>
							<Grid item xs={6}>
								<InputData
									id={"genitora"}
									labelId={"genitora"}
									name={"genitora"}
									label={"Nome da mãe"}
									type='text'
								/>
							</Grid>
							<Grid item xs={6}>
								<InputData
									id={"genitor"}
									name={"genitor"}
									size='small'
									label={"Nome do pai"}
									type={"text"}
								/>
							</Grid>
							<Grid item xs={6}>
								<FormControl fullWidth>
									<FormLabel
										id='sexo-cliente'
										sx={{
											color: "#000",
											fontSize: "1.2rem",
											fontWeight: 600,
										}}
									>
										Sexo
									</FormLabel>
									<Select
										size='small'
										value={formClient.sexo}
										fullWidth
										sx={{
											color: "#000",
											fontSize: "1.2rem",
											fontWeight: 600,
										}}
										onChange={handleSelectSexo}
									>
										<MenuItem value='Masculino'>
											Masculino
										</MenuItem>
										<MenuItem value='Feminino'>
											Feminino
										</MenuItem>
										<MenuItem value='Não binário'>
											Não binário
										</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={6}>
								<FormControl fullWidth>
									<FormLabel
										id='estado-civil'
										sx={{
											color: "#000",
											fontSize: "1.2rem",
											fontWeight: 600,
										}}
									>
										Estado Civil
									</FormLabel>
									<Select
										value={formClient.estadoCivil}
										size='small'
										fullWidth
										sx={{
											color: "#000",
											fontSize: "1.3rem",
											fontWeight: 600,
										}}
										onChange={(e) =>
											handleSelectEstadoCivil(e)
										}
									>
										<MenuItem value='Solteiro(a)' selected>
											Solteiro(a)
										</MenuItem>
										<MenuItem value='Casado(a)'>
											Casado(a)
										</MenuItem>
										<MenuItem value='Divorciado(a)'>
											Divorciado(a)
										</MenuItem>
										<MenuItem value='Viúvo(a)'>
											Viúvo(a)
										</MenuItem>
										<MenuItem value='União estável'>
											União estável
										</MenuItem>
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<FormControl fullWidth>
									<FormLabel
										sx={{
											width: "100%",
											textAlign: "left",
											fontSize: "1.2rem",
											fontWeight: 600,
											color: "#000",
											m: 0.5,
										}}
									>
										Observações
									</FormLabel>
									<TextareaAutosize
										id='observacoes'
										name='observacoes'
										value={formClient.observacoes}
										minRows={3}
										style={{
											border: "1px solid #c3c3c3",
											fontSize: "1.3rem",
											padding: "1rem",
										}}
										onChange={handleChangeTextArea(
											"observacoes"
										)}
									/>
								</FormControl>
							</Grid>
						</Grid>
						<Grid
							container
							columnSpacing={1}
							style={{ rowGap: "1rem" }}
						>
							<Grid item xs={12}>
								<Typography
									variant='h4'
									component='h2'
									style={typography}
								>
									Informações Residenciais
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<InputData
									id={"cep"}
									name={"cep"}
									label={"CEP"}
									type={"text"}
								/>
							</Grid>
							<Grid item xs={7}>
								<InputData
									id={"logradouro"}
									name={"logradouro"}
									label={"Endereço | nº"}
									type={"text"}
								/>
							</Grid>
							<Grid item xs={3}>
								<InputData
									id={"complemento"}
									name={"complemento"}
									label={"Complemento"}
									type={"text"}
								/>
							</Grid>
							<Grid item xs={5}>
								<InputData
									id={"bairro"}
									name={"bairro"}
									label={"Bairro"}
									type={"text"}
								/>
							</Grid>
							<Grid item xs={5}>
								<InputData
									id={"cidade"}
									name={"localidade"}
									label={"Cidade"}
									type={"text"}
								/>
							</Grid>
							<Grid item xs={2}>
								<InputData
									id={"estado"}
									name={"uf"}
									label={"Estado"}
									type={"text"}
								/>
							</Grid>
						</Grid>
						<Grid
							container
							columnSpacing={1}
							style={{ rowGap: "1rem" }}
						>
							<Grid item xs={12}>
								<Typography
									variant='h4'
									component='h2'
									style={typography}
								>
									Informações de Funcionais
								</Typography>
							</Grid>
							<Grid item xs={4}>
								<FormControl fullWidth>
									<FormLabel
										sx={{
											width: "100%",
											textAlign: "left",
											fontSize: "1.2rem",
											fontWeight: 600,
											color: "#000",
											margin: 0.5,
										}}
									>
										Matrícula | Nº do Benefício
									</FormLabel>
									<TextareaAutosize
										id='beneficios'
										name='beneficios'
										value={formClient.beneficios}
										onChange={handleChangeTextArea(
											"beneficios"
										)}
										minRows={3}
										aria-label='Matrícula ou Nº do Benefício'
										style={{
											border: "1px solid #c3c3c3",
											fontSize: "1.3rem",
											padding: "1rem",
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={4}>
								<FormControl fullWidth>
									<FormLabel
										sx={{
											width: "100%",
											textAlign: "left",
											fontSize: "1.2rem",
											fontWeight: 600,
											color: "#000",
											m: 0.5,
										}}
									>
										E-mails
									</FormLabel>
									<TextareaAutosize
										id='emails'
										name='emails'
										value={formClient.emails}
										onChange={handleChangeTextArea(
											"emails"
										)}
										minRows={3}
										aria-label='E-mails do cliente'
										style={{
											border: "1px solid #c3c3c3",
											fontSize: "1.3rem",
											padding: "1rem",
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={4}>
								<FormControl fullWidth>
									<FormLabel
										sx={{
											width: "100%",
											textAlign: "left",
											fontSize: "1.2rem",
											fontWeight: 600,
											color: "#000",
											m: 0.5,
										}}
									>
										Senhas
									</FormLabel>
									<TextareaAutosize
										id='senhas'
										name='senhas'
										value={formClient.senhas}
										onChange={handleChangeTextArea(
											"senhas"
										)}
										minRows={3}
										aria-label='Senhas de acesso do cliente'
										style={{
											border: "1px solid #c3c3c3",
											fontSize: "1.3rem",
											padding: "1rem",
										}}
									/>
								</FormControl>
							</Grid>
							<Grid item xs={3}>
								<InputData
									id={"phone1"}
									name={"phone1"}
									label={"Telefone (Principal)"}
									type={"tel"}
								/>
							</Grid>
							<Grid item xs={3}>
								<InputData
									id={"phone2"}
									name={"phone2"}
									label={"Telefone (Secundário)"}
									type={"tel"}
								/>
							</Grid>
							<Grid item xs={3}>
								<InputData
									id={"phone3"}
									name={"phone3"}
									label={"Telefone 3"}
									type='tel'
								/>
							</Grid>
							<Grid item xs={3}>
								<InputData
									id={"phone4"}
									name={"phone4"}
									label={"Telefone 4"}
									type='tel'
								/>
							</Grid>
						</Grid>
						<Grid
							container
							columnSpacing={1}
							style={{ rowGap: "1rem" }}
						>
							<Grid item xs={12}>
								<Typography
									variant='h4'
									component='h2'
									style={typography}
								>
									Informações de Bancárias
								</Typography>
							</Grid>
							<Grid item xs={2}>
								<InputData
									id={"accode"}
									name={"accode"}
									label={"Código"}
									type='text'
								/>
							</Grid>
							<Grid item xs={6}>
								<InputData
									id={"accbanco"}
									name={"accbanco"}
									label={"Banco"}
									type='text'
								/>
							</Grid>
							<Grid item xs={2}>
								<InputData
									id={"nragencia"}
									name={"nragencia"}
									label={"Agência"}
									type='text'
								/>
							</Grid>
							<Grid item xs={2}>
								<InputData
									id={"nrconta"}
									name={"nrconta"}
									label={"Conta"}
									type='text'
								/>
							</Grid>
							<Grid item xs={3}>
								<InputData
									id={"acctipo"}
									name={"acctipo"}
									label={"Tipo Conta"}
									type='text'
								/>
							</Grid>
							<Grid item xs={3}>
								<InputData
									id={"accoperacao"}
									name={"accoperacao"}
									label={"Operação"}
									type='text'
								/>
							</Grid>
						</Grid>
						<Grid
							container
							columnSpacing={1}
							style={{ rowGap: "1rem" }}
						>
							<Grid
								item
								xs={12}
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "center",
									gap: "3rem",
									padding: "2rem",
									border: "1px solid #c3c3c3",
								}}
							>
								<Button
									startIcon={<Cancel />}
									style={{
										width: "150px",
										backgroundColor: "red",
										color: "#fff",
									}}
								>
									Cancelar
								</Button>
								<Button
									startIcon={<Save />}
									style={{
										width: "150px",
										backgroundColor: "green",
										color: "#fff",
									}}
									onClick={handleSubmit}
								>
									Salvar
								</Button>
							</Grid>
						</Grid>
					</form>
				</Paper>
			</main>
		</div>
	);
}
