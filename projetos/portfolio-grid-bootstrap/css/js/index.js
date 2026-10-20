/* Efeito de entrada ao rolar a página */
const elementos = document.querySelectorAll("[data-reveal]");
const prefereMovimentoReduzido = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefereMovimentoReduzido || !("IntersectionObserver" in window)) {
  elementos.forEach((elemento) => {
    elemento.classList.add("is-visible");
  });
} else {
  elementos.forEach((elemento) => {
    elemento.classList.add("is-hidden");
  });

  const observador = new IntersectionObserver(
    (entradas, observadorAtual) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.remove("is-hidden");
          entrada.target.classList.add("is-visible");
          observadorAtual.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elementos.forEach((elemento) => observador.observe(elemento));
}

/* Alternância entre tema claro e escuro */
const botaoTema = document.querySelector("#botao-tema");
const iconeTema = botaoTema?.querySelector("i");
const elementoRaiz = document.documentElement;

function lerTemaSalvo() {
  try {
    return localStorage.getItem("tema-portfolio");
  } catch (erro) {
    return null;
  }
}

function salvarTema(tema) {
  try {
    localStorage.setItem("tema-portfolio", tema);
  } catch (erro) {
    // O botão continua funcionando se o armazenamento estiver bloqueado.
  }
}

function atualizarBotaoTema() {
  if (!botaoTema) return;

  const temaEscuroAtivo = elementoRaiz.getAttribute("data-theme") === "dark";
  const proximoTema = temaEscuroAtivo ? "claro" : "escuro";

  botaoTema.setAttribute("aria-pressed", String(temaEscuroAtivo));
  botaoTema.setAttribute("aria-label", `Ativar tema ${proximoTema}`);
  botaoTema.setAttribute("title", `Ativar tema ${proximoTema}`);

  if (iconeTema) {
    iconeTema.classList.toggle("fa-sun", temaEscuroAtivo);
    iconeTema.classList.toggle("fa-moon", !temaEscuroAtivo);
  }
}

const temaSalvo = lerTemaSalvo();

if (temaSalvo === "dark") {
  elementoRaiz.setAttribute("data-theme", "dark");
} else if (temaSalvo === "light") {
  elementoRaiz.removeAttribute("data-theme");
}

atualizarBotaoTema();

if (botaoTema) {
  botaoTema.addEventListener("click", () => {
    const temaEscuroAtivo = elementoRaiz.getAttribute("data-theme") === "dark";

    if (temaEscuroAtivo) {
      elementoRaiz.removeAttribute("data-theme");
      salvarTema("light");
    } else {
      elementoRaiz.setAttribute("data-theme", "dark");
      salvarTema("dark");
    }

    atualizarBotaoTema();
  });
}

/* Fecha o menu lateral em telas pequenas depois de selecionar um link */
const menu = document.querySelector("#menu");
const linksMenu = document.querySelectorAll("#menu .nav-link");

linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    const telaPequena = window.matchMedia("(max-width: 1199.98px)").matches;
    const offcanvas = window.bootstrap?.Offcanvas;

    if (telaPequena && menu && offcanvas) {
      offcanvas.getInstance(menu)?.hide();
    }
  });
});

/* Atualiza automaticamente o ano do rodapé */
const anoAtual = document.querySelector("#ano-atual");

if (anoAtual) {
  anoAtual.textContent = new Date().getFullYear();
}

/* Exibe notificações Toastify e mantém uma mensagem acessível no formulário. */
function notificarToast(mensagem, tipo) {
  if (typeof window.Toastify !== "function") return;

  window.Toastify({
    text: mensagem,
    duration: 3000,
    gravity: "top",
    position: "right",
    close: true,
    stopOnFocus: true,
    style: {
      background: tipo === "sucesso" ? "#536D5D" : "#A84343",
      color: "#f4f4f4"
    },
    ariaLive: "polite"
  }).showToast();
}

/* Formulário de contato: integração exclusiva com EmailJS */
const formularioContato = document.getElementById("contact_form");
const statusFormulario = document.getElementById("form-status");
const botaoEnviar = document.getElementById("submit_button");

const EMAILJS_PUBLIC_KEY = "xuqfuJD96XBS20xR4";
const EMAILJS_SERVICE_ID = "service_6o89pdh";
const EMAILJS_TEMPLATE_ID = "template_asdnznc";

/* Inicializa o SDK conforme a API da versão 5 do EmailJS. */
if (window.emailjs && typeof window.emailjs.init === "function") {
  window.emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY
  });
}

if (formularioContato && statusFormulario && botaoEnviar) {
  function mostrarStatus(mensagem, tipo) {
    statusFormulario.hidden = false;
    statusFormulario.classList.remove("text-success", "text-danger");
    statusFormulario.classList.add(tipo);
    statusFormulario.textContent = mensagem;
  }

  formularioContato.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!formularioContato.checkValidity()) {
      formularioContato.reportValidity();
      return;
    }

    if (!window.emailjs || typeof window.emailjs.send !== "function") {
      const mensagem = "O EmailJS não carregou. Atualize a página e tente novamente.";
      mostrarStatus(mensagem, "text-danger");
      notificarToast(mensagem, "erro");
      return;
    }

    /* Os nomes das propriedades devem corresponder às variáveis do template EmailJS. */
    const formData = {
      name: document.getElementById("nome").value.trim(),
      email: document.getElementById("email").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      message: document.getElementById("mensagem").value.trim()
    };

    const textoBotaoOriginal = botaoEnviar.textContent;

    botaoEnviar.disabled = true;
    botaoEnviar.textContent = "Enviando...";
    statusFormulario.hidden = true;
    statusFormulario.textContent = "";

    window.emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData)
      .then(() => {
        const mensagem = "E-mail enviado com sucesso!";
        mostrarStatus(mensagem, "text-success");
        notificarToast(mensagem, "sucesso");

        /* Limpa os campos apenas depois que o EmailJS confirma o envio. */
        formularioContato.reset();
      })
      .catch((erro) => {
        console.error("Erro ao enviar o formulário pelo EmailJS:", erro);

        const abriuComoArquivoLocal = window.location.protocol === "file:";
        const mensagem = abriuComoArquivoLocal
          ? "O navegador não permitiu o envio a partir de um arquivo local. Abra o index.html pelo Live Server ou pelo site publicado e tente novamente."
          : "Erro ao enviar o e-mail. Confira o serviço, o template e as variáveis no painel do EmailJS e tente novamente.";
        mostrarStatus(mensagem, "text-danger");
        notificarToast(mensagem, "erro");
      })
      .finally(() => {
        botaoEnviar.disabled = false;
        botaoEnviar.textContent = textoBotaoOriginal;
      });
  });
}
