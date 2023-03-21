import { useEffect, useState } from 'react';
import { BtnPremium, Wrapper, Row, InputCustom } from '../components';
import { BtnCustom } from '../../../components/styleds/buttons';
import api from '../../../service/api';
import useGeral from '../../../hooks/useGeral';
import { ToastContainer, toast } from 'react-toastify';
import './styles.css';
import { IconButton } from '@mui/material';
import { DeleteForever, Edit } from '@mui/icons-material';

export default function Tipos() {
  const { token } = useGeral();
  const [formTipo, setFormTipo] = useState({ tipo: '' });
  const [edit, setEdit] = useState({ index: 0, tipo: '' });
  const [lista, setLista] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    function load() {
      handleGetTipos();
      return;
    }
    load();
    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleEditSubmit() {
    const local = [...lista];
    local[edit.key] = edit.tipo;
    try {
      const response = await api.patch(
        '/tipos/edit',
        { local },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.mensagem, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        });
      }
      await handleGetTipos();
      setShow(!show);
      return;
    } catch (error) {
      console.error(error);
    }
  }

  async function handleGetTipos() {
    try {
      const response = await api.get('/tipos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLista(response.data);
      setFormTipo({ tipo: '' });
      return;
    } catch (error) {
      console.log(error);
    }
  }

  function handleEdit(key, item) {
    setEdit({ key, tipo: item });
    setShow(!show);
    return;
  }

  function handleEditTipo(valor) {
    setEdit({ ...edit, tipo: valor });
    return;
  }

  function handleChangeInput(valor) {
    setFormTipo({ ...formTipo, tipo: valor });
    return;
  }

  async function handleSubmit() {
    console.log('entrou');
    try {
      const response = await api.post('/tipos', formTipo, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        toast.success(response.data.mensagem, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      console.log(error.response.message);
    }
    setFormTipo({ tipo: '' });
    await handleGetTipos();
    return;
  }

  return (
    <div>
      <Wrapper>
        <div className='container-tipos'>
          <div className='tipos'>
            <div className='tipos-header'>
              <h2>Tipos Financeira</h2>
              <p>Cadastre os tipos de financeira.</p>
            </div>
            <div className='tipos-body'>
              <form onSubmit={(e) => e.preventDefault()} className='form-tipos'>
                <div className='form-grupo'>
                  <label>Tipo</label>
                  <input
                    name='tipo'
                    type={'text'}
                    value={formTipo.tipo}
                    onChange={(e) => handleChangeInput(e.target.value)}
                    placeholder='Tipo'
                  />
                </div>
                <BtnCustom type='submit' onClick={handleSubmit}>
                  Salvar
                </BtnCustom>
              </form>
            </div>
          </div>
          <div className='tipos'>
            <div className='tipos-body'>
              <table className='table table-striped table-bordered'>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((item, i) => (
                    <tr key={i}>
                      <td>{item}</td>
                      <td>
                        <IconButton
                          style={{ backgroundColor: '#ffbf00' }}
                          onClick={() => handleEdit(i, item)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          style={{ backgroundColor: 'red', color: 'white' }}
                        >
                          <DeleteForever />
                        </IconButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {show && (
                <Row>
                  <InputCustom
                    name='tipo'
                    value={edit.tipo ? edit.tipo : ''}
                    onChange={(e) => handleEditTipo(e.target.value)}
                    placeholder='Editar Tipo'
                  />
                  <BtnPremium type='button' onClick={handleEditSubmit}>
                    Atualizar
                  </BtnPremium>
                </Row>
              )}
            </div>
          </div>
        </div>
      </Wrapper>
      <div>
        <ToastContainer
          position='top-center'
          autoClose
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </div>
    </div>
  );
}
