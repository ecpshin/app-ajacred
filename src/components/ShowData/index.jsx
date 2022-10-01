import { Typography } from "@mui/material";
import "./styles.css";

export default function ShowData({ label, dado }) {
	return (
		<div className='tag-group'>
			<h5 className='titulos'>{label}</h5>
			<Typography component='p' className='tags'>
				{dado}
			</Typography>
		</div>
	);
}
