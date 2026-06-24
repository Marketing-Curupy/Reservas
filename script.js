let slideAtual = 0;

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

function iniciarCarrossel() {
  setInterval(() => {
    const total = document.querySelectorAll(".hero-slide").length;
    mostrarSlide((slideAtual + 1) % total);
  }, 5000);
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
  document.body.style.overflow = "";
}

function abrirAjuda() {
  abrirModal("modalAjudaReservas");
}

function abrirConsulta(tipo) {
  const campoTipo = document.getElementById("tipoReserva");
  if (campoTipo) campoTipo.value = tipo;

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
    `Estou ciente de que o envio desta solicitação não garante a reserva e que a equipe irá verificar a disponibilidade.`;

  window.open(
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`,
    "_blank"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  iniciarCarrossel();

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        fecharModal(modal.id);
      }
    });
  });
});
