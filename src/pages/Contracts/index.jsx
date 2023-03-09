/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css';
import { Box, Modal } from '@mui/material';
import Header from '../../components/Header';
import ListContratos from '../../components/ListContratos';
import EditContractForm from '../../components/ClientProfile/EditContractForm';
import NewContractForm from '../../components/ClientProfile/NewContractForm';
import useGeral from '../../hooks/useGeral';
import { useState } from 'react';

export default function Contracts() {
  const { token } = useGeral();
  const [isNew, setIsNew] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  function handleCloseEdit() {
    setIsEdit(false);
    return;
  }

  function handleCloseNew() {
    setIsNew(false);
    return;
  }

  function handleIsEdit() {
    setIsEdit(true);
    return;
  }
  function handleIsNew() {
    setIsNew(true);
    return;
  }

  return (
    <div className='container-home'>
      <Header />
      <main className='container-home_main'>
        <ListContratos
          token={token}
          setIsNew={setIsNew}
          isnew={isNew}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          handleIsEdit={handleIsEdit}
          handleIsNew={handleIsNew}
        />
        <Modal
          open={isEdit}
          onClose={() => handleCloseEdit()}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            <EditContractForm />
          </Box>
        </Modal>
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
            <NewContractForm />
          </Box>
        </Modal>
      </main>
    </div>
  );
}
