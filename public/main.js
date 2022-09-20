// import Swal from 'sweetalert2'
/**General settings */
const { log, warn, error } = console;

/** .:::::::::::::::::::::::::::: Main code ::::::::::::::::::::::::::::::.. **/

// ### VARIABLES ###
const $guess = document.getElementById('guess'), // Contenedor de la lógica
    $lettersContainer = document.getElementById('letters-container'), // Contenedor de las letras
    $underscores = document.querySelector('#guess .underscores'), //Espacio donde se mostrará los guiones
    $lives = document.getElementById('life'),
    $btnPista = document.getElementById('track-btn'),
    $showHint = document.getElementById('track-show'),
    $anotherWord = document.getElementById('another-word'),
    $reset = document.getElementById('reset'),
    $image = document.getElementsByClassName('imagen'), //Nodo de todas las imágenes
    $hangman = document.getElementById('hangman'),
    $fragment = document.createDocumentFragment();

let words = [
    { name: 'platano', hint: 'Es una fruta' },
    { name: 'caracol', hint: 'Es el animal terrestre más "veloz".' },
    { name: 'peru', hint: 'Es un pais' },
    { name: 'laptop', hint: 'Es un herramienta de trabajo en oficina' },
    { name: 'liverpool', hint: 'Es un club del fútbol inglés' },
    { name: 'titanic', hint: 'Es un barco muy famoso. Se hizo una película sobre él.' },
    { name: 'ronaldinho', hint: 'No juagaba al fútbol, se divertía.' },
    { name: 'wifi', hint: 'Nos conecta a todos' },
    { name: 'condor', hint: 'Es un animal aéreo de Los Andes.' },
    { name: 'goku', hint: 'Es un guerrero z' },
    { name: 'prisioneros', hint: 'Tren al sur' },
    { name: 'avicii', hint: 'DJ que murió joven' },
    { name: 'amazonas', hint: 'Río mas caudaloso del mundo' },
    { name: 'elon', hint: 'Dueño de Neuralink' },
    { name: 'python', hint: 'Muy buen lenguaje para la ciencia de datos' },
    { name: 'ceviche', hint: 'Es un plato típico del Perú' },
    { name: 'guerrero', hint: 'Jugador acusado de ingerir sustancias ilícitas.' },
    { name: 'despasito', hint: 'Canción más reproducida en Youtube.' },
    { name: 'johnwick', hint: 'Todo empezó porque asesinaron a su perro.' },
    { name: 'leon', hint: 'Rey de la selva' },
],
    underscores = [],
    lives = 6,
    randomNumber,
    wordChosen = [];

// Mostrar los intentos disponibles al inicio
$lives.innerHTML = `Te quedan <b style="color: #E94560">${lives}</b> intentos`;

// Copia del HTMLCollection '$image' para poder iterar, agregar o eliminar
let copyOfCollection = Array.from($image);


// ### EVENTOS DE BOTONES ###

// Mostrar la pista al jugador
$btnPista.addEventListener('click', _ => {
    $showHint.innerText = words[randomNumber].hint;
    $showHint.classList.toggle('hidden');
});

// Resetear el juego
$reset.addEventListener('click', _ => {
    location.reload();
});

// Cambiar de palabra
$anotherWord.addEventListener('click', _ => {
    underscores = [];
    drawUnderscores(words);
    lives = 6;
    $lives.innerText = `Te quedan ${lives} intentos`;
    $showHint.innerText = '';
    for (let i = 0; i < copyOfCollection.length; i++) {
        copyOfCollection[i].style.visibility = 'visible';
    }
    const copyButtons = document.getElementsByClassName('letra');
    for (let i = 0; i < copyButtons.length; i++) {
        copyButtons[i].disabled = false;
        copyButtons[i].style.border = '2px solid #E94560';
        copyButtons[i].style.color = '#fff';
        copyButtons[i].style.cursor = 'pointer';
        copyButtons[i].style.background = '#E94560';
    }
});

// ### FUNCIONES ###

// Dibujar guiones de acuerdo a la palabra elegida
const drawUnderscores = category => {
    randomNumber = Math.floor(Math.random() * category.length);
    for (let i = 0; i < category[randomNumber].name.length; i++) {
        underscores[i] = '_';
    };
    $underscores.innerText = underscores.join('');
    wordChosen = category[randomNumber].name.toUpperCase().split('');
}

// Generar Letras [a-z]
const displayLetters = (a, z) => {
    let i = a.charCodeAt(0), j = z.charCodeAt(0);
    for (; i <= j; i++) {
        let letter = String.fromCharCode(i).toUpperCase();
        const $button = document.createElement('button');
        $button.classList.add('letra');
        $button.setAttribute('id', `${letter}`);
        $button.setAttribute('onclick', `chooseLetter(\'${letter}\')`);
        $button.style.display = 'inline-block';
        $button.style.border = '2px solid #E94560';
        $button.style.color = '#fff';
        $button.style.background = '#E94560';
        $button.style.borderRadius = '20px';
        $button.style.width = '60px';
        $button.style.height = '60px';
        $button.style.font = '16px Verdana';
        $button.style.margin = '5px';
        $button.style.cursor = 'pointer';
        $button.innerHTML = `<b>${letter}</b>`;
        $fragment.appendChild($button);
    }
    $lettersContainer.appendChild($fragment);
}

// Letra escogida comparar si pertenece a la palabra escogida
function chooseLetter(letter) {
    document.getElementById(letter).disabled = true; // inhabilitar la letra escogida
    document.getElementById(letter).style.background = '#16213E';
    document.getElementById(letter).style.color = '#777';
    document.getElementById(letter).style.cursor = 'default';
    document.getElementById(letter).style.border = '2px solid #444';
    if (wordChosen.includes(letter)) {

        //Por cada letra de la palabra random, verificar si coincide con la letra escogida
        //Esta es la parte más importante
        for (let i = 0; i < wordChosen.length; i++) {
            if (wordChosen[i] === letter) underscores[i] = letter;
        }
        $underscores.innerText = underscores.join('');
        if (underscores.join('') === wordChosen.join('')) {
            Swal.fire({
                title: '<strong>¡Felicidades!</strong>',
                text: 'Has adivinado correctamente la palabra secreta.',
                position: 'center',
                icon: 'success',
                color: '#fff',
                showClass: {
                    popup: 'animate__animated animate__backInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__backOutUp'
                },
                background: '#16213E',
                showConfirmButton: true,
            });
            const copyButtons = document.getElementsByClassName('letra');
            for (i = 0; i < copyButtons.length; i++) {
                copyButtons[i].disabled = true;
                copyButtons[i].style.background = '#16213E';
                copyButtons[i].style.color = '#777';
                copyButtons[i].style.cursor = 'default';
                copyButtons[i].style.border = '2px solid #444';
            }
            $lives.innerText = '';
        }
    } else {
        copyOfCollection[lives].style.visibility = 'hidden';
        lives--;
        if (lives === 0) {
            Swal.fire({
                title: '<strong>¡Lo siento!</strong>',
                text: 'Has perdido :(',
                position: 'center',
                icon: 'error',
                showClass: {
                    popup: 'animate__animated animate__backInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__backOutUp'
                },
                color: '#fff',
                background: '#16213E',
                showConfirmButton: true,
            });
            const copyButtons = document.getElementsByClassName('letra');
            for (i = 0; i < copyButtons.length; i++) {
                copyButtons[i].disabled = true;
                copyButtons[i].style.background = '#16213E';
                copyButtons[i].style.color = '#777';
                copyButtons[i].style.cursor = 'default';
                copyButtons[i].style.border = '2px solid #444';
            }
            $lives.innerText = '';
        } else $lives.innerHTML = `Te quedan <b style="color: #E94560">${lives}</b> intentos`;
    };
}

const init = () => {
    drawUnderscores(words);
    displayLetters('a', 'z');
}

// ### INICIO DEL JUEGO ###
window.onload = init();