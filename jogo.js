function iniciarJogo() {
	var nivel = document.getElementById('nivel').value

	if(nivel === '') {
		alert('Selecione um nível para iniciar o jogo')
		return false
	}

	window.location.href = "app.html?" + nivel

}

var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaVirusTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal') {
	//1500
	criaVirusTempo = 1500
} else if(nivel === 'dificil') {
	//1000
	criaVirusTempo = 1000
} else if (nivel === 'jackchan') {
	//750
	criaVirusTempo = 750
}

function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

	console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {

	tempo -= 1

	if(tempo < 0) {
		clearInterval(cronometro)
		clearInterval(criaVirus)
		window.location.href = 'vitoria.html'
	} else {
		document.getElementById('cronometro').innerHTML = tempo
	}
	
}, 1000)


function posicaoRandomica() {


	//remover o virus anterior (caso exista)
	if(document.getElementById('virus')) {
		document.getElementById('virus').remove()

		//console.log('elemento selecionado foi: v' + vidas)
		if(vidas > 3) {

			window.location.href = 'fim_de_jogo.html'
		} else {
			document.getElementById('v' + vidas).src = "images/coracao_vazio.png"

			vidas++
		}
	}

	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY = Math.floor(Math.random() * altura) - 90

	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)

	//criar o elemento html
	var virus = document.createElement('img')
	virus.src = 'images/corona.png'
	virus.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
	virus.style.left = posicaoX + 'px'
	virus.style.top = posicaoY + 'px'
	virus.style.position = 'absolute'
	virus.id = 'virus'
	virus.onclick = function() {
		this.remove()
	}

	document.body.appendChild(virus)

}

function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)
	
	switch(classe) {
		case 0:
			return 'virus1'
		
		case 1:
			return 'virus2'

		case 2:
			return 'virus3'
	}
}

function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)
	
	switch(classe) {
		case 0:
			return 'ladoA'
		
		case 1:
			return 'ladoB'

	}
}

