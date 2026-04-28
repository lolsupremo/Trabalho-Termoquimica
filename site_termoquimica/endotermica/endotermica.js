
function pegar(id){return document.getElementById(id)}
function escrever(id,texto){var el=pegar(id);if(el)el.innerHTML=texto}
function yEnergia(valor){var max=140,topo=55,base=345;return base-(valor/max)*(base-topo)}
function setAttr(id,nome,valor){var el=pegar(id);if(el)el.setAttribute(nome,valor)}
function atualizarGraficoEndo(){
  var hr=Number(pegar('endoHr')?.value||35);
  var hp=Number(pegar('endoHp')?.value||105);
  var dh=hp-hr;
  escrever('valorHr',hr+' kJ');
  escrever('valorHp',hp+' kJ');
  var yR=yEnergia(hr), yP=yEnergia(hp);
  var yPico=Math.min(yR,yP)-70; if(yPico<70)yPico=70;
  setAttr('linhaR','y1',yR); setAttr('linhaR','y2',yR);
  setAttr('linhaP','y1',yP); setAttr('linhaP','y2',yP);
  setAttr('guiaR','y1',yR); setAttr('guiaR','y2',yR);
  setAttr('guiaP','y1',yP); setAttr('guiaP','y2',yP);
  var caminho='M 145 '+yR+' L 300 '+yR+' C 360 '+yR+', 370 '+yPico+', 455 '+yPico+' C 545 '+yPico+', 540 '+yP+', 610 '+yP+' L 765 '+yP;
  setAttr('curvaEndo','d',caminho);
  setAttr('setaDH','x1',805); setAttr('setaDH','x2',805); setAttr('setaDH','y1',yR); setAttr('setaDH','y2',yP);
  escrever('textoR','Reagentes: '+hr+' kJ');
  escrever('textoP','Produtos: '+hp+' kJ');
  escrever('textoDH',(dh>0?'ΔH = +':'ΔH = ')+dh+' kJ');
  var badge='Endotérmica<br>calor entrando', texto='';
  if(dh>0){texto='<strong>Resultado:</strong> ΔH = '+hp+' − '+hr+' = <strong>+'+dh+' kJ</strong>.<br>Como deu positivo, os produtos ficaram com mais energia. O sistema precisou receber calor do ambiente.'}
  else if(dh===0){badge='ΔH = 0<br>sem saldo';texto='<strong>Resultado:</strong> ΔH = 0 kJ.<br>Aqui produtos e reagentes ficaram no mesmo nível de energia.';escrever('textoDH','ΔH = 0 kJ')}
  else{badge='Não é endotérmica';texto='<strong>Atenção:</strong> com esses valores, os produtos ficaram com menos energia que os reagentes.<br>Então isso não é endotérmico; parece uma situação exotérmica.'}
  escrever('badgeEndo',badge); escrever('saidaEndo',texto);
}
function exemploEndotermico(){pegar('endoHr').value=35;pegar('endoHp').value=110;atualizarGraficoEndo()}
function exemploFraco(){pegar('endoHr').value=60;pegar('endoHp').value=85;atualizarGraficoEndo()}
window.addEventListener('load',function(){atualizarGraficoEndo()});
