import { Cancel, Save } from '@mui/icons-material';
import useGeral from '../../../hooks/useGeral';
import { sexos, estadosCivil } from '../../ListClients/combos';
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
  const { useState, initForms } = useGeral();
  const [pessoais, setPessoais] = useState(initForms.cliente);
  const {
    nome,
    cpf,
    rg,
    expedicao,
    nascimento,
    naturalidade,
    genitora,
    genitor,
    sexo,
    estado_civil,
    observacoes,
  } = cliente;

  const handleOnChange = (prop) => (e) => {
    setPessoais({ ...pessoais, [prop]: e.target.value });
  };

  const handleClear = () => {
    setPessoais({ ...initForms.cliente });
    setOpen(!open);
    return;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleClear();
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
              value={nome}
              onChange={(e) => handleOnChange(e)}
              id='nome'
            />
          </div>
          <div className='form-box-group-2'>
            <div className='form-box-group'>
              <label htmlFor='cpf'>CPF</label>
              <input
                name='cpf'
                type='text'
                value={cpf}
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
                value={rg}
                onChange={(e) => handleOnChange(e)}
                id='rg'
              />
            </div>
            <div className='form-box-group'>
              <label htmlFor='expedicao'>Data de Expedição</label>
              <input
                name='expedicao'
                label='Data de Expedição'
                type='date'
                value={formatarData(expedicao)}
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
                value={formatarData(nascimento)}
                onChange={(e) => handleOnChange(e)}
                id='nascimento'
              />
            </div>
            <div className='form-box-group'>
              <label htmlFor='naturalidade'>Naturalidade - UF</label>
              <input
                name='naturalidade'
                type='text'
                value={naturalidade}
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
              value={genitora}
              onChange={(e) => handleOnChange(e)}
              id='genitora'
            />
          </div>
          <div className='form-box-group'>
            <label htmlFor='genitor'>Nome do Pai</label>
            <input
              name='genitor'
              type='text'
              value={genitor}
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
              defaultValue={sexo}
              onChange={(e) => handleOnChange(e)}
              id='sexo'
            >
              <option value=''>{sexo}</option>
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
              defaultValue={estado_civil}
              onChange={(e) => handleOnChange(e)}
              id='estado_civil'
            >
              <option value=''>{estado_civil}</option>
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
              defaultValue={observacoes}
              onChange={(e) => handleOnChange(e)}
            >
              {observacoes}
            </textarea>
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
