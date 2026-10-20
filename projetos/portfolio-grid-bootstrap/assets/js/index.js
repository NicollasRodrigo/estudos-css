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

const formularioContato = document.querySelector("#form-contato");
const statusContato = document.querySelector("#status-contato");
const botaoEnviar = document.querySelector("#botao-enviar");

if (formularioContato && statusContato && botaoEnviar) {
  formularioContato.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    statusContato.textContent = "Enviando mensagem...";
    botaoEnviar.disabled = true;

    try {
      const resposta = await fetch(formularioContato.action, {
        method: "POST",
        body: new FormData(formularioContato),
        headers: {
          Accept: "application/json"
        }
      });

      const resultado = await resposta.json();

      if (!resposta.ok || resultado.success === "false" || resultado.success === false) {
        throw new Error("Não foi possível enviar a mensagem.");
      }

      statusContato.textContent =
        "Mensagem enviada. Se este for o primeiro envio, confira seu e-mail e confirme a ativação do FormSubmit.";
      formularioContato.reset();
    } catch (erro) {
      statusContato.textContent =
        "Não foi possível confirmar o envio. Tente novamente mais tarde ou entre em contato pelo LinkedIn.";
    } finally {
      botaoEnviar.disabled = false;
    }
  });
}
