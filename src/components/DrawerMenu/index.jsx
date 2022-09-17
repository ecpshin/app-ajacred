import { Drawer } from "@mui/material";
import TreeViewMenu from "../TreeViewMenu";

export default function DrawerMenu() {
	const handleToggleDrawer = (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
	};

	function handleCloseMenu() {
		//setOpen(false);
	}

	return (
		<div>
			<h1>Drawer</h1>
			<Drawer
				open={false}
				onClose={handleCloseMenu}
				onKeyDown={handleToggleDrawer}
				width={300}
				sx={{ fontSize: "1.8rem" }}
			>
				<TreeViewMenu />
			</Drawer>
		</div>
	);
}
