import {
  FolderShared,
  PeopleAlt,
  PersonAdd,
  Search,
} from '@mui/icons-material';

import {
  Button,
  Modal,
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import * as locales from '@mui/material/locale';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import useGeral from '../../hooks/useGeral';
import api from '../../service/api';
import estilos from './styles';
import './styles.css';
import { estadosCivil, sexos, febraban } from './combos';

const estiloSearch = {
  search: { fontSize: '2.45rem', color: '#ff3401' },
  inputSearch: {
    width: '400px',
    height: 'auto',
    borderRadius: '5px',
    padding: '8px 10px',
    marginBottom: '3px',
    border: '1px solid hsl(12, 100%, 80%)',
  },
};

export default function ListClients() {
  const {
    clients,
    setClients,
    formatDate,
    token,
    useEffect,
    useState,
    useNavigate,
    setCliente,
    setBancarias,
    setResidenciais,
    setFuncionais,
    open,
    setOpen,
  } = useGeral();
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [locale, setLocale] = useState('ptBR');
  const [form, setForm] = useState({
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
  const [address, setAddress] = useState({
    cep: '00000000',
    logradouro: '',
    complemento: '',
    bairro: '',
    municipio: '',
    uf: '',
  });

  const [finance, setFinance] = useState({
    codigo: '',
    banco: '',
    agencia: '',
    conta: '',
    tipo: '',
    operacao: '',
  });

  const [funcao, setFuncao] = useState({
    nrbeneficio: '',
    emails: '',
    senhas: '',
    phone1: '',
    phone2: '',
    phone3: '',
    phone4: '',
  });

  const theme = useTheme();
  const themeWithLocale = useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme]
  );
  const navigate = useNavigate();

  async function init() {
    await handleGetClients();
    setForm({
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

    setAddress({
      cep: '00000000',
      logradouro: '',
      complemento: '',
      bairro: '',
      municipio: '',
      uf: '',
    });

    setFuncao({
      nrbeneficio: '',
      emails: '',
      senhas: '',
      phone1: '',
      phone2: '',
      phone3: '',
      phone4: '',
    });

    setFinance({
      codigo: '',
      banco: '',
      agencia: '',
      conta: '',
      tipo: '',
      operacao: '',
    });
    return;
  }

  async function handleSubmitCliente() {
    delete finance.codigo;
    const data = {
      form,
      address,
      funcao,
      finance,
    };
    try {
      const response = await api.post('/clientes', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        init();
        setOpen(!open);
        return;
      }
      return;
    } catch (error) {
      console.log(error.response.message);
      return;
    }
  }

  async function handleGoClient(client) {
    try {
      setCliente(client);
      const response = await api.get(`/cliente/${client.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      const { bancarias, funcionais, residenciais } = response.data;

      setBancarias(bancarias);
      setFuncionais(funcionais);
      setResidenciais(residenciais);
      navigate('/cliente');
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGetClients() {
    try {
      const response = await api.get('/clientes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setClients(response.data);
      return;
    } catch (error) {
      console.log(error.response.data);
      return;
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleChangeInput(e) {
    setQuery(e.target.value);
  }

  function handleOnChange(e, table) {
    const prop = e.target.name;
    const value = e.target.value;

    if (table === 'cliente') {
      setForm({ ...form, [prop]: value.toUpperCase() });
    }

    if (table === 'address') {
      setAddress({ ...address, [prop]: value.toUpperCase() });
    }

    if (table === 'bancaria') {
      setFinance({ ...finance, [prop]: value.toUpperCase() });
    }

    if (table === 'funcional') {
      setFuncao({ ...funcao, [prop]: value.toUpperCase() });
    }

    return;
  }

  function handleOnSelect(e, table) {
    setForm({ ...form, [e.target.name]: e.target.value.toUpperCase() });
    return;
  }

  function handleSearch() {
    const localClientsList = [...clients];
    // eslint-disable-next-line array-callback-return
    const search = localClientsList.filter((client) => {
      if (query === '') {
        return client;
      } else if (
        client.nome.toLowerCase().includes(query.toLowerCase()) ||
        client.cpf.includes(query)
      ) {
        return client;
      }
    });

    return search.length > 0 ? search : false;
  }

  async function handleLostFocus(value) {
    const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
    await response
      .json()
      .then(function (data) {
        address.cep = data.cep;
        address.logradouro = data.logradouro.toUpperCase();
        address.complemento = '-';
        address.bairro = data.bairro.toUpperCase();
        address.municipio = data.localidade.toUpperCase();
        address.uf = data.uf.toUpperCase();

        document.getElementById('cep').value = address.cep;
        document.getElementById('logradouro').value =
          address.logradouro.toUpperCase();
        document.getElementById('complemento').value = '-';
        document.getElementById('bairro').value = address.bairro.toUpperCase();
        document.getElementById('municipio').value =
          address.localidade.toUpperCase();
        document.getElementById('uf').value = address.uf.toUpperCase();
      })
      .catch(function (err) {
        console.error('Failed retrieving information', err);
      });
    return;
  }

  function handleSearchBanco(e) {
    let banco = e.target.value;
    let el = document.querySelector('#banco');

    if (banco.length === 1 && e.key === 'Enter') {
      banco = `00${banco}`;
      el.value = banco;
      finance.codigo = banco;
    }

    if (banco.length === 2 && e.key === 'Enter') {
      banco = `0${banco}`;
      el.value = banco;
      finance.codigo = banco;
    }

    const search = febraban.find((item) => item.codigo === banco);

    if (search) {
      finance.banco = `${search.codigo}-${search.nome}`;
      document.getElementById('banco').value = finance.banco;
    }

    return;
  }

  useEffect(() => {
    init();
    setLocale('ptBR');
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='container-home_top'>
        <div
          style={{
            width: 'auto',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            columnGap: '10px',
          }}
        >
          <PeopleAlt sx={{ fontSize: '3.8rem' }} />
          <Typography variant='h4' sx={{ fontSize: '2.4rem', fontWeight: 500 }}>
            Clientes Cadastrados
          </Typography>
        </div>
        <div style={{ display: 'flex', columnGap: '1.5rem' }}>
          <Button
            className='btn__cadastrar'
            startIcon={<PersonAdd style={{ fontSize: '2.8rem' }} />}
            onClick={() => setOpen(!open)}
          >
            Adicionar Cliente
          </Button>
          <OutlinedInput
            placeholder='Pesquisar'
            size='small'
            sx={estiloSearch.inputSearch}
            value={query}
            onChange={handleChangeInput}
            onBlur={handleGetClients}
            endAdornment={
              <InputAdornment position='end'>
                <Search sx={estiloSearch.search} />
              </InputAdornment>
            }
          />
        </div>
      </div>
      <Paper sx={{ width: '90%', overflow: 'hidden' }}>
        <ThemeProvider theme={themeWithLocale}>
          <TableContainer sx={{ maxHeight: 400, fontSize: '1.2rem' }}>
            <Table stickyHeader aria-label='sticky table'>
              <TableHead>
                <TableRow>
                  <TableCell style={estilos.th}>#</TableCell>
                  <TableCell style={estilos.th}>Nome</TableCell>
                  <TableCell style={estilos.th}>CPF</TableCell>
                  <TableCell style={estilos.th}>RG</TableCell>
                  <TableCell style={estilos.th}>Data de Nascimento</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch() &&
                  handleSearch()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((client) => {
                      return (
                        <TableRow key={client.id}>
                          <TableCell style={estilos.td}>
                            <IconButton onClick={() => handleGoClient(client)}>
                              <FolderShared
                                style={{
                                  width: '23px',
                                  height: 'auto',
                                  color: '#011557',
                                  cursor: 'pointer',
                                }}
                              />
                            </IconButton>
                          </TableCell>
                          <TableCell style={estilos.td}>
                            {client.nome}
                          </TableCell>
                          <TableCell style={estilos.td}>{client.cpf}</TableCell>
                          <TableCell style={estilos.td}>{client.rg}</TableCell>
                          <TableCell style={estilos.td}>
                            {formatDate(client.nascimento)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            className='MuiSvgIcon-root1'
            rowsPerPageOptions={[5, 10, 15]}
            component='div'
            count={clients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </ThemeProvider>
      </Paper>
      <Modal
        open={open}
        onClose={() => setOpen(!open)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          width={'80%'}
          height={'500px'}
          display={'flex'}
          backgroundColor={'#fff'}
          style={{
            borderRadius: '8px',
            flexWrap: 'wrap',
            overflowY: 'scroll',
          }}
        >
          <form onSubmit={(e) => e.preventDefault()} className='form-box'>
            <h4>Dados Pessoais</h4>
            <div className='form-box-row'>
              <div className='form-box-group'>
                <label htmlFor='nome' className='form-box-label'>
                  Nome
                </label>
                <input
                  name='nome'
                  type='text'
                  value={form.nome}
                  onChange={(e) => handleOnChange(e, 'cliente')}
                  id='nome'
                />
              </div>
              <div className='form-box-group-2'>
                <div className='form-box-group'>
                  <label htmlFor='cpf'>CPF</label>
                  <input
                    name='cpf'
                    type='text'
                    value={form.cpf}
                    onChange={(e) => handleOnChange(e, 'cliente')}
                    id='cpf'
                  />
                </div>
                <div className='form-box-group'>
                  <label htmlFor='rg'>RG</label>
                  <input
                    name='rg'
                    label='Doc. de Identidade (RG)'
                    type='text'
                    value={form.rg}
                    onChange={(e) => handleOnChange(e, 'cliente')}
                    id='rg'
                  />
                </div>
                <div className='form-box-group'>
                  <label htmlFor='expedicao'>Expedição</label>
                  <input
                    name='expedicao'
                    label='Data de Expedição'
                    type='date'
                    value={form.expedicao}
                    onChange={(e) => handleOnChange(e, 'cliente')}
                    id='expedicao'
                  />
                </div>
              </div>
            </div>
            <div className='form-box-row'>
              <div className='form-box-group-2'>
                <div className='form-box-group'>
                  <label htmlFor='nascimento'>Nascimento</label>
                  <input
                    name='nascimento'
                    type='date'
                    value={form.nascimento}
                    onChange={(e) => handleOnChange(e, 'cliente')}
                    id='nascimento'
                  />
                </div>
                <div className='form-box-group'>
                  <label htmlFor='naturalidade'>Naturalidade - UF</label>
                  <input
                    name='naturalidade'
                    type='text'
                    value={form.naturalidade}
                    onChange={(e) => handleOnChange(e, 'cliente')}
                    id={'naturalidade'}
                    title='Cidade e estado onde nasceu.'
                  />
                </div>
              </div>
              <div className='form-box-group'>
                <label htmlFor='genitora'>Nome da Mãe</label>
                <input
                  name='genitora'
                  type='text'
                  value={form.genitora}
                  onChange={(e) => handleOnChange(e, 'cliente')}
                  id='genitora'
                />
              </div>
              <div className='form-box-group'>
                <label htmlFor='genitor'>Nome do Pai</label>
                <input
                  name='genitor'
                  type='text'
                  value={form.genitor}
                  onChange={(e) => handleOnChange(e, 'cliente')}
                  id='genitor'
                />
              </div>
            </div>
            <div className='form-box-row'>
              <div className='form-box-group'>
                <label htmlFor='sexo'>Sexo</label>
                <select
                  name='sexo'
                  value={form.sexo}
                  onChange={(e) => handleOnSelect(e, 'cliente')}
                  id='sexo'
                >
                  <option value=''>SEXO</option>
                  {sexos.map((sexo) => (
                    <option key={sexo.id} value={sexo.descricao}>
                      {sexo.descricao}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-box-group'>
                <label htmlFor='estado_civil'>Estado Civil</label>
                <select
                  name='estado_civil'
                  value={form.estado_civil}
                  onChange={(e) => handleOnSelect(e, 'cliente')}
                  id='estado_civil'
                >
                  <option value=''>Estado Civil</option>
                  {estadosCivil.map((ecivil) => (
                    <option key={ecivil.id} value={ecivil.descricao}>
                      {ecivil.descricao}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-box-group'>
                <label htmlFor='observacoes'>Observações</label>
                <textarea
                  name='observacoes'
                  id='observacoes'
                  value={form.observacoes}
                  onChange={(e) => handleOnChange(e, 'cliente')}
                ></textarea>
              </div>
            </div>
            <hr />
            <h4>Dados Residenciais</h4>
            <div className='form-box-row'>
              <div className='form-box-group' style={{ width: '150px' }}>
                <label>CEP</label>
                <input
                  name='cep'
                  id='cep'
                  value={address.cep}
                  onChange={(e) => handleOnChange(e, 'address')}
                  onBlur={(e) => handleLostFocus(e.target.value)}
                />
              </div>
              <div className='form-box-group'>
                <label>Endereço</label>
                <input
                  name='logradouro'
                  id='logradouro'
                  defaultValue={address.lograoduro}
                  onChange={(e) => handleOnChange(e, 'address')}
                />
              </div>
            </div>
            <div className='form-box-row'>
              <div className='form-box-group'>
                <label htmlFor='complemento'>Complemento</label>
                <input
                  name='complemento'
                  id='complemento'
                  value={address.complemento}
                  onChange={(e) => handleOnChange(e, 'address')}
                />
              </div>
              <div className='form-box-group'>
                <label>Bairro</label>
                <input
                  name='bairro'
                  id='bairro'
                  value={address.bairro}
                  onChange={(e) => handleOnChange(e, 'address')}
                />
              </div>
              <div className='form-box-group'>
                <label>Município</label>
                <input
                  name='municipio'
                  id='municipio'
                  value={address.municipio}
                  onChange={(e) => handleOnChange(e, 'address')}
                />
              </div>
              <div className='form-box-group' style={{ width: '80px' }}>
                <label>UF</label>
                <input
                  name='uf'
                  id='uf'
                  value={address.uf}
                  onChange={(e) => handleOnChange(e, 'address')}
                />
              </div>
            </div>
            <hr />
            <h4>Dados Funcionais</h4>
            <div className='form-box-row'>
              <div className='form-box-group'>
                <label>Benefícios</label>
                <textarea
                  name='nrbeneficio'
                  rows={3}
                  value={funcao.nrbeneficio}
                  onChange={(e) => handleOnChange(e, 'funcional')}
                ></textarea>
              </div>
              <div className='form-box-group'>
                <label>Senhas</label>
                <textarea
                  name='senhas'
                  rows={3}
                  value={funcao.senhas}
                  onChange={(e) => handleOnChange(e, 'funcional')}
                ></textarea>
              </div>
              <div className='form-box-group'>
                <label>E-mails</label>
                <textarea
                  name='emails'
                  rows={3}
                  value={funcao.emails}
                  onChange={(e) => handleOnChange(e, 'funcional')}
                ></textarea>
              </div>
            </div>
            <div className='form-box-row'>
              <div className='form-box-group'>
                <label>Telefone (Principal)</label>
                <input
                  type='tel'
                  name='phone1'
                  value={funcao.phone1}
                  onChange={(e) => handleOnChange(e, 'funcional')}
                />
              </div>
              <div className='form-box-group'>
                <label>Tlefone 2</label>
                <input
                  type='tel'
                  name='phone2'
                  value={funcao.phone2}
                  onChange={(e) => handleOnChange(e, 'funcional')}
                />
              </div>
              <div className='form-box-group'>
                <label>Telefone 3</label>
                <input
                  type='tel'
                  name='phone3'
                  value={funcao.phone3}
                  onChange={(e) => handleOnChange(e, 'funcional')}
                />
              </div>
              <div className='form-box-group'>
                <label>Telefone 4</label>
                <input
                  type='tel'
                  name='phone4'
                  value={funcao.phone4}
                  onChange={(e) => handleOnChange(e, 'funcional')}
                />
              </div>
            </div>
            <hr />
            <h4>Informações Bancárias</h4>
            <div className='form-box-row'>
              <div className='form-box-group' style={{ width: '8rem' }}>
                <label>Código</label>
                <input
                  name='codigo'
                  type='text'
                  value={finance.codigo}
                  maxLength='3'
                  onChange={(e) => handleOnChange(e, 'bancaria')}
                  onKeyUp={(e) => handleSearchBanco(e)}
                  id='codigo'
                />
              </div>
              <div className='form-box-group'>
                <label>Banco</label>
                <input
                  type='text'
                  name='banco'
                  id='banco'
                  value={finance.banco}
                  onChange={(e) => handleOnChange(e, 'bancaria')}
                />
              </div>
              <div className='form-box-group' style={{ width: '8rem' }}>
                <label>Agência</label>
                <input
                  name='agencia'
                  type='text'
                  maxLength='10'
                  value={finance.agencia}
                  onChange={(e) => handleOnChange(e, 'bancaria')}
                  id='agencia'
                />
              </div>
              <div className='form-box-group'>
                <label>Conta Nº</label>
                <input
                  type='text'
                  name='conta'
                  value={finance.conta}
                  onChange={(e) => handleOnChange(e, 'bancaria')}
                  id='conta'
                />
              </div>
              <div className='form-box-group'>
                <label>Tipo</label>
                <input
                  name='tipo'
                  type='text'
                  value={finance.tipo}
                  onChange={(e) => handleOnChange(e, 'bancaria')}
                  id='tipo'
                />
              </div>
              <div className='form-box-group'>
                <label>Operação</label>
                <input
                  name='operacao'
                  type='text'
                  value={finance.operacao}
                  onChange={(e) => handleOnChange(e, 'bancaria')}
                  id='operacao'
                />
              </div>
            </div>
            <button
              type='submit'
              className='btn__cadastrar'
              onClick={() => handleSubmitCliente()}
            >
              Salvar
            </button>
          </form>
        </Box>
      </Modal>
    </>
  );
}
