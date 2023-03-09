import { CalculateRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import useGeral from '../../../hooks/useGeral';

function NewContractForm() {
  const { user, initForms, form, setForm } = useGeral({});
  const [localForm, setLocalForm] = useState({});

  function handleLevel() {
    return user.nivel === 'ROLE_ADMIN';
  }

  const handleSubmitForm = async () => {
    return;
  };

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

  useEffect(() => {
    function init() {
      setForm(initForms.contrato);
    }
    init();
  }, [initForms.contrato, setForm]);

  return (
    <form className='form' onSubmit={(e) => handleSubmitForm(e)}>
      <div className='form-control'>
        <label className='input-label'>Controle</label>
        <input
          className='input-form'
          type='text'
          name='nrcontrole'
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
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
          defaultValue={localForm.digitacao}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Data Finalização</label>
        <input
          className='input-form'
          type='date'
          name='finalizacao'
          defaultValue={localForm.finalizacao}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Prazo</label>
        <input
          className='input-form'
          type='number'
          name='prazo'
          defaultValue={localForm.prazo}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Total</label>
        <input
          className='input-form'
          type='number'
          name='total'
          defaultValue={localForm.total}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Parcela</label>
        <input
          className='input-form'
          type='number'
          name='parcela'
          defaultValue={localForm.parcela}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label className='input-label'>Líquido</label>
        <input
          className='input-form'
          type='number'
          name='liquido'
          value={localForm.liquido}
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
              defaultValue={localForm.referencia}
              onChange={(e) => handleSelectItem(e.target.name, e.target.value)}
            >
              <option value={localForm.referencia}>
                {localForm.referencia}
              </option>
              <option value='LIQUIDO'>LIQUIDO</option>
              <option value='TOTAL'>TOTAL</option>
            </select>
          </div>
          <div className='form-control'>
            <label className='input-label'>Tabela</label>
            <select
              className='select-form'
              name='tabela'
              defaultValue={localForm.tabela}
              onSelect={(e) => handleSelectItem(e.target.name, e.target.value)}
            >
              <option value={!localForm.tabela && 'NORMAL'}>
                {!localForm.tabela && 'NORMAL'}
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
              defaultValue={localForm.percentual}
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
                defaultValue={localForm.comissao}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
              <IconButton>
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
          onSelect={(e) => handleSelectItem(e.target.name, e.target.value)}
        >
          <option value={localForm.operacao}>{localForm.operacao}.</option>
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
          onSelect={(e) => handleSelectItem(e.target.name, e.target.value)}
        >
          <option value={localForm.nome_financeira}>
            {localForm.nome_financeira}
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
          defaultValue={localForm.nome_correspondente}
          onSelect={(e) => handleSelectItem(e.target.name, e.target.value)}
        >
          <option value={localForm.nome_correspondente}>
            {localForm.nome_correspondente}
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
          defaultValue={localForm.situacao}
          onSelect={(e) => handleSelectItem(e.target.name, e.target.value)}
        >
          <option value={localForm.situacao}>{localForm.situacao}</option>
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
          onSelect={(e) => handleSelectItem(e.target.name, e.target.value)}
        >
          <option value={localForm.nome_orgao}>{localForm.nome_orgao}</option>
          <option value={'INSS'}>INSS</option>
        </select>
      </div>
      <div className='form-control'>
        <label className='input-label'>Observações</label>
        <textarea
          name='observacoes'
          rows={5}
          defaultValue={!localForm.observacoes && 'Nenhuma'}
          onChange={(e) => handleInputChange(e.target.name, e.target.value)}
        ></textarea>
      </div>
      <div className='form-control'>
        <button
          type='submit'
          className='form-button success'
          onClick={() => handleSubmitForm()}
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
