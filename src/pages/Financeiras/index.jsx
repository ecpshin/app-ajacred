import './styles.css';
import api from '../../service/api';
import Header from '../../components/Header';
import useGeral from '../../hooks/useGeral';
import { useEffect, useReducer, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-bootstrap/dist/react-bootstrap';
import Trash from '@mui/icons-material/DeleteOutlineOutlined';
import Edit from '@mui/icons-material/BorderColorOutlined';
import { IconButton, Dialog, DialogContent } from '@mui/material';
import { useLocalStorage } from 'react-use';
import {
  BtnCustom,
  BtnCancel,
  BtnPrimary,
} from '../../components/styleds/buttons';

function Financeiras() {
  const { token, forms, setForms, initForms } = useGeral();
  const [edition, setEdition] = useState(false);
  const [local, setLocal] = useLocalStorage('local', {});
  const [editForm, setEditForm] = useState({});
  const [lista, setLista] = useState([]);
  const [reducerValue, forceReducer] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    function init() {
      setForms(initForms.financeiras);
      clearForm();
      handleGetAll();
      return;
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducerValue]);

  async function handleGetAll() {
    try {
      const response = await api.get('/financeiras', {
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

  function handleOnClose() {
    setEdition(false);
    clearForm();
    return;
  }

  function handleOnEdition(obj) {
    setLocal(obj);
    setEdition(!edition);
    return;
  }

  async function handleSubmitEditionForm() {
    if (
      !editForm.nome ||
      editForm.nome === '' ||
      !editForm.tipo ||
      editForm === ''
    ) {
      toast.error('Edite pelo menos um campo!', {
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

    if (editForm.nome !== '' && local.nome !== editForm.nome) {
      local.nome = editForm.nome;
    }

    if (editForm.tipo !== '' && local.tipo !== editForm.tipo) {
      local.tipo = editForm.tipo;
    }
    try {
      const response = await api.patch('/financeiras', local, {
        headers: {
          ...token,
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        toast.success('Atualizado com sucesso!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setTimeout(() => {
          clearForm();
          forceReducer();
          setEdition(false);
        }, 2100);
        return;
      }
      //return;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmitForm() {
    if (!forms.nome || forms.nome === '') {
      toast.error('O campo nome é obrigatório!', {
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
      const response = await api.post('/financeiras', forms, {
        headers: {
          ...token,
        },
      });

      if (response.status === 201) {
        toast.success('Cadastro realizado com sucesso!', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        setTimeout(() => {
          clearForm();
          forceReducer();
        }, 2100);
      }
      return;
    } catch (error) {
      console.log(forms);
    }
  }

  //edition
  function handleEditInput(prop, value) {
    setEditForm({ ...editForm, [prop]: value });
    return;
  }

  function handleEditSelect(prop, value) {
    setEditForm({ ...editForm, [prop]: value });
    return;
  }

  //New
  function handleChangeInput(prop, value) {
    setForms({ ...forms, [prop]: value });
    return;
  }

  function handleChangeSelect(prop, value) {
    setForms({ ...forms, [prop]: value });
    return;
  }

  //Delete
  const handleDelete = async (idObj) => {
    try {
      await api.delete(`/financeiras/${idObj}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.info('Excluindo!', {
        position: 'top-center',
        autoClose: 2200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      forceReducer();
      return;
    } catch (error) {
      toast.error(error.response.message, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  function clearForm() {
    setEditForm({ nome: '', tipo: 'BANCO' });
    setForms({ nome: '', tipo: '' });
    setLocal({});
    return;
  }

  return (
    <div className='container-main'>
      <div className='container-financeiras'>
        <div className='container-1'>
          <div className='card-financeira'>
            <div className='card-financeira_header'>
              <h1>Financeiras</h1>
              <p>
                Cadastre novas financeiras, bancos, parceiros, seguradoras, etc.
              </p>
            </div>
            <div className='card-financeira_body'>
              <form
                className='form-financeira_card'
                onSubmit={(e) => e.preventDefault()}
              >
                <div className='form-grupo'>
                  <label htmlFor='nome'>Nome</label>
                  <input
                    id='nome'
                    type='text'
                    name='nome'
                    defaultValue={forms.nome}
                    onChange={(e) => handleChangeInput('nome', e.target.value)}
                  />
                </div>
                <div className='form-grupo'>
                  <label htmlFor='nome'>Tipo</label>
                  <select
                    id='tipo'
                    name='tipo'
                    defaultValue={forms.tipo}
                    className='form-grupo_select'
                    onChange={(e) => handleChangeSelect('tipo', e.target.value)}
                  >
                    <option value={''}>Selecione...</option>
                    <option value={'BANCO'}>BANCO</option>
                    <option value={'FINANCEIRA'}>FINANCEIRA</option>
                    <option value={'PARCEIRO'}>PARCEIRO(A)</option>
                    <option value={'PROMOTORA'}>PROMOTORA</option>
                    <option value={'SEGURADORA'}>SEGURADORA</option>
                  </select>
                </div>
                <div className='btn-group'>
                  <BtnCustom type='submit' onClick={() => handleSubmitForm()}>
                    Enviar
                  </BtnCustom>
                  <BtnCancel type='reset'>Cancelar</BtnCancel>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='container-2'>
          <table className='table table-striped table-hover' border={1}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Tipo</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((financeira) => (
                <tr key={financeira.id}>
                  <td>{financeira.id}</td>
                  <td>{financeira.nome}</td>
                  <td>{financeira.tipo}</td>
                  <td className='td-buttons'>
                    <IconButton
                      style={{ backgroundColor: 'hsl(37, 100%, 50%)' }}
                      onClick={() => handleOnEdition(financeira)}
                    >
                      <Edit style={{ color: 'white' }} />
                    </IconButton>
                    <IconButton
                      style={{ backgroundColor: 'hsl(0, 100%, 53%)' }}
                      onClick={() => handleDelete(financeira.id)}
                    >
                      <Trash style={{ color: 'white' }} />
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
            <div className='card-financeira_header'>
              <h1>Financeiras</h1>
              <p>Edite financeiras, bancos, parceiros, seguradoras, etc.</p>
            </div>
            <div className='card-financeira_body'>
              <form
                className='form-financeira_card'
                onSubmit={(e) => e.preventDefault()}
              >
                <div className='form-grupo'>
                  <label htmlFor='nome'>Nome</label>
                  <input
                    id='nome'
                    type='text'
                    name='nome'
                    defaultValue={local.nome}
                    onChange={(e) => handleEditInput('nome', e.target.value)}
                  />
                </div>
                <div className='form-grupo'>
                  <label htmlFor='nome'>Tipo</label>
                  <select
                    id='tipo'
                    name='tipo'
                    defaultValue={forms.tipo}
                    className='form-grupo_select'
                    onChange={(e) => handleEditSelect('tipo', e.target.value)}
                  >
                    <option value=''>{local.tipo}</option>
                    <option value={'BANCO'}>BANCO</option>
                    <option value={'FINANCEIRA'}>FINANCEIRA</option>
                    <option value={'PARCEIRO'}>PARCEIRO(A)</option>
                    <option value={'PROMOTORA'}>PROMOTORA</option>
                    <option value={'SEGURADORA'}>SEGURADORA</option>
                  </select>
                </div>
                <div className='btn-group'>
                  <BtnPrimary onClick={() => handleSubmitEditionForm()}>
                    Atualizar
                  </BtnPrimary>
                  <BtnCancel onClick={() => handleOnClose()}>Fechar</BtnCancel>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <div>
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
    </div>
  );
}

export default Financeiras;
