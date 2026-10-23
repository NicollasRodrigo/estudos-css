# Portfólio Grid com Bootstrap

Portfólio responsivo desenvolvido como projeto de estudo de desenvolvimento front-end. O objetivo é praticar a construção de páginas com HTML, CSS, JavaScript e Bootstrap 5.

## Funcionalidades

- Layout responsivo com o sistema Grid do Bootstrap.
- Menu de navegação adaptável para telas menores.
- Alternância entre tema claro e escuro.
- Animações de entrada com respeito à preferência por movimento reduzido.
- Seções de apresentação, habilidades, projetos e contato.
- Formulário de contato integrado ao EmailJS.
- Notificações de sucesso ou erro com Toastify.

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Bootstrap 5.3.3
- Font Awesome 6.7.2
- EmailJS Browser SDK
- Toastify JS 1.12.0

## Estrutura de arquivos

```text
portfolio-grid-bootstrap/
├── index.html
├── README.md
├── foto/
│   └── foto-perfil.jpg
└── css/
    ├── style.css
    └── js/
        └── index.js
```

## Como executar

1. Baixe ou clone o repositório.
2. Abra a pasta `projetos/portfolio-grid-bootstrap` no VS Code. Se você baixou somente este projeto, abra diretamente a pasta `portfolio-grid-bootstrap`.
3. Inicie o arquivo `index.html` com a extensão Live Server.
4. Mantenha a conexão com a internet ativa para carregar Bootstrap, Font Awesome, EmailJS e Toastify.

## Formulário de contato

O formulário envia as informações por meio do EmailJS. A configuração do serviço e do template é feita no painel do EmailJS; os identificadores utilizados pelo código ficam no arquivo `css/js/index.js`.

O código envia os campos `name`, `email`, `subject` e `message`. Para que todos apareçam corretamente no e-mail recebido, o template do EmailJS deve usar os mesmos nomes de variáveis, por exemplo:

```text
Nome: {{name}}
E-mail: {{email}}
Assunto: {{subject}}
Mensagem: {{message}}
```

**Teste manual:** uma mensagem de teste foi recebida no Gmail via EmailJS. Na captura de confirmação, o campo do endereço de e-mail não apareceu no corpo da mensagem; por isso, confira se o template contém a variável `{{email}}` e faça outro envio de teste. O recebimento de uma mensagem confirma aquele envio, mas não garante que todas as variáveis do template estejam configuradas corretamente.

## Observações

- Abra a página com o Live Server ou em um site publicado; evite abrir o HTML diretamente pelo protocolo `file://` para testar o formulário.
- Não compartilhe dados privados de acesso. Os identificadores do SDK no front-end devem seguir as recomendações de segurança e restrições de domínio do EmailJS.
- A cópia utilizada na atividade de Git e GitHub fica em outro repositório e não é sincronizada automaticamente.

## Autor

Nicollas Rodrigo — [GitHub](https://github.com/NicollasRodrigo)
