import { CalculateRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useEffect } from 'react';
import useGeral from '../../../hooks/useGeral';
import { BtnCustom, BtnCancel } from '../../styleds/buttons';
import './styles.css';

function EditContractForm({ contrato, removeContrato }) {
  const { user, initForms, form, setForm } = useGeral();

  function init() {
    return setForm(initForms.contrato);
  }

  function handleLevel() {
    return user.nivel === 'ROLE_ADMIN';
  }

  async function handleSubmitForm() {
    window.alert('Submit');
    return;
  }

  function handleInputChange(prop, value) {
    setForm({ ...form, [prop]: value });
    return;
  }

  function handleSelectItem(prop, value) {
    setForm({ ...form, [prop]: value });
    return;
  }

  const handleCalcularComissao = () => {
    const calculo =
      form.referencia === 'TOTAL'
        ? Number(form.total) * Number(form.percentual)
        : Number(form.liquido) * Number(form.percentual);
    setForm({ ...form, comissao: calculo / 100 });
    return;
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className='aja-form' onSubmit={(e) => handleSubmitForm(e)}>
      <div className='aja-form-row'>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Controle</label>
          <input
            className='input-form'
            type='text'
            name='nrcontrole'
            defaultValue={contrato.nrcontrole}
            placeholder={'Geração automática'}
            disabled
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Contrato</label>
          <input
            className='input-form'
            type='text'
            name='nrcontrato'
            defaultValue={contrato.nrcontrato}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            placeholder='Número do contrato | ADE'
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Data digitação</label>
          <input
            className='input-form'
            type='date'
            name='digitacao'
            defaultValue={contrato.digitacao}
            disabled
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Data Finalização</label>
          <input
            className='input-form'
            type='date'
            name='finalizacao'
            defaultValue={contrato.finalizacao}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </div>
      </div>
      <div className='aja-form-row'>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Prazo</label>
          <input
            className='input-form'
            type='number'
            name='prazo'
            defaultValue={contrato.prazo}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Total</label>
          <input
            className='input-form'
            type='number'
            name='total'
            defaultValue={contrato.total}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Parcela</label>
          <input
            className='input-form'
            type='number'
            name='parcela'
            defaultValue={contrato.parcela}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Líquido</label>
          <input
            className='input-form'
            type='number'
            name='liquido'
            value={contrato.liquido}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          />
        </div>
      </div>

      {handleLevel() && (
        <div className='aja-form-row'>
          <div className='aja-form-control'>
            <label className='aja-form-label'>Referência</label>
            <select
              className='select-form'
              name='referencia'
              defaultValue={contrato.referencia}
              onChange={(e) => handleSelectItem(e.target.name, e.target.value)}
            >
              <option value={contrato.referencia}>{contrato.referencia}</option>
              <option value='LIQUIDO'>LIQUIDO</option>
              <option value='TOTAL'>TOTAL</option>
            </select>
          </div>
          <div className='aja-form-control'>
            <label className='aja-form-label'>Tabela</label>
            <select
              className='select-form'
              name='tabela'
              defaultValue={contrato.tabela}
              onSelect={(e) => handleSelectItem(e.target.name, e.target.value)}
            >
              <option value={!contrato.tabela && 'NORMAL'}>
                {!contrato.tabela && 'NORMAL'}
              </option>
              <option value={'NORMAL'}>NORMAL</option>
              <option value={'FLEX'}>FLEX</option>
            </select>
          </div>
          <div className={`aja-form-control`}>
            <label className='aja-form-label'>Percentual</label>
            <input
              className='input-form'
              type='number'
              name='percentual'
              step={0.1}
              defaultValue={contrato.percentual}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              onBlur={() => handleCalcularComissao()}
            />
          </div>
          <div className={`aja-form-control`}>
            <label className='aja-form-label'>Comissão</label>
            <div className='form-group'>
              <input
                className='input-form comissao'
                name='comissao'
                type='number'
                defaultValue={contrato.comissao}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
              <IconButton onClick={handleCalcularComissao}>
                <CalculateRounded style={{ fontSize: '38px', color: '#667' }} />
              </IconButton>
            </div>
          </div>
        </div>
      )}
      <div className='aja-form-row'>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Operação</label>
          <select
            className='select-form'
            name='operacao'
            defaultValue={contrato.operacao}
            onCahnge={(e) => handleSelectItem(e.target.name, e.target.value)}
          >
            <option value={contrato.operacao}>{contrato.operacao}</option>
            <option value={'NOVO'}>NOVO</option>
            <option value={'PORTABILIDADE'}>PORTABILIDADE.</option>
          </select>
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Financeira</label>
          <select
            className='select-form'
            name='financeira'
            defaultValue={contrato.financeira}
            onSelect={(e) => handleSelectItem(e.target.name, e.target.value)}
          >
            <option value={contrato.nome_financeira}>
              {contrato.nome_financeira}
            </option>
            <option value={'OLE'}>APROVADO</option>
            <option value={'ITAU'}>CANCELADO.</option>
          </select>
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Correspondente</label>
          <select
            className='select-form'
            name='correspondente'
            defaultValue={contrato.nome_correspondente}
            onSelect={(e) => handleSelectItem(e.target.name, e.target.value)}
          >
            <option value={contrato.nome_correspondente}>
              {contrato.nome_correspondente}
            </option>
            <option value={'AJACRED'}>AJACRED</option>
            <option value={'MEGA PROMOTORA'}>MEGA PROMOTORA</option>
            <option value={'BEVICRED'}>BEVICRED</option>
          </select>
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Situação</label>
          <select
            className='select-form'
            name='situacao'
            defaultValue={contrato.situacao}
            onSelect={(e) => handleSelectItem(e.target.name, e.target.value)}
          >
            <option value={contrato.situacao}>{contrato.situacao}</option>
            <option value={'APROVADO'}>APROVADO</option>
            <option value={'CANCELADO'}>CANCELADO.</option>
          </select>
        </div>
      </div>
      <div className='aja-form-row'>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Órgão</label>
          <select
            className='select-form'
            name='orgao'
            defaultValue={contrato.orgao}
            onSelect={(e) => handleSelectItem(e.target.name, e.target.value)}
          >
            <option value={contrato.nome_orgao}>{contrato.nome_orgao}</option>
            <option value={'INSS'}>INSS</option>
          </select>
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Observações</label>
          <textarea
            name='observacoes'
            rows={5}
            defaultValue={!contrato.observacoes && 'Nenhuma'}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className='aja-row-buttons'>
        <BtnCustom type='submit' onClick={() => handleSubmitForm()}>
          Atualizar
        </BtnCustom>
        <BtnCancel>Cancelar</BtnCancel>
        {/* <button
          type='submit'
          className='btn-classic'
          onClick={() => handleSubmitForm()}
        >
          Atualizar
          </button> 
          <button type='reset' className='form-button cancel'>
            Cancelar
          </button>
        */}
      </div>
    </form>
  );
}

export default EditContractForm;
