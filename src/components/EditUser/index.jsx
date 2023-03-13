import {
	Button,
	Card,
	CardContent,
	TextField,
	Typography,
} from "@mui/material";
import Logo from "../../assets/images/logo_300.png";
import useGeralContext from "../../hooks/useGeralContext";
import api from "../../service/api";
import Alerts from "../Alerts";

export default function EditUser({ title }) {
	const {
		formAddUser,
		setFormAddUser,
		setToast,
		setUser,
		toast,
		token,
		user,
	} = useGeralContext();

	async function handleSubmitUser(event) {
		event.preventDefault();
		const { nome, email, senha, confirmaSenha } = formAddUser;

		const userData = {};

		if (nome && nome !== user.nome) {
			userData.nome = nome;
		}

		if (email && email !== user.email) {
			userData.email = email;
		}

		if (senha && senha !== confirmaSenha) {
			setToast({
				...toast,
				open: true,
				message: "Senhas não conferem!",
				reason: "error",
			});
			return;
		} else if (senha && senha === confirmaSenha) {
			userData.senha = senha;
		}

		try {
			const response = await api.patch(
				"http://localhost:3334/usuarios",
				userData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setFormAddUser({
				nome: "",
				email: "",
				senha: "",
				confirmaSenha: "",
			});

			setToast({
				...toast,
				open: true,
				message: response.data,
				reason: "success",
			});

			await handleGetUser();
			return;
		} catch (error) {
			console.log(error.message);
		}
	}

	async function handleGetUser() {
		try {
			const response = await api.get(
				"http://localhost:3334/usuarios/profile",
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setUser(response.data);
		} catch (error) {
			console.log(error.message);
		}
	}

	const handleChange = (prop) => (event) => {
		setFormAddUser({ ...formAddUser, [prop]: event.target.value });
	};

	return (
		<>
			<Card sx={{ maxWidth: "500px" }}>
				<CardContent
					sx={{
						width: "100%",
						height: "auto",
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<form
						className='form-add-user'
						onSubmit={(e) => handleSubmitUser(e)}
					>
						<img
							src={Logo}
							width='90px'
							alt=''
							style={{ alignSelf: "center" }}
						/>
						<Typography
							component='h1'
							variant='h4'
							textAlign='center'
							style={{ color: "hsla(10, 97%, 58%, 1)" }}
						>
							{title}
						</Typography>
						<TextField
							label='Nome'
							type='text'
							onChange={handleChange("nome")}
							defaultValue={user.nome}
							required
							variant='outlined'
						/>
						<TextField
							label='E-mail'
							type='email'
							onChange={handleChange("email")}
							defaultValue={user.email}
							required
							variant='outlined'
							sx={{ height: "40xp" }}
						/>
						<TextField
							label='senha'
							type='password'
							value={formAddUser.senha}
							onChange={handleChange("senha")}
							required
						/>
						<TextField
							type='password'
							label='Confirme a senha'
							value={formAddUser.confirmaSenha}
							onChange={handleChange("confirmaSenha")}
							required
						/>
						<Button
							type='submit'
							variant='contained'
							onClick={(e) => handleSubmitUser(e)}
							className='button-add-user'
						>
							Confirmar
						</Button>
					</form>
				</CardContent>
			</Card>
			{toast.open && <Alerts />}
		</>
	);
}
