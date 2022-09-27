import { Search } from "@mui/icons-material";
import { InputAdornment, InputBase } from "@mui/material";

export default function SearchInput() {
	return (
		<InputBase
			label='Pesquisar'
			size='small'
			endAdornment={
				<InputAdornment edge='end'>
					<Search />
				</InputAdornment>
			}
		/>
	);
}
