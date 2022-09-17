import { Container } from "@mui/material";
import AddUser from "../../components/AddUser";
import "./styles.css";

export default function Signup() {
	return (
		<div className='signup'>
			<Container maxWidth='sm'>
				<AddUser />
			</Container>
		</div>
	);
}
