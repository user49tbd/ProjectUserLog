# Projeto de Autenticação com Angular e Spring Boot
## Descrição
Este projeto é uma aplicação que demonstra a integração entre Angular e Spring Boot, utilizando Spring Security para gerenciar a autenticação de usuários e a autorização baseada em papéis. O objetivo principal é criar um sistema de autenticação que permita a criação de dois papéis: user e admin. O papel de admin terá permissões especiais para listar usuários e alterar os privilégios deles.
## Funcionalidades
Autenticação de Usuário: Os usuários podem se registrar e fazer login na aplicação.
Gerenciamento de Papéis: O sistema suporta dois papéis:
- **User**: Acesso básico à aplicação.
- **Admin**: Acesso avançado, permitindo listar usuários e modificar seus privilégios.
Persistência em Banco de Dados: Os dados dos usuários e papéis são armazenados em um banco de dados SQL. Para criar o papel de admin, você pode executar o seguinte comando SQL:
sql


INSERT INTO role_entity VALUES ('admin');
## Tecnologias Utilizadas
:heavy_check_mark: Frontend: Angular
:heavy_check_mark: Backend: Spring Boot :lock:
:heavy_check_mark: Segurança: Spring Security
:heavy_check_mark: Banco de Dados: SQL (MySQL ou PostgreSQL)



https://github.com/user-attachments/assets/df4a7575-659c-417e-9d58-4549fa35581e


