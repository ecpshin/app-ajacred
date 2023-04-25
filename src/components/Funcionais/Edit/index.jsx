import { DialogActions, DialogContent, TextareaAutosize } from '@mui/material';
import useGeral from '../../../hooks/useGeral';

const styles = {
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    border: '1px solid #ccc',
  },
  actions: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '1rem 2rem',
  },
  buttonCancel: {
    width: '120px',
    height: '35px',
    border: 'none',
    backgroundColor: 'grey',
    color: '#fff',
    borderRadius: '5px',
    fontSize: '1.4rem',
    fontWeight: '600',
  },
  buttonSuccess: {
    width: '120px',
    height: '35px',
    border: 'none',
    backgroundColor: '#fa5700',
    color: '#fff',
    borderRadius: '5px',
    fontSize: '1.4rem',
    fontWeight: '600',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '0.8rem',
  },

  titles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    color: '#fa5700',
    fontSize: '1.8rem',
    fontWeight: '600',
    margin: '35px 0 20px 0',
    textTransform: 'uppercase',
  },
};

export default function EditFuncionais({ funcional, setOpen }) {
  const { cliente, useState } = useGeral();
  const { nrbeneficio, emails, senhas, phone1, phone2, phone3, phone4 } =
    funcional;
  const [form, setForm] = useState({
    nrbeneficio,
    emails,
    senhas,
    phone1,
    phone2,
    phone3,
    phone4,
  });

  function handleChange(prop, event) {
    const { value } = event.target;
    setForm({ ...form, [prop]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(form, cliente.id);
  }

  return (
    <div>
      <h3 style={styles.titles}>Editar informações funcionais</h3>
      <form onSubmit={handleSubmit} className='form-box'>
        <div className='form-box-row'>
          <div className='form-box-group'>
            <label>Benefícios</label>
            <TextareaAutosize
              minRows={3}
              onChange={(e) => handleChange('nrbeneficio', e)}
              defaultValue={form.nrbeneficio}
            />
          </div>
          <div className='form-box-group'>
            <label style={styles.label}>Emails</label>
            <TextareaAutosize
              minRows={3}
              onChange={(e) => handleChange('emails', e)}
              defaultValue={form.emails}
            />
          </div>
          <div className='form-box-group'>
            <label style={styles.label}>Senhas</label>
            <TextareaAutosize
              minRows={3}
              onChange={(e) => handleChange('senhas', e)}
              defaultValue={form.senhas}
            />
          </div>
        </div>
        <div className='form-box-row'>
          <div className='form-box-group'>
            <label style={styles.label}>Principal</label>
            <input
              type='text'
              onChange={(e) => handleChange('phone1', e)}
              defaultValue={form.phone1}
            />
          </div>
          <div className='form-box-group'>
            <label style={styles.label}>Recado</label>
            <input
              type='text'
              onChange={(e) => handleChange('phone2', e)}
              defaultValue={form.phone2}
            />
          </div>
        </div>
        <div className='form-box-row'>
          <div className='form-box-group'>
            <label style={styles.label}>Contato 3</label>
            <input
              type='text'
              onChange={(e) => handleChange('phone3', e)}
              defaultValue={form.phone3}
            />
          </div>
          <div className='form-box-group'>
            <label style={styles.label}>Contato 4</label>
            <input
              type='text'
              onChange={(e) => handleChange('phone4', e)}
              defaultValue={form.phone4}
            />
          </div>
        </div>
        <DialogActions style={styles.actions}>
          <button style={styles.buttonCancel} onClick={() => setOpen(false)}>
            Cancelar
          </button>
          <button style={styles.buttonSuccess} onClick={handleSubmit}>
            Salvar
          </button>
        </DialogActions>
      </form>
    </div>
  );
}
