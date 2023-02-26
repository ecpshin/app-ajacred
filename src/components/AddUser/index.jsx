import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo_300.png";
import useGeralContext from "../../hooks/useGeralContext";
import api from "../../service/api";
import Alerts from "../Alerts";
import "./styles.css";

export default function AddUser() {
  const { form, setForm, initForms, toast, setToast } = useGeralContext();

  async function handleSubmitUser(event) {
    event.preventDefault();
    const { nome, email, senha, confirmaSenha } = form;

    if (nome === "" || email === "" || senha === "" || confirmaSenha === "") {
      alert("Preencha todos os campos!");
      return;
    }

    if (senha !== confirmaSenha) {
      alert("Senhas não conferem!");
      return;
    }

    try {
      const response = await api.post("http://localhost:3334/usuarios", {
        nome,
        email,
        senha,
        nivel: "ROLE_USER",
        avatar: "man.png",
      });

      setToast({
        ...toast,
        open: true,
        message: response.data,
        reason: "success",
      });
      setForm({
        nome: "",
        email: "",
        senha: "",
        nivel: "ROLE_USER",
        avatar: "man.png",
        confirmaSenha: "",
      });
    } catch (error) {
      setToast({
        ...toast,
        open: true,
        message: error.response.data,
        reason: "error",
      });
    }
  }

  const handleChange = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  };

  useEffect(() => {
    function init() {
      setForm({ ...initForms });
    }
    init();
  });

  return (
    <div className="add-user">
      <Card about="Cadastro de usuário." sx={{ maxWidth: "500px" }}>
        <CardContent
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <form className="form-add-user" onSubmit={(e) => handleSubmitUser(e)}>
            <img
              src={Logo}
              width="125px"
              alt=""
              style={{ alignSelf: "center" }}
            />
            <Typography
              component="h1"
              variant="h4"
              textAlign="center"
              sx={{ mt: 1, mb: 1 }}
              style={{ color: "hsla(10, 97%, 58%, 1)" }}
            >
              Cadastre-se
            </Typography>
            <TextField
              label="Nome"
              type="text"
              value={form.nome}
              onChange={handleChange("nome")}
              required
              variant="outlined"
            />
            <TextField
              label="E-mail"
              value={form.email}
              onChange={handleChange("email")}
              required
              variant="outlined"
              sx={{ height: "40xp" }}
            />
            <TextField
              label="senha"
              type="password"
              value={form.senha}
              onChange={handleChange("senha")}
              required
            />
            <TextField
              type="password"
              label="Confirme a senha"
              value={form.confirmaSenha}
              onChange={handleChange("confirmaSenha")}
              required
            />
            <Button
              type="submit"
              variant="contained"
              onClick={(e) => handleSubmitUser(e)}
              className="button-add-user"
            >
              Salvar
            </Button>
            <Typography component="p" className="cadastrese" alignSelf="center">
              Já tem cadastro.
              <Link to="/" className="cadastrese-link">
                Clique aqui
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
      {toast && <Alerts />}
    </div>
  );
}
