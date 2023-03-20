import './styles.css';
import api from '../../../service/api';
import {
  BtnPremium,
  LabelCustom,
  OptionCustom,
  SelectCustom,
  TextAreaCustom,
} from '../../../components/styleds/buttons';
import useGeral from '../../../hooks/useGeral';

import PersonPinIcon from '@mui/icons-material/PersonPin';
import { useEffect, useState, useReducer } from 'react';

function content(string) {
  return !string || string.length === 0 ? 'Sem observações' : string;
}

function VisualizarContrato({ contrato, removeContrato }) {
  const { dateFormulario, toCurrencyReal, token } = useGeral();
  const [form, setForm] = useState({ situacao: '', observacoes: '' });
  const [listaSituacoes, setListaSituacoes] = useState([]);
  const [reducerValue, forceReducer] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    handleListaSituacoes();
    return;
  }, [listaSituacoes, reducerValue]);

  const handleChangeData = (prop, value) => {
    setForm({ ...form, [prop]: value });
    return;
  };

  const handleListaSituacoes = async () => {
    try {
      const response = await api.get('/situacoes');
      setListaSituacoes(response.data);
      return;
    } catch (err) {
      console.error(err.response.message);
    }
  };

  const handleSubmit = async (pid) => {
    try {
      const response = await api.patch(`/contratos/${pid}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleListaSituacoes();
      forceReducer();
      return;
    } catch (error) {}
    return;
  };

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
          <LabelCustom>Controle</LabelCustom>
          <span className='fields'>{contrato.nrcontrole}</span>
        </div>
        <div className='field-control'>
          <LabelCustom>Contrato</LabelCustom>
          <span className='fields'>{contrato.nrcontrato}</span>
        </div>
        <div className='field-control'>
          <LabelCustom>Digitado</LabelCustom>
          <span className='fields field-date'>
            {dateFormulario(contrato.digitacao)}
          </span>
        </div>
        <div className='field-control'>
          <LabelCustom>Finalizado</LabelCustom>
          <span className='fields field-date'>
            {dateFormulario(contrato.finalizacao)}
          </span>
        </div>
      </div>
      <div className='fields-row'>
        <div className='field-control'>
          <LabelCustom>Prazo</LabelCustom>
          <span className='fields field-valor'>{contrato.prazo}</span>
        </div>
        <div className='field-control'>
          <LabelCustom>Total</LabelCustom>
          <span className='fields field-valor'>
            {toCurrencyReal(contrato.total)}
          </span>
        </div>
        <div className='field-control'>
          <LabelCustom>Parcela</LabelCustom>
          <span className='fields field-valor'>
            {toCurrencyReal(contrato.parcela)}
          </span>
        </div>
        <div className='field-control'>
          <LabelCustom>Líquido</LabelCustom>
          <span className='fields field-valor'>
            {toCurrencyReal(contrato.liquido)}
          </span>
        </div>
      </div>
      <div className='fields-row'>
        <div className='field-control'>
          <LabelCustom>Operação</LabelCustom>
          <span className='fields'>{contrato.operacao}</span>
        </div>
        <div className='field-control'>
          <LabelCustom>Financeira</LabelCustom>
          <span className='fields'>{contrato.nome_financeira}</span>
        </div>
      </div>
      <div className='fields-row'>
        <div className='field-control'>
          <LabelCustom>Correspondente</LabelCustom>
          <span className='fields'>{contrato.nome_correspondente}</span>
        </div>
        <div className='field-control'>
          <LabelCustom>Situação*</LabelCustom>
          <SelectCustom
            name='situacao'
            defaultValue={contrato.situacao}
            onChange={(e) => handleChangeData('situacao', e.target.value)}
          >
            <OptionCustom value='{contrato.situacao}'>
              {contrato.situacao}
            </OptionCustom>
            {listaSituacoes.map((item) => (
              <OptionCustom key={item.id} value={item.id}>
                {item.descricao}
              </OptionCustom>
            ))}
          </SelectCustom>
        </div>
      </div>
      <div className='fields-row'>
        <div className='field-control'>
          <LabelCustom>Órgão</LabelCustom>
          <span className='fields'>{contrato.nome_orgao} </span>
        </div>
        <div className='field-control'>
          <LabelCustom>Observações*</LabelCustom>
          <TextAreaCustom
            className='fields'
            defaultValue={content(contrato.observacoes)}
            onChange={(e) => handleChangeData('observacoes', e.target.value)}
          ></TextAreaCustom>
        </div>
      </div>
      <div className='fields-row'>
        <BtnPremium type='submit' onClick={() => handleSubmit(contrato.pid)}>
          Atualizar
        </BtnPremium>
      </div>
    </div>
  );
}

export default VisualizarContrato;
