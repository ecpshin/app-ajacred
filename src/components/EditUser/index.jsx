import {
  Button,
  Card,
  CardContent,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import Logo from "../../assets/images/logo_300.png";
import useGeralContext from "../../hooks/useGeralContext";
import api from "../../service/api";
import Alerts from "../Alerts";

export default function EditUser({ title, editar }) {
  const {
    form,
    setForm,
    setToast,
    initForms,
    setUser,
    toast,
    token,
    user,
    niveis,
  } = useGeralContext();

  async function handleSubmitUser(event) {
    event.preventDefault();
    const { nome, email, senha, confirmaSenha } = form;

    const userData = {};

    if (nome && nome !== user.nome) {
      userData.nome = nome;
    }

    if (email && email !== user.email) {
      userData.email = email;
    }

    if (senha && senha !== confirmaSenha) {
      setToast({
        ...toast,
        open: true,
        message: "Senhas não conferem!",
        reason: "error",
      });
      return;
    } else if (senha && senha === confirmaSenha) {
      userData.senha = senha;
    }

    try {
      const response = await api.patch("/usuarios", userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      form({
        nome: "",
        email: "",
        senha: "",
        confirmaSenha: "",
      });

      setToast({
        ...toast,
        open: true,
        message: response.data,
        reason: "success",
      });

      await handleGetUser();
      return;
    } catch (error) {
      console.log(error.message);
    }
  }

  async function handleGetUser() {
    const aux = localStorage.getItem("user");
    const localUser = JSON.parse(aux);
    console.log(localUser);
    try {
      const response = await api.get("/usuarios/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleChange = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
    return;
  };

  const handleChangeSelection = (prop) => (event) => {
    let selection = null;
    switch (event.target.value) {
      case 2:
        selection = `ROLE_USER`;
        break;

      case 3:
        selection = `ROLE_BLOCK`;
        break;

      default:
        selection = `ROLE_ADMIN`;
        break;
    }

    setForm({ ...form, [prop]: selection });
    console.log(event.target.value);
    return;
  };

  useEffect(() => {
    function loadForm() {
      setForm({ ...initForms.user, senha: null });
    }
    loadForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initForms.user]);

  return (
    <>
      <Card sx={{ maxWidth: "500px" }}>
        <CardContent
          sx={{
            width: "100%",
            height: "auto",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <form className="form-add-user" onSubmit={(e) => handleSubmitUser(e)}>
            <img
              src={Logo}
              width="90px"
              alt=""
              style={{ alignSelf: "center" }}
            />
            <Typography
              component="h1"
              variant="h4"
              textAlign="center"
              style={{ color: "hsla(10, 97%, 58%, 1)" }}
            >
              {title}
            </Typography>
            <TextField
              label="Nome"
              type="text"
              defaultValue={!form.user ? user.nome : form.nome}
              onChange={handleChange("nome")}
              required
              variant="outlined"
            />
            <TextField
              label="E-mail"
              type="email"
              defaultValue={user.email}
              onChange={handleChange("email")}
              required
              variant="outlined"
              sx={{ height: "40xp" }}
            />
            <TextField
              label="senha"
              type="password"
              defaultValue={form.senha}
              onChange={handleChange("senha")}
              required
            />
            <TextField
              type="password"
              label="Confirme a senha"
              value={null}
              onChange={handleChange("confirmaSenha")}
              required
            />
            <Select onChange={handleChangeSelection("nivel")}>
              {niveis.map((nivel) => (
                <MenuItem key={nivel.id} value={nivel.level}>
                  {nivel.level}
                </MenuItem>
              ))}
            </Select>
            <Button
              type="submit"
              variant="contained"
              onClick={(e) => handleSubmitUser(e)}
              className="button-add-user"
            >
              Confirmar
            </Button>
          </form>
        </CardContent>
      </Card>
      {toast.open && <Alerts />}
    </>
  );
}
