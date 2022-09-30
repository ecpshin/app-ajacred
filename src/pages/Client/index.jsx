import { Badge, PersonAddAlt } from "@mui/icons-material";
import { Button } from "@mui/material";
import Header from "../../components/Header";
import ShowData from "../../components/ShowData";
import useGeralContext from "../../hooks/useGeralContext";
import "./styles.css";

export default function Client() {
	const { cliente, formatDate } = useGeralContext();

	return (
		<div className='container__home'>
			<Header />
			<main className='main__content'>
				<div className='info__header'>
					<Badge className='badge-icon' />
					<h1>{cliente.nome}</h1>
					<Button
						className='botao'
						startIcon={<PersonAddAlt style={{ color: "#fff" }} />}
					>
						Editar
					</Button>
				</div>
				<div className='card__info'>
					<div className='card__info__content'>
						<ShowData label='CPF' dado={cliente.cpf} />
						<ShowData
							label='Data nascimento'
							dado={formatDate(cliente.nascimento)}
						/>
						<ShowData label='RG' dado={cliente.rg} />
						<ShowData
							label='Expedição'
							dado={formatDate(cliente.expedicao)}
						/>
						<ShowData
							label='Naturalidade'
							dado={cliente.naturalidade}
						/>
						<ShowData label='Nome da mãe' dado={cliente.sexo} />
						<ShowData
							label='Nome do pai'
							dado={cliente.estado_civil}
						/>
						<ShowData label='Nome da mãe' dado={cliente.genitora} />
						<ShowData label='Nome do pai' dado={cliente.genitor} />
						<ShowData
							label='Endereço'
							dado={
								"Rua Professora Vionete, 15 - Passagem de Areia - Parnamirim - RN - CEP 590145-380"
							}
						/>
					</div>
				</div>
			</main>
		</div>
	);
}
