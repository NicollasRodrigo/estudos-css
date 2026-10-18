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
