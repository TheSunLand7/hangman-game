import Swal from "sweetalert2";

// ### VARIABLES ###
const $lettersContainer = document.getElementById("letters-container") as HTMLDivElement, // Contenedor de las letras
	$underscores = document.querySelector("#guess .underscores") as HTMLDivElement, //Espacio donde se mostrará los guiones
	$lives = document.getElementById("life") as HTMLParagraphElement,
	$btnPista = document.getElementById("track-btn") as HTMLButtonElement,
	$showHint = document.getElementById("track-show") as HTMLSpanElement,
	$anotherWord = document.getElementById("another-word") as HTMLButtonElement,
	$reset = document.getElementById("reset") as HTMLButtonElement,
	$image = document.getElementsByClassName("imagen") as HTMLCollectionOf<HTMLImageElement>; //Nodo de todas las imágenes

type Phrase = {
	name: string;
	hint: string;
};
let words: Phrase[] = [
		{ name: "platano", hint: "Es una fruta" },
		{ name: "caracol", hint: 'Es el animal terrestre más "veloz".' },
		{ name: "peru", hint: "Es un pais" },
		{ name: "laptop", hint: "Es un herramienta de trabajo en oficina" },
		{ name: "liverpool", hint: "Es un club del fútbol inglés" },
		{ name: "titanic", hint: "Es un barco muy famoso. Se hizo una película sobre él." },
		{ name: "ronaldinho", hint: "No juagaba al fútbol, se divertía." },
		{ name: "wifi", hint: "Nos conecta a todos" },
		{ name: "condor", hint: "Es un animal aéreo de Los Andes." },
		{ name: "goku", hint: "Es un guerrero z" },
		{ name: "prisioneros", hint: "Tren al sur" },
		{ name: "avicii", hint: "DJ que murió joven" },
		{ name: "amazonas", hint: "Río mas caudaloso del mundo" },
		{ name: "elon", hint: "Dueño de Neuralink" },
		{ name: "python", hint: "Muy buen lenguaje para la ciencia de datos" },
		{ name: "ceviche", hint: "Es un plato típico del Perú" },
		{ name: "guerrero", hint: "Jugador acusado de ingerir sustancias ilícitas." },
		{ name: "despasito", hint: "Canción más reproducida en Youtube." },
		{ name: "johnwick", hint: "Todo empezó porque asesinaron a su perro." },
		{ name: "leon", hint: "Rey de la selva" },
	],
	underscores: string[] = [],
	lives = 6,
	randomNumber: number,
	wordChosen: Array<string> = [],
	RED: string = "#E94560",
	LIME: string = "#C3FF99";

// Mostrar los intentos disponibles al inicio
$lives.innerHTML = `Te quedan <b style="color: ${RED}">${lives}</b> intentos`;

// Copia del HTMLCollection '$image' para poder iterar, agregar o eliminar
let copyOfCollection = Array.from($image);

/** .:::::::::::::::::::::::::::: Main code ::::::::::::::::::::::::::::::.. **/
// ### EVENTOS DE BOTONES ###

// Mostrar la pista al jugador
$btnPista.addEventListener("click", (_) => {
	$showHint.textContent = words[randomNumber].hint;
	$showHint.classList.toggle("hidden");
});

// Resetear el juego
$reset.addEventListener("click", (_) => {
	location.reload();
});

// Cambiar de palabra
$anotherWord.addEventListener("click", (_) => {
	underscores = [];
	drawUnderscores(words);
	lives = 6;
	$lives.innerHTML = `Te quedan <b style="color: ${RED}">${lives}</b> intentos`;
	$showHint.textContent = "";
	for (let i = 0; i < copyOfCollection.length; i++) {
		copyOfCollection[i].style.visibility = "visible";
	}
	const copyButtons = document.getElementsByClassName(
		"letra"
	) as HTMLCollectionOf<HTMLButtonElement>;
	for (let i = 0; i < copyButtons.length; i++) {
		copyButtons[i].disabled = false;
		copyButtons[i].style.border = `2px solid ${RED}`;
		copyButtons[i].style.color = "#ffffff";
		copyButtons[i].style.cursor = "pointer";
		copyButtons[i].style.background = RED;
	}
});

// ### FUNCIONES ###
type Message = {
	color: string;
	title: string;
	message: string;
};
const messageAlert = (param: Message) => {
	const { color, title, message } = param;
	Swal.fire({
		title: `<strong style="font-family: Rajdhani, sans-serif; color: ${color};">${title}</strong>`,
		html: `<span style="font-family: Rajdhani, sans-serif;">${message}</span>`,
		position: "center",
		icon: "success",
		color: "#ffffff",
		showClass: {
			popup: "animate__animated animate__backInDown",
		},
		hideClass: {
			popup: "animate__animated animate__backOutUp",
		},
		background: "#16213E",
		showConfirmButton: true,
	});
	const copyButtons = document.getElementsByClassName(
		"letra"
	) as HTMLCollectionOf<HTMLButtonElement>;
	for (let i = 0; i < copyButtons.length; i++) {
		copyButtons[i].disabled = true;
		copyButtons[i].style.background = "#16213E";
		copyButtons[i].style.color = "#777777";
		copyButtons[i].style.cursor = "default";
		copyButtons[i].style.border = "2px solid #444444";
	}
	$lives.textContent = "";
};

// Dibujar guiones de acuerdo a la palabra elegida
const drawUnderscores = (category: Phrase[]) => {
	randomNumber = Math.floor(Math.random() * category.length);
	for (let i = 0; i < category[randomNumber].name.length; i++) {
		underscores[i] = "_";
	}
	$underscores.textContent = underscores.join("");
	wordChosen = category[randomNumber].name.toUpperCase().split("");
};

// Generar Letras [a-z]
const displayLetters = (a: string, z: string) => {
	let i = a.charCodeAt(0),
		j = z.charCodeAt(0);
	for (; i <= j; i++) {
		let letter = String.fromCharCode(i).toUpperCase();
		$lettersContainer.innerHTML += `
			<button class="letra" id="${letter}">${letter}</button>
		`;
	}
	const $letra = document.getElementsByClassName("letra") as HTMLCollectionOf<HTMLButtonElement>;
	for (let letra of $letra) {
		letra.onclick = function () {
			letra.disabled = true; // inhabilitar la letra escogida
			letra.style.background = "#16213E";
			letra.style.color = "#777777";
			letra.style.cursor = "default";
			letra.style.border = "2px solid #444444";
			if (wordChosen.includes(letra.textContent!)) {
				//Por cada letra de la palabra random, verificar si coincide con la letra escogida
				//Esta es la parte más importante
				for (let i = 0; i < wordChosen.length; i++) {
					if (wordChosen[i] === letra.textContent) underscores[i] = letra.textContent;
				}
				$underscores.textContent = underscores.join("");
				if (underscores.join("") === wordChosen.join("")) {
					messageAlert({
						color: LIME,
						title: "¡Felicidades!",
						message: "Has adivinado correctamente la palabra secreta.",
					});
				}
			} else {
				copyOfCollection[lives].style.visibility = "hidden";
				lives--;
				if (lives === 0) {
					messageAlert({ color: RED, title: "¡Lo siento!", message: "Has perdido :(" });
				} else
					$lives.innerHTML = `Te quedan <b style="color: ${RED}">${lives}</b> intentos`;
			}
		};
	}
};

// ### INICIO DEL JUEGO ###
window.onload = function () {
	drawUnderscores(words);
	displayLetters("a", "z");
};
