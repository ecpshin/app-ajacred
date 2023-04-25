import './styles.css';
import {
  Badge,
  Edit,
  Description,
  Search,
  FileOpen,
} from '@mui/icons-material';

import {
  Breadcrumbs,
  Button,
  InputBase,
  IconButton,
  Stack,
  TableContainer,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  Typography,
  InputAdornment,
  Modal,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import * as locales from '@mui/material/locale';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';

import EditBancarias from '../../components/Bancarias/Edit';
import EditFuncionais from '../../components/Funcionais/Edit';
import EditPessoais from '../../components/Pessoais/Edit';
import EditResidencial from '../../components/Residenciais/EditResidencial';
import ShowData from '../../components/ShowData';
import useGeral from '../../hooks/useGeral';
import ClientContent from '../../components/ClientContent';
//import ModalEditContract from '../../components/ModalEditContract';
import api from '../../service/api';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useLocalStorage } from 'react-use';
import EditContractForm from '../../components/ClientProfile/EditContractForm';
import NewContractForm from '../../components/ClientProfile/NewContractForm';
const estilos = {
  th: {
    color: '#000',
    backgroundColor: '#f5f5f5',
    fontSize: '1.3rem',
    fontWeight: '600',
  },
  td: {
    fontSize: '1.2rem',
    fontWeight: '500',
  },
  pagination: {
    fontSize: '1.2em',
    fontWeight: '500',
  },
};

const capitalize = (str) => {
  return str.toLowerCase();
};
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

function formatarData(string) {
  return new Date(string).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

export default function Client() {
  const {
    cliente,
    removeCliente,
    bancarias,
    removeBancarias,
    funcionais,
    removeFuncionais,
    residenciais,
    removeResidenciais,
    useState,
    useNavigate,
    token,
    toCurrencyReal,
  } = useGeral();
  const [isEdit, setIsEdit] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [modal, setModal] = useState({ title: '', id: '' });
  const [contratos, setContratos] = useState([]);
  const [locale, setLocale] = useState('ptBR');
  const theme = useTheme();
  const themeWithLocale = useMemo(
    () => createTheme(theme, locales[locale]),
    [locale, theme]
  );

  useEffect(() => {
    function init() {
      handleGetContratos();
    }
    init();
    setLocale('ptBR');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  function handleOpen(title) {
    if (title !== 'Editar') {
      setOpen(!open);
      setModal({ ...modal, title: title });
      return;
    } else {
      setOpenDialog(false);
      return;
    }
  }
  const [local, setLocal, removeLocal] = useLocalStorage('local', {});

  function handleOpenEdit(oneContract) {
    setIsEdit(true);
    setLocal(oneContract);
    return;
  }

  function handleCloseEdit() {
    setIsEdit(false);
    removeLocal();
    return;
  }

  function handleOpenNew() {
    setIsNew(true);
    return;
  }

  function handleCloseNew() {
    setIsNew(false);
    return;
  }

  function handleChangeInput(e) {
    setQuery(e.target.value);
    return;
  }

  async function handleGetContratos() {
    try {
      const response = await api.get(`/clientes/contratos/${cliente.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContratos(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    return;
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    return;
  };

  function handleSearch() {
    const localContratos = [...contratos];
    // eslint-disable-next-line array-callback-return
    const search = localContratos.filter((item) => {
      if (query === '') {
        return item;
      } else if (
        item.nome.toLowerCase().includes(query.toLowerCase()) ||
        item.cpf.includes(query) ||
        item.nome_financeira.toLowerCase().includes(query) ||
        item.nome_correspondente.toLowerCase().includes(query)
      ) {
        return item;
      }
    });

    return search.length > 0 ? search : false;
  }

  const handleClose = (e) => {
    if (e.type === 'click') {
      setOpen(!open);
      return;
    }
    setOpenDialog(!openDialog);
  };

  const handleClear = () => {
    removeCliente();
    removeBancarias();
    removeFuncionais();
    removeResidenciais();
    navigate('/clientes');
  };

  return (
    <div className='container-cliente'>
      <main className='container-main'>
        <Stack
          spacing={2}
          style={{
            width: '85%',
            display: 'flex',
            marginTop: '1rem',
          }}
        >
          <Breadcrumbs
            separator='>'
            aria-label='breadcrumb'
            style={{
              color: '#fa5700',
              fontSize: '2rem',
            }}
          >
            <Link
              key='1'
              underline='hover'
              color='inherit'
              style={{
                color: '#fa5700',
                textDecoration: 'none',
              }}
              to='/clientes'
              onClick={handleClear}
            >
              Clientes
            </Link>
            <Typography
              key='2'
              underline='hover'
              style={{
                color: '#000',
                textDecoration: 'none',
              }}
            >
              Cliente
            </Typography>
          </Breadcrumbs>
        </Stack>
        <div className='info__header'>
          <Badge className='badge-icon' />
          <h1 style={{ textTransform: 'capitalize' }}>
            {capitalize(cliente.nome)}
          </h1>
        </div>
        <div className='card__info'>
          <div className='card__info__content'>
            <div className='content__item_pessoais'>
              <button
                className='button-edit'
                onClick={() => handleOpen('Pessoais')}
              >
                <Edit
                  style={{
                    fontSize: '4rem!important',
                    color: '#fff',
                  }}
                />
              </button>
              <ClientContent formatDate={formatarData} cliente={cliente} />
            </div>
            <div className='content__item_minicards'>
              <div className='content__item_minicard'>
                <button
                  className='button-edit'
                  onClick={() => handleOpen('Residenciais')}
                >
                  <Edit
                    style={{
                      fontSize: '2rem!important',
                      color: '#fff',
                    }}
                  />
                </button>
                <ShowData label='CEP' dado={residenciais.cep} />
                <ShowData
                  label='Endereço - Complemento'
                  dado={`${residenciais.logradouro} - ${residenciais.complemento}`}
                />
                <ShowData
                  label='Bairro - Cidade/UF'
                  dado={`${residenciais.bairro} - ${residenciais.municipio}/${residenciais.uf}`}
                />
              </div>
              <div className='content__item_minicard'>
                <button
                  className='button-edit'
                  onClick={() => handleOpen('Funcionais')}
                >
                  <Edit
                    style={{
                      fontSize: '1.8rem!important',
                      color: '#fff',
                    }}
                  />
                </button>
                <ShowData
                  label={'Benefício(s) nr.'}
                  dado={funcionais.nrbeneficio}
                />
                <ShowData label={'E-mails'} dado={funcionais.emails} />
                <ShowData
                  label={'Tels.'}
                  dado={`${funcionais.phone1} - ${funcionais.phone2} - ${funcionais.phone3} - ${funcionais.phone4}`}
                />
              </div>
              <div className='content__item_minicard'>
                <button
                  className='button-edit'
                  onClick={() => handleOpen('Bancários')}
                >
                  <Edit
                    style={{
                      fontSize: '1.8rem!important',
                      color: '#fff',
                    }}
                  />
                </button>
                <ShowData label={'Banco'} dado={bancarias.banco} />
                <ShowData
                  label={'Agência, conta'}
                  dado={`${bancarias.agencia} - ${bancarias.conta}`}
                />
                <ShowData
                  label={'tipo, operação'}
                  dado={`${bancarias.tipo} - ${bancarias.operacao}`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='card-info-contratos'>
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
              <FileOpen sx={{ fontSize: '38px' }} />
              <Typography
                variant='h4'
                sx={{ fontSize: '2.4rem', fontWeight: '500' }}
              >
                Contratos
              </Typography>
            </div>
            <div style={{ display: 'flex', columnGap: '15px' }}>
              <Button
                className='btn__cadastrar'
                startIcon={<FileOpen style={{ fontSize: '28px' }} />}
                onClick={() => handleOpenNew()}
                title='Clique aqui para novo contrato'
              >
                Novo Contrato
              </Button>
              <InputBase
                label='Pesquisar'
                size='small'
                sx={estiloSearch.inputSearch}
                value={query}
                onChange={handleChangeInput}
                endAdornment={
                  <InputAdornment position='end'>
                    <Search sx={estiloSearch.search} />
                  </InputAdornment>
                }
                onBlur={() => handleGetContratos()}
              />
            </div>
          </div>
          <div className='card-content-contratos'>
            <ThemeProvider theme={themeWithLocale}>
              <TableContainer>
                <Table stickyHeader aria-label='sticky table'>
                  <TableHead>
                    <TableRow>
                      <TableCell style={estilos.th}>#</TableCell>
                      <TableCell style={estilos.th}>DATA FINAL</TableCell>
                      <TableCell style={estilos.th}>PRAZO</TableCell>
                      <TableCell style={estilos.th}>TOTAL</TableCell>
                      <TableCell style={estilos.th}>PARCELA</TableCell>
                      <TableCell style={estilos.th}>LIQUIDO</TableCell>
                      <TableCell style={estilos.th}>FINANCEIRA</TableCell>
                      <TableCell style={estilos.th}>CORRESPONDENTE</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {handleSearch() &&
                      handleSearch()
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item) => {
                          return (
                            <TableRow key={item.pid}>
                              <TableCell style={estilos.td}>
                                <IconButton
                                  onClick={() => handleOpenEdit(item)}
                                >
                                  <Description
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
                                {formatarData(item.finalizacao)}
                              </TableCell>
                              <TableCell style={estilos.td}>
                                {item.prazo}
                              </TableCell>
                              <TableCell style={estilos.td}>
                                {toCurrencyReal(item.total)}
                              </TableCell>
                              <TableCell style={estilos.td}>
                                {toCurrencyReal(item.parcela)}
                              </TableCell>
                              <TableCell style={estilos.td}>
                                {toCurrencyReal(item.liquido)}
                              </TableCell>
                              <TableCell style={estilos.td}>
                                {item.nome_financeira}
                              </TableCell>
                              <TableCell style={estilos.td}>
                                {item.nome_correspondente}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                  </TableBody>
                </Table>
                <TablePagination
                  className='MuiSvgIcon-root1'
                  rowsPerPageOptions={[5, 10, 15]}
                  component='div'
                  count={contratos.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </ThemeProvider>
          </div>
        </div>
      </main>
      {open && (
        <Modal
          open={open}
          onClose={(e) => handleClose(e)}
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            style={{
              width: '70%',
              height: '500px',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '8px',
              backgroundColor: '#fff',
              overflowY: 'auto',
            }}
          >
            {modal.title === 'Residenciais' ? (
              <EditResidencial
                id='residencial'
                title='Dados Residenciais'
                residencial={residenciais}
                setOpen={setOpen}
              />
            ) : modal.title === 'Pessoais' ? (
              <EditPessoais
                title='Dados Pessoais'
                open={open}
                setOpen={setOpen}
                cliente={cliente}
              />
            ) : modal.title === 'Funcionais' ? (
              <EditFuncionais
                title='Funcionais'
                setOpen={setOpen}
                funcional={funcionais}
              />
            ) : (
              <EditBancarias
                title='Bancárias'
                setOpen={setOpen}
                bancaria={bancarias}
              />
            )}
          </Box>
        </Modal>
      )}
      {isEdit && (
        <Modal
          open={isEdit}
          onClose={handleCloseEdit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            <EditContractForm contrato={local} />
          </Box>
        </Modal>
      )}
      {isNew && (
        <Modal
          open={isNew}
          onClose={() => handleCloseNew()}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            <NewContractForm cliente={cliente} setIsNew={setIsNew} />
          </Box>
        </Modal>
      )}
    </div>
  );
}
