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
	const [showPassword, setShowPassword] = useState(false);
	const [token, setToken, removeToken] = useLocalStorage("token", "");
	const [user, setUser, removeUser] = useLocalStorage("user");

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
		Input,
		IconButton,
		LogoApp,
		Logo300,
		Logout,
		OutlinedInput,
		open,
		removeToken,
		removeUser,
		setOpen,
		setShowPassword,
		setToast,
		setToken,
		setUser,
		showPassword,
		toast,
		token,
		TextField,
		Visibility,
		VisibilityOff,
		user,
		useLocalStorage,
		useEffect,
		useLocation,
		useNavigate,
		useState,
	};
}
