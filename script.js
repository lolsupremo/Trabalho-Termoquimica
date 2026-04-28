
// Script bem simples e comentado, para parecer de estudante e ser fácil de mexer.

// ---------- utilidades ----------
function pegar(id) {
  return document.getElementById(id);
}

function escrever(id, texto) {
  var el = pegar(id);
  if (el) el.innerHTML = texto;
}

// ---------- conceito: sistema e ambiente ----------
function calorSaindo() {
  var seta = pegar("setaCalor");
  if (!seta) return;
  seta.className = "seta-calor";
  escrever("textoCalor", "O calor sai do sistema e vai para o ambiente. Isso lembra uma reação exotérmica.");
}

function calorEntrando() {
  var seta = pegar("setaCalor");
  if (!seta) return;
  seta.className = "seta-calor entrando";
  escrever("textoCalor", "O calor entra no sistema vindo do ambiente. Isso lembra uma reação endotérmica.");
}

function responderConceito(botao, certo) {
  marcarResposta(botao, certo, "retornoConceito",
    "Certo: o copo com reação é o sistema, e o ar/mão/mesa são o ambiente.",
    "Não é essa. Sistema é a parte estudada; ambiente é o que está ao redor.");
}

// ---------- entalpia: barras ----------
function atualizarEntalpia() {
  var hr = Number(pegar("hr")?.value || 80);
  var hp = Number(pegar("hp")?.value || 40);
  var bR = pegar("barraR");
  var bP = pegar("barraP");

  if (bR) bR.style.height = (70 + hr * 1.7) + "px";
  if (bP) bP.style.height = (70 + hp * 1.7) + "px";

  var dh = hp - hr;
  var tipo = dh < 0 ? "exotérmica" : dh > 0 ? "endotérmica" : "sem variação";
  escrever("saidaEntalpia", "H<sub>r</sub> = " + hr + " kJ | H<sub>p</sub> = " + hp + " kJ | ΔH = " + dh + " kJ → " + tipo);
}

function exemploEntalpia() {
  var passo = Number(pegar("passoEntalpia")?.value || 1);
  var textos = [
    "1º passo: observe os reagentes. No exemplo, vamos usar H<sub>r</sub> = 100 kJ.",
    "2º passo: observe os produtos. No exemplo, vamos usar H<sub>p</sub> = 35 kJ.",
    "3º passo: aplique a fórmula: ΔH = H<sub>p</sub> − H<sub>r</sub>.",
    "4º passo: ΔH = 35 − 100 = −65 kJ. Como deu negativo, a reação libera calor."
  ];
  escrever("textoPassoEntalpia", textos[passo - 1]);
}

// ---------- delta H ----------
function calcularDH() {
  var hr = Number(pegar("calcHr")?.value || 0);
  var hp = Number(pegar("calcHp")?.value || 0);
  var dh = hp - hr;
  var tipo = dh < 0 ? "EXOTÉRMICA, porque liberou calor." : dh > 0 ? "ENDOTÉRMICA, porque absorveu calor." : "sem variação de entalpia.";
  escrever("resultadoDH", "ΔH = " + hp + " − " + hr + " = <strong>" + dh + " kJ</strong><br>" + tipo);

  var bR = pegar("calcBarraR");
  var bP = pegar("calcBarraP");
  if (bR) bR.style.height = (70 + Math.min(Math.max(hr, 0), 130) * 1.5) + "px";
  if (bP) bP.style.height = (70 + Math.min(Math.max(hp, 0), 130) * 1.5) + "px";
}

var perguntasDH = [
  {hr: 120, hp: 55, resposta: "exo"},
  {hr: 40, hp: 110, resposta: "endo"},
  {hr: 90, hp: 25, resposta: "exo"},
  {hr: 30, hp: 95, resposta: "endo"}
];

function novaPerguntaDH() {
  var i = Math.floor(Math.random() * perguntasDH.length);
  var p = perguntasDH[i];
  pegar("jogoDH").dataset.resposta = p.resposta;
  escrever("jogoDHTexto", "H<sub>r</sub> = " + p.hr + " kJ e H<sub>p</sub> = " + p.hp + " kJ. Que tipo de reação é?");
  escrever("jogoDHRetorno", "");
}

function responderJogoDH(resp) {
  var correta = pegar("jogoDH").dataset.resposta;
  if (resp === correta) {
    escrever("jogoDHRetorno", "Certo. Você comparou produtos e reagentes corretamente.");
  } else {
    escrever("jogoDHRetorno", "Não. Lembre: se H<sub>p</sub> é menor, libera calor; se H<sub>p</sub> é maior, absorve calor.");
  }
}

// ---------- gráficos de energia ----------
function nivelParaTop(valor) {
  // quanto maior a energia, mais alto no gráfico
  return 300 - valor * 1.8;
}

function atualizarGrafico(prefixo, hr, hp) {
  var linhaR = pegar(prefixo + "R");
  var linhaP = pegar(prefixo + "P");
  var seta = pegar(prefixo + "Seta");
  var rotulo = pegar(prefixo + "DH");

  if (!linhaR || !linhaP || !seta || !rotulo) return;

  var topR = nivelParaTop(hr);
  var topP = nivelParaTop(hp);
  linhaR.style.top = topR + "px";
  linhaP.style.top = topP + "px";

  var dh = hp - hr;
  var menorTop = Math.min(topR, topP);
  var maiorTop = Math.max(topR, topP);

  seta.style.top = (menorTop + 6) + "px";
  seta.style.height = Math.max(35, maiorTop - menorTop) + "px";
  seta.className = "seta-dh " + (dh < 0 ? "baixo" : "cima");

  rotulo.textContent = "ΔH = " + dh + " kJ";
  rotulo.style.top = (menorTop + 44) + "px";
}

function exoMover() {
  var hr = Number(pegar("exoHr")?.value || 100);
  var hp = Number(pegar("exoHp")?.value || 35);
  atualizarGrafico("exo", hr, hp);
  escrever("exoResultado", "Reagentes = " + hr + " kJ | Produtos = " + hp + " kJ | ΔH = " + (hp - hr) + " kJ. Como é negativo, liberou calor.");
}

function endoMover() {
  var hr = Number(pegar("endoHr")?.value || 35);
  var hp = Number(pegar("endoHp")?.value || 100);
  atualizarGrafico("endo", hr, hp);
  escrever("endoResultado", "Reagentes = " + hr + " kJ | Produtos = " + hp + " kJ | ΔH = " + (hp - hr) + " kJ. Como é positivo, absorveu calor.");
}

// ---------- gráfico interativo geral ----------
function desenharCanvas() {
  var canvas = pegar("canvasGrafico");
  if (!canvas) return;

  var hr = Number(pegar("canvasHr")?.value || 90);
  var hp = Number(pegar("canvasHp")?.value || 35);
  var ea = Number(pegar("canvasEa")?.value || 45);

  var dpr = window.devicePixelRatio || 1;
  var rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  var ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  var w = rect.width;
  var h = rect.height;
  ctx.clearRect(0, 0, w, h);

  var margem = 55;
  var baseY = h - 58;
  var topoY = 28;
  var maxEnergia = 170;

  function y(valor) {
    return baseY - (valor / maxEnergia) * (baseY - topoY);
  }

  var yR = y(hr);
  var yP = y(hp);
  var yPico = y(Math.min(maxEnergia, Math.max(hr, hp) + ea));

  ctx.strokeStyle = "#fff";
  ctx.fillStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.font = "13px Arial";

  // eixos
  ctx.beginPath();
  ctx.moveTo(margem, topoY);
  ctx.lineTo(margem, baseY);
  ctx.lineTo(w - 30, baseY);
  ctx.stroke();
  ctx.fillText("Energia", 12, 24);
  ctx.fillText("Caminho da reação", w - 160, h - 22);

  // linha tracejada
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(80, yR);
  ctx.lineTo(w - 80, yR);
  ctx.moveTo(80, yP);
  ctx.lineTo(w - 80, yP);
  ctx.stroke();
  ctx.setLineDash([]);

  // curva da reação
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(82, yR);
  ctx.lineTo(185, yR);
  ctx.bezierCurveTo(245, yR, 245, yPico, w / 2, yPico);
  ctx.bezierCurveTo(w - 245, yPico, w - 250, yP, w - 185, yP);
  ctx.lineTo(w - 82, yP);
  ctx.stroke();

  ctx.fillText("Reagentes", 82, yR - 12);
  ctx.fillText("Produtos", w - 165, yP - 12);
  ctx.fillText("Energia de ativação", w / 2 - 55, yPico - 12);

  var dh = hp - hr;
  var tipo = dh < 0 ? "exotérmica" : dh > 0 ? "endotérmica" : "sem variação";
  escrever("canvasResultado", "H<sub>r</sub> = " + hr + " kJ | H<sub>p</sub> = " + hp + " kJ | E<sub>a</sub> = " + ea + " kJ | ΔH = " + dh + " kJ → " + tipo);
}

// ---------- exemplos ----------
function mostrarExemplo(tipo) {
  var dados = {
    formacao: {
      titulo: "Entalpia de formação",
      reacao: "H₂(g) + ½ O₂(g) → H₂O(l)",
      valor: "ΔH = −285,8 kJ/mol",
      explicacao: "Forma 1 mol de água líquida a partir de substâncias simples. O valor negativo indica liberação de calor."
    },
    combustao: {
      titulo: "Entalpia de combustão",
      reacao: "CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(l)",
      valor: "ΔH ≈ −890 kJ/mol",
      explicacao: "É a queima completa de 1 mol de metano. Combustão normalmente libera calor, então é exotérmica."
    },
    ligacao: {
      titulo: "Entalpia de ligação",
      reacao: "H₂(g) → 2 H(g)",
      valor: "ΔH > 0",
      explicacao: "Romper ligação exige energia. Por isso, quebra de ligação é processo endotérmico."
    },
    dissolucao: {
      titulo: "Entalpia de dissolução",
      reacao: "NH₄NO₃(s) → NH₄⁺(aq) + NO₃⁻(aq)",
      valor: "ΔH > 0",
      explicacao: "Algumas dissoluções absorvem calor do ambiente, causando resfriamento."
    }
  };

  var x = dados[tipo];
  if (!x) return;

  escrever("boxExemplo",
    "<h3>" + x.titulo + "</h3>" +
    "<div class='exemplo'>" + x.reacao + "<br>" + x.valor + "</div>" +
    "<p>" + x.explicacao + "</p>"
  );
}

// ---------- tipos / partículas ----------
function criarParticulas() {
  var caixa = pegar("particulas");
  if (!caixa || caixa.children.length > 0) return;

  for (var i = 0; i < 24; i++) {
    var p = document.createElement("span");
    p.className = "particula";
    p.style.left = (8 + Math.random() * 84) + "%";
    p.style.top = (10 + Math.random() * 76) + "%";
    p.style.animationDelay = (Math.random() * 2) + "s";
    caixa.appendChild(p);
  }
}

// ---------- quiz ----------
function marcarResposta(botao, certo, idRetorno, textoCerto, textoErrado) {
  var caixa = botao.parentElement;
  var botoes = caixa.querySelectorAll("button");
  botoes.forEach(function(b) {
    b.disabled = true;
    b.classList.remove("certa", "errada");
  });

  if (certo) {
    botao.classList.add("certa");
    escrever(idRetorno, textoCerto);
  } else {
    botao.classList.add("errada");
    escrever(idRetorno, textoErrado);
  }
}

function responderQuiz(botao, certo) {
  marcarResposta(botao, certo, "retornoQuiz",
    "Correto. ΔH negativo significa que os produtos têm menos energia que os reagentes, então o excesso foi liberado.",
    "Não. Lembre: ΔH < 0 é reação exotérmica, porque libera calor.");
}

window.addEventListener("load", function() {
  atualizarEntalpia();
  exemploEntalpia();
  calcularDH();
  novaPerguntaDH();
  exoMover();
  endoMover();
  desenharCanvas();
  mostrarExemplo("formacao");
  criarParticulas();
});

window.addEventListener("resize", desenharCanvas);
