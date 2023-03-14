/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../../components/Header';
import ListContratos from '../../components/ListContratos';
import { useParams } from 'react-router-dom';
import './styles.css';

export default function Contracts() {
  const { situacao } = useParams();

  return (
    <div className='container-home'>
      <Header />
      <main className='container-home_main'>
        <ListContratos situacao={situacao} />
      </main>
    </div>
  );
}
