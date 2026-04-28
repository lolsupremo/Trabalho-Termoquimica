
function pegar(id) {
  return document.getElementById(id);
}

function escrever(id, texto) {
  var el = pegar(id);
  if (el) el.innerHTML = texto;
}

function modoCalor(tipo) {
  var lab = pegar("laboratorioCalor");
  var caso = pegar("rotuloCaso");
  if (!lab) return;

  if (tipo === "entrando") {
    lab.className = "laboratorio entrando";
    if (caso) caso.innerHTML = "Endotérmico";
    escrever("explicacaoCalor",
      "<strong>O que está acontecendo?</strong><br>" +
      "As setas laranjas apontam PARA a bolinha. Isso quer dizer que o <strong>calor</strong> está entrando no <strong>sistema</strong>.<br><br>" +
      "<strong>Nome científico:</strong> quando o sistema recebe calor, dizemos que é um processo <strong>endotérmico</strong>.<br><br>" +
      "<strong>Jeito fácil:</strong> é como se a bolinha estivesse dizendo: “eu preciso pegar calor para conseguir mudar”."
    );

    escrever("fraseCurta",
      "🔥 <strong>Laranja = calor entrando.</strong> O sistema recebe energia térmica do ambiente."
    );
  }

  if (tipo === "saindo") {
    lab.className = "laboratorio saindo";
    if (caso) caso.innerHTML = "Exotérmico";
    escrever("explicacaoCalor",
      "<strong>O que está acontecendo?</strong><br>" +
      "As setas azuis apontam PARA FORA da bolinha. Isso quer dizer que o <strong>calor</strong> está saindo do <strong>sistema</strong>.<br><br>" +
      "<strong>Nome científico:</strong> quando o sistema libera calor, dizemos que é um processo <strong>exotérmico</strong>.<br><br>" +
      "<strong>Jeito fácil:</strong> é como se a bolinha estivesse dizendo: “eu estou soltando calor para o mundo lá fora”."
    );

    escrever("fraseCurta",
      "❄️ <strong>Azul = calor saindo.</strong> O sistema entrega energia térmica ao ambiente."
    );
  }
}

var exemplos = {
  gelo: {
    card: "cardGelo",
    imagem: "imagens/gelo.svg",
    badge: "entrando",
    badgeTexto: "Endotérmico",
    titulo: "Gelo derretendo",
    resumo: "O gelo recebe calor do ambiente para virar água.",
    sistema: "O sistema é o gelo.",
    ambiente: "O ambiente é o ar, a mão, o prato ou a mesa ao redor.",
    calor: "O calor ENTRA no gelo.",
    ciencia: "Nome científico: processo endotérmico, porque o sistema absorve energia térmica.",
    crianca: "Como explicar para criança: o gelo precisa pegar calor do mundo ao redor para conseguir derreter."
  },
  vela: {
    card: "cardVela",
    imagem: "imagens/vela.svg",
    badge: "saindo",
    badgeTexto: "Exotérmico",
    titulo: "Vela queimando",
    resumo: "A queima da vela libera calor para o ambiente.",
    sistema: "O sistema é a reação de combustão da vela.",
    ambiente: "O ambiente é o ar e tudo que está perto da chama.",
    calor: "O calor SAI da reação e vai para fora.",
    ciencia: "Nome científico: processo exotérmico, porque o sistema libera energia térmica.",
    crianca: "Como explicar para criança: a chama está mandando calor para o mundo ao redor."
  },
  bolsa: {
    card: "cardBolsa",
    imagem: "imagens/bolsa.svg",
    badge: "entrando",
    badgeTexto: "Endotérmico",
    titulo: "Bolsa térmica fria",
    resumo: "A bolsa fria absorve calor do local encostado nela.",
    sistema: "O sistema é a mistura química dentro da bolsa.",
    ambiente: "O ambiente é a pele ou o objeto que está encostado na bolsa.",
    calor: "O calor ENTRA na bolsa.",
    ciencia: "Nome científico: processo endotérmico, porque a mistura absorve energia térmica.",
    crianca: "Como explicar para criança: a bolsa fria puxa o calor do machucado."
  },
  madeira: {
    card: "cardMadeira",
    imagem: "imagens/madeira.svg",
    badge: "saindo",
    badgeTexto: "Exotérmico",
    titulo: "Madeira queimando",
    resumo: "A combustão da madeira libera calor para o ambiente.",
    sistema: "O sistema é a reação de queima da madeira.",
    ambiente: "O ambiente é o ar e tudo que está ao redor do fogo.",
    calor: "O calor SAI da madeira em combustão.",
    ciencia: "Nome científico: processo exotérmico, porque o sistema libera energia térmica.",
    crianca: "Como explicar para criança: a madeira queimando solta calor e aquece quem está perto."
  }
};

function mostrarExemplo(tipo) {
  var e = exemplos[tipo];
  if (!e) return;

  var cards = document.querySelectorAll(".exemplo-card");
  cards.forEach(function(card) {
    card.classList.remove("ativo");
  });

  var cardAtivo = pegar(e.card);
  if (cardAtivo) cardAtivo.classList.add("ativo");

  var foto = pegar("fotoExemplo");
  if (foto) foto.src = e.imagem;

  escrever("textoExemplo",
    "<span class='badge " + e.badge + "'>" + e.badgeTexto + "</span>" +
    "<h3>" + e.titulo + "</h3>" +
    "<p>" + e.resumo + "</p>" +
    "<ul class='lista-exemplo'>" +
      "<li><strong>Sistema:</strong> " + e.sistema + "</li>" +
      "<li><strong>Ambiente:</strong> " + e.ambiente + "</li>" +
      "<li><strong>Sentido do calor:</strong> " + e.calor + "</li>" +
      "<li><strong>Termo científico:</strong> " + e.ciencia + "</li>" +
      "<li><strong>Explicação bem fácil:</strong> " + e.crianca + "</li>" +
    "</ul>"
  );
}

window.addEventListener("load", function() {
  modoCalor("entrando");
  mostrarExemplo("gelo");
});
