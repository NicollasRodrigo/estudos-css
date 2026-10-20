const elementos = document.querySelectorAll("[data-reveal]");

elementos.forEach((elemento) => {
  elemento.classList.add("is-hidden");
});

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.remove("is-hidden");
      entrada.target.classList.add("is-visible");
      observador.unobserve(entrada.target);
    }
  });
});

elementos.forEach((elemento) => {
  observador.observe(elemento);
});

const botaoTema = document.querySelector("#botao-tema");

botaoTema.addEventListener("click", () => {
  const temaEscuroAtivo =
    document.documentElement.getAttribute("data-theme") === "dark";

  if (temaEscuroAtivo) {
    document.documentElement.removeAttribute("data-theme");
    botaoTema.setAttribute("aria-pressed", "false");
    botaoTema.setAttribute("aria-label", "Ativar tema escuro");
    botaoTema.setAttribute("title", "Ativar tema escuro");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    botaoTema.setAttribute("aria-pressed", "true");
    botaoTema.setAttribute("aria-label", "Ativar tema claro");
    botaoTema.setAttribute("title", "Ativar tema claro");
  }
});

// Envia o formulário sem sair da página e informa o resultado.
const formularioContato = document.querySelector("#form-contato");
const statusContato = document.querySelector("#form-status");

if (formularioContato && statusContato) {
  formularioContato.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const botaoEnviar = formularioContato.querySelector('button[type="submit"]');
    const textoOriginal = botaoEnviar.textContent;

    botaoEnviar.disabled = true;
    botaoEnviar.textContent = "Enviando...";
    statusContato.hidden = true;
    statusContato.textContent = "";

    try {
      const endpointAjax = formularioContato.action.replace(
        "https://formsubmit.co/",
        "https://formsubmit.co/ajax/"
      );

      const resposta = await fetch(endpointAjax, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(
          Object.fromEntries(new FormData(formularioContato).entries())
        )
      });

      const resultado = await resposta.json();

      if (
        !resposta.ok ||
        resultado.success === false ||
        resultado.success === "false"
      ) {
        throw new Error("O serviço não confirmou o envio.");
      }

      statusContato.className = "col-12 mb-0 text-success";
      statusContato.textContent = "Mensagem enviada! Obrigado pelo contato.";
      formularioContato.reset();
    } catch (erro) {
      statusContato.className = "col-12 mb-0 text-danger";
      statusContato.textContent =
        "Não foi possível confirmar o envio. Verifique sua conexão e tente novamente.";
    } finally {
      statusContato.hidden = false;
      botaoEnviar.disabled = false;
      botaoEnviar.textContent = textoOriginal;
    }
  });
}

