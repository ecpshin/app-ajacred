import { Badge, Edit } from "@mui/icons-material";
import { Breadcrumbs, Dialog, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import EditBancarias from "../../components/Bancarias/Edit";
import EditFuncionais from "../../components/Funcionais/Edit";
import Header from "../../components/Header";
import EditPessoais from "../../components/Pessoais/Edit";
import EditResidencial from "../../components/Residenciais/EditResidencial";
import ShowData from "../../components/ShowData";
import useGeralContext from "../../hooks/useGeralContext";
import Content from "./Content";
import "./styles.css";

const capitalize = (str) => {
	return str.toLowerCase();
};

export default function Client() {
	const { cliente, useState, bancarias, funcionais, residenciais } =
		useGeralContext();
	const [open, setOpen] = useState(false);
	const [modal, setModal] = useState({ title: "", id: "" });

	function handleOpen(title) {
		setOpen(!open);
		setModal({ ...modal, title: title });
	}

	const handleClose = () => {
		setOpen(!open);
	};

	return (
		<div className='container__home'>
			<Header />
			<main className='main__content'>
				<Stack
					spacing={2}
					style={{
						width: "85%",
						display: "flex",
						marginTop: "1rem",
					}}
				>
					<Breadcrumbs
						separator='>'
						aria-label='breadcrumb'
						style={{
							color: "#fa5700",
							fontSize: "2rem",
						}}
					>
						<Link
							key='1'
							underline='hover'
							color='inherit'
							to={-1}
							style={{
								color: "#fa5700",
							}}
						>
							Clientes
						</Link>
						<Link
							key='2'
							underline='hover'
							style={{
								color: "#000",
								textDecoration: "none",
							}}
							to='/cliente'
						>
							Cliente
						</Link>
					</Breadcrumbs>
				</Stack>
				<div className='info__header'>
					<Badge className='badge-icon' />
					<h1 style={{ textTransform: "capitalize" }}>
						{capitalize(cliente.nome)}
					</h1>
				</div>
				<div className='card__info'>
					<div className='card__info__content'>
						<div className='content__item_pessoais'>
							<button
								className='button-edit'
								onClick={() => handleOpen("Pessoais")}
							>
								<Edit
									style={{
										fontSize: "4rem!important",
										color: "#fff",
									}}
								/>
							</button>
							<Content />
						</div>
						<div className='content__item_minicards'>
							<div className='content__item_minicard'>
								<button
									className='button-edit'
									onClick={() => handleOpen("Residenciais")}
								>
									<Edit
										style={{
											fontSize: "2rem!important",
											color: "#fff",
										}}
									/>
								</button>
								<ShowData label='CEP' dado={residenciais.cep} />
								<ShowData
									label='Endereço - Complemento'
									dado={`${residenciais.logradouro} - ${residenciais.complemento}`}
								/>
								<ShowData
									label='Bairro - Cidade/UF'
									dado={`${residenciais.bairro} - ${residenciais.municipio}/${residenciais.uf}`}
								/>
							</div>
							<div className='content__item_minicard'>
								<button
									className='button-edit'
									onClick={() => handleOpen("Funcionais")}
								>
									<Edit
										style={{
											fontSize: "1.8rem!important",
											color: "#fff",
										}}
									/>
								</button>
								<ShowData
									label={"Benefício(s) nr."}
									dado={funcionais.nrbeneficio}
								/>
								<ShowData
									label={"E-mails"}
									dado={funcionais.emails}
								/>
								<ShowData
									label={"Tels."}
									dado={`${funcionais.phone1} - ${funcionais.phone2} - ${funcionais.phone3} - ${funcionais.phone4}`}
								/>
							</div>
							<div className='content__item_minicard'>
								<button
									className='button-edit'
									onClick={() => handleOpen("Bancários")}
								>
									<Edit
										style={{
											fontSize: "1.8rem!important",
											color: "#fff",
										}}
									/>
								</button>
								<ShowData
									label={"Banco"}
									dado={bancarias.banco}
								/>
								<ShowData
									label={"Agência, conta"}
									dado={`${bancarias.agencia} - ${bancarias.conta}`}
								/>
								<ShowData
									label={"tipo, operação"}
									dado={`${bancarias.tipo} - ${bancarias.operacao}`}
								/>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Dialog open={open} onClose={handleClose}>
				{modal.title === "Residenciais" ? (
					<EditResidencial
						residencial={residenciais}
						setOpen={setOpen}
					/>
				) : modal.title === "Pessoais" ? (
					<EditPessoais title='Pessoais' cliente={cliente} />
				) : modal.title === "Funcionais" ? (
					<EditFuncionais
						title='Funcionais'
						setOpen={setOpen}
						funcional={funcionais}
					/>
				) : (
					<EditBancarias
						title='Bancárias'
						setOpen={setOpen}
						bancaria={bancarias}
					/>
				)}
			</Dialog>
		</div>
	);
}
