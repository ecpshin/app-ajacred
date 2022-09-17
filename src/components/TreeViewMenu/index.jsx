import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import { Divider } from "@mui/material";
import "./styles.css";

export default function FileSystemNavigator() {
	return (
		<TreeView
			aria-label='file system navigator'
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpandIcon={<ChevronRightIcon />}
		>
			<TreeItem nodeId='1' label='Clientes' />
			<Divider />
			<TreeItem nodeId='2' label='Contratos' />
		</TreeView>
	);
}
