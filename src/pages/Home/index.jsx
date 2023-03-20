import { Paper, Typography } from '@mui/material';
import CardHome from '../../components/CardHome';
import Header from '../../components/Header';
import useGeral from '../../hooks/useGeral';
import api from '../../service/api';
import './styles.css';

function Home() {
  const { token, useEffect, useNavigate, useState } = useGeral();
  const [localData, setLocalData] = useState(
    new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  );
  const navigate = useNavigate();
  const [listaLocal, setListaLocal] = useState([]);

  function handleLowCase(string) {
    return `${string.toLowerCase()}`;
  }

  function handleStatus(string) {
    return `${string}`;
  }

  async function handleGetContratos() {
    try {
      const response = await api.get('/contratos/situacoes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setListaLocal(response.data);
      return;
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  function handleRefreshDate() {
    setLocalData(
      new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Recife',
      })
    );
  }

  useEffect(() => {
    setInterval(handleRefreshDate, 1000);
  }, [localData]);

  useEffect(() => {
    if (!token) return navigate('/signin', 'replace');
    handleGetContratos();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container__home'>
      <main className='main__content'>
        <Paper
          style={{
            width: '98%',
            padding: '2rem',
            marginTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '15px',
          }}
        >
          <Typography
            variant='h1'
            component='h4'
            sx={{
              fontSize: '2.6rem',
              color: '#000',
              fontWeight: '400',
            }}
          >
            Painel de Administração
          </Typography>
          <Typography
            variant='h1'
            component='h4'
            sx={{
              fontSize: '2rem',
              color: '#000',
              fontWeight: '400',
            }}
          >
            {localData}
          </Typography>
        </Paper>

        <Paper elevation={0} className='paper-admin'>
          <div className='cards__home'>
            {listaLocal.map((item) => (
              <CardHome
                key={item.situacao}
                quantidade={item.quantidade}
                situacao={handleStatus(item.situacao)}
                estilo={handleLowCase(item.situacao)}
              />
            ))}
          </div>
        </Paper>
      </main>
    </div>
  );
}

export default Home;
