import { CalculateRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import useGeral from '../../../hooks/useGeral';

function NewContractForm() {
  const { user, initForms } = useGeral();
  const [localForm, setLocalForm] = useState(initForms.contrato);
  const inputComissao = document.querySelector('.comissao');

  function handleLevel() {
    return user.nivel === 'ROLE_ADMIN';
  }

  async function handleSubmitlocalForm() {
    console.log(localForm);
    return;
  }

  function handleInputChange(prop, value) {
    setLocalForm({ ...localForm, [prop]: value });
    return;
  }

  function handleSelectItem(prop, value) {
    !value && window.alert(`Selecione ${prop.toUpperCase()}`);
    setLocalForm({ ...localForm, [prop]: value });
    return;
  }

  function handleCalcularComissao() {
    const calculo =
      localForm.referencia === 'TOTAL'
        ? Number(localForm.total) * Number(localForm.percentual)
        : Number(localForm.liquido) * Number(localForm.percentual);
    localForm.comissao = calculo / 100;
    inputComissao.value = calculo / 100;

    return;
  }

  return (
    <form className='form' onSubmit={(e) => handleSubmitlocalForm(e)}>
      <div className='form-control'>
        <label className='input-label'>Controle</label>
        <input
          className='input-form'
          type='text'
          name='nrcontrole'
          onChange={(e) => handleInputChange('nrcontrole', e.target.value)}
          defaultValue={localForm.nrcontrole}
          placeholder={'Geração automática'}
        />
      </div>

      <div className='form-control'>
        <label className='input-label'>Contrato</label>
        <input
          className='input-form'
          type='text'
          name='nrcontrato'
          defaultValue={localForm.nrcontrato}
          onChange={(e) => handleInputChange('nrcontrato', e.target.value)}
          placeholder='Número do contrato | ADE'
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Data digitação</label>
        <input
          className='input-form'
          type='date'
          name='digitacao'
          defaultValue={localForm.digitacao}
          onChange={(e) => handleInputChange('digitacao', e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Data Finalização</label>
        <input
          className='input-form'
          type='date'
          name='finalizacao'
          defaultValue={localForm.finalizacao}
          onChange={(e) => handleInputChange('finalizacao', e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Prazo</label>
        <input
          className='input-form'
          type='number'
          name='prazo'
          defaultValue={localForm.prazo}
          onChange={(e) => handleInputChange('prazo', e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Total</label>
        <input
          className='input-form'
          type='number'
          name='total'
          defaultValue={localForm.total}
          onChange={(e) => handleInputChange('total', e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Parcela</label>
        <input
          className='input-form'
          type='number'
          name='parcela'
          defaultValue={localForm.parcela}
          onChange={(e) => handleInputChange('parcela', e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Líquido</label>
        <input
          className='input-form'
          type='number'
          name='liquido'
          defaultValue={localForm.liquido}
          onChange={(e) => handleInputChange('liquido', e.target.value)}
        />
      </div>
      {handleLevel() && (
        <>
          <div className='form-control'>
            <label className='input-label'>Referência</label>
            <select
              className='select-form'
              name='referencia'
              defaultValue={localForm.referencia}
              onChange={(e) => handleSelectItem('referencia', e.target.value)}
            >
              <option value=''>Selecione</option>
              <option value='LIQUIDO'>LIQUIDO</option>
              <option value='TOTAL'>TOTAL</option>
            </select>
          </div>
          <div className='form-control'>
            <label className='input-label'>Tabela</label>
            <select
              className='select-form'
              name='tabela'
              value={localForm.tabela}
              onChange={(e) => handleSelectItem('tabela', e.target.value)}
            >
              <option value={''}>Selecione...</option>
              <option value={'NORMAL'}>NORMAL</option>
              <option value={'FLEX'}>FLEX</option>
            </select>
          </div>
          <div className='form-control'>
            <label className='input-label'>Percentual</label>
            <input
              className='input-form'
              type='number'
              name='percentual'
              step={0.1}
              defaultValue={localForm.percentual}
              onChange={(e) => handleInputChange('percentual', e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label className='input-label'>Comissão</label>
            <div className='form-group'>
              <input
                className='input-form comissao'
                name='comissao'
                type='number'
                defaultValue={0}
                onChange={(e) => handleInputChange('comissao', e.target.value)}
              />
              <IconButton onClick={() => handleCalcularComissao()}>
                <CalculateRounded style={{ fontSize: '38px', color: '#667' }} />
              </IconButton>
            </div>
          </div>
        </>
      )}
      <div className='form-control'>
        <label className='input-label'>Operação</label>
        <select
          className='select-form'
          name='operacao'
          defaultValue={localForm.operacao}
          onChange={(e) => handleSelectItem('operacao', e.target.value)}
        >
          <option value=''>Selecione...</option>
          <option value={'NOVO'}>NOVO</option>
          <option value={'PORTABILIDADE'}>PORTABILIDADE.</option>
        </select>
      </div>
      <div className='form-control'>
        <label className='input-label'>Financeira</label>
        <select
          className='select-form'
          name='financeira'
          defaultValue={localForm.financeira}
          onChange={(e) => handleSelectItem('financeira', e.target.value)}
        >
          <option value=''>Selecione...</option>
          <option value={'OLE'}>APROVADO</option>
          <option value={'ITAU'}>CANCELADO.</option>
        </select>
      </div>
      <div className='form-control'>
        <label className='input-label'>Correspondente</label>
        <select
          className='select-form'
          name='correspondente'
          defaultValue={localForm.nome_correspondente}
          onChange={(e) => handleSelectItem('correspondente', e.target.value)}
        >
          <option value=''>Selecione...</option>
          <option value={'AJACRED'}>AJACRED</option>
          <option value={'MEGA PROMOTORA'}>MEGA PROMOTORA</option>
          <option value={'BEVICRED'}>BEVICRED</option>
        </select>
      </div>
      <div className='form-control'>
        <label className='input-label'>Situação</label>
        <select
          className='select-form'
          name='situacao'
          defaultValue={localForm.situacao}
          onChange={(e) => handleSelectItem('situacao', e.target.value)}
        >
          <option value=''>Selecione...</option>
          <option value={'DIGITADO'}>DIGITADO</option>
          <option value={'APROVADO'}>APROVADO</option>
          <option value={'CANCELADO'}>CANCELADO.</option>
        </select>
      </div>
      <div className='form-control'>
        <label className='input-label'>Órgão</label>
        <select
          className='select-form'
          name='orgao'
          defaultValue={localForm.orgao}
          onChange={(e) => handleSelectItem('orgao', e.target.value)}
        >
          <option value=''>Selecione...</option>
          <option value={localForm.nome_orgao}>{localForm.nome_orgao}</option>
          <option value={'INSS'}>INSS</option>
        </select>
      </div>
      <div className='form-control'>
        <label className='input-label'>Observações</label>
        <textarea
          name='observacoes'
          rows={5}
          value={localForm.observacoes}
          onChange={(e) => handleInputChange('observacoes', e.target.value)}
        ></textarea>
      </div>
      <div className='form-control'>
        <button
          type='submit'
          className='form-button success'
          onClick={() => handleSubmitlocalForm()}
        >
          Salvar
        </button>
        <button type='reset' className='form-button cancel'>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default NewContractForm;
