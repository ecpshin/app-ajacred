import { NavLink } from "react-router-dom";
import useGeralContext from "../../hooks/useGeralContext";
import "./styles.css";

export default function Header() {
	const {
		LogoApp,
		Logout,
		IconButton,
		removeToken,
		removeUser,
		useNavigate,
		user,
	} = useGeralContext();
	const navigate = useNavigate();

	function handleExit() {
		removeToken();
		removeUser();
		navigate("/");
	}

	return (
		<header className='header'>
			<div className='header__content'>
				<img src={LogoApp} className='header__logo' alt='Keep' />
				<nav className='header__navbar'>
					<NavLink to={"/home"}>Home</NavLink>
					<NavLink to={"/clientes"}>Clientes</NavLink>
					<NavLink to={"/contratos"}>Contratos</NavLink>
					<NavLink to={"/outros"}>Outros</NavLink>
				</nav>
				<div
					className='header__infos'
					style={{
						width: "auto",
						height: "100%",
						display: "flex",
						alignItems: "center",
						marginRight: "1.6rem",
					}}
				>
					<span
						style={{
							fontSize: "1.6rem",
							color: "#fff",
							fontWeight: 500,
							marginRight: "1.6rem",
						}}
					>
						Bem-vindo(a), {user.nome}
					</span>
					<IconButton onClick={handleExit}>
						<Logout
							sx={{
								color: "#fff",
								width: 30,
								height: "auto",
							}}
						/>
					</IconButton>
				</div>
			</div>
		</header>
	);
}
