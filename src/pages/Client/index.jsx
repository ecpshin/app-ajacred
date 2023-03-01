import { Badge, Edit } from '@mui/icons-material';
import { Breadcrumbs, Dialog, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import EditBancarias from '../../components/Bancarias/Edit';
import EditFuncionais from '../../components/Funcionais/Edit';
import Header from '../../components/Header';
import EditPessoais from '../../components/Pessoais/Edit';
import EditResidencial from '../../components/Residenciais/EditResidencial';
import ShowData from '../../components/ShowData';
import useGeralContext from '../../hooks/useGeralContext';
import Content from './Content';
import ContratosCliente from '../../components/ContratosCliente';
import './styles.css';
import ModalEditContract from '../../components/ModalEditContract';

const capitalize = (str) => {
  return str.toLowerCase();
};

export default function Client() {
  const {
    cliente,
    removeCliente,
    bancarias,
    removeBancarias,
    funcionais,
    removeFuncionais,
    residenciais,
    removeResidenciais,
    useState,
    useNavigate,
    token,
  } = useGeralContext();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [modal, setModal] = useState({ title: '', id: '' });
  const navigate = useNavigate();

  function handleOpen(title) {
    if (title !== 'Editar') {
      setOpen(!open);
      setModal({ ...modal, title: title });
      return;
    } else {
      setOpenDialog(false);
      return;
    }
  }

  const handleClose = (modalType) => {
    if (modalType === 'cliente') {
      setOpen(!open);
      return;
    }
    setOpenDialog(!openDialog);
  };

  const handleClear = () => {
    removeCliente();
    removeBancarias();
    removeFuncionais();
    removeResidenciais();
    navigate('/clientes');
  };

  return (
    <div className='container-cliente'>
      <Header />
      <main className='container-main'>
        <Stack
          spacing={2}
          style={{
            width: '85%',
            display: 'flex',
            marginTop: '1rem',
          }}
        >
          <Breadcrumbs
            separator='>'
            aria-label='breadcrumb'
            style={{
              color: '#fa5700',
              fontSize: '2rem',
            }}
          >
            <Link
              key='1'
              underline='hover'
              color='inherit'
              style={{
                color: '#fa5700',
                textDecoration: 'none',
              }}
              to='/clientes'
              onClick={handleClear}
            >
              Clientes
            </Link>
            <Typography
              key='2'
              underline='hover'
              style={{
                color: '#000',
                textDecoration: 'none',
              }}
            >
              Cliente
            </Typography>
          </Breadcrumbs>
        </Stack>
        <div className='info__header'>
          <Badge className='badge-icon' />
          <h1 style={{ textTransform: 'capitalize' }}>
            {capitalize(cliente.nome)}
          </h1>
        </div>
        <div className='card__info'>
          <div className='card__info__content'>
            <div className='content__item_pessoais'>
              <button
                className='button-edit'
                onClick={() => handleOpen('Pessoais')}
              >
                <Edit
                  style={{
                    fontSize: '4rem!important',
                    color: '#fff',
                  }}
                />
              </button>
              <Content />
            </div>
            <div className='content__item_minicards'>
              <div className='content__item_minicard'>
                <button
                  className='button-edit'
                  onClick={() => handleOpen('Residenciais')}
                >
                  <Edit
                    style={{
                      fontSize: '2rem!important',
                      color: '#fff',
                    }}
                  />
                </button>
                <ShowData label='CEP' dado={residenciais.cep} />
                <ShowData
                  label='Endereço - Complemento'
                  dado={`${residenciais.logradouro} - ${residenciais.complemento}`}
                />
                <ShowData
                  label='Bairro - Cidade/UF'
                  dado={`${residenciais.bairro} - ${residenciais.municipio}/${residenciais.uf}`}
                />
              </div>
              <div className='content__item_minicard'>
                <button
                  className='button-edit'
                  onClick={() => handleOpen('Funcionais')}
                >
                  <Edit
                    style={{
                      fontSize: '1.8rem!important',
                      color: '#fff',
                    }}
                  />
                </button>
                <ShowData
                  label={'Benefício(s) nr.'}
                  dado={funcionais.nrbeneficio}
                />
                <ShowData label={'E-mails'} dado={funcionais.emails} />
                <ShowData
                  label={'Tels.'}
                  dado={`${funcionais.phone1} - ${funcionais.phone2} - ${funcionais.phone3} - ${funcionais.phone4}`}
                />
              </div>
              <div className='content__item_minicard'>
                <button
                  className='button-edit'
                  onClick={() => handleOpen('Bancários')}
                >
                  <Edit
                    style={{
                      fontSize: '1.8rem!important',
                      color: '#fff',
                    }}
                  />
                </button>
                <ShowData label={'Banco'} dado={bancarias.banco} />
                <ShowData
                  label={'Agência, conta'}
                  dado={`${bancarias.agencia} - ${bancarias.conta}`}
                />
                <ShowData
                  label={'tipo, operação'}
                  dado={`${bancarias.tipo} - ${bancarias.operacao}`}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='card-info-contratos'>
          <div className='card-content-contratos'>
            <ContratosCliente
              cliente={cliente}
              token={token}
              openDialog={openDialog}
              setOpenDialog={setOpenDialog}
            />
          </div>
        </div>
      </main>
      {openDialog && (
        <ModalEditContract
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
        />
      )}
      {open && (
        <Dialog open={open} onClose={handleClose}>
          {modal.title === 'Residenciais' ? (
            <EditResidencial residencial={residenciais} setOpen={setOpen} />
          ) : modal.title === 'Pessoais' ? (
            <EditPessoais open={open} setOpen={setOpen} cliente={cliente} />
          ) : modal.title === 'Funcionais' ? (
            <EditFuncionais
              title='Funcionais'
              setOpen={setOpen}
              funcional={funcionais}
            />
          ) : (
            <EditBancarias
              title='Bancárias'
              setOpen={setOpen}
              bancaria={bancarias}
            />
          )}
        </Dialog>
      )}
    </div>
  );
}
