# Portfólio Grid com Bootstrap

Portfólio responsivo desenvolvido para praticar HTML, CSS, JavaScript e Bootstrap 5.

## Tecnologias

- HTML5, CSS3 e JavaScript
- Bootstrap 5
- Font Awesome
- EmailJS para o envio do formulário
- Toastify JS 1.12.0 para notificações

## Recursos

- Layout responsivo usando o sistema Grid do Bootstrap.
- Menu adaptado para telas menores.
- Alternância entre tema claro e escuro.
- Animações de entrada com suporte à preferência por movimento reduzido.
- Cards de habilidades e projetos.
- Formulário com EmailJS e notificações de sucesso ou erro.

## Estrutura dos arquivos

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

1. Abra esta pasta no VS Code.
2. Inicie o `index.html` com o Live Server ou use o site publicado.
3. Mantenha a internet ativa para carregar Bootstrap, EmailJS, Toastify e Font Awesome.

Os caminhos do HTML correspondem à estrutura de pastas acima. O formulário usa EmailJS; o serviço e o template precisam estar configurados no painel para os campos `name`, `email`, `subject` e `message`. Faça um envio de teste e confirme a chegada da mensagem antes de considerar o envio validado.
