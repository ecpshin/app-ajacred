import { toast } from 'react-toastify';
import Bg from '../../assets/images/bg.png';
import LogoApp from '../../assets/images/logo_300.png';
import Toastify from '../../components/Toastify';
import useGeral from '../../hooks/useGeral';
import api from '../../service/api';
import './styles.css';

export default function Signin() {
  const {
    form,
    setForm,
    initForms,
    token,
    setToken,
    setUser,
    useNavigate,
    useEffect,
  } = useGeral();
  const navigate = useNavigate();

  useEffect(() => {
    token && navigate('/home');
    function init() {
      setForm(initForms.login);
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

      setForm({ email: '', senha: '' });

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
    return;
  };

  return (
    <div className='container-signin'>
      <div
        className='panel-left'
        style={{ backgroundImage: `url(${Bg})` }}
      ></div>
      <div className='panel-right'>
        <div className='panel-login'>
          <form
            onSubmit={(e) => e.preventDefault()}
            method='post'
            className='form_login'
          >
            <img src={LogoApp} alt='Logo' />
            <input
              className='input-login'
              type='email'
              value={form.email ? form.email : ''}
              onChange={handleOnChange('email')}
              placeholder='Email'
              required
            />
            <input
              className='input-login'
              type={'password'}
              value={form.senha ? form.senha : ''}
              onChange={handleOnChange('senha')}
              placeholder='Senha'
              required
            />
            <button
              type='submit'
              className='btn-login'
              onClick={(e) => handleOnSubmit(e)}
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
      <Toastify />
    </div>
  );
}
