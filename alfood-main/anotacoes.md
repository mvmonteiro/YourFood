- Conexão com a api
  - dentro da pasta com a api:
    - docker-compose build
    - docker-compose up
  - rodando a api da aplicação

- Utilização da api dentro do projeto
  - npm i axios
  - axios -> biblioteca para requisições de API
  - trabalha com promeses
    - requisições do tipo async -> depende das conexões do usuário
  - vamos tentar efetuar a requisição da API
    - .then (quando dá certo e fazemos algo com esses dados)
    - .catch (quando dá erro e podemos visualizar o que ocorreu)

- Obtenção dos dados da API
  - com o axios.get('link da api') -> acessamos os dados da API e recuperamos os nomes dos restaurantes
    - com o response.data.next -> conseguimos o resto dos dados dos restaurantes
      - utilizamos ele com um botao de ver mais para listar todos os outros
  - processo super parecido agora com os pratos de cada restaurante

- Parte administrativa -> usuário que pode adicionar ou remover restaurantes
  - tabelas e formulários
  - Vamos utilizar uma biblioteca que faz isso -> MUI
    - npm install @mui/material @emotion/react @emotion/styled
    - adição dos links com a font roboto e icones no index.html

- Rota da adm
  - criação da tabela utilizando a biblioteca MUI
    - fui fazendo a tabela na mão
    - utilização do axios.get para listar os nomes dos restaurantes na API
      - utilização da parte v2 da API -> feita para administração
  - Botão para navegação para o formulário de cadastro de novos restaurantes
    - adicionamos um link para editar os restaurantes já cadastrados -> colocamos um rota pra eles no app.tsx com :id (dinâmico)
    - usando o useParams conseguimos comparar o id da url com o que temos na API e achar aquele restaurante que o usuário quer editar (GET)
    - Agora utilizando a requisição do tipo PUT podemos alterar o valor daquele dado
      - tomar bastante cuidado com o LINK da requisição!!!
  - Botão de deletar algum restaurante

- Arrumando o layout da administração de um novo restaurante
  - tiramos tudo o que tinha de JS normal e substituimos por MUI -> já estavamos usando a biblioteca
  - estilização para ter uma UX melhor

- Refatoração do axios
  - melhorar a experiencia do desenvolvedor
  - criando uma estância única para o axios
  - fizemos a variável global http -> reaproveita toda a parte utilizada no link
    - caso precise trocar mais pra frente, é só trocar la na variável que vai mudar em todos
  
  