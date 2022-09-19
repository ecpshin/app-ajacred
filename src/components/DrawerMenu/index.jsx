import { Drawer } from "@mui/material";
import MenuBlack from "../../assets/images/menu-black.svg";
import useGeralContext from "../../hooks/useGeralContext";
import TreeViewMenu from "../TreeViewMenu";

export default function DrawerMenu() {
	const { setOpenMenu, openMenu } = useGeralContext();
	const handleToggleDrawer = (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
	};

	function handleCloseMenu() {
		setOpenMenu(!openMenu);
	}

	return (
		<div>
			<Drawer
				open={openMenu}
				onClose={handleCloseMenu}
				onKeyDown={handleToggleDrawer}
				sx={{ fontSize: "1.8rem!important" }}
			>
				<div
					style={{
						width: "auto",
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "flex-start",
						marginLeft: "1rem",
						marginTop: "1rem",
						marginBottom: "1.5rem",
						gap: "1rem",
					}}
				>
					<img src={MenuBlack} alt='Menu' />
					<h4>Menu de Opções</h4>
				</div>
				<TreeViewMenu />
			</Drawer>
		</div>
	);
}
