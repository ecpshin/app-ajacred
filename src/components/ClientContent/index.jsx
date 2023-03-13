import ShowData from '../ShowData';
import useGeral from '../../hooks/useGeral';

function ClientContent() {
  const { formatDate, cliente } = useGeral();
  return (
    <>
      <ShowData label='CPF' dado={cliente.cpf} />
      <ShowData label='Data nascimento' dado={formatDate(cliente.nascimento)} />
      <ShowData label='RG' dado={cliente.rg} />
      <ShowData label='Expedição' dado={formatDate(cliente.expedicao)} />
      <ShowData label='Naturalidade' dado={cliente.naturalidade} />
      <ShowData label='Sexo' dado={cliente.sexo} />
      <ShowData label='Estado Civil' dado={cliente.estado_civil} />
      <ShowData label='Nome da mãe' dado={cliente.genitora} />
      <ShowData label='Nome do pai' dado={cliente.genitor} />
    </>
  );
}

export default ClientContent;
