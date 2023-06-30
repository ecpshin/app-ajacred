import './styles.css';
import { useEffect, useState, useReducer } from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { DeleteForever, BorderColor } from '@mui/icons-material';
import useGeral from '../../../hooks/useGeral';
import api from '../../../service/api';
import { ToastContainer, toast } from 'react-toastify';
import {
  BtnCustom,
  BtnPrimary,
  BtnCancel,
} from '../../../components/styleds/buttons';

import { useNavigate } from 'react-router-dom';

const Operacoes = () => {
  const { token } = useGeral();
  const [operacao, setOperacao] = useState({ descricao: '' });
  const [editForm, setEditForm] = useState({ descricao: '' });
  const [lista, setLista] = useState([]);
  const [edition, setEdition] = useState(false);
  const [reducerValue, forceReducer] = useReducer((x) => x + 1, 0);
  const navigate = useNavigate();

  useEffect(() => {
    function iniciar() {
      init();
    }
    iniciar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducerValue]);

  async function init() {
    await handleGetAll();
    return;
  }

  async function handleGetAll() {
    try {
      const response = await api.get('/operacoes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLista(response.data);
      return;
    } catch (error) {
      console.log(error.response.data);
      return;
    }
  }

  const handleSubmitForm = async () => {
    if (!operacao.descricao || operacao.descricao === '') {
      toast.error('campo descrição é obrigatório!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }

    try {
      console.log(operacao);
      const response = await api.post('/operacoes/create', operacao, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast.success('Salvo com sucesso!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        forceReducer();
        setOperacao({ descricao: '' });
        init();
        navigate('/servicos/operacoes', { replace: true });
        return;
      }
    } catch (error) {
      console.log(error.response.message);
    }
  }

  async function handleSubmitEditionForm() {
    if (!editForm.descricao || editForm.descricao.length === '') {
      alert('O campo descrição é obrigatório');
      return;
    }

    if (operacao.descricao !== editForm.descricao) {
      editForm.descricao = operacao.descricao;
    }

    try {
      const response = await api.patch('/operacoes', editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status !== 200) {
        console.log('Erro 400');
        return;
      }
      init();
      forceReducer();
      return;
    } catch (error) {
      console.log(error.response.data);
    }
  }

  function handleOnEdition(obj) {
    setEdition(true);
    setEditForm(obj);
    return;
  }

  function handleOnClose() {
    setEdition(false);
    init();
    //forceReducer();
    return;
  }

  async function handleDelete(obj) {
    try {
      await api.delete(`/operacoes/${obj.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(`${obj.descricao} excluído com sucesso!`, {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      init();
      forceReducer();
      return;
    } catch (error) {}
  }

  const handleChangeValue = (prop, value) => {
    setOperacao({ ...operacao, [prop]: value });
    return;
  };

  const handleEditValue = (prop, value) => {
    setEditForm({ ...editForm, [prop]: value });
    return;
  };

  return (
    <div className='container-main'>
      <div className='container-situacoes'>
        <div className='container-1'>
          <div className='card-situacoes'>
            <div className='card-situacoes_header'>
              <h1>Operações</h1>
              <p>Adicione novas Operações para os contratos.</p>
            </div>
            <div className='card-situacoes_body'>
              <form
                className='form-situacoes_card'
                onSubmit={(e) => e.preventDefault()}
              >
                <div className='form-grupo'>
                  <label htmlFor='descricao'>Descrição</label>
                  <input
                    id='descricao'
                    type='text'
                    name='descricao'
                    value={operacao.descricao}
                    onChange={(e) =>
                      handleChangeValue(e.target.name, e.target.value)
                    }
                  />
                </div>
                {
                  <div className='btn-group'>
                    <BtnCustom type='submit' onClick={handleSubmitForm}>
                      Salvar
                    </BtnCustom>
                    <BtnCancel type='reset'>Cancelar</BtnCancel>
                  </div>
                }
              </form>
            </div>
          </div>
        </div>
        <div className='container-2'>
          <table className='table table-striped table-hover'>
            <thead>
              <tr>
                <th colSpan={3} className='dark'>
                  Operações
                </th>
              </tr>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.descricao}</td>
                  <td className='btn-actions'>
                    <IconButton
                      style={{ backgroundColor: '#ffc700' }}
                      onClick={() => handleOnEdition(item)}
                    >
                      <BorderColor />
                    </IconButton>
                    <IconButton
                      style={{ backgroundColor: 'red' }}
                      onClick={() => handleDelete(item)}
                    >
                      <DeleteForever style={{ color: '#f3f3f3' }} />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Dialog
        open={edition}
        onClose={handleOnClose}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <DialogContent style={{ width: '580px' }}>
          <div className='card-edit'>
            <div className='card-situacoes_header'>
              <h1>Operações</h1>
              <p>Edite a situação cadastrada.</p>
            </div>
            <div className='card-situacoes_body'>
              <form
                className='form-situacoes_card'
                onSubmit={(e) => e.preventDefault()}
              >
                <div className='form-grupo'>
                  <label htmlFor='descricao'>Descrição</label>
                  <input
                    id='descricao'
                    type='text'
                    name='descricao'
                    value={editForm.descricao}
                    defaultValue={''}
                    onChange={(e) =>
                      handleEditValue('descricao', e.target.value)
                    }
                  />
                </div>
                <div className='btn-group'>
                  <BtnPrimary
                    type='submit'
                    onClick={() => handleSubmitEditionForm()}
                  >
                    Atualizar
                  </BtnPrimary>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <ToastContainer
        position='top-center'
        autoClose={5000}
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
  );
}

export default Operacoes;
