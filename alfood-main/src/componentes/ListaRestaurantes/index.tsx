import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios, { AxiosRequestConfig } from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';

// esses são os possíveis parâmetros que podemos enviar para a API
interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {

  // set da lista de restaurantes
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  // set da paginação dos restaurantes
  const [proximaPagina, setProximaPagina] = useState('');
  // set da paginação anterior "ver menos"
  //const [paginaAnterior, setPaginaAnterior] = useState('')
  // busca feita pelo usuário
  const [busca, setBusca] = useState('')
  // busca por ordenação
  const [ordenacao, setOrdenacao] = useState('')

  // agora, o carregarDados recebe opcionalmente as opções de configuração do axios
  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {

    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        // seta o todo o objeto com todos os restaurantes
        setRestaurantes(resposta.data.results);
        // seta a variável que contém a próxima página
        setProximaPagina(resposta.data.next);
      })
      .catch(erro => {
        console.log(erro)
      })
  }

  // a cada busca, montamos um objeto de opções
  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const opcoes = {
      params: {

      } as IParametrosBusca
    }
    if (busca) {
      opcoes.params.search = busca
    }
    if (ordenacao) {
      opcoes.params.ordering = ordenacao
    }
    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes)
  }

  const verMais = () => {
    axios.get<IPaginacao<IRestaurante>>(proximaPagina)
      .then( (resposta) => {
        // pega o objeto com os restaurantes antigo e adiciona todos os novos
        setRestaurantes([...restaurantes, ...resposta.data.results])
        // seta a variável que contém a próxima página
        setProximaPagina(resposta.data.next)
      })
  }

  useEffect(() => {
    // obter restaurantes
    carregarDados('http://localhost:8000/api/v1/restaurantes/')
  }, [])

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <form onSubmit={buscar}>
      <div>
        <input type="text" value={busca} onChange={evento => setBusca(evento.target.value)} />
      </div>
      <div>
        <label htmlFor="select-ordenacao">Ordenação</label>
        <select
          name="select-ordenacao"
          id="select-ordenacao"
          value={ordenacao}
          onChange={evento => setOrdenacao(evento.target.value)}
        >
          <option value="">Padrão</option>
          <option value="id">Por ID</option>
          <option value="nome">Por Nome</option>
        </select>
      </div>
      <div>
        <button type='submit'>buscar</button>
      </div>
    </form>
    {restaurantes?.map(item =>
       <Restaurante restaurante={item} key={item.id} />)}
    {/* botão para visualizar todos os restaurantes disponíveis na API - sem isso só conseguimos ver 6 dos 10 */}
    {proximaPagina && <button onClick={verMais}>
      Ver mais
    </button>}
  </section>)
}

export default ListaRestaurantes