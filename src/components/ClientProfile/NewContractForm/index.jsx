import { CalculateRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import useGeral from '../../../hooks/useGeral';
import { useEffect } from 'react';
import api from '../../../service/api';
import { MyInput } from '../../StyledComponents/components';

function NewContractForm({ id, setIsNew, handleGetContratos }) {
  const { user, initForms, token } = useGeral();
  const [localForm, setLocalForm] = useState(initForms.contrato);
  const inputComissao = document.querySelector('.comissao');

  function handleLevel() {
    return user.nivel === 'ROLE_ADMIN';
  }

  function handleClearForm() {
    setLocalForm(initForms.contrato);
    setIsNew(false);
    return;
  }

  async function handleSubmitlocalForm(e) {
    e.preventDefault();
    const data = { ...localForm, usuario: user.id, cliente: id };
    console.log(data);
    try {
      const response = await api.post('/contrato', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 201) {
        console.log(response.data);
      }
      handleClearForm();
      handleGetContratos();
      return;
    } catch (error) {
      console.error(error.response);
    }
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

  useEffect(() => {}, [id]);

  return (
    <form className='aja-form' onSubmit={(e) => e.preventDefault}>
      <div className='aja-form-row'>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Controle</label>
          <MyInput
            className='input-form'
            type='text'
            name='nrcontrole'
            defaultValue={localForm.nrcontrole}
            onChange={(e) => handleInputChange('nrcontrole', e.target.value)}
            readOnly
            placeholder={'Geração automática'}
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Contrato</label>
          <MyInput
            className='input-form'
            type='text'
            name='nrcontrato'
            defaultValue={localForm.nrcontrato}
            onChange={(e) => handleInputChange('nrcontrato', e.target.value)}
            placeholder='Número do contrato | ADE'
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Data digitação</label>
          <MyInput
            className='input-form'
            type='date'
            name='digitacao'
            defaultValue={localForm.digitacao}
            onChange={(e) => handleInputChange('digitacao', e.target.value)}
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Data Finalização</label>
          <MyInput
            className='MyInput-form'
            type='date'
            name='finalizacao'
            defaultValue={localForm.finalizacao}
            onChange={(e) => handleInputChange('finalizacao', e.target.value)}
          />
        </div>
      </div>
      <div className='aja-form-row'>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Prazo</label>
          <MyInput
            className='input-form'
            type='number'
            name='prazo'
            defaultValue={localForm.prazo}
            onChange={(e) => handleInputChange('prazo', e.target.value)}
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Total</label>
          <MyInput
            className='input-form'
            type='number'
            name='total'
            defaultValue={localForm.total}
            onChange={(e) => handleInputChange('total', e.target.value)}
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Parcela</label>
          <MyInput
            className='input-form'
            type='number'
            name='parcela'
            defaultValue={localForm.parcela}
            onChange={(e) => handleInputChange('parcela', e.target.value)}
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Líquido</label>
          <MyInput
            className='input-form'
            type='number'
            name='liquido'
            defaultValue={localForm.liquido}
            onChange={(e) => handleInputChange('liquido', e.target.value)}
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
              defaultValue={localForm.referencia}
              onChange={(e) => handleSelectItem('referencia', e.target.value)}
            >
              <option value=''>Selecione</option>
              <option value='LIQUIDO'>LIQUIDO</option>
              <option value='TOTAL'>TOTAL</option>
            </select>
          </div>
          <div className='aja-form-control'>
            <label className='aja-form-label'>Tabela</label>
            <select
              className='select-form'
              name='tabela'
              defaultValue={localForm.tabela}
              onChange={(e) => handleSelectItem('tabela', e.target.value)}
            >
              <option value={''}>Selecione...</option>
              <option value={'NORMAL'}>NORMAL</option>
              <option value={'FLEX'}>FLEX</option>
            </select>
          </div>
          <div className='aja-form-control'>
            <label className='aja-form-label'>Percentual</label>
            <input
              className='input-form'
              type='number'
              name='percentual'
              step={0.1}
              value={localForm.percentual}
              onChange={(e) => handleInputChange('percentual', e.target.value)}
            />
          </div>
          <div className='aja-form-control'>
            <label className='aja-form-label'>Comissão</label>
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
        </div>
      )}
      <div className='aja-form-row'>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Operação</label>
          <select
            className='select-form'
            name='operacao'
            defaultValue={localForm.operacao}
            onChange={(e) => handleSelectItem('operacao', e.target.value)}
          >
            <option value=''>Selecione...</option>
            <option value='1'>NOVO</option>
            <option value='2'>PORTABILIDADE.</option>
          </select>
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Financeira</label>
          <select
            className='select-form'
            name='financeira'
            defaultValue={localForm.financeira}
            onChange={(e) => handleSelectItem('financeira', e.target.value)}
          >
            <option value=''>Selecione...</option>
            <option value='1'>BMG</option>
            <option value='2'>OLE</option>
          </select>
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Correspondente</label>
          <select
            className='select-form'
            name='correspondente'
            defaultValue={localForm.nome_correspondente}
            onChange={(e) => handleSelectItem('correspondente', e.target.value)}
          >
            <option value=''>Selecione...</option>
            <option value={'1'}>AJACRED</option>
            <option value={'2'}>MEGA PROMOTORA</option>
            <option value={'3'}>BEVICRED</option>
          </select>
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Situação</label>
          <select
            className='select-form'
            name='situacao'
            defaultValue={localForm.situacao}
            onChange={(e) => handleSelectItem('situacao', e.target.value)}
          >
            <option value=''>Selecione...</option>
            <option value={'1'}>DIGITADO</option>
            <option value={'2'}>APROVADO</option>
            <option value={'3'}>CANCELADO.</option>
          </select>
        </div>
      </div>
      <div className='aja-form-row'>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Órgão</label>
          <select
            className='select-form'
            name='orgao'
            defaultValue={localForm.orgao}
            onChange={(e) => handleSelectItem('orgao', e.target.value)}
          >
            <option value=''>Selecione...</option>
            <option value={'1'}>INSS</option>
          </select>
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Observações</label>
          <textarea
            name='observacoes'
            rows={5}
            defaultValue={localForm.observacoes}
            onChange={(e) => handleInputChange('observacoes', e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className='aja-row-buttons'>
        <button
          type='submit'
          className='form-button success'
          onClick={(e) => handleSubmitlocalForm(e)}
        >
          Salvar
        </button>
        <button
          type='reset'
          className='form-button cancel'
          onClick={() => handleClearForm()}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default NewContractForm;
