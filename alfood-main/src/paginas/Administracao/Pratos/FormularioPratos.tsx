import { Box, Button, FormControl, InputLabel, Select, TextField, Typography, MenuItem } from "@mui/material"
import { useEffect, useState } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioPratos = () => {
  // set que pega o nome de restaurante que o usuário quer
  const [nomePrato, setNomePrato] = useState('')

  const [descricao, setDescricao] = useState('')

  const [tags, setTags] = useState<ITag[]>([])

  const [tag, setTag] = useState('')

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  const [restaurante, setRestaurante] = useState('')

  const [imagem, setImagem] = useState<File | null>(null)

  useEffect( () => {
    http.get<{ tags: ITag[] }>('tags/')
      .then ( (response) => {
        setTags(response.data.tags)
      })

    http.get<IRestaurante[]>('restaurantes/')
      .then ( (response) => {
        setRestaurantes(response.data)
      })  
  }, [])

    // função que recebe o submit do usuário
    const aoSubmeterFor = (evento: React.FormEvent<HTMLFormElement>) => {
      evento.preventDefault();

      const formData = new FormData();

      formData.append('nome', nomePrato)
      formData.append('descricao', descricao)
      formData.append('tag', tag)
      formData.append('restaurante', restaurante)

      if(imagem) {
        formData.append('imagem', imagem)
      }

      http.request({
        url: 'pratos/',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      })
        .then( () => {
          setNomePrato('')
          setDescricao('')
          setTag('')
          setRestaurante('')
          alert('Prato cadastrado com sucesso.')
        })
        .catch( (erro) => console.log(erro))

    }  

  const selecionaArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
    if (evento.target.files?.length) {
      setImagem(evento.target.files[0])
    }
    else {
      setImagem(null)
    }
  }

  return (
    <>
      {/* Conteúdo da página */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
        <Typography component="h1" variant="h6">
          Formulário de Pratos
        </Typography>

        <Box component="form" onSubmit={aoSubmeterFor} sx={{ width: '100%' }} >
          <TextField
            value={nomePrato}
            onChange={(evento) => setNomePrato(evento.target.value)}
            id="standard-basic"
            label="Nome do Prato"
            variant="standard"
            fullWidth
            required
            margin="dense"
          />
          <TextField
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
            id="standard-basic"
            label="Descrição"
            variant="standard"
            fullWidth
            required
            margin="dense"
          />

          <FormControl margin="dense" fullWidth>
            <InputLabel id="select-tag">Tag</InputLabel>
            <Select labelId="select-tag" value={tag} onChange={ (evento) => setTag(evento.target.value)} >
              {tags.map( (tag) =>( 
                <MenuItem value={tag.value} key={tag.id}>
                  {tag.value}
                </MenuItem>))}
            </Select>
          </FormControl>

          <FormControl margin="dense" fullWidth>
            <InputLabel id="select-restaurante">Restaurante</InputLabel>
            <Select labelId="select-restaurante" value={restaurante} onChange={ (evento) => setRestaurante(evento.target.value)} >
              {restaurantes.map( (restaurante) =>( 
                <MenuItem value={restaurante.id} key={restaurante.id}>
                  {restaurante.nome}
                </MenuItem>))}
            </Select>
          </FormControl>

          <input type="file" onChange={selecionaArquivo}></input>

          <Button sx={{ marginTop: 1 }} fullWidth type="submit" variant="outlined">Salvar</Button>
        </Box>
      </Box>
    </>
  )
}

export default FormularioPratos