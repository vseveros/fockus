const html = document.querySelector('html')
const timer = document.querySelector('#timer')
const img = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')

// Botões
const iniciobtn = document.querySelector('#start-pause')
const focobtn = document.querySelector('.app__card-button--foco')
const curtobtn = document.querySelector('.app__card-button--curto')
const longobtn = document.querySelector('.app__card-button--longo')
const botoes = document.querySelectorAll('.app__card-button')
const iniciobtntexto = document.querySelector('#start-pause')

// Sons
const musica = document.querySelector('#alternar-musica')
const musicaarquivo = new Audio('/sons/luna-rise-part-one.mp3')
musicaarquivo.loop = true
const audioplay = new Audio('/sons/play.mp3')
const audiopausa = new Audio('/sons/pause.mp3')
const audiofinal = new Audio('/sons/beep.wav')
audiofinal.loop = false

//Timer
let duracaofoco = 1500;
let duracaocurto = 300;
let duracaolongo = 900;
let tempoDecorridoEmSegundos = 1500
let intervalo = null

musica.addEventListener('change', () => {
    if(musicaarquivo.paused) {
        musicaarquivo.play()
    } else {
        musicaarquivo.pause()
    }
})

focobtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarcontexto('foco')
    focobtn.classList.add('active')
})

curtobtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarcontexto('descanso-curto')
    curtobtn.classList.add('active')
    
})

longobtn.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarcontexto('descanso-longo')
    longobtn.classList.add('active')
})

function alterarcontexto (contexto) {
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')
    });
    html.setAttribute('data-contexto', contexto)
    img.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br><strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br><strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
    }
}

const contagemregressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audiofinal.play()
        zerar()
        alert('Tempo finalizado')
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

iniciobtn.addEventListener('click', iniciaroupausar)

function iniciaroupausar() {
    if(intervalo){
        audiopausa.play();
        zerar()
        return
    }
    audioplay.play()
    intervalo = setInterval(contagemregressiva, 1000)
    iniciobtntexto.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt=""> <span>Pausar</span>`
}

function zerar(){
    clearInterval(intervalo)
    iniciobtntexto.innerHTML = `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""> <span>Iniciar</span>`
    intervalo = null
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoformatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoformatado}`
}

mostrarTempo()