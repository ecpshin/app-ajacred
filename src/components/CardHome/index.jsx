import './styles.css';
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
import { useNavigate } from 'react-router-dom';

export default function CardHome({ quantidade, situacao, estilo }) {
  const navigate = useNavigate();

  function renderHeaderStyle(ecss) {
    return `card-home-header ${ecss}`;
  }

  function renderFooterStyle(ecss) {
    return `card-home-footer ${ecss}`;
  }

  function renderContentStyle(ecss) {
    return `card-home card-home-${ecss}`;
  }

  function handleGoToPage(toPage) {
    if (toPage === 'TOTAL') {
      navigate(`/contratos`, 'refresh');
      return;
    }
    navigate(`/contratos/${toPage}/situacao`, 'refresh');
    return;
  }

  return (
    <div className={renderContentStyle(estilo)}>
      <div className={renderHeaderStyle(estilo)}>
        <h3 className='card-home-title'>{situacao}</h3>
      </div>
      <div className='card-home-content'>
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
          <h3 style={{ fontSize: '3.8rem' }}>{quantidade}</h3>
        </div>
      </div>
      <div className={renderFooterStyle(estilo)}>
        <Button
          endIcon={<ArrowCircleRight />}
          style={{
            color: 'white',
            fontWeight: '700',
            fontSize: '1.2rem',
          }}
          onClick={() => handleGoToPage(situacao)}
        >
          Mais informações
        </Button>
      </div>
    </div>
  );
}
