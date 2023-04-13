import { Cancel, Save } from '@mui/icons-material';
import useGeral from '../../../hooks/useGeral';
import { sexos, estadosCivil } from '../../ListClients/combos';
import api from '../../../service/api';

function formatarData(data) {
  const formata = data.split('T');
  return formata[0];
}

const styles = {
  buttonCancel: {
    width: '120px',
    height: '35px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    border: 'none',
    fontSize: '1.6rem',
    backgroundColor: 'grey',
    color: '#fff',
    borderRadius: '5px',
  },
  buttonSuccess: {
    width: '120px',
    height: '35px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    border: 'none',
    fontSize: '1.6rem',
    backgroundColor: '#fa5700',
    color: '#fff',
    borderRadius: '5px',
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
    padding: '10px',
  },
};

export default function EditPessoais({ title, cliente, open, setOpen }) {
  const { useState, initForms, token } = useGeral();
  const [pessoais, setPessoais] = useState(cliente);

  function handleOnChange(e) {
    const prop = e.target.name;
    const value = e.target.value;
    setPessoais({ ...pessoais, [prop]: value });
    return;
  }

  const handleClear = () => {
    setPessoais({ ...initForms.cliente });
    setOpen(!open);
    return;
  };

  const handleSubmit = async () => {
    const { id: _, ...data } = pessoais;
    try {
      const response = await api.patch(
        `/clientes/${pessoais.id}`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      handleClear();
      return;
    } catch (error) {
      console.log(error.message);
    }

    handleClear();
    return;
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className='form-box'>
        <h3
          style={{
            fontSize: '2.6rem',
            textAlign: 'center',
            margin: '1.5rem 0',
          }}
        >
          {title}
        </h3>
        <div className='form-box-row'>
          <div className='form-box-group'>
            <label htmlFor='nome' className='form-box-label'>
              Nome
            </label>
            <input
              name='nome'
              type='text'
              defaultValue={pessoais.nome}
              onChange={(e) => handleOnChange(e)}
              id='nome'
            />
          </div>
          <div className='form-box-group-2'>
            <div className='form-box-group' style={{ width: '120px' }}>
              <label htmlFor='cpf'>CPF</label>
              <input
                name='cpf'
                type='text'
                defaultValue={pessoais.cpf}
                onChange={(e) => handleOnChange(e)}
                id='cpf'
              />
            </div>
            <div className='form-box-group'>
              <label htmlFor='rg'>RG</label>
              <input
                name='rg'
                label='Doc. de Identidade (RG)'
                type='text'
                value={pessoais.rg}
                onChange={(e) => handleOnChange(e)}
                id='rg'
              />
            </div>
            <div className='form-box-group' style={{ width: '120px' }}>
              <label htmlFor='expedicao'>Data de Expedição</label>
              <input
                name='expedicao'
                label='Data de Expedição'
                type='date'
                defaultValue={formatarData(pessoais.expedicao)}
                onChange={(e) => handleOnChange(e)}
                id='expedicao'
              />
            </div>
          </div>
        </div>
        <div className='form-box-row'>
          <div className='form-box-group-2'>
            <div className='form-box-group'>
              <label htmlFor='nascimento'>Data de Nascimento</label>
              <input
                name='nascimento'
                type='date'
                defaultValue={formatarData(pessoais.nascimento)}
                onChange={(e) => handleOnChange(e)}
                id='nascimento'
              />
            </div>
            <div className='form-box-group'>
              <label htmlFor='naturalidade'>Naturalidade - UF</label>
              <input
                name='naturalidade'
                type='text'
                defaultValue={pessoais.naturalidade}
                onChange={(e) => handleOnChange(e)}
                id={'naturalidade'}
                title='Cidade e estado onde nasceu.'
              />
            </div>
          </div>
          <div className='form-box-group'>
            <label htmlFor='genitora'>Nome da Mãe</label>
            <input
              name='genitora'
              type='text'
              defaultValue={pessoais.genitora}
              onChange={(e) => handleOnChange(e)}
              id='genitora'
            />
          </div>
          <div className='form-box-group'>
            <label htmlFor='genitor'>Nome do Pai</label>
            <input
              name='genitor'
              type='text'
              defaultValue={pessoais.genitor}
              onChange={(e) => handleOnChange(e)}
              id='genitor'
            />
          </div>
        </div>
        <div className='form-box-row'>
          <div className='form-box-group'>
            <label htmlFor='sexo'>Sexo</label>
            <select
              name='sexo'
              defaultValue={pessoais.sexo}
              onChange={(e) => handleOnChange(e)}
              id='sexo'
            >
              <option value=''>{pessoais.sexo}</option>
              {sexos.map((sexo) => (
                <option key={sexo.id} value={sexo.descricao}>
                  {sexo.descricao}
                </option>
              ))}
            </select>
          </div>
          <div className='form-box-group'>
            <label htmlFor='estado_civil'>Estado Civil</label>
            <select
              name='estado_civil'
              defaultValue={pessoais.estado_civil}
              onChange={(e) => handleOnChange(e)}
              id='estado_civil'
            >
              <option value=''>{pessoais.estado_civil}</option>
              {estadosCivil.map((ecivil) => (
                <option key={ecivil.id} value={ecivil.descricao}>
                  {ecivil.descricao}
                </option>
              ))}
            </select>
          </div>
          <div className='form-box-group'>
            <label htmlFor='observacoes'>Observações</label>
            <textarea
              name='observacoes'
              id='observacoes'
              defaultValue={pessoais.observacoes}
              onChange={(e) => handleOnChange(e)}
            ></textarea>
          </div>
        </div>
        <div
          className='form-box-group-2'
          style={{
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '1.0rem',
          }}
        >
          <button
            type='submit'
            style={styles.buttonSuccess}
            onClick={() => handleSubmit()}
          >
            <Save style={{ fontSize: '2rem' }} />
            Atualizar
          </button>
          <button
            type='reset'
            style={styles.buttonCancel}
            onClick={() => handleClear()}
          >
            <Cancel style={{ fontSize: '2rem' }} />
            Fechar
          </button>
        </div>
      </form>
    </div>
  );
}
