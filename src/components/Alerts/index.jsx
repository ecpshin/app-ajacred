import { Alert, Snackbar } from "@mui/material";
import useGeralContext from "../../hooks/useGeralContext";

export default function Alerts() {
	const { toast, setToast, useNavigate } = useGeralContext();
	const navigate = useNavigate();

	const handleOnClose = () => {
		setToast({ ...toast, open: false, message: "", reason: "" });
		navigate("/home");
		return;
	};

	return (
		<Snackbar
			anchorOrigin={{
				vertical: toast.vertical,
				horizontal: toast.horizontal,
			}}
			open={toast.open}
			autoHideDuration={1200}
			onClose={handleOnClose}
			key={toast.vertical + toast.horizontal}
		>
			<Alert
				onClose={handleOnClose}
				variant='filled'
				severity={toast.reason === "success" ? "success" : "error"}
				sx={{ width: "100%", fontSize: "1.4rem" }}
			>
				{toast.message}
			</Alert>
		</Snackbar>
	);
}
