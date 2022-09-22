import { LinearProgress, Stack } from "@mui/material";
import useGeralContext from "../../hooks/useGeralContext";
import "./styles.css";

export default function InputData({ id, label, type }) {
	const { useState, useEffect } = useGeralContext();
	const [progress, setProgress] = useState(100);

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				if (oldProgress === 0) {
					clearInterval(timer);
				}
				const diff = Math.random() * 10;
				return Math.min(oldProgress - diff, 100);
			});
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<div className='input-group'>
			{/* <InputLabel htmlFor={id}>{label}</InputLabel>
			<OutlinedInput id={id} type={type} className='inputs' /> */}
			<Stack sx={{ width: "100%" }}>
				<LinearProgress
					variant='determinate'
					value={progress}
					style={{ color: "#fff", bgcolor: "#fff" }}
				/>
			</Stack>
		</div>
	);
}
