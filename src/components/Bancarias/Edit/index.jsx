import { DialogActions, DialogTitle } from '@mui/material';
import useGeral from '../../../hooks/useGeral';
import api from '../../../service/api';

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
    margin: '25px 0',
  },
};

export default function EditBancarias({ title, setOpen, bancaria }) {
  const {
    cliente,
    token,
    setBancarias,
    removeBancarias,
    useNavigate,
    useState,
  } = useGeral();
  const [form, setForm] = useState({
    id: bancaria.id,
    codigo: '',
    banco: bancaria.banco,
    agencia: bancaria.agencia,
    conta: bancaria.conta,
    tipo: bancaria.tipo,
    operacao: bancaria.operacao,
    cliente_id: cliente.id,
  });

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(cliente.id);
  }

  const handleChange = (name) => (event) => {
    event.preventDefault();
    setForm({ ...form, [name]: event.target.value });
  };

  const handleSearch = async (e) => {
    try {
      const response = await api.get(`/banco/${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { codigo, nome } = response.data;
      form.banco = `${codigo}-${nome}`;
      removeBancarias();
      setBancarias({ ...form });
      navigate('/cliente');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <DialogTitle id='form-dialog-title' style={styles.titles}>
        Atualizar Informações {title}
      </DialogTitle>
      <form onSubmit={handleSubmit} className='form-box'>
        <div className='form-box-row'>
          <div className='form-box-group' style={{ width: '15%' }}>
            <label htmlFor='banco'>Código</label>
            <input
              id='codigo'
              type='text'
              value={form.codigo}
              onChange={handleChange('codigo')}
              onBlur={(e) => handleSearch(e)}
            />
          </div>
          <div className='form-box-group' style={{ width: '85%' }}>
            <label>Banco</label>
            <input
              id='banco'
              type='text'
              value={form.banco}
              onChange={handleChange('banco')}
            />
          </div>
        </div>
        <div className='form-box-row'>
          <div className='form-box-group' style={{ width: '15%' }}>
            <label>Agência</label>
            <input
              id='agencia'
              type='text'
              value={form.agencia}
              onChange={handleChange('agencia')}
            />
          </div>
          <div className='form-box-group' style={{ width: '35%' }}>
            <label>Conta</label>
            <input
              id='conta'
              type='text'
              value={form.conta}
              onChange={handleChange('conta')}
            />
          </div>
          <div className='form-box-group' style={{ width: '35%' }}>
            <label htmlFor='tipo'>Tipo</label>
            <input
              id='tipo'
              type='text'
              value={form.tipo}
              onChange={handleChange('tipo')}
            />
          </div>
          <div className='form-box-group' style={{ width: '15%' }}>
            <label> Operação</label>
            <input
              id='operacao'
              type='text'
              value={form.operacao}
              onChange={handleChange('operacao')}
            />
          </div>
        </div>
        <DialogActions style={styles.actions}>
          <button onClick={handleSubmit} style={styles.buttonSuccess}>
            Confirmar
          </button>
          <button onClick={() => setOpen(false)} style={styles.buttonCancel}>
            Cancelar
          </button>
        </DialogActions>
      </form>
    </div>
  );
}
