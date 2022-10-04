import {
	DialogActions,
	DialogContent,
	InputBase,
	TextField,
} from "@mui/material";
import useGeralContext from "../../../hooks/useGeralContext";

export default function EditPessoais() {
	const { cliente } = useGeralContext();
	return (
		<div>
			<DialogContent>
				<InputBase />
				<InputBase />
				<InputBase />
				<InputBase />
				<InputBase />
				<InputBase />
				<InputBase />
				<InputBase />
				<TextField minRows={5} />
			</DialogContent>
			<DialogActions></DialogActions>
		</div>
	);
}
