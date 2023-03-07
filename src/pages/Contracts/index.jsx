/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../../components/Header';
import ListContratos from '../../components/ListContratos';
import { useState } from 'react';
import './styles.css';
import useGeral from '../../hooks/useGeral';
import ModalNewContract from '../../components/ModalNewContract';

export default function Contracts() {
  const { token } = useGeral();
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  function handleClose() {
    setOpenNew(false);
    setOpenEdit(false);
  }

  return (
    <div className='container-home'>
      <Header />
      <main className='container-home_main'>
        <h1 style={{ fontFamily: 'Montserrat', fontSize: '4.8rem' }}>
          Contratos
        </h1>
        <ListContratos
          token={token}
          openNew={openNew}
          setOpenNew={setOpenNew}
          handleClose={handleClose}
        />
      </main>
      <ModalNewContract
        openNew={openNew}
        setOpenDialogNew={setOpenNew}
        handleClose={handleClose}
      />
    </div>
  );
}
