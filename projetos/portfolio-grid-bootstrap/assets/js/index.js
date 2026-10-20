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

/* Exibe notificações Toastify; mantém a mensagem acessível no formulário. */
function notificarToast(mensagem, tipo) {
  if (typeof window.Toastify !== "function") return;

  const cor = tipo === "sucesso" ? "#4a5f48" : "#9b2c2c";

  window.Toastify({
    text: mensagem,
    duration: 4000,
    gravity: "top",
    position: "right",
    close: true,
    stopOnFocus: true,
    style: {
      background: cor,
      color: "#ffffff"
    },
    ariaLive: "polite"
  }).showToast();
}

/* Formulário de contato: envio exclusivo pelo EmailJS */
const formularioContato = document.querySelector("#contact_form");
const statusFormulario = document.querySelector("#form-status");
const botaoEnviar = document.querySelector("#submit_button");

const EMAILJS_PUBLIC_KEY = "xuqfuJD96XBS20xR4";
const EMAILJS_SERVICE_ID = "service_6o89pdh";
const EMAILJS_TEMPLATE_ID = "template_asdnznc";

if (
  formularioContato &&
  statusFormulario &&
  botaoEnviar
) {
  function mostrarStatus(mensagem, tipo) {
    statusFormulario.hidden = false;
    statusFormulario.classList.remove("text-success", "text-danger");
    statusFormulario.classList.add(tipo);
    statusFormulario.textContent = mensagem;
  }

  formularioContato.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!formularioContato.checkValidity()) {
      formularioContato.reportValidity();
      return;
    }

    if (window.location.protocol === "file:") {
      const mensagem = "Abra o portfólio pelo Live Server ou pelo site publicado para enviar a mensagem.";
      mostrarStatus(mensagem, "text-danger");
      notificarToast(mensagem, "erro");
      return;
    }

    if (!window.emailjs || typeof window.emailjs.sendForm !== "function") {
      const mensagem = "O serviço de e-mail não carregou. Atualize a página e tente novamente.";
      mostrarStatus(mensagem, "text-danger");
      notificarToast(mensagem, "erro");
      return;
    }

    const textoOriginal = botaoEnviar.textContent;
    botaoEnviar.disabled = true;
    botaoEnviar.textContent = "Enviando...";
    statusFormulario.hidden = true;
    statusFormulario.textContent = "";

    try {
      await window.emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formularioContato,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      const mensagem = "Mensagem enviada com sucesso! Obrigado pelo contato.";
      mostrarStatus(mensagem, "text-success");
      notificarToast(mensagem, "sucesso");
      formularioContato.reset();
    } catch (erro) {
      console.error("Erro ao enviar pelo EmailJS:", erro);
      const mensagem = "Não foi possível enviar a mensagem. Confira a configuração do EmailJS e tente novamente.";
      mostrarStatus(mensagem, "text-danger");
      notificarToast(mensagem, "erro");
    } finally {
      botaoEnviar.disabled = false;
      botaoEnviar.textContent = textoOriginal;
    }
  });
}
