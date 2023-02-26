import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'react-use';

export default function useGeralContextProvider() {
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState([]);
  const [token, setToken, removeToken] = useLocalStorage('token', '');
  const [user, setUser, removeUser] = useLocalStorage('user');
  const [cliente, setCliente, removeCliente] = useLocalStorage('cliente');
  const [funcionais, setFuncionais, removeFuncionais] =
    useLocalStorage('funcionais');
  const [bancarias, setBancarias, removeBancarias] =
    useLocalStorage('bancarias');
  const [residenciais, setResidenciais, removeResidenciais] =
    useLocalStorage('residenciais');
  const niveis = [
    {
      id: 1,
      level: 'ROLE_ADMIN',
    },
    {
      id: 2,
      level: 'ROLE_USER',
    },
    {
      id: 3,
      level: 'ROLE_BLOCK',
    },
  ];
  const initForms = {
    cliente: {
      nome: '',
      cpf: '',
      rg: '',
      expedicao: '',
      nascimento: '',
      naturalidade: '',
      genitora: '',
      genitor: '',
      sexo: '',
      estadoCivil: '',
      observacoes: '',
    },
    endereco: {
      cep: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: '',
    },
    funcional: {
      beneficios: '',
      emails: '',
      senhas: '',
      phone1: '',
      phone2: '',
      phone3: '',
      phone4: '',
    },
    bancaria: {
      codigo: '',
      banco: '',
      agencia: '',
      conta: '',
      tipo: '',
      operacao: '',
    },
    user: {
      nome: '',
      email: '',
      senha: '',
      nivel: 'ROLE_USER',
      avatar: 'man.png',
      confirmaSenha: '',
    },
    login: {
      email: '',
      senha: '',
    },
  };

  const [form, setForm] = useState({});

  const handleChangeCliente = (prop) => (event) => {
    setForm({
      ...form,
      [prop]: event.target.value,
    });
  };

  const dateFormulario = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  const [toast, setToast] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    message: '',
    reason: '',
  });

  return {
    bancarias,
    cliente,
    clients,
    form,
    funcionais,
    initForms,
    niveis,
    formatDate,
    open,
    openMenu,
    openModal,
    residenciais,
    search,
    showPassword,
    toast,
    token,
    user,
    handleChangeCliente,
    removeCliente,
    dateFormulario,
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
    useLocalStorage,
    useEffect,
    useLocation,
    useNavigate,
    useState,
  };
}
