import { DialogActions, DialogTitle } from '@mui/material';
import useGeral from '../../../hooks/useGeral';

const styles = {
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
    padding: '5px',
    textTransform: 'uppercase',
  },
};

export default function EditResidencial({ residencial, setOpen }) {
  const { useState, setResidenciais, removeResidenciais } = useGeral();
  const { cep, logradouro, complemento, bairro, municipio, uf } = residencial;
  const [form, setForm] = useState({
    cep,
    logradouro,
    complemento,
    bairro,
    municipio,
    uf,
  });

  async function handleSearch(e) {
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${e.target.value}/json`
      );
      response.json().then(function (data) {
        const { cep, logradouro, complemento, bairro, localidade, uf } = data;
        setForm({
          ...form,
          cep,
          logradouro,
          complemento,
          bairro,
          municipio: localidade,
          uf,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleChangeCep(value) {
    setForm({ ...form, cep: value });
  }

  function handleChangeValue(prop, value) {
    setForm({ ...form, [prop]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    removeResidenciais();
    setResidenciais(form);
    setOpen(false);
  }

  return (
    <div>
      <DialogTitle textTransform={'uppercase'} sx={styles.titles}>
        Editar informações Residenciais
      </DialogTitle>
      <form onSubmit={(e) => e.preventDefault()} className='form-box'>
        <div className='form-box-row'>
          <div className='form-box-group' style={{ width: '120px' }}>
            <label style={styles.label}>CEP</label>
            <input
              type='text'
              value={form.cep}
              onChange={(e) => handleChangeCep(e.target.value)}
              placeholder='Cep'
              onBlur={(e) => handleSearch(e)}
            />
          </div>
          <div className='form-box-group'>
            <label style={styles.label}>Logradouro</label>
            <input
              type='text'
              value={form.logradouro}
              onChange={(e) => handleChangeValue('logradouro', e.target.value)}
              placeholder='Endereço'
            />
          </div>
          <div className='form-box-group'>
            <label style={styles.label}>Complemento</label>
            <input
              type='text'
              value={form.complemento}
              onChange={(e) => handleChangeValue('complemento', e.target.value)}
              placeholder='Complemento'
            />
          </div>
        </div>
        <div className='form-box-row'>
          <div className='form-box-group'>
            <label style={styles.label}>Bairro</label>
            <input
              type='text'
              value={form.bairro}
              onChange={(e) => handleChangeValue('bairro', e.target.value)}
              placeholder='Bairro'
            />
          </div>
          <div className='form-box-group'>
            <label style={styles.label}>Cidade</label>
            <input
              type='text'
              value={form.municipio}
              onChange={(e) => handleChangeValue('municipio', e.target.value)}
              placeholder='Cidade'
            />
          </div>
          <div className='form-box-group' style={{ width: '100px' }}>
            <label style={styles.label}>UF</label>
            <input
              type='text'
              value={form.uf}
              onChange={(e) => handleChangeValue('uf', e.target.value)}
              placeholder='UF'
              aria-label='UF'
            />
          </div>
        </div>
        <DialogActions style={styles.actions}>
          <button onClick={() => setOpen(false)} style={styles.buttonCancel}>
            Cancelar
          </button>
          <button onClick={handleSubmit} style={styles.buttonSuccess}>
            Salvar
          </button>
        </DialogActions>
      </form>
    </div>
  );
}
