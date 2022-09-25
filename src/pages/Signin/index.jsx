import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Button,
	Grid,
	IconButton,
	InputAdornment,
	OutlinedInput,
	TextField,
	Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Bg from "../../assets/images/bg.png";
import Toastify from "../../components/Toastify";
import useGeralContext from "../../hooks/useGeralContext";
import api from "../../service/api";
import "./styles.css";

export default function Signin() {
	const {
		setToken,
		setUser,
		useState,
		showPassword,
		setShowPassword,
		//toast,
		token,
		//setToast,
		useNavigate,
	} = useGeralContext();
	const navigate = useNavigate();
	const [formLogin, setFormLogin] = useState({
		email: "",
		senha: "",
	});

	function handleShowPassword() {
		setShowPassword(!showPassword);
		return;
	}

	const handleOnChange = (prop) => (event) => {
		setFormLogin({ ...formLogin, [prop]: event.target.value });
		return;
	};

	const handleOnSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await api.post("/login", formLogin);
			const { token, usuario } = response.data;
			setToken(token);
			setUser(usuario);
			// setToast({
			// 	...toast,
			// 	open: true,
			// 	message: "Login efetuado com sucesso!",
			// 	reason: "success",
			// });
			toast.success("Login efetuado com sucesso!", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				fontSize: "1.5rem",
			});
			setFormLogin({ email: "", senha: "" });

			setTimeout(() => {
				navigate("/home");
			}, 3000);
		} catch (error) {
			// setToast({
			// 	...toast,
			// 	open: true,
			// 	message: error.response.data,
			// 	reason: "error",
			// });
			toast.error(error.response.data, {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				fontSize: "1.5rem",
			});
			setTimeout(() => {
				navigate("/");
			}, 3200);
		}
	};
	useEffect(() => {
		if (token) {
			navigate("/home");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className='container-signin'>
			<div
				className='panel-left'
				style={{ backgroundImage: `url(${Bg})` }}
			></div>
			<div className='panel-right'>
				<Grid
					container
					display='flex'
					flex-direction='column'
					justifyContent='center'
				>
					<Grid item xs={7}>
						<form onSubmit={handleOnSubmit} className='form_login'>
							<TextField
								type='email'
								value={formLogin.email}
								onChange={handleOnChange("email")}
								placeholder='Email*'
								helperText='Digite seu email'
								required={true}
								variant='outlined'
								sx={{ width: "100%" }}
							/>
							<OutlinedInput
								type={showPassword ? "text" : "password"}
								value={formLogin.senha}
								onChange={handleOnChange("senha")}
								placeholder='Senha*'
								required={true}
								sx={{ width: "100%" }}
								endAdornment={
									<InputAdornment position='end'>
										<IconButton
											onClick={handleShowPassword}
										>
											{showPassword ? (
												<VisibilityOff />
											) : (
												<Visibility />
											)}
										</IconButton>
									</InputAdornment>
								}
							/>
							<Button
								type='submit'
								className='btn-login'
								onClick={(e) => handleOnSubmit(e)}
							>
								Entrar
							</Button>
							<Typography
								className='cadastrese'
								alignSelf='center'
							>
								Ainda não possui conta?
								<Link to='/signup' className='cadastrese-link'>
									Cadastre-se
								</Link>
							</Typography>
						</form>
					</Grid>
				</Grid>
			</div>
			<Toastify />
			{/* <Alerts /> */}
		</div>
	);
}
