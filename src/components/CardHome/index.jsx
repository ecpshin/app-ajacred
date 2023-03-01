import { Button, IconButton } from '@mui/material';
import {
  ArrowCircleRight,
  AssignmentTurnedIn,
  Cancel,
  EventBusy,
  KeyboardAlt,
  PendingActions,
  Storage,
} from '@mui/icons-material';
import './styles.css';
import { useNavigate } from 'react-router-dom';

export default function CardHome({ quantidade, situacao, estilo }) {
  const navigate = useNavigate();

  function renderContentStyle(ecss) {
    return `card-home card-home-${ecss}`;
  }

  function renderHeaderStyle(ecss) {
    return `card-header ${ecss}`;
  }

  function renderFooterStyle(ecss) {
    return `card-footer ${ecss}`;
  }

  function handleGoToPage(toPage) {
    if (toPage === 'TOTAL') {
      navigate(`/contratos`, 'refresh');
      return;
    }
    navigate(`/contratos/${toPage}`, 'refresh');
    return;
  }

  return (
    <div className={renderContentStyle(estilo)}>
      <div className={renderHeaderStyle(estilo)}>
        <h3 className='card-title'>{situacao}</h3>
      </div>
      <div className='card-content'>
        <div className='card__icon'>
          <IconButton>
            {estilo === 'cancelado' ? (
              <Cancel
                style={{
                  color: '#af0f0f',
                  fontSize: '55px',
                }}
              />
            ) : estilo === 'aprovado' ? (
              <AssignmentTurnedIn
                style={{
                  color: 'green',
                  fontSize: '55px',
                }}
              />
            ) : estilo === 'digitado' ? (
              <KeyboardAlt
                style={{
                  color: '#0049bf',
                  fontSize: '55px',
                }}
              />
            ) : estilo === 'pendente' ? (
              <PendingActions
                style={{
                  color: '#c99628',
                  fontSize: '55px',
                }}
              />
            ) : estilo === 'total' ? (
              <Storage
                style={{
                  color: 'hsla(4, 35%, 27%, 0.8)',
                  fontSize: '55px',
                }}
              />
            ) : (
              <EventBusy
                style={{
                  color: '#696969',
                  fontSize: '55px',
                }}
              />
            )}
          </IconButton>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '4.2rem' }}>{quantidade}</h3>
        </div>
      </div>
      <div className={renderFooterStyle(estilo)}>
        <Button
          endIcon={<ArrowCircleRight />}
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.4rem',
          }}
          onClick={() => handleGoToPage(situacao)}
        >
          Mais informações
        </Button>
      </div>
    </div>
  );
}
