/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../../components/Header';
import './styles.css';
import api from '../../service/api';
import ListContratos from '../../components/ListContratos';
import { useLocalStorage } from 'react-use';
import { useEffect, useState } from 'react';

function Contracts() {
  const [token, setToken, removeToken] = useLocalStorage('token');

  function remove() {
    removeToken();
  }

  function incluir() {
    setToken(token);
  }

  useEffect(() => {}, []);

  return (
    <div className='container-home'>
      <Header />
      <main className='container-home_main'>
        <h1>Contratos</h1>
        {/* <TableContainer component={Paper}>
          <Table
            size='small'
            sx={{
              width: '90%',
            }}
          >
            <TableBody>
              {lista.map((item) => (
                <TableRow key={item.pid}>
                  <TableCell sx={{ fontSize: '1.4rem' }}>{item.nome}</TableCell>
                  <TableCell sx={{ fontSize: '1.4rem' }}>
                    {item.prazo}
                  </TableCell>
                  <TableCell sx={{ fontSize: '1.4rem' }}>
                    {item.total}
                  </TableCell>
                  <TableCell sx={{ fontSize: '1.4rem' }}>
                    {item.parcela}
                  </TableCell>
                  <TableCell style={{ fontSize: '1.29rem' }}>
                    {item.liquido}
                  </TableCell>
                  <TableCell
                    style={{ overflow: 'hidden', fontSize: '1.29rem' }}
                  >
                    {item.nome_financeira}
                  </TableCell>
                  <TableCell sx={{ fontSize: '1.4rem' }}>
                    {item.nome_correspondente}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer> */}
        <ListContratos token={token} />
      </main>
    </div>
  );
}

export default Contracts;
