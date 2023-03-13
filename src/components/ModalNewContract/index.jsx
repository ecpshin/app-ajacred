import './styles.css';
import { Box, IconButton, Modal } from '@mui/material';
import CalculateRounded from '@mui/icons-material/CalculateRounded';
import { useEffect } from 'react';
import useGeral from '../../hooks/useGeral';

export default function ModalNewContract({ openNew, setOpenNew }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '900px',
    backgroundColor: '#fff',
    padding: '10px',
    border: '1px solid transparent',
    borderRadius: '10px',
    overflow: 'hidden',
    overflowY: 'scroll',
  };
  const { user, form, setForm, initForms } = useGeral();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setOpenNew(false);
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

  function handleClose() {
    setOpenNew(false);
  }

  function handleHide(nivel) {
    // console.log(nivel)
    return 'hide';
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
      setForm({ ...initForms.contrato });
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Modal
      open={openNew}
      onClose={handleClose}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box style={style}>
        <h1 className='box-title'>Contrato Novo</h1>
        <form className='form' onSubmit={(e) => handleSubmitForm(e)}>
          <div className='form-control'>
            <label className='input-label'>Controle</label>
            <input
              className='input-form'
              type='text'
              name='nrcontrole'
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              defaultValue={form.nrcontrole}
              placeholder={'Geração automática'}
            />
          </div>

          <div className='form-control'>
            <label className='input-label'>Contrato</label>
            <input
              className='input-form'
              type='text'
              name='nrcontrato'
              defaultValue={form.nrcontrato}
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
              defaultValue={form.digitacao}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label className='input-label'>Data Finalização</label>
            <input
              className='input-form'
              type='date'
              name='finalizacao'
              defaultValue={form.finalizacao}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label className='input-label'>Prazo</label>
            <input
              className='input-form'
              type='number'
              name='prazo'
              defaultValue={form.prazo}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label className='input-label'>Total</label>
            <input
              className='input-form'
              type='number'
              name='total'
              defaultValue={form.total}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label className='input-label'>Parcela</label>
            <input
              className='input-form'
              type='number'
              name='parcela'
              defaultValue={form.parcela}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label className='input-label'>Líquido</label>
            <input
              className='input-form'
              type='number'
              name='liquido'
              value={form.liquido}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            />
          </div>
          <div className='form-control'>
            <label className='input-label'>Referência</label>
            <select
              className='select-form'
              name='referencia'
              defaultValue={form.referencia}
              onChange={(e) => handleSelectItem(e.target.name, e.target.value)}
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
              defaultValue={form.tabela}
            >
              <option value={form.tabela}>{form.tabela}.</option>
              <option value={'NORMAL'}>NORMAL</option>
              <option value={'FLEX'}>FLEX</option>
            </select>
          </div>

          <div className={`form-control ${handleHide(user.nivel)}`}>
            <label className='input-label'>Percentual</label>
            <input
              className='input-form'
              type='number'
              name='percentual'
              step={0.1}
              defaultValue={form.percentual}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              onBlur={() => handleCalcularComissao()}
            />
          </div>
          <div
            className={`form-control ${user.nivel === 'ROLE_ADMIN' && 'hide'}`}
          >
            <label className='input-label'>Comissão</label>
            <div className='form-group'>
              <input
                className='input-form comissao'
                name='comissao'
                type='number'
                defaultValue={form.comissao}
                onChange={(e) =>
                  handleInputChange(e.target.name, e.target.value)
                }
              />
              <IconButton>
                <CalculateRounded style={{ fontSize: '38px', color: '#667' }} />
              </IconButton>
            </div>
          </div>
          <div className='form-control'>
            <label className='input-label'>Operação</label>
            <select
              className='select-form'
              name='operacao'
              defaultValue={form.operacao}
            >
              <option value={''}>Selecione...</option>
              <option value={'NOVO'}>NOVO</option>
              <option value={'PORTABILIDADE'}>PORTABILIDADE.</option>
            </select>
          </div>
          <div className='form-control'>
            <label className='input-label'>Financeira</label>
            <select
              className='select-form'
              name='financeira'
              defaultValue={form.financeira}
            >
              <option value={''}>Selecione...</option>
              <option value={'OLE'}>APROVADO</option>
              <option value={'ITAU'}>CANCELADO.</option>
            </select>
          </div>
          <div className='form-control'>
            <label className='input-label'>Correspondente</label>
            <select className='select-form' name='correspondente'>
              <option value={''}>Selecione...</option>
              <option value={'AJACRED'}>AJACRED</option>
              <option value={'MEGA PROMOTORA'}>MEGA PROMOTORA</option>
              <option value={'BEVICRED'}>BEVICRED</option>
            </select>
          </div>
          <div className='form-control'>
            <label className='input-label'>Situação</label>
            <select className='select-form' name='situacao'>
              <option value={''}>Selecione...</option>
              <option value={'APROVADO'}>APROVADO</option>
              <option value={'CANCELADO'}>CANCELADO.</option>
            </select>
          </div>
          <div className='form-control'>
            <label className='input-label'>Órgão</label>
            <select className='select-form' name='orgao'>
              <option value={''}>Selecione...</option>
              <option value={'INSS'}>INSS</option>
            </select>
          </div>
          <div className='form-control'>
            <label className='input-label'>Observações</label>
            <textarea
              name='observacoes'
              rows={5}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            >
              {form.observacoes}
            </textarea>
          </div>
          <div className='form-control'>
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
      </Box>
    </Modal>
  );
}
