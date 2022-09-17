import Header from "../../components/Header";
import useGeralContext from "../../hooks/useGeralContext";
import "./styles.css";

function Home() {
	const { token, useEffect, useNavigate } = useGeralContext();
	const navigate = useNavigate();

	useEffect(() => {
		!token && navigate("/login");
	}, [token, navigate]);

	return (
		<div className='container-home'>
			<Header />
			<main className='container-home_main'>
				<h1>Home</h1>
			</main>
		</div>
	);
}

export default Home;
