# atviv-wb-typescript

## Como rodar a aplicação
- Clone o repositorio git com `git clone https://github.com/Grupo-VPN/atviv-wb-typescript`
- Entre na pasta utilizando `cd atviv-wb-typescript`
- Siga o passo a passo para iniciar o Backend e Front
  - Backend e Frontend tem que estar rodando para funcionar a aplicação corretamente 
### Backend
- Entre na pasta backend do projeto
- com o CMD aberto na pasta backend digite o comando `npm i ou npm install` ou se tiver o yarn instalado digite `yarn`
- após isso vá ate a pasta `src/database/` e abra o arquivo `database.ts`
  - É necessario ter o mySQL instalado na máquina
  - nele mude os campos `localhost`, `port`, `username`, `password`, `database` para suas configurações do mySQL
- Após ter mudado os campos inicie o serviço do backend executando o comando `npm run dev` ou `yarn dev`dentro do CMD na pasta raiz do backend
### Frontend
- Entre na pasta frontend do projeto
- com O CMD abert na pasta frontend digite o comando `npm i ou npm install` ou se tiver o yarn instalado digite `yarn`
- após o termino, dentro do CMD na pasta raiz do frontend digite `npm run start` ou `yarn start`
- espere o React iniciar com aplicação
