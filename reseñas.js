
const reseñas = [
    { nombre: "Lucía", mensaje: "¡Excelente atención y muy rápidos!" },
    { nombre: "Carlos", mensaje: "Todo llegó perfecto, gracias!" },
    { nombre: "Marta", mensaje: "Me encantó el diseño de la página." },
    { nombre: "Leo", mensaje: "Muy recomendable, 10/10." },
    { nombre: "Valeria", mensaje: "Me respondieron enseguida, un lujo." },
    { nombre: "Julián", mensaje: "Fácil de usar desde el celular." },
    { nombre: "Noelia", mensaje: "Volveré a comprar sin dudas." },
    { nombre: "Pablo", mensaje: "Muy profesionales. Felicitaciones." },
    { nombre: "Florencia", mensaje: "Los recomiendo a todos mis amigos." },
    { nombre: "Tomás", mensaje: "¡Gracias por todo! Muy satisfecho." },
    { nombre: "Federico", mensaje: "Siempre tienen los mejores precios!" },
    { nombre: "Melany", mensaje: "Muy intuitivo todo y completo, me encanta!" },
    { nombre: "Iñaki", mensaje: "Muy moderna, faltarían más juegos" },
    { nombre: "Joaquin", mensaje: "Nadie me contestó :c" },
    { nombre: "Julio", mensaje: "Pude comprar todo lo que quería" },
    { nombre: "Melina", mensaje: "Todo muy rápido y en orden <3" }
];

let index = 0;
const MAX_RESEÑAS_VISIBLES = 6;

function agregarReseña() {
    // Reiniciar índice para ciclo continuo
    if (index >= reseñas.length) {
        index = 0;
    }

    const lista = document.getElementById("listaReseñas");
    
    // Mantener solo el máximo de reseñas visibles
    if (lista.children.length >= MAX_RESEÑAS_VISIBLES) {
        lista.removeChild(lista.children[0]);
    }

    // Crear nuevo elemento de reseña
    const nueva = document.createElement("li");
    nueva.className = "reseña";
    nueva.innerHTML = `
        <div class="nombre">${reseñas[index].nombre}</div>
        <div class="mensaje">${reseñas[index].mensaje}</div>
    `;

    // Agregar al final de la lista
    lista.appendChild(nueva);

    // Animar la entrada con un pequeño delay
    setTimeout(() => {
        nueva.classList.add("visible");
    }, 50);

    // Incrementar índice para la próxima reseña
    index++;
}

// Inicializar con la primera reseña inmediatamente
agregarReseña();

// Continuar agregando reseñas cada 2 segundos
setInterval(agregarReseña, 2000);