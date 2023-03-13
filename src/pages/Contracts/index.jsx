/* eslint-disable react-hooks/exhaustive-deps */
import './styles.css';

import Header from '../../components/Header';
import ListContratos from '../../components/ListContratos';

export default function Contracts() {
  return (
    <div className='container-home'>
      <Header />
      <main className='container-home_main'>
        <ListContratos />
      </main>
    </div>
  );
}
