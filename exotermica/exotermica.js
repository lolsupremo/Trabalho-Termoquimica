
// JS da pasta EXOTÉRMICA.
// Gráfico corrigido: agora é SVG, então não quebra posição.

function pegar(id) {
  return document.getElementById(id);
}

function escrever(id, texto) {
  var el = pegar(id);
  if (el) el.innerHTML = texto;
}

// Converte valor de energia para altura no SVG.
// Energia maior = ponto mais alto.
function yEnergia(valor) {
  var max = 140;
  var topo = 55;
  var base = 345;
  return base - (valor / max) * (base - topo);
}

function setAttr(id, nome, valor) {
  var el = pegar(id);
  if (el) el.setAttribute(nome, valor);
}


function atualizarGraficoExo() {
  var hr = Number(pegar("exoHr")?.value || 105);
  var hp = Number(pegar("exoHp")?.value || 35);
  var dh = hp - hr;

  escrever("valorHr", hr + " kJ");
  escrever("valorHp", hp + " kJ");

  var yR = yEnergia(hr);
  var yP = yEnergia(hp);
  var yPico = Math.min(yR, yP) - 70;
  if (yPico < 70) yPico = 70;

  // Linhas dos reagentes e produtos
  setAttr("linhaR", "y1", yR);
  setAttr("linhaR", "y2", yR);
  setAttr("linhaP", "y1", yP);
  setAttr("linhaP", "y2", yP);

  // Linhas guia
  setAttr("guiaR", "y1", yR);
  setAttr("guiaR", "y2", yR);
  setAttr("guiaP", "y1", yP);
  setAttr("guiaP", "y2", yP);

  // Curva da reação
  var caminho =
    "M 145 " + yR +
    " L 300 " + yR +
    " C 360 " + yR + ", 370 " + yPico + ", 455 " + yPico +
    " C 545 " + yPico + ", 540 " + yP + ", 610 " + yP +
    " L 765 " + yP;

  setAttr("curvaExo", "d", caminho);

  // Seta vertical do ΔH
  setAttr("setaDH", "x1", 805);
  setAttr("setaDH", "x2", 805);
  setAttr("setaDH", "y1", yR);
  setAttr("setaDH", "y2", yP);

  // Textos em caixas fixas no topo do gráfico.
  escrever("textoR", "Reagentes: " + hr + " kJ");
  escrever("textoP", "Produtos: " + hp + " kJ");
  escrever("textoDH", "ΔH = " + dh + " kJ");

  var badge = "Exotérmica<br>calor saindo";
  var texto = "";

  if (dh < 0) {
    texto =
      "<strong>Resultado:</strong> ΔH = " + hp + " − " + hr + " = <strong>" + dh + " kJ</strong>.<br>" +
      "Como deu negativo, os produtos ficaram com menos energia. A energia que sobrou saiu do sistema em forma de calor.";
  } else if (dh === 0) {
    badge = "ΔH = 0<br>sem saldo";
    texto =
      "<strong>Resultado:</strong> ΔH = 0 kJ.<br>" +
      "Aqui produtos e reagentes ficaram no mesmo nível de energia.";
  } else {
    badge = "Não é exotérmica";
    texto =
      "<strong>Atenção:</strong> com esses valores, os produtos ficaram com mais energia que os reagentes.<br>" +
      "Então isso não é exotérmico; parece uma situação endotérmica.";
  }

  escrever("badgeExo", badge);
  escrever("saidaExo", texto);
}


function exemploExotermico() {
  pegar("exoHr").value = 110;
  pegar("exoHp").value = 35;
  atualizarGraficoExo();
}

function exemploFraco() {
  pegar("exoHr").value = 85;
  pegar("exoHp").value = 60;
  atualizarGraficoExo();
}

window.addEventListener("load", function() {
  atualizarGraficoExo();
});
