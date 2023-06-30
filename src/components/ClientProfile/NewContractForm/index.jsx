import { CalculateRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import useGeral from '../../../hooks/useGeral';
import api from '../../../service/api';
import { useNavigate  } from 'react-router-dom';

function NewContractForm({cliente, handleCloseNew}) {
  const { user, initForms, token } = useGeral();
  const [localForm, setLocalForm] = useState(initForms.contrato);
  const inputComissao = document.querySelector('.comissao');
  const navigate = useNavigate();

  function handleLevel() {
    return user.nivel === 'ROLE_ADMIN';
  }

  async function handleSubmitlocalForm() {

    localForm.cliente = Number(cliente.id);    
    localForm.usuario = Number(user.id);
    
    try {
      const data = {...localForm};
      const response = await api.post('/contratos/create', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if(response.status === 201){
        setLocalForm(initForms.contrato)
        handleCloseNew()
        navigate('/contratos', {replace: true})
        return;
      }

    } catch(error){
      console.log(error.message);
    }
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
    <form className='aja-form' onSubmit={(e)=>e.preventDefault()}>
      <div className='aja-form-row'>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Controle</label>
          <input
            className='input-form'
            type='text'
            name='nrcontrole'
            onChange={(e) => handleInputChange('nrcontrole', e.target.value)}
            defaultValue={localForm.nrcontrole}
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
            defaultValue={localForm.nrcontrato}
            onChange={(e) => handleInputChange('nrcontrato', e.target.value)}
            placeholder='Número do contrato | ADE'
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Data digitação</label>
          <input
            className='input-form'
            type='date'
            name='digitacao'
            defaultValue={localForm.digitacao}
            onChange={(e) => handleInputChange('digitacao', e.target.value)}
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Data Finalização</label>
          <input
            className='input-form'
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
          <input
            className='input-form'
            type='number'
            name='prazo'
            defaultValue={localForm.prazo}
            onChange={(e) => handleInputChange('prazo', e.target.value)}
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Total</label>
          <input
            className='input-form'
            type='number'
            name='total'
            defaultValue={localForm.total}
            onChange={(e) => handleInputChange('total', e.target.value)}
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Parcela</label>
          <input
            className='input-form'
            type='number'
            name='parcela'
            defaultValue={localForm.parcela}
            onChange={(e) => handleInputChange('parcela', e.target.value)}
          />
        </div>
        <div className='aja-form-control'>
          <label className='aja-form-label'>Líquido</label>
          <input
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
              value={localForm.tabela}
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
              defaultValue={localForm.percentual}
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
            <option value={'1'}>NOVO</option>
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
            <option value="1">Olé</option>
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
            <option value={'1'}>Aprovado</option>
            <option value={'3'}>Cancelado</option>
            <option value={'2'}>Digitado</option>
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
            value={localForm.observacoes}
            onChange={(e) => handleInputChange('observacoes', e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className='aja-row-buttons'>
        <button
          type='submit'
          className='form-button success'
          onClick={handleSubmitlocalForm}
        >
          Salvar
        </button>
        <button type='reset' className='form-button cancel' onClick={handleCloseNew}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default NewContractForm;
