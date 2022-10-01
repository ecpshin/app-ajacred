import { Badge, Edit } from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
} from "@mui/material";
import Header from "../../components/Header";
import ShowData from "../../components/ShowData";
import useGeralContext from "../../hooks/useGeralContext";
import Content from "./Content";
import "./styles.css";
import styles from "./styles.js";
const capitalize = (str) => {
	return str.toLowerCase();
};

export default function Client() {
	const { cliente, useState } = useGeralContext();
	const [open, setOpen] = useState(false);
	const [modal, setModal] = useState({ title: "", content: "" });

	function handleOpen(id) {
		setOpen(!open);
		setModal({ title: id, content: "teste" });
	}

	const handleClose = () => {
		setOpen(!open);
	};

	return (
		<div className='container__home'>
			<Header />
			<main className='main__content'>
				<div className='info__header'>
					<Badge className='badge-icon' />
					<h1 style={{ textTransform: "capitalize" }}>
						{capitalize(cliente.nome)}
					</h1>
				</div>
				<div className='card__info'>
					<div className='card__info__content'>
						<div className='content__item_pessoais'>
							<IconButton id='pessoais' style={styles.iconEdit}>
								<Edit
									style={{
										fontSize: "1.8rem!important",
										color: "#fff",
									}}
									onClick={() => handleOpen("Pessoais")}
								/>
							</IconButton>
							<Content />
						</div>
						<div className='content__item_minicards'>
							<div className='content__item_minicard'>
								<IconButton
									id='residenciais'
									style={styles.iconEdit}
									onClick={() => handleOpen("Residenciais")}
								>
									<Edit
										style={{
											fontSize: "1.8rem!important",
											color: "#fff",
										}}
									/>
								</IconButton>
								<ShowData label='CEP' dado={"CEP 590145-380"} />
								<ShowData
									label='Endereço'
									dado={"Rua Professora Vionete, 15"}
								/>
								<ShowData
									label='Bairro - Cidade/UF'
									dado={"Passagem de Areia - Parnamirim/RN"}
								/>
							</div>
							<div className='content__item_minicard'>
								<IconButton
									id='funcionais'
									style={styles.iconEdit}
									onClick={() => handleOpen("Funcionais")}
								>
									<Edit
										style={{
											fontSize: "1.8rem!important",
											color: "#fff",
										}}
									/>
								</IconButton>
								<ShowData
									label={"Benefício(s) nr."}
									dado={
										"84999999999, 09999999999, 84999999999, 84999999999"
									}
								/>
								<ShowData
									label={"E-mails"}
									dado={
										"fulano@email.com - fulano@email2.com"
									}
								/>
								<ShowData
									label={"Tels."}
									dado={
										"(84)9 9999-9999 - (84)9 9999-9999 - (84)9 9999-9999 - (84)9 9999-9999"
									}
								/>
							</div>
							<div className='content__item_minicard'>
								<IconButton
									id='bancarias'
									style={styles.iconEdit}
									onClick={() => handleOpen("Bancário")}
								>
									<Edit
										style={{
											fontSize: "1.8rem!important",
											color: "#fff",
										}}
									/>
								</IconButton>
								<ShowData
									label={"Banco"}
									dado={"104-Caixa Econômica Federal"}
								/>
								<ShowData
									label={"Agência, conta, tipo, operação"}
									dado={"0001"}
								/>
								<ShowData
									label={"Conta, tipo, operação"}
									dado={
										"0001, 13000000000-0, Conta Corrente, 000"
									}
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Dialog open={open} onClick={handleClose}>
				<DialogTitle>Edição de Dados {`${modal.title}`}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						lorem ipsum dolor sit amet, consectetur adipiscing elit,
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Cancelar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
