
// JS da pasta ENTALPIA.
// Corrigido: cada número tem ID próprio.
// Antes estava repetido, por isso só mudava um lugar.

function pegar(id) {
  return document.getElementById(id);
}

function escrever(id, texto) {
  var el = pegar(id);
  if (el) el.innerHTML = texto;
}

function atualizarEntalpia() {
  var hr = Number(pegar("hr")?.value || 90);
  var hp = Number(pegar("hp")?.value || 40);

  var barraR = pegar("barraReagentes");
  var barraP = pegar("barraProdutos");

  if (barraR) barraR.style.height = (70 + hr * 1.65) + "px";
  if (barraP) barraP.style.height = (70 + hp * 1.65) + "px";

  // números dos controles
  escrever("valorHpControle", hp + " kJ");
  escrever("valorHrControle", hr + " kJ");

  // números acima das barras
  escrever("valorHpBarra", hp + " kJ");
  escrever("valorHrBarra", hr + " kJ");

  var dh = hp - hr;
  var sinal = dh > 0 ? "+" : "";

  escrever("valorResultado", "ΔH = " + sinal + dh + " kJ");
  escrever("equacaoAtual", "ΔH = H<sub>produtos</sub> − H<sub>reagentes</sub> = " + hp + " − " + hr + " = " + sinal + dh + " kJ");

  var sistema = pegar("sistemaResultado");
  var tipo = pegar("tipoFinal");

  if (dh < 0) {
    sistema.className = "sistema-resultado exo";
    tipo.className = "tipo-final exo";
    tipo.innerHTML = "Exotérmica • calor saindo";
  } else if (dh > 0) {
    sistema.className = "sistema-resultado endo";
    tipo.className = "tipo-final endo";
    tipo.innerHTML = "Endotérmica • calor entrando";
  } else {
    sistema.className = "sistema-resultado zero";
    tipo.className = "tipo-final zero";
    tipo.innerHTML = "ΔH = 0 • sem saldo";
  }
}

function exemploRapido(tipo) {
  if (tipo === "exo") {
    pegar("hr").value = 100;
    pegar("hp").value = 35;
  }

  if (tipo === "endo") {
    pegar("hr").value = 35;
    pegar("hp").value = 100;
  }

  if (tipo === "zero") {
    pegar("hr").value = 70;
    pegar("hp").value = 70;
  }

  atualizarEntalpia();
}

window.addEventListener("load", function() {
  atualizarEntalpia();
});
