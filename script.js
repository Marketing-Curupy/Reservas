```js
let slideAtual = 0;
let tipoConsultaAtual = "";
let intervaloCarrossel = null;

const informacoesPreConsulta = {
  Hospedagem: [
    "A reserva depende da disponibilidade da data desejada.",
    "A hospedagem inclui café da manhã e acesso ao parque aquático no dia da entrada e no dia da saída.",
    "Check-in a partir das 14h e check-out até 11h.",
    "Crianças de 0 a 4 anos não pagam mediante apresentação de documento. A partir de 5 anos é cobrado valor integral.",
    "A confirmação da reserva exige 50% do valor antecipado."
  ],

  Bangalô: [
    "A reserva depende da disponibilidade da data desejada.",
    "O bangalô é utilizado das 09h às 17h.",
    "A entrada do parque não está inclusa para não associados.",
    "Para aniversário, é permitido 1 bolo e 100 brigadeiros.",
    "Demais alimentos e bebidas não são permitidos. Utensílios devem ser trazidos pelo visitante.",
    "A confirmação da reserva exige 50% do valor antecipado."
  ],

  Quiosque: [
    "A reserva depende da disponibilidade da data desejada.",
    "O quiosque é utilizado das 09h às 17h.",
    "A entrada do parque é paga à parte para não associados.",
    "Alimentos são permitidos somente para consumo no espaço reservado do quiosque.",
    "Bebidas não são permitidas e devem ser adquiridas dentro do parque.",
    "A confirmação da reserva exige 50% do valor antecipado."
  ]
};

function mostrarSlide(index) {
  const slides = document.querySelectorAll(".hero-slide");
  const botoes = document.querySelectorAll(".hero-controles button");

  if (!slides.length) return;

  slideAtual = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle("ativo", i === index);
  });

  botoes.forEach((botao, i) => {
    botao.classList.toggle("ativo", i === index);
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

  intervaloCarrossel = setInterval(proximoSlide, 5000);
}

function reiniciarCarrossel() {
  if (intervaloCarrossel) {
    clearInterval(intervaloCarrossel);
  }

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
    `Tipo da solicitação: ${valorCampo("tipoReserva")}\n` +
    `Associado: ${valorCampo("associado")}\n` +
    `Data desejada: ${valorCampo("dataDesejada")}\n` +
    `Data alternativa: ${valorCampo("dataAlternativa") || "Não informada"}\n` +
    `Quantidade de pessoas: ${valorCampo("quantidadePessoas")}\n\n` +
    `Nome completo: ${valorCampo("nomeCompleto")}\n` +
    `Data de nascimento: ${valorCampo("nascimento") || "Não informada"}\n` +
    `CPF: ${valorCampo("cpf") || "Não informado"}\n` +
    `Telefone: ${valorCampo("telefone")}\n` +
    `E-mail: ${valorCampo("email") || "Não informado"}\n\n` +
    `Endereço: ${valorCampo("endereco") || "Não informado"}\n` +
    `Bairro: ${valorCampo("bairro") || "Não informado"}\n` +
    `Cidade: ${valorCampo("cidade") || "Não informada"}\n` +
    `CEP: ${valorCampo("cep") || "Não informado"}\n\n` +
    `Observações: ${valorCampo("observacoes") || "Nenhuma"}\n\n` +
    `Declaração: li e estou ciente das informações principais da reserva.\n` +
    `Estou ciente de que o envio desta solicitação não garante a reserva e que a equipe irá verificar a disponibilidade.`;

  window.open(
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`,
    "_blank"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  iniciarCarrossel();

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
```
