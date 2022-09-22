import Header from "../../components/Header";
import ModalClient from "../../components/ModalClient";
import "./styles.css";

function Clients() {
	return (
		<div className='container-home'>
			<Header />
			<main className='container-home_main'>
				<h1>Clientes</h1>
			</main>
			<ModalClient />
		</div>
	);
}

export default Clients;
