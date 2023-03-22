import { useState } from 'react';
import {
  FormPanel,
  InputCustom,
  PanelBodyCustom,
  PanelCustom,
  PanelHeaderCustom,
  SubtitlelCustom,
  TitleCustom,
  WrapperRow,
} from '../components';

function Orgaos() {
  const [orgaos, setOrgaos] = useState([]);
  return (
    <WrapperRow>
      <div className='container-1'>
        <PanelCustom>
          <PanelHeaderCustom>
            <TitleCustom>Órgaos</TitleCustom>
            <SubtitlelCustom>Cadastre Órgaos.</SubtitlelCustom>
          </PanelHeaderCustom>
          <PanelBodyCustom>
            <FormPanel>
              <div className='form-grupo'>
                <label>Nome do órgão</label>
                <InputCustom />
              </div>
              <div className='form-grupo'>
                <label>Tipo</label>
                <select></select>
              </div>
            </FormPanel>
          </PanelBodyCustom>
        </PanelCustom>
      </div>
      <div className='container-2'>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nome</td>
              <td>Tipo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </WrapperRow>
  );
}

export default Orgaos;
