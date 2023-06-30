import { useEffect, useState } from 'react';
import {
  BtnPremium,
  FormPanel,
  InputCustom,
  PanelBodyCustom,
  PanelCustom,
  PanelHeaderCustom,
  SubtitlelCustom,
  TitleCustom,
  WrapperRow,
} from '../components';
import useGeral from '../../../hooks/useGeral';
import api from '../../../service/api';
import { useNavigate } from 'react-router-dom';

function Orgaos() {
  const {token} = useGeral()
  const [orgaos, setOrgaos] = useState([]);
  const [form, setForm] = useState({nome: '', tipo: ''})
  const navigate = useNavigate();

  const init = async () => {
       try {
         const response = await api.get('/orgaos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setOrgaos(response.data)
        return
      } catch (error) {
        
      }
    }
    
    const handleSubmitForm = async () => {
      
      try {
        const response = await api.post('/orgaos/create', form, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
         
        if(response.status === 201){
          setForm({nome: '', tipo: ''})
          navigate('/servicos/orgaos', {replace: true});
          init();
          return
        }
    } catch (error) {
      
    }
    return
  }

  const handleChangeInput = (prop, value) => {
    setForm({...form, [prop]: value})
    return;
  }

  useEffect(()=>{
    init()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <WrapperRow>
      <div className='container-1'>
        <PanelCustom>
          <PanelHeaderCustom>
            <TitleCustom>Órgaos</TitleCustom>
            <SubtitlelCustom>Cadastre Órgaos.</SubtitlelCustom>
          </PanelHeaderCustom>
          <PanelBodyCustom>
            <FormPanel onSubmit={(e)=>e.preventDefault()} method='post'>
              <div className='form-grupo'>
                <label>Nome do órgão</label>
                <InputCustom id='nome' type='text' name='nome' value={form.nome} 
                  onChange={(e)=>handleChangeInput(e.target.name, e.target.value)}/>
              </div>
              <div className='form-grupo'>
                <label>Tipo</label>
                <InputCustom id='tipo' name={'tipo'} type='text' value={form.tipo}
                    onChange={(e)=>handleChangeInput(e.target.name, e.target.value)}/>                
              </div>
              <BtnPremium type='submit' onClick={handleSubmitForm}>Salvar</BtnPremium>
            </FormPanel>
          </PanelBodyCustom>
        </PanelCustom>
      </div>
      <div className='container-2'>
        <table className='table table-striped table-bordered'>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            {orgaos.map(orgao => 
            <tr key={orgao.id}>
              <td>{ orgao.nome }</td>
              <td>{ orgao.tipo }</td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </WrapperRow>
  );
}

export default Orgaos;
