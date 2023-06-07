import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

const FormularioRestaurante = () => {
  // set que pega o nome de restaurante que o usuário quer
  const [nomeRestaurante, setNomeRestaurante] = useState('')

  // variável relacionada à URL da página -> conseguimos pegar o id
  const parametros = useParams()

  // toda vez que houver uma renderização nova com alteração da URL -> chama o useEffect -> para colocar o nome a ser editado
  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then((response) => {
          // seta no formulário o nome do restaurante que bate com aquele id de parametros dentro da API (requisição GET)
          setNomeRestaurante(response.data.nome)
        })
    }
  }, [parametros])

  // função que recebe o submit do usuário
  const aoSubmeterFor = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    // caso haja um id na URL
    if (parametros.id) {
      // requisição de alteração
      http.put(`restaurantes/${parametros.id}/`, {
        // passa o novo nome digitado pelo usuário -> atualiza na API
        nome: nomeRestaurante
      })
        .then(() => {
          alert('Restaurante editado com sucesso.')
        })
    } else {
      // requisição de post dentro da api
      http.post('restaurantes/', {
        // o post requer preencher a variável nome -> colocamos o nome do restaurante que o usuário digitou
        nome: nomeRestaurante
      })
        .then(() => {
          // caso a promesse de post dê certo -> aparece um alert de que o cadastro ocorreu
          alert('Restaurante Cadastrado com sucesso')
        })
    }
  }

  return (
    <>
      {/* Conteúdo da página */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
        <Typography component="h1" variant="h6">
          Formulário de Restaurantes
        </Typography>

        <Box component="form" onSubmit={aoSubmeterFor} sx={{ width: '100%' }} >
          <TextField
            value={nomeRestaurante}
            onChange={(evento) => setNomeRestaurante(evento.target.value)}
            id="standard-basic"
            label="Nome de Restaurante"
            variant="standard"
            fullWidth
            required
          />
          <Button sx={{ marginTop: 1 }} fullWidth type="submit" variant="outlined">Salvar</Button>
        </Box>
      </Box>
    </>
  )
}

export default FormularioRestaurante