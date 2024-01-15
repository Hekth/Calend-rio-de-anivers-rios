# Calendário de aniversários
<h2>
  Descrição
</h2>

<p>
  Um projeto CRUD que permite o cadastro de datas de aniversário. Ele é capaz de cadastrar, editar, excluir e persistir os dados.
  Os campos também possuem validação de dados, impedindo que o usuário adicione qualquer dado. Também há responsividade para telas menores.
</p>

<img src="https://github.com/Hekth/Calend-rio-de-anivers-rios/assets/151862970/811f48a7-5a0c-4db4-a6de-22705fe0dcf1" width="500px" />

<h2>
  Ferramentas
</h2>
<p>
  O projeto foi feito em Javascript, CSS, HTML e com a biblioteca UUID para gerar ID's únicos para cada cadastro.
</p>

<h2>
  Verificações
</h2>
<p>
  Os campos de cadastro de nome e data possuem verificações de sintaxe e lógica da aplicação, mostrando em vermelho um aviso e os campos que não corresponderem as regras. Por exemplo:
</p>

<ul>
  <li>Não é permitido números no campo de nome</li>
  <li>O campo de nome precisa ter no mínimo 3 caracteres</li>
  <li>Não é permitido adicionar uma data sem seguir o formato: dd/mm/aaaa (deve-se adicionar as barras também)</li>
  <li>Não é possível adicionar uma data futura</li>
  <li>Não é possível adicionar um aniversário cujo ano seja inferior que 1900</li>
  <li>Não é possível que o mês seja inferior a 01 e superior a 12</li>
  <li>Da mesma forma, a quantidade de dias segue com base no mês, então não é possível, por exemplo, adicionar 31/04/2000</li>
  <li>Não é possível que fevereiro tenha dias superiores a 28 caso o ano não seja bissexto, caso contrário, é permitido até 29.</li>
  <li>Ambos os campos não podem estar vazios</li>
</ul>

<p>
  Cada campo também acompanha uma contagem de caracteres restantes. No caso do campo de nome, cada nome pode ter até 60 caracteres, já o de data, deve ter 10 caracteres.
</p>
<h2>
  Tabela
</h2>
<p>
  Caso você não possua nenhum cadastro de aniversário, é mostrado uma mensagem o informando.<br>
  Caso contrário aparecerá uma tabela com 3 colunas: Nome, Data de aniversário e Ações.<br>
  A coluna Ações permite que você edite a data e o nome do aniversário ou o exclua.<br>
  Ao clicar em editar, aparecerá um modal que permite a edição dos valores do aniversário seguindo as mesmas regras dos campos anteriores.
</p>

<h2>
  Persistência dos dados
</h2>
<p>
  Todos os dados cadastrados, modificados ou excluídos são persistidos através do LocalStorage.
</p>

<a href="https://calendariodeaniversarios-hekth.vercel.app">Link do projeto</a>
