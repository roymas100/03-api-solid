# App

Gym pass style app.


## RFs (Requisitos funcionais)

- [ ] Deve ser possivel cadastrar;
- [ ] Deve ser possível autentificar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de checkinsrealizados pelo usuário logado;  
- [ ] Deve ser possível obter o seu historico de check-ins;
- [ ] Deve ser possível buscar academias próximas;
- [ ] Deve ser possível buscar academias pelo nome;
- [ ] Deve ser possível realizar checkin em uma academia;
- [ ] Deve ser possível validar o checkin de um usuário;
- [ ] Deve ser possível cadastrar uma academia;


## RNs (Regras de negócio)

- [ ] O usuário não deve poder cadastrar com um email duplicado;
- [ ] O usuário não pode fazer 2  checkins no mesmo dia;
- [ ] O usuário não pode fazer checkin se não tiver perto da academia;
- [ ] O check-in so pode ser validado ate 20 min apos criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia so pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografado;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificiado por um JWT (JSON Web Token);




## Docker container init 

docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql 

