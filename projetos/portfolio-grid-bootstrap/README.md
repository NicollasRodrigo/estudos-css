# Portfólio Grid com Bootstrap

Portfólio responsivo desenvolvido para praticar HTML, CSS, JavaScript e Bootstrap 5.

## Tecnologias

- HTML5, CSS3 e JavaScript
- Bootstrap 5
- Font Awesome
- EmailJS para envio do formulário de contato
- Toastify JS 1.12.0 para notificações de sucesso e erro

## Recursos

- Layout responsivo com o sistema de Grid do Bootstrap.
- Menu de navegação adaptado para telas menores.
- Alternância entre tema claro e escuro, com preferência salva no navegador.
- Animações de entrada com respeito à preferência por movimento reduzido.
- Cards de habilidades e projetos.
- Formulário de contato com EmailJS e notificações Toastify.

## Estrutura

```text
portfolio-grid-bootstrap/
├── index.html
└── assets/
    ├── css/
    │   └── style.css
    ├── images/
    │   └── foto-perfil.jpg
    └── js/
        └── index.js
```

## Como executar

1. Abra no VS Code a pasta `projetos/portfolio-grid-bootstrap`, que contém este `index.html`.
2. Inicie a página com o Live Server ou publique a pasta em um serviço de hospedagem.
3. Mantenha a conexão com a internet para carregar Bootstrap, EmailJS, Toastify e Font Awesome pelas CDNs.

Os caminhos dos arquivos estão escritos em relação ao `index.html` desta pasta. Se a imagem ou as cores não aparecerem, confira se está abrindo este arquivo e se a pasta `assets` está ao lado dele.

## Formulário de contato

O formulário usa EmailJS. O arquivo `assets/js/index.js` contém os IDs do serviço e do template e a chave pública utilizados nesta configuração. No painel do EmailJS, o serviço e o template precisam estar configurados para receber os campos `name`, `email`, `subject` e `message`.

Depois, faça um teste pelo Live Server ou pela página publicada. O site mostra um aviso de sucesso ou erro, mas somente o teste confirma que a mensagem chegou ao e-mail de destino.

## Notificações

O Toastify JS 1.12.0 é carregado pelo jsDelivr no HTML. As notificações complementam as mensagens acessíveis exibidas no próprio formulário.
