import { Cancel, Save } from '@mui/icons-material';
import {
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  FormLabel,
  Grid,
  InputBase,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import useGeral from '../../../hooks/useGeral';

function formatarData(data) {
  const formata = data.split('T');
  return formata[0];
}

export default function EditPessoais({ cliente, open, setOpen }) {
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
  const sexos = ['MASCULINO', 'FEMININO', 'NÃO BINÁRIO', 'OUTRO'];
  const ecivis = [
    'SOLTEIRO(A)',
    'CASADO(A)',
    'DIVORCIADO(a)',
    'FALECIDO(a)',
    'VIÚVO(a)',
    'SEPARADO(a)',
    'UNIÃO ESTÁVEL',
    'UNIÃO MESMO SEXO',
  ];

  const handleChange = (prop) => (e) => {
    setPessoais({ ...pessoais, [prop]: e.target.value });
  };

  const handleClear = () => {
    setPessoais({ ...initForms.cliente });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(pessoais);
  };

  return (
    <div>
      <DialogContent style={{ width: '100%' }}>
        <Grid container columnSpacing={1} style={{ rowGap: '1rem' }}>
          <Grid item xs={12}>
            <Typography variant='h4' component='h2'>
              Editar Dados Pessoais
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <InputBase
              type='text'
              name='nome'
              onChange={handleChange('nome')}
              defaultValue={nome}
            />
          </Grid>
          <Grid item xs={4}>
            <InputBase
              type='text'
              name='cpf'
              onChange={handleChange('cpf')}
              defaultValue={cpf}
            />
          </Grid>
          <Grid item xs={4}>
            <InputBase
              type='date'
              name='nascimento'
              onChange={handleChange('nascimento')}
              defaultValue={formatarData(nascimento)}
            />
          </Grid>
          <Grid item xs={4}>
            <InputBase
              name='rg'
              type='text'
              onChange={handleChange('rg')}
              defaultValue={rg}
            />
          </Grid>
          <Grid item xs={4}>
            <InputBase
              name='expedicao'
              type='date'
              onChange={handleChange('expedicao')}
              defaultValue={formatarData(expedicao)}
            />
          </Grid>
          <Grid item xs={4}>
            <InputBase
              name='naturalidade'
              type='text'
              onChange={handleChange('naturalidade')}
              defaultValue={naturalidade}
            />
          </Grid>
          <Grid item xs={6}>
            <InputBase
              name='genitora'
              type='text'
              onChange={handleChange('genitora')}
              defaultValue={genitora}
            />
          </Grid>
          <Grid item xs={6}>
            <InputBase
              name='genitor'
              type='text'
              onChange={handleChange('genitor')}
              defaultValue={genitor}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel
                sx={{
                  color: '#000',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                }}
              >
                Sexo
              </FormLabel>
              <Select
                size='small'
                fullWidth
                sx={{
                  color: '#000',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                }}
                onChange={handleChange('sexo')}
                value={sexo}
              >
                {sexos.map((sexo) => (
                  <MenuItem key={sexo} value={sexo}>
                    {sexo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <FormLabel
                id='estado-civil'
                sx={{
                  color: '#000',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                }}
              >
                Estado Civil
              </FormLabel>
              <Select
                size='small'
                fullWidth
                sx={{
                  color: '#000',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                }}
                value={estado_civil.toLocaleUpperCase()}
                onChange={handleChange('estado_civil')}
              >
                {ecivis.map((ecivil) => (
                  <MenuItem key={ecivil} value={ecivil}>
                    {ecivil}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel
                sx={{
                  width: '100%',
                  textAlign: 'left',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: '#000',
                  m: 0.5,
                }}
              >
                Observações
              </FormLabel>
              <TextareaAutosize
                name='observacoes'
                minRows={3}
                defaultValue={
                  observacoes ? pessoais.observacoes : 'Não há observações!'
                }
                style={{
                  border: '1px solid #c3c3c3',
                  fontSize: '1.3rem',
                  padding: '1rem',
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpen(!open)}
          startIcon={<Cancel />}
          style={{
            width: '150px',
            backgroundColor: 'red',
            color: '#fff',
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          startIcon={<Save />}
          style={{
            width: '150px',
            backgroundColor: 'green',
            color: '#fff',
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </div>
  );
}
