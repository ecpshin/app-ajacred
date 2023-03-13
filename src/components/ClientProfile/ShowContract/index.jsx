import './styles.css';
import useGeral from '../../../hooks/useGeral';
import PersonPinIcon from '@mui/icons-material/PersonPin';

function content(string) {
  return !string || string.length === 0 ? 'Sem observações' : string;
}

function VisualizarContrato({ contrato, removeContrato }) {
  const { dateFormulario, toCurrencyReal } = useGeral();
  return (
    <div className='show-contract'>
      <div className='fields-row'>
        <div className='field-person'>
          <PersonPinIcon
            style={{
              fontSize: '3rem',
              color: 'hsla(21, 100%, 49%, 1)',
              marginRight: '1rem',
            }}
          />
          <h2>{contrato.nome}</h2>
        </div>
      </div>
      <div className='fields-row'>
        <div className='field-control'>
          <label className='field-label'>Controle</label>
          <span className='fields'>{contrato.nrcontrole}</span>
        </div>
        <div className='field-control'>
          <label className='field-label'>Contrato</label>
          <span className='fields'>{contrato.nrcontrato}</span>
        </div>
        <div className='field-control'>
          <label className='field-label'>Digitado</label>
          <span className='fields field-date'>
            {dateFormulario(contrato.digitacao)}
          </span>
        </div>
        <div className='field-control'>
          <label className='field-label'>Finalizado</label>
          <span className='fields field-date'>
            {dateFormulario(contrato.finalizacao)}
          </span>
        </div>
      </div>
      <div className='fields-row'>
        <div className='field-control'>
          <label className='field-label'>Prazo</label>
          <span className='fields field-valor'>{contrato.prazo}</span>
        </div>
        <div className='field-control'>
          <label className='field-label'>Total</label>
          <span className='fields field-valor'>
            {toCurrencyReal(contrato.total)}
          </span>
        </div>
        <div className='field-control'>
          <label className='field-label'>Parcela</label>
          <span className='fields field-valor'>
            {toCurrencyReal(contrato.parcela)}
          </span>
        </div>
        <div className='field-control'>
          <label className='field-label'>Líquido</label>
          <span className='fields field-valor'>
            {toCurrencyReal(contrato.liquido)}
          </span>
        </div>
      </div>
      <div className='fields-row'>
        <div className='field-control'>
          <label className='field-label'>Operação</label>
          <span className='fields'>{contrato.operacao}</span>
        </div>
        <div className='field-control'>
          <label className='field-label'>Financeira</label>
          <span className='fields'>{contrato.nome_financeira}</span>
        </div>
      </div>
      <div className='fields-row'>
        <div className='field-control'>
          <label className='field-label'>Correspondente</label>
          <span className='fields'>{contrato.nome_correspondente} </span>
        </div>
        <div className='field-control'>
          <label className='field-label'>Situação</label>
          <span className='fields'>{contrato.situacao}</span>
        </div>
      </div>
      <div className='field-control'>
        <label className='field-label'>Órgão</label>
        <span className='fields'>{contrato.nome_orgao} </span>
      </div>
      <div className='field-control'>
        <label className='field-label'>Observações</label>
        <textarea
          className='fields'
          value={content(contrato.observacoes)}
          style={{ background: 'none' }}
          disabled
        ></textarea>
      </div>
    </div>
  );
}

export default VisualizarContrato;
