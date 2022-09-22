import { Box, Grid, Modal, Paper } from "@mui/material";
import useGeralContext from "../../hooks/useGeralContext";
import InputData from "../InputData";

export default function ModalClient() {
	const { open, setOpen } = useGeralContext();
	const styleGrid = {
		paper: {
			width: "300px",
			height: "auto",
			bgcolor: "green",
			overflowY: "auto",
			fontSize: "1.5rem",
			p: 4,
		},
		grids: {
			display: "flex",
			flexDirection: "row",
			columnGap: "1.5rem",
		},
	};

	function handleClose() {
		setOpen(!open);
	}

	return (
		<Modal
			open={true}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Paper sx={styleGrid.paper}>
				<Box
					component='form'
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "space-between",
						height: "100%",
					}}
				>
					<Grid
						container
						sx={{
							display: "flex",
							flexDirection: "row",
							jusifyContent: "space-between",
							columnGap: "0.5rem",
						}}
					>
						<Grid item xs={12}>
							<InputData />
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Modal>
	);
}
