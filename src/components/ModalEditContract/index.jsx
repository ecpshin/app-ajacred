import useModalContext from '../../hooks/useModalContext';
import useGeral from '../../hooks/useGeral';
import { IconButton, Dialog, DialogContent } from '@mui/material';
import Calculadora from '@mui/icons-material/CalculateRounded';
import { useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import './styles.css';

const dateFormulario = (date) => {
  const formatacao = new Date(date).toLocaleDateString('pt-BR', {
    timeZone: 'UTC',
  });
  const a = formatacao.split('/');
  return `${a[2]}-${a[1]}-${a[0]}`;
};

export default function ModalEditContract() {
  const { openEdit, setOpenEdit } = useModalContext();
  const style = {};

  const [contrato, setContrato, removeContrato] = useLocalStorage('contrato');
  const { token, user } = useGeral();
  const [form, setForm] = useState({});
  const [localForm, setLocalForm] = useState({ ...contrato });

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (token) {
      console.log(localForm, form);
    }
    setContrato({});
    removeContrato();
    return;
  };

  function handleInputChange(prop, value) {
    setForm({ ...localForm, [prop]: value });
    return;
  }
  function handleSelectItem(prop, value) {
    setForm({ ...localForm, [prop]: value });
    return;
  }

  function handleHide(nivel) {
    return nivel === 'ROLE_ADMIN' ? true : false;
  }

  const handleCalcularComissao = () => {
    const calculo =
      localForm.referencia === 'TOTAL'
        ? Number(localForm.total) * Number(localForm.percentual)
        : Number(localForm.liquido) * Number(localForm.percentual);
    console.log(calculo);
    setLocalForm({ ...localForm, comissao: calculo / 100 });
    return;
  };

  function handleClose() {
    setOpenEdit(false);
  }

  useEffect(() => {
    function initForm() {
      setForm({
        cliente: 1,
        nrcontrole: '',
        nrcontrato: '',
        digitacao: null,
        finalizacao: null,
        prazo: 0,
        total: 0,
        parcela: 0,
        liquido: 0,
        referencia: '',
        tabela: '',
        percentual: 0,
        comissao: 0,
        observacoes: 'Nenhuma',
        operacao: 1,
        financeira: 1,
        correspondente: 1,
        situacao: 1,
        orgao: 1,
        usuario: user.id,
      });
    }
    initForm();
  }, [user.id]);

  return (
    <Dialog
      open={openEdit}
      onClose={handleClose}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <DialogContent>
        <h1 className='box-title'>Editar Contrato</h1>
        <form className='aja-edit-form' onSubmit={(e) => handleSubmitForm(e)}>
          <div className='aja-form-control'>
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

          <div className='aja-form-control'>
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
          <div className='aja-form-control'>
            <label className='input-label'>Data digitação</label>
            <input
              className='input-form'
              type='date'
              name='digitacao'
              defaultValue={dateFormulario(localForm.digitacao)}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div className='aja-form-control'>
            <label className='input-label'>Data Finalização</label>
            <input
              className='input-form'
              type='date'
              name='finalizacao'
              defaultValue={dateFormulario(localForm.finalizacao)}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div className='aja-form-control'>
            <label className='input-label'>Prazo</label>
            <input
              className='input-form'
              type='number'
              name='prazo'
              defaultValue={localForm.prazo}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div className='aja-form-control'>
            <label className='input-label'>Total</label>
            <input
              className='input-form'
              type='number'
              name='total'
              defaultValue={localForm.total}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div className='aja-form-control'>
            <label className='input-label'>Parcela</label>
            <input
              className='input-form'
              type='number'
              name='parcela'
              defaultValue={localForm.parcela}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div className='aja-form-control'>
            <label className='input-label'>Líquido</label>
            <input
              className='input-form'
              type='number'
              name='liquido'
              value={localForm.liquido}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div className='aja-form-control'>
            <label className='input-label'>Referência</label>
            <select
              className='select-form'
              name='referencia'
              defaultValue={localForm.referencia}
              onChange={(e) => handleSelectItem(e.target.name, e.target.value)}
            >
              <option value=''>Selecione</option>
              <option value='LIQUIDO'>LIQUIDO</option>
              <option value='TOTAL'>TOTAL</option>
            </select>
          </div>
          <div className='aja-form-control'>
            <label className='input-label'>Tabela</label>
            <select
              className='select-form'
              name='tabela'
              defaultValue={localForm.tabela}
            >
              <option value={localForm.tabela}>{localForm.tabela}.</option>
              <option value={'NORMAL'}>NORMAL</option>
              <option value={'FLEX'}>FLEX</option>
            </select>
          </div>

          <div className={`aja-form-control ${handleHide(user.nivel)}`}>
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
          <div
            className={`aja-form-control ${
              user.nivel === 'ROLE_ADMIN' && 'hide'
            }`}
          >
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
                <Calculadora style={{ fontSize: '38px', color: '#667' }} />
              </IconButton>
            </div>
          </div>
          <div className='aja-form-control'>
            <label className='input-label'>Operação</label>
            <select
              className='select-form'
              name='operacao'
              defaultValue={localForm.operacao}
            >
              <option value={''}>Selecione...</option>
              <option value={'NOVO'}>NOVO</option>
              <option value={'PORTABILIDADE'}>PORTABILIDADE.</option>
            </select>
          </div>
          <div className='aja-form-control'>
            <label className='input-label'>Financeira</label>
            <select
              className='select-form'
              name='financeira'
              defaultValue={localForm.financeira}
            >
              <option value={''}>Selecione...</option>
              <option value={'OLE'}>APROVADO</option>
              <option value={'ITAU'}>CANCELADO.</option>
            </select>
          </div>
          <div className='aja-form-control'>
            <label className='input-label'>Correspondente</label>
            <select className='select-form' name='correspondente'>
              <option value={''}>Selecione...</option>
              <option value={'AJACRED'}>AJACRED</option>
              <option value={'MEGA PROMOTORA'}>MEGA PROMOTORA</option>
              <option value={'BEVICRED'}>BEVICRED</option>
            </select>
          </div>
          <div className='aja-form-control'>
            <label className='input-label'>Situação</label>
            <select className='select-form' name='situacao'>
              <option value={''}>Selecione...</option>
              <option value={'APROVADO'}>APROVADO</option>
              <option value={'CANCELADO'}>CANCELADO.</option>
            </select>
          </div>
          <div className='aja-form-control'>
            <label className='input-label'>Órgão</label>
            <select className='select-form' name='orgao'>
              <option value={''}>Selecione...</option>
              <option value={'INSS'}>INSS</option>
            </select>
          </div>
          <div className='aja-form-control'>
            <label className='input-label'>Observações</label>
            <textarea
              name='observacoes'
              rows={5}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            >
              {localForm.observacoes}
            </textarea>
          </div>
          <div className='aja-form-control'>
            <button
              type='submit'
              className='form-button success'
              onClick={(e) => handleSubmitForm(e)}
            >
              Salvar
            </button>
            <button type='reset' className='form-button cancel'>
              Cancelar
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
