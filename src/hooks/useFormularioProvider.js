import { useState } from 'react';

export default function useFormularioProvider() {
  const [clientes, setClientes] = useState([]);
  const [bancos, setBancos] = useState([]);
  const [correspondentes, setCorrespondentes] = useState([]);
  const [contratos, setContratos] = useState([]);
  const [financeiras, setFinanceiras] = useState([]);
  const [operacoes, setOperacoes] = useState([]);
  const [orgaos, setOrgaos] = useState([]);
  const [infoBancarias, setInfoBancarias] = useState([]);
  const [infoFuncionais, setInfoFuncionais] = useState([]);
  const [infoResidenciais, setInfoResidenciais] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [formLogin, setFormLogin] = useState({
    email: '',
    senha: '',
  });

  const [formBanco, setFormBanco] = useState({
    nome: '',
  });

  const [bancaria, setBancaria] = useState({
    cliente: 0,
    banco: '000-BANCO',
    agencia: '0000',
    conta: '00000-0',
    tipo: 'CONTA CORRENTE',
    operacao: '001',
  });

  const [formCliente, setFormCliente] = useState({
    chave: '',
    nome: '',
    cpf: '',
    rg: '',
    expedicao: '',
    nascimento: '',
    naturalidade: '',
    genitora: '',
    genitor: '',
    sexo: '',
    estado_civil: '',
    observacoes: '',
  });

  const [formOrgaos, setFormOrgaos] = useState({
    nome: '',
    tipo: '',
  });

  const [formOperacoes, setFormOperacoes] = useState({
    nome: '',
    tipo: '',
  });

  const [formSituacoes, setFormSituacoes] = useState({
    descricao: '',
  });

  const [formUsuario, setFormUsuario] = useState({
    chave: 'chave',
    nome: '',
    email: '',
    senha: '',
    confirmaSenha: '',
    nivel: '',
    avatar: '',
  });

  return {
    bancos,
    bancaria,
    clientes,
    correspondentes,
    contratos,
    financeiras,
    infoBancarias,
    infoFuncionais,
    infoResidenciais,
    operacoes,
    orgaos,
    usuarios,
    formLogin,
    formBanco,
    formCliente,
    formOrgaos,
    formOperacoes,
    formSituacoes,
    formUsuario,
    setBancaria,
    setBancos,
    setClientes,
    setCorrespondentes,
    setContratos,
    setFinanceiras,
    setInfoBancarias,
    setInfoFuncionais,
    setInfoResidenciais,
    setOperacoes,
    setOrgaos,
    setUsuarios,
    setFormLogin,
    setFormBanco,
    setFormCliente,
    setFormOrgaos,
    setFormOperacoes,
    setFormSituacoes,
    setFormUsuario,
  };
}
