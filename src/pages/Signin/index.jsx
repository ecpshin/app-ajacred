import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Bg from '../../assets/images/bg.png';
import Toastify from '../../components/Toastify';
import useGeralContext from '../../hooks/useGeralContext';
import api from '../../service/api';
import './styles.css';

export default function Signin() {
  const {
    form,
    setForm,
    initForms,
    token,
    setShowPassword,
    setToken,
    setUser,
    showPassword,
    useNavigate,
    useEffect,
  } = useGeralContext();
  const navigate = useNavigate();

  useEffect(() => {
    token && navigate('/home');
    function init() {
      setForm(initForms.login);
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleShowPassword() {
    setShowPassword(!showPassword);
    return;
  }

  const handleOnChange = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
    return;
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (!form.email || !form.senha) {
      toast.error('Preencha todos os campos!', {
        position: 'top-right',
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      return;
    }

    try {
      const response = await api.post('/login', form);
      const { token: userToken, usuario } = response.data;
      setToken(userToken);
      setUser(usuario);
      toast.success('Login efetuado com sucesso!', {
        position: 'top-right',
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setForm({ ...initForms.login });

      setTimeout(() => {
        navigate('/home');
      }, 3200);
    } catch (error) {
      toast.error(error.response.data, {
        position: 'top-right',
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setForm({ email: '', senha: '' });
      setTimeout(() => {
        navigate('/');
      }, 3200);
    }
  };

  return (
    <div className='container-signin'>
      <div
        className='panel-left'
        style={{ backgroundImage: `url(${Bg})` }}
      ></div>
      <div className='panel-right'>
        <Grid
          container
          display='flex'
          flex-direction='column'
          justifyContent='center'
        >
          <Grid item xs={7}>
            <form onSubmit={handleOnSubmit} className='form_login'>
              <OutlinedInput
                type='email'
                defaultValue={form.email}
                onChange={handleOnChange('email')}
                placeholder='Email'
                required
                sx={{ width: '100%' }}
              />
              <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                defaultValue={form.senha}
                onChange={handleOnChange('senha')}
                placeholder='Senha'
                required
                sx={{ width: '100%' }}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <Button
                type='submit'
                className='btn-login'
                onClick={(e) => handleOnSubmit(e)}
              >
                Entrar
              </Button>
              <Typography className='cadastrese' alignSelf='center'>
                Ainda não possui conta?
                <Link to='/signup' className='cadastrese-link'>
                  Cadastre-se
                </Link>
              </Typography>
            </form>
          </Grid>
        </Grid>
      </div>
      <Toastify />
      {/* <Alerts /> */}
    </div>
  );
}
