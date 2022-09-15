import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import {
	Box,
	Button,
	Card,
	CardContent,
	IconButton,
	InputAdornment,
	OutlinedInput,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function CardLogin() {
	const [formLogin, setFormLogin] = useState({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);

	function handleShowPassword() {
		setShowPassword(!showPassword);
	}

	const handleOnChange = (prop) => (event) => {
		setFormLogin({ ...formLogin, [prop]: event.target.value });
		return;
	};

	const handleOnSubmit = (event) => {
		event.preventDefault();
		console.log(formLogin);
	};

	return (
		<Card className='card' sx={{ height: "auto", padding: "1.5rem" }}>
			<h1 className='login-title'>Acessar Sistema</h1>
			<CardContent>
				<Box
					component='form'
					onSubmit={(e) => handleOnSubmit(e)}
					className='form-login'
					autoComplete='off'
				>
					<OutlinedInput
						type='email'
						value={formLogin.email}
						onChange={handleOnChange("email")}
						placeholder='Email*'
						helperText='Digite seu email'
						required
						variant='outlined'
					/>
					<OutlinedInput
						type={showPassword ? "text" : "password"}
						value={formLogin.password}
						onChange={handleOnChange("password")}
						placeholder='Senha*'
						required
						endAdornment={
							<InputAdornment position='end'>
								<IconButton onClick={handleShowPassword}>
									{showPassword ? (
										<VisibilityOffRounded />
									) : (
										<VisibilityRounded />
									)}
								</IconButton>
							</InputAdornment>
						}
					/>
					<Button
						className='btn-login'
						onClick={(e) => handleOnSubmit(e)}
					>
						Entrar
					</Button>
					<Typography className='cadastrese'>
						Ainda não possui conta?
						<Link to='/signup' className='cadastrese-link'>
							Cadastre-se
						</Link>
					</Typography>
				</Box>
			</CardContent>
		</Card>
	);
}
