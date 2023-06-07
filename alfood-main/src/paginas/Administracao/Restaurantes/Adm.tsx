import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";

const Adm = () => {
  // lista dos restaurantes
  const [restaurantes, setRestaurante] = useState<IRestaurante[]>([]);

  // renderização dos dados da API
  useEffect(() => {
    http.get<IRestaurante[]>('restaurantes/')
      .then((response) => {
        setRestaurante(response.data)
      })
  }, [])

  //
  const excluir = (restauranteAhExcluir: IRestaurante) => {
    http.delete(`restaurantes/${restauranteAhExcluir.id}/`)
      .then( () => {
        const listaRestaurantes = restaurantes.filter( (restaurante) => restaurante.id !== restauranteAhExcluir.id)
        setRestaurante([...listaRestaurantes])
      })
  }

  return (
    <TableContainer component={Paper} >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {restaurantes.map(restaurante =>
            <TableRow key={restaurante.id}>
              <TableCell>
                {restaurante.nome}
              </TableCell>
              <TableCell>
                [ <Link to={`/admin/restaurantes/${restaurante.id}`} >editar</Link> ]
              </TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={ () => excluir(restaurante)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Adm