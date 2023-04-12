import './styles.css';
import useGeral from '../../hooks/useGeral';
import icons from './styles';
import Logout from '@mui/icons-material/Logout';
import AdminUser from '@mui/icons-material/AdminPanelSettings';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import EditUser from '../EditUser';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const { removeToken, removeUser, useNavigate, user } = useGeral();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();

  function handleShow() {
    return setShow(!show);
  }

  function handlePath() {
    if (location.pathname === '/' || location.pathname === '/signup') {
      return false;
    }
    return true;
  }

  const handleOnClick = (to) => {
    setShow(false);
    navigate(to, { replace: 'refesh' });
    return;
  };

  function handleCloseModal() {
    setOpenModal(!openModal);
  }

  function handleOpenModal() {
    setOpenModal(!openModal);
  }

  function handleExit() {
    removeToken();
    removeUser();
    localStorage.clear();
    navigate('/');
  }

  return (
    handlePath() && (
      <>
        <header className='header'>
          <div className='content-header'>
            <div className='logo'></div>
            <nav className='navbar'>
              <button
                className='btn-menu'
                type='button'
                onClick={() => handleOnClick('/home')}
              >
                Home
              </button>
              <button
                tpe='button'
                className='btn-menu'
                onClick={() => handleOnClick('/clientes')}
              >
                Cliente
              </button>
              <button
                tpe='button'
                className='btn-menu'
                onClick={() => handleOnClick('/contratos')}
              >
                Contratos
              </button>
              <button
                tpe='button'
                className='btn-menu'
                onClick={() => handleOnClick('/clientes')}
              >
                Comissões
              </button>
              <div className='menu-main' style={{ position: 'relative' }}>
                <button
                  tpe='button'
                  className='btn-menu'
                  onClick={() => handleShow()}
                >
                  Outros
                </button>

                <div className={`drop-menu ${show ? 'show' : 'hide'}`}>
                  <button
                    tpe='button'
                    className='btn-menu'
                    onClick={() => handleOnClick('/situacoes')}
                  >
                    Situações
                  </button>
                  <button
                    tpe='button'
                    className='btn-menu'
                    onClick={() => handleOnClick('/financeiras')}
                  >
                    Financeiras
                  </button>
                  <button
                    tpe='button'
                    className='btn-menu'
                    onClick={() => handleOnClick('/servicos/tipos')}
                  >
                    Tipos
                  </button>
                  <button
                    tpe='button'
                    className='btn-menu'
                    onClick={() => handleOnClick('/servicos/orgaos')}
                  >
                    Órgãos
                  </button>
                </div>
              </div>
            </nav>
            <div className='userinfo'>
              <IconButton onClick={handleOpenModal}>
                <AdminUser style={icons.avatar} />
              </IconButton>
              <span style={icons.username}>{user && user.nome}</span>
              <IconButton onClick={handleExit}>
                <Logout style={icons.logout} />
              </IconButton>
            </div>
          </div>
        </header>
        {openModal ? (
          <Dialog open={openModal} onClose={handleCloseModal}>
            <DialogContent sx={{ width: '500px' }}>
              <EditUser title={'Edite seus dados'} />
            </DialogContent>
          </Dialog>
        ) : null}
      </>
    )
  );
}

export default Header;
