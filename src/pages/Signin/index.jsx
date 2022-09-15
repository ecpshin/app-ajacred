import { Grid } from "@mui/material";
import Bg from "../../assets/images/bg.png";
import CardLogin from "../../components/CardLogin";
import "./styles.css";

export default function Signin() {
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
						<CardLogin />
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
