let slideAtual = 0;
let tipoConsultaAtual = "";
let intervaloCarrossel = null;

const informacoesPreConsulta = {
  Hospedagem: [
    "Café da manhã incluso.",
    "Acesso ao parque aquático no dia da entrada e saída.",
    "Check-in a partir das 14h.",
    "Check-out até 11h.",
    "Crianças de 0 a 4 anos não pagam mediante documento.",
    "Reserva sujeita à disponibilidade e confirmação do pagamento."
  ],

  Bangalô: [
    "Uso exclusivo das 09h às 17h.",
    "Caixa térmica inclusa.",
    "Entrada do parque não inclusa para não associados.",
    "Permitido 1 bolo e até 100 brigadeiros para aniversários.",
    "Reserva confirmada mediante pagamento antecipado."
  ],

  Quiosque: [
    "Uso exclusivo das 09h às 17h.",
    "Caixa térmica inclusa.",
    "Alimentos permitidos para consumo no espaço.",
    "Bebidas devem ser adquiridas dentro do parque.",
    "Entrada do parque não inclusa para não associados.",
    "Reserva confirmada mediante pagamento antecipado."
  ]
};

function mostrarSlide(index) {
  const slides = document.querySelectorAll(".hero-slide");
  const botoes = document.querySelectorAll(".hero-controles button");

  if (!slides.length) return;

  if (index < 0 || index >= slides.length) {
    index = 0;
  }

  slideAtual = index;

  slides.forEach((slide, i) => {
    const ativo = i === index;

    slide.classList.toggle("ativo", ativo);
    slide.setAttribute("aria-hidden", ativo ? "false" : "true");
  });

  botoes.forEach((botao, i) => {
    const ativo = i === index;

    botao.classList.toggle("ativo", ativo);
    botao.setAttribute("aria-current", ativo ? "true" : "false");
  });
}

function proximoSlide() {
  const total = document.querySelectorAll(".hero-slide").length;
  if (!total) return;

  mostrarSlide((slideAtual + 1) % total);
}

function iniciarCarrossel() {
  const total = document.querySelectorAll(".hero-slide").length;
  if (total <= 1) return;

  if (intervaloCarrossel) {
    clearInterval(intervaloCarrossel);
  }

intervaloCarrossel = setInterval(proximoSlide, 180000);
}

function pausarCarrossel() {
  if (intervaloCarrossel) {
    clearInterval(intervaloCarrossel);
    intervaloCarrossel = null;
  }
}

function reiniciarCarrossel() {
  pausarCarrossel();
  iniciarCarrossel();
}

function irParaSlide(index) {
  mostrarSlide(index);
  reiniciarCarrossel();
}

function abrirModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function fecharModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.classList.remove("open");

  const aindaTemModalAberto = document.querySelector(".modal.open");

  if (!aindaTemModalAberto) {
    document.body.style.overflow = "";
  }
}

function abrirAjuda() {
  abrirModal("modalAjudaReservas");
}

function abrirPreConsulta(tipo) {
  tipoConsultaAtual = tipo;

  const tituloTipo = document.getElementById("preConsultaTipo");
  const conteudo = document.getElementById("preConsultaConteudo");
  const check = document.getElementById("checkCienciaReserva");
  const botao = document.getElementById("btnContinuarConsulta");

  if (tituloTipo) {
    tituloTipo.textContent = tipo;
  }

  if (conteudo) {
    const informacoes = informacoesPreConsulta[tipo] || [];

    conteudo.innerHTML = informacoes
      .map((item) => `<div class="pre-consulta-item">${item}</div>`)
      .join("");
  }

  if (check) {
    check.checked = false;
  }

  if (botao) {
    botao.disabled = true;
  }

  abrirModal("modalPreConsulta");
}

function liberarBotaoConsulta() {
  const check = document.getElementById("checkCienciaReserva");
  const botao = document.getElementById("btnContinuarConsulta");

  if (!check || !botao) return;

  botao.disabled = !check.checked;
}

function continuarParaFormulario() {
  const check = document.getElementById("checkCienciaReserva");

  if (!check || !check.checked) return;

  fecharModal("modalPreConsulta");
  abrirConsulta(tipoConsultaAtual);
}

function abrirConsulta(tipo) {
  const campoTipo = document.getElementById("tipoReserva");

  if (campoTipo) {
    campoTipo.value = tipo;
  }

  abrirModal("modalConsulta");
}

function valorCampo(id) {
  const campo = document.getElementById(id);
  return campo ? campo.value.trim() : "";
}

function enviarConsultaWhatsApp(event) {
  event.preventDefault();

  const numeroWhatsApp = "5566996562410";

  const mensagem =
    `Olá! Quero consultar disponibilidade no Curupy.\n\n` +
    `🔗 Origem: Página de Reservas Curupy\n\n` +
    `📌 Tipo: ${valorCampo("tipoReserva")}\n` +
    `👤 Associado: ${valorCampo("associado")}\n` +
    `📅 Data desejada: ${valorCampo("dataDesejada")}\n` +
    `📅 Data alternativa: ${valorCampo("dataAlternativa") || "Não informada"}\n` +
    `👥 Quantidade de pessoas: ${valorCampo("quantidadePessoas")}\n\n` +
    `📝 Dados para contato:\n` +
    `Nome: ${valorCampo("nomeCompleto")}\n` +
    `WhatsApp: ${valorCampo("telefone")}\n` +
    `E-mail: ${valorCampo("email") || "Não informado"}\n\n` +
    `💬 Observações:\n${valorCampo("observacoes") || "Nenhuma"}\n\n` +
    `Estou ciente de que esta solicitação não garante a reserva e depende da disponibilidade.`;

  window.open(
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`,
    "_blank"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarSlide(0);
  iniciarCarrossel();

  const hero = document.querySelector(".hero-reservas");

  if (hero) {
    hero.addEventListener("mouseenter", pausarCarrossel);
    hero.addEventListener("mouseleave", iniciarCarrossel);
    hero.addEventListener("touchstart", pausarCarrossel, { passive: true });
    hero.addEventListener("touchend", iniciarCarrossel);
  }

  document.querySelectorAll(".hero-controles button").forEach((botao, index) => {
    botao.addEventListener("click", () => {
      irParaSlide(index);
    });
  });

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        fecharModal(modal.id);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      document.querySelectorAll(".modal.open").forEach((modal) => {
        fecharModal(modal.id);
      });
    }
  });
});
