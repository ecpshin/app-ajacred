import Header from "../../components/Header";
import ListClients from "../../components/ListClients";

import "./styles.css";

export default function Clients() {
	return (
		<div className='container-home'>
			<Header />
			<main className='container-home_main'>
				<ListClients />
			</main>
		</div>
	);
}
