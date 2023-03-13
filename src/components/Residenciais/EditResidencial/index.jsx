import { Search } from '@mui/icons-material';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  InputBase,
  SvgIcon,
} from '@mui/material';
import useGeral from '../../../hooks/useGeral';
import viaCepApi from '../../../service/viacep';

const styles = {
  form: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  actions: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #ccc',
    padding: '1rem 2rem',
  },
  buttonCancel: {
    width: '75px',
    height: '35px',
    border: 'none',
    backgroundColor: 'grey',
    color: '#fff',
    borderRadius: '5px',
  },
  buttonSuccess: {
    width: '75px',
    height: '35px',
    border: 'none',
    backgroundColor: '#fa5700',
    color: '#fff',
    borderRadius: '5px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '0.8rem',
  },
  inputs: {
    width: '100%',
    height: '35px',
    padding: '0 1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  inputSearch: {
    width: '30%',
    height: '35px',
    padding: '0 1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  label: {
    color: '#fa5700',
  },
  titles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    color: '#fa5700',
    fontSize: '1.8rem',
    fontWeight: '600',
    borderBottom: '1px solid #ccc',
    padding: '5px',
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
    e.preventDefault();
    form.cep.replace('-', '');
    try {
      const response = await viaCepApi.get(`/${form.cep}/json`);

      const { cep, logradouro, complemento, bairro, localidade, uf } =
        response.data;
      setForm({
        ...form,
        cep,
        logradouro,
        complemento,
        bairro,
        municipio: localidade,
        uf,
      });
      console.log(form);
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
      <DialogTitle sx={styles.titles}>
        Editar informações Residenciais
      </DialogTitle>
      <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
        <DialogContent style={styles.content}>
          <label style={styles.label}>CEP</label>
          <InputBase
            type='text'
            placeholder='Cep'
            onChange={(e) => handleChangeCep(e.target.value)}
            style={styles.inputs}
            value={form.cep}
            endAdornment={
              <SvgIcon
                component={Search}
                onClick={(e) => handleSearch(e)}
                style={{ cursor: 'pointer' }}
              />
            }
          />
          <label style={styles.label}>Logradouro</label>
          <InputBase
            type='text'
            value={form.logradouro}
            onChange={(e) => handleChangeValue('logradouro', e.target.value)}
            placeholder='Endereço'
            style={styles.inputs}
          />
          <label style={styles.label}>Complemento</label>
          <InputBase
            type='text'
            value={form.complemento}
            onChange={(e) => handleChangeValue('complemento', e.target.value)}
            placeholder='Complemento'
            style={styles.inputs}
          />
          <label style={styles.label}>Bairro</label>
          <InputBase
            type='text'
            value={form.bairro}
            onChange={(e) => handleChangeValue('bairro', e.target.value)}
            placeholder='Bairro'
            style={styles.inputs}
          />
          <label style={styles.label}>Cidade</label>
          <InputBase
            type='text'
            value={form.municipio}
            onChange={(e) => handleChangeValue('municipio', e.target.value)}
            placeholder='Cidade'
            style={styles.inputs}
          />
          <label style={styles.label}>UF</label>
          <InputBase
            type='text'
            value={form.uf}
            onChange={(e) => handleChangeValue('uf', e.target.value)}
            placeholder='UF'
            style={styles.inputs}
            aria-label='UF'
          />
        </DialogContent>
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
