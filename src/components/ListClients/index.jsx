import {
  FolderShared,
  PeopleAlt,
  PersonAdd,
  Search,
} from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogContent,
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
  const theme = useTheme();
  const themeWithLocale = useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme]
  );
  const navigate = useNavigate();

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
    } catch (error) {
      console.log(error.response.data);
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

  useEffect(() => {
    function init() {
      handleGetClients();
    }
    init();
    setLocale('ptBR');
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
                          <TableCell
                            style={estilos.td}
                            onClick={() => handleGoClient(client)}
                          >
                            <IconButton>
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
      <Dialog open={open} onClose={() => setOpen(!open)}>
        <DialogContent
          sx={{
            width: '580px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <h1 className='dialog-title'>Cadastrar Cliente</h1>
          <form className='form-box'>
            <div className='form-box-control'>
              <label className='input-label'>Nome</label>
              <input name='nome' type='text' placeholder='Nome' />
            </div>
            <div className='form-box-control'>
              <label className='input-label'>CPF</label>
              <input name='cpf' type='text' placeholder='CPF' />
            </div>
            <div className='form-box-control'>
              <label className='input-label'>RG</label>
              <input name='rg' type='text' placeholder='RG' />
            </div>
            <div className='form-box-control'>
              <label className='input-label'>Data Exp. RG</label>
              <input
                name='expedicao'
                type='datetime-local'
                title='Data da expedição'
              />
            </div>
            <div className='form-box-control'>
              <label className='input-label'>Data nascimento</label>
              <input
                name='nascimento'
                type='datetime-local'
                title='Data de nascimento'
              />
            </div>
            <div className='form-box-control'>
              <label className='input-label'>Naturalidade</label>
              <input
                name='naturalidade'
                type='text'
                placeholder='Naturalidade'
              />
            </div>
            <div className='form-box-control'>
              <label className='input-label'>Genitora</label>
              <input name='genitora' type='text' placeholder='Nome da mãe' />
            </div>
            <div className='form-box-control'>
              <label className='input-label'>Genitor</label>
              <input name='genitor' type='text' placeholder='Nome do pai' />
            </div>
            <div className='form-box-control'>
              <label className='input-label'>Sexo</label>
              <select name='sexo' label='Sexo'>
                <option value='Masculino'>Masculino</option>
                <option value='Feminino'>Feminino</option>
              </select>
            </div>
            <div className='form-box-control'>
              <label className='input-label'>Estado Civil</label>
              <select name='estado_civil' label='Estado Civil'>
                <option value='Solteiro(a)' selected={true}>
                  Solteiro(a)
                </option>
                <option value='Casado(a)'>Casado(a)</option>
                <option value='Divorciado(a)'>Divorciado(a)</option>
              </select>
            </div>
            <div className='form-textarea-control'>
              <label className='input-label' htmlFor='observacoes'>
                Observações
              </label>
              <textarea rows={5} defaultValue={''}></textarea>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
