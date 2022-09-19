import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import useGeralContext from "../../hooks/useGeralContext";
import "./styles.css";

export default function FileSystemNavigator() {
	const { useNavigate, setOpenMenu, openMenu } = useGeralContext();
	const navigateTo = useNavigate();

	const handleClick = (pathname) => {
		navigateTo(pathname);
		setOpenMenu(!openMenu);
	};

	return (
		<TreeView
			defaultCollapseIcon={<ExpandMoreIcon style={{ color: "#FFF" }} />}
			defaultExpandIcon={<ChevronRightIcon style={{ color: "#fff" }} />}
			sx={{
				backgroundColor: "#234757",
				height: "250px",
				maxWidth: 500,
				flexGrow: 1,
			}}
		>
			<TreeItem
				nodeId='1'
				label='Home'
				onClick={() => handleClick("/home")}
			/>
			<TreeItem
				nodeId='2'
				label='Clientes'
				onClick={() => handleClick("/clientes")}
			/>
			<TreeItem
				nodeId='3'
				label='Contratos'
				onClick={() => handleClick("/contratos")}
			/>
			<TreeItem nodeId='4' label='Usuários' />
			<TreeItem nodeId='50' label='Outros'>
				<TreeItem nodeId='5' label='Órgão' />
				<TreeItem nodeId='6' label='Situações' />
				<TreeItem nodeId='7' label='Financeira' />
				<TreeItem nodeId='8' label='Correspondente' />
				<TreeItem nodeId='12' label='Nivel de Usuário' />
			</TreeItem>
		</TreeView>
	);
}
