import { CalculateRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import useGeral from '../../../hooks/useGeral';

function EditContractForm({ contrato, removeContrato }) {
  const { user, initForms, form, setForm } = useGeral();

  useEffect(() => {
    init();
    return;
  }, []);

  function init() {
    setForm(initForms.contrato);
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
    console.log(calculo);
    setForm({ ...form, comissao: calculo / 100 });
    return;
  };

  return (
    <form className='form' onSubmit={(e) => handleSubmitForm(e)}>
      <div className='form-control'>
        <label className='input-label'>Controle</label>
        <input
          className='input-form'
          type='text'
          name='nrcontrole'
          defaultValue={contrato.nrcontrole}
          placeholder={'Geração automática'}
          disabled
        />
      </div>

      <div className='form-control'>
        <label className='input-label'>Contrato</label>
        <input
          className='input-form'
          type='text'
          name='nrcontrato'
          defaultValue={contrato.nrcontrato}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
          placeholder='Número do contrato | ADE'
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Data digitação</label>
        <input
          className='input-form'
          type='date'
          name='digitacao'
          defaultValue={contrato.digitacao}
          disabled
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Data Finalização</label>
        <input
          className='input-form'
          type='date'
          name='finalizacao'
          defaultValue={contrato.finalizacao}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Prazo</label>
        <input
          className='input-form'
          type='number'
          name='prazo'
          defaultValue={contrato.prazo}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Total</label>
        <input
          className='input-form'
          type='number'
          name='total'
          defaultValue={contrato.total}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Parcela</label>
        <input
          className='input-form'
          type='number'
          name='parcela'
          defaultValue={contrato.parcela}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Líquido</label>
        <input
          className='input-form'
          type='number'
          name='liquido'
          value={contrato.liquido}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
      </div>
      {handleLevel() && (
        <>
          <div className='form-control'>
            <label className='input-label'>Referência</label>
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
          <div className='form-control'>
            <label className='input-label'>Tabela</label>
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
          <div className={`form-control`}>
            <label className='input-label'>Percentual</label>
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
          <div className={`form-control`}>
            <label className='input-label'>Comissão</label>
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
        </>
      )}
      <div className='form-control'>
        <label className='input-label'>Operação</label>
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
      <div className='form-control'>
        <label className='input-label'>Financeira</label>
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
      <div className='form-control'>
        <label className='input-label'>Correspondente</label>
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
      <div className='form-control'>
        <label className='input-label'>Situação</label>
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
      <div className='form-control'>
        <label className='input-label'>Órgão</label>
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
      <div className='form-control'>
        <label className='input-label'>Observações</label>
        <textarea
          name='observacoes'
          rows={5}
          defaultValue={!contrato.observacoes && 'Nenhuma'}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        ></textarea>
      </div>
      <div className='form-control'>
        <button
          type='submit'
          className='form-button success'
          onClick={() => handleSubmitForm()}
        >
          Atualizar
        </button>
        <button type='reset' className='form-button cancel'>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default EditContractForm;
