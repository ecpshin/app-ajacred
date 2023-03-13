import { Logout, Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	IconButton,
	Input,
	OutlinedInput,
	TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import Logo300 from "../assets/images/logo_300.png";
import LogoApp from "../assets/images/logo_app.jpg";

export default function useGeralContextProvider() {
	const [open, setOpen] = useState(false);
	const [openMenu, setOpenMenu] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [search, setSearch] = useState("");
	const [clients, setClients] = useState([]);
	const [token, setToken, removeToken] = useLocalStorage("token", "");
	const [user, setUser, removeUser] = useLocalStorage("user");
	const [cliente, setCliente, removeCliente] = useLocalStorage("cliente");

	function formatDate(date) {
		return new Date(date).toLocaleDateString("pt-BR", { timeZone: "UTC" });
	}

	const [formAddUser, setFormAddUser] = useState({
		nome: "",
		email: "",
		senha: "",
		nivel: "ROLE_USER",
		avatar: "man.png",
		confirmaSenha: "",
	});

	const [toast, setToast] = useState({
		open: false,
		vertical: "top",
		horizontal: "right",
		message: "",
		reason: "",
	});
	return {
		Button,
		Card,
		CardContent,
		CardHeader,
		cliente,
		clients,
		setClients,
		setCliente,
		removeCliente,
		formatDate,
		formAddUser,
		Input,
		IconButton,
		LogoApp,
		Logo300,
		Logout,
		OutlinedInput,
		open,
		openMenu,
		openModal,
		search,
		showPassword,
		toast,
		token,
		user,
		removeToken,
		removeUser,
		setFormAddUser,
		setOpen,
		setOpenMenu,
		setOpenModal,
		setToast,
		setToken,
		setUser,
		setSearch,
		setShowPassword,
		TextField,
		useLocalStorage,
		useEffect,
		useLocation,
		useNavigate,
		useState,
		Visibility,
		VisibilityOff,
	};
}
