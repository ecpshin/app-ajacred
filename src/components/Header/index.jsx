import { AccountCircle } from '@mui/icons-material';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import Logout from '@mui/icons-material/Logout';
//import Logo300 from '../assets/images/logo_300.png';
import LogoApp from '../../assets/images/logo_app.jpg';
import useGeralContext from '../../hooks/useGeralContext';
import DrawerMenu from '../DrawerMenu';
import EditUser from '../EditUser';
import './styles.css';

export default function Header() {
  const {
    removeToken,
    removeUser,
    useNavigate,
    openMenu,
    setOpenMenu,
    openModal,
    setOpenModal,
    user,
  } = useGeralContext();

  const navigate = useNavigate();

  function handleExit() {
    removeToken();
    removeUser();
    navigate('/');
  }

  function handleCloseModal() {
    setOpenModal(!openModal);
  }

  function handleOpenModal() {
    setOpenModal(!openModal);
  }

  return (
    <header className='header'>
      <div className='header__content'>
        <img
          src={LogoApp}
          className='header__logo'
          alt='Keep'
          onClick={() => setOpenMenu(!openMenu)}
        />

        <div
          className='header__infos'
          style={{
            width: 'auto',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            marginRight: '1.6rem',
          }}
        >
          <IconButton onClick={handleOpenModal}>
            <AccountCircle className='MuiSvgIcon-root2' />
          </IconButton>
          <span
            style={{
              fontSize: '1.6rem',
              color: '#fff',
              fontWeight: 500,
              marginRight: '1.6rem',
            }}
          >
            Bem-vindo(a), {user.nome}
          </span>
          <IconButton onClick={handleExit}>
            <Logout
              sx={{
                color: '#fff',
                width: 30,
                height: 'auto',
              }}
            />
          </IconButton>
        </div>
        {openMenu && <DrawerMenu />}
      </div>
      {openModal && (
        <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogContent sx={{ width: '500px' }}>
            <EditUser title={'Edite seus dados'} />
          </DialogContent>
        </Dialog>
      )}
    </header>
  );
}
