// import {
//   FolderShared,
//   PeopleAlt,
//   PersonAdd,
//   Search,
// } from '@mui/icons-material';
// import {
//   Button,
//   IconButton,
//   InputAdornment,
//   InputBase,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TablePagination,
//   TableRow,
//   Typography,
// } from '@mui/material';
// import * as locales from '@mui/material/locale';
// import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
// import { useMemo } from 'react';
// import { useState, useEffect } from 'react';
// import { useLocalStorage } from 'react-use';
// import api from '../../service/api';
// import estilos from './styles';
import './styles.css';

// const estiloSearch = {
//   search: { fontSize: '2.45rem', color: '#ff3401' },
//   inputSearch: {
//     width: '400px',
//     height: 'auto',
//     borderRadius: '5px',
//     padding: '8px 10px',
//     marginBottom: '3px',
//     border: '1px solid hsl(12, 100%, 80%)',
//   },
// };

// const formatarData = (string) => {
//   return new Date(string).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
// };

export default function ContratosCliente() {
  // const [contratos, setContratos] = useState([]);
  // const [contrato, setContrato, removeContrato] = useLocalStorage('contrato');
  // const [page, setPage] = useState(0);
  // const [query, setQuery] = useState('');
  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [locale, setLocale] = useState('ptBR');
  // const theme = useTheme();
  // const themeWithLocale = useMemo(
  //   () => createTheme(theme, locales[locale]),
  //   [locale, theme]
  // );
  // async function handleGoContrato(obj) {
  //   setContrato(obj);
  //   setOpenDialog(!openDialog);
  //   return;
  // }
  // async function handleGetContratos() {
  //   try {
  //     const response = await api.get(`/clientes/contratos/${cliente.id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setContratos(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  //   return;
  // };
  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  //   return;
  // };
  // function handleChangeInput(e) {
  //   setQuery(e.target.value);
  //   return;
  // }
  // function handleSearch() {
  //   const localContratos = [...contratos];
  //   // eslint-disable-next-line array-callback-return
  //   const search = localContratos.filter((item) => {
  //     if (query === '') {
  //       return item;
  //     } else if (
  //       item.nome.toLowerCase().includes(query.toLowerCase()) ||
  //       item.cpf.includes(query) ||
  //       item.nome_financeira.toLowerCase().includes(query) ||
  //       item.nome_correspondente.toLowerCase().includes(query)
  //     ) {
  //       return item;
  //     }
  //   });
  //   return search.length > 0 ? search : false;
  // }
  // useEffect(() => {
  //   function init() {
  //     handleGetContratos();
  //   }
  //   init();
  //   setLocale('ptBR');
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // return (
  //   <>
  //     <div className='container-home_top'>
  //       <div
  //         style={{
  //           width: 'auto',
  //           display: 'flex',
  //           flexDirection: 'row',
  //           alignItems: 'flex-end',
  //           justifyContent: 'flex-start',
  //           columnGap: '10px',
  //         }}
  //       >
  //         <PeopleAlt sx={{ fontSize: '38px' }} />
  //         <Typography
  //           variant='h4'
  //           sx={{ fontSize: '2.4rem', fontWeight: '500' }}
  //         >
  //           Contratos
  //         </Typography>
  //       </div>
  //       <div style={{ display: 'flex', columnGap: '15px' }}>
  //         <Button
  //           className='btn__cadastrar'
  //           startIcon={<PersonAdd style={{ fontSize: '28px' }} />}
  //           onClick={() => setOpenDialog(!openDialog)}
  //         >
  //           Novo Contrato
  //         </Button>
  //         <InputBase
  //           label='Pesquisar'
  //           size='small'
  //           sx={estiloSearch.inputSearch}
  //           value={query}
  //           onChange={handleChangeInput}
  //           endAdornment={
  //             <InputAdornment position='end'>
  //               <Search sx={estiloSearch.search} />
  //             </InputAdornment>
  //           }
  //           onBlur={handleGetContratos}
  //         />
  //       </div>
  //     </div>
  //     <Paper sx={{ width: '95%', overflow: 'hidden' }}>
  //       <ThemeProvider theme={themeWithLocale}>
  //         <TableContainer sx={{ maxHeight: 400 }}>
  //           <Table stickyHeader aria-label='sticky table'>
  //             <TableHead>
  //               <TableRow>
  //                 <TableCell style={estilos.th}>#</TableCell>
  //                 <TableCell style={estilos.th}>DIGITADO</TableCell>
  //                 <TableCell style={estilos.th}>FINALIZADO</TableCell>
  //                 <TableCell style={estilos.th}>ÓRGÃO</TableCell>
  //                 <TableCell style={estilos.th}>PRAZO</TableCell>
  //                 <TableCell style={estilos.th}>TOTAL</TableCell>
  //                 <TableCell style={estilos.th}>PARCELA</TableCell>
  //                 <TableCell style={estilos.th}>LIQUIDO</TableCell>
  //                 <TableCell style={estilos.th}>OPERAÇÃO</TableCell>
  //                 <TableCell style={estilos.th}>SITUAÇÃO</TableCell>
  //                 <TableCell style={estilos.th}>FINANCEIRA</TableCell>
  //                 <TableCell style={estilos.th}>CORRESPONDENTE</TableCell>
  //               </TableRow>
  //             </TableHead>
  //             <TableBody>
  //               {handleSearch() &&
  //                 handleSearch()
  //                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //                   .map((item) => {
  //                     return (
  //                       <TableRow key={item.pid}>
  //                         <TableCell
  //                           style={estilos.td}
  //                           onClick={() => handleGoContrato(item)}
  //                         >
  //                           <IconButton>
  //                             <FolderShared
  //                               style={{
  //                                 width: '23px',
  //                                 height: 'auto',
  //                                 color: '#011557',
  //                                 cursor: 'pointer',
  //                               }}
  //                             />
  //                           </IconButton>
  //                         </TableCell>
  //                         <TableCell style={estilos.td}>
  //                           {formatarData(item.digitacao)}
  //                         </TableCell>
  //                         <TableCell style={estilos.td}>
  //                           {formatarData(item.finalizacao)}
  //                         </TableCell>
  //                         <TableCell style={estilos.td}>
  //                           {item.nome_orgao}
  //                         </TableCell>
  //                         <TableCell style={estilos.td}>{item.prazo}</TableCell>
  //                         <TableCell style={estilos.td}>{item.total}</TableCell>
  //                         <TableCell style={estilos.td}>
  //                           {item.parcela}
  //                         </TableCell>
  //                         <TableCell style={estilos.td}>
  //                           {item.liquido}
  //                         </TableCell>
  //                         <TableCell style={estilos.td}>
  //                           {item.operacao}
  //                         </TableCell>
  //                         <TableCell style={estilos.td}>
  //                           {item.situacao}
  //                         </TableCell>
  //                         <TableCell style={estilos.td}>
  //                           {item.nome_financeira}
  //                         </TableCell>
  //                         <TableCell style={estilos.td}>
  //                           {item.nome_correspondente}
  //                         </TableCell>
  //                       </TableRow>
  //                     );
  //                   })}
  //             </TableBody>
  //           </Table>
  //         </TableContainer>
  //         <TablePagination
  //           className='MuiSvgIcon-root1'
  //           rowsPerPageOptions={[5, 10, 15]}
  //           component='div'
  //           count={contratos.length}
  //           rowsPerPage={rowsPerPage}
  //           page={page}
  //           onPageChange={handleChangePage}
  //           onRowsPerPageChange={handleChangeRowsPerPage}
  //         />
  //       </ThemeProvider>
  //     </Paper>
  //   </>
  // );
}
