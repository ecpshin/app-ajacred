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
	const [funcionais, setFuncionais, removeFuncionais] =
		useLocalStorage("funcionais");
	const [bancarias, setBancarias, removeBancarias] =
		useLocalStorage("bancarias");
	const [residenciais, setResidenciais, removeResidenciais] =
		useLocalStorage("residenciais");
	const initForms = {
		cliente: {
			nome: "",
			cpf: "",
			rg: "",
			expedicao: "",
			nascimento: "",
			naturalidade: "",
			genitora: "",
			genitor: "",
			sexo: "",
			estadoCivil: "",
			observacoes: "",
		},
		endereco: {
			cep: "",
			logradouro: "",
			complemento: "",
			bairro: "",
			localidade: "",
			uf: "",
		},
		funcional: {
			beneficios: "",
			emails: "",
			senhas: "",
			phone1: "",
			phone2: "",
			phone3: "",
			phone4: "",
		},
		bancaria: {
			codigo: "",
			banco: "",
			agencia: "",
			conta: "",
			tipo: "",
			operacao: "",
		},
		user: {
			nome: "",
			email: "",
			senha: "",
			nivel: "ROLE_USER",
			avatar: "man.png",
			confirmaSenha: "",
		},
		login: {
			email: "",
			senha: "",
		},
	};

	const [form, setForm] = useState({});

	const handleChangeCliente = (prop) => (event) => {
		setForm({
			...form,
			[prop]: event.target.value,
		});
	};

	function dateFormulario(date) {
		const string = new Date(date).toLocaleDateString();
		console.log(string);
	}

	function formatDate(date) {
		return new Date(date).toLocaleDateString("pt-BR", { timeZone: "UTC" });
	}

	const [toast, setToast] = useState({
		open: false,
		vertical: "top",
		horizontal: "right",
		message: "",
		reason: "",
	});

	return {
		bancarias,
		Button,
		Card,
		CardContent,
		CardHeader,
		cliente,
		clients,
		form,
		funcionais,
		handleChangeCliente,
		removeCliente,
		dateFormulario,
		initForms,
		formatDate,
		Input,
		IconButton,
		LogoApp,
		Logo300,
		Logout,
		OutlinedInput,
		open,
		openMenu,
		openModal,
		residenciais,
		search,
		showPassword,
		toast,
		token,
		user,
		setBancarias,
		setClients,
		setCliente,
		setForm,
		setFuncionais,
		setOpen,
		setOpenMenu,
		setOpenModal,
		setResidenciais,
		setToast,
		setToken,
		setUser,
		setSearch,
		setShowPassword,
		removeBancarias,
		removeFuncionais,
		removeResidenciais,
		removeToken,
		removeUser,
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
