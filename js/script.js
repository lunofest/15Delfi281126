
if ('serviceWorker' in navigator) {
    if (location.protocol === 'https:') {
        window.addEventListener('load', function () {
            navigator.serviceWorker.register('service-worker.js')
                .then(function (reg) {
                    console.log('[SW] Registrado con éxito:', reg.scope);
                })
                .catch(function (err) {
                    console.warn('[SW] Error al registrar:', err);
                });
        });
    } else {
        navigator.serviceWorker.getRegistrations().then(function (regs) {
            regs.forEach(function (r) { r.unregister(); });
            console.log('[SW] Modo local: service worker desactivado y caché limpia.');
        });
        if (window.caches) {
            caches.keys().then(function (keys) {
                keys.forEach(function (k) { caches.delete(k); });
            });
        }
    }
}







const targetDate = new Date("2026-11-28T22:00:00-03:00").getTime();

const cuentaNumeros = document.querySelectorAll(".cuenta__numero");

function actualizarCuenta() {
    const diferencia = Math.max(targetDate - Date.now(), 0);
    const dias = Math.floor(diferencia / 86400000);
    const horas = Math.floor((diferencia / 3600000) % 24);
    const minutos = Math.floor((diferencia / 60000) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);
    const valores = [dias, horas, minutos, segundos];

    cuentaNumeros.forEach((numero, indice) => {
        numero.textContent = String(valores[indice]).padStart(2, "0");
    });
}

actualizarCuenta();
setInterval(actualizarCuenta, 1000);

const audio = document.querySelector(".header__audio");
const botonMusica = document.querySelector(".reproductor__boton");
const textoMusica = document.querySelector(".reproductor__texto");

botonMusica.addEventListener("click", () => {
    if (audio.paused) {
        audio.play().then(() => {
            botonMusica.classList.add("reproductor__boton_activo");
            botonMusica.setAttribute("aria-pressed", "true");
            botonMusica.setAttribute("aria-label", "Pausar música");
            textoMusica.textContent = "Pausa";
        }).catch(() => { });
    } else {
        audio.pause();
        botonMusica.classList.remove("reproductor__boton_activo");
        botonMusica.setAttribute("aria-pressed", "false");
        botonMusica.setAttribute("aria-label", "Reproducir música");
        textoMusica.textContent = "Play";
    }
});



// ------------------- fotos ----------------------

var swiper = window.Swiper ? new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0,
        stretch: 4,
        depth: 3,
        modifier: 50,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    autoplay: {
        delay: 2000, // Time between slides in milliseconds (e.g., 3 seconds)
        disableOnInteraction: false, // Set to true to stop autoplay on user interaction (e.g., dragging)
    },
    loop: true, // Enable infinite loop
}) : null;


/* --------------------- regalos  ------------------------ */

const botonDatos = document.querySelector(".regalos__boton");
const datosBancarios = document.querySelector(".regalos__datos");

if (botonDatos && datosBancarios) {
    botonDatos.addEventListener("click", () => {
        const mostrar = datosBancarios.hasAttribute("hidden");

        if (mostrar) {
            datosBancarios.removeAttribute("hidden");
        } else {
            datosBancarios.setAttribute("hidden", "");
        }

        botonDatos.setAttribute("aria-expanded", String(mostrar));
        botonDatos.textContent = mostrar ? "Ocultar datos bancarios" : "Ver datos bancarios";
    });
}

async function copiarTexto(texto) {
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(texto);
            return true;
        } catch (error) { }
    }

    const area = document.createElement("textarea");
    area.value = texto;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    document.body.appendChild(area);
    area.select();

    let copiado = false;

    try {
        copiado = document.execCommand("copy");
    } catch (error) { }

    document.body.removeChild(area);
    return copiado;
}

document.querySelectorAll(".regalos__copiar").forEach((boton) => {
    boton.addEventListener("click", async () => {
        const valor = boton.closest(".regalos__dato").querySelector(".regalos__valor").textContent.trim();
        const copiado = await copiarTexto(valor);
        const etiqueta = boton.querySelector(".regalos__copiar_texto");

        if (!copiado) {
            return;
        }

        const original = etiqueta.textContent;
        etiqueta.textContent = "Copiado";

        setTimeout(() => {
            etiqueta.textContent = original;
        }, 1500);
    });
});

/* --------------------- playlist ------------------------ */

const numeroWhatsApp = "543815411429";

const formPlaylist = document.querySelector(".playlist__form");

if (formPlaylist) {
    formPlaylist.addEventListener("submit", (event) => {
        event.preventDefault();

        const nombre = formPlaylist.querySelector("#playlist-nombre").value.trim();
        const recomendacion = formPlaylist.querySelector("#playlist-recomendacion").value.trim();

        if (!nombre || !recomendacion) {
            return;
        }

        const mensaje = `¡Hola! Soy ${nombre}. Mi recomendación para la playlist es: ${recomendacion}`;
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

        window.open(url, "_blank", "noopener,noreferrer");
        formPlaylist.reset();
    });
}


/* ----------------- confirmacion --------------------- */

document.addEventListener("DOMContentLoaded", function () {
    const recipientNumber1 = "543815497604";
    const recipientNumber2 = "543816591298";

    function sendMessage(phoneNumber) {
        const userName = document.getElementById("userFullName").value.trim();
        const userMessage = document.getElementById("customMessage").value.trim();
        const attendanceStatus = document.querySelector('input[name="attendanceOption"]:checked');

        if (!attendanceStatus) {
            alert("Por favor, selecciona si asistirás o no.");
            return;
        }

        if (userName === "") {
            alert("Por favor, completa todos los campos antes de enviar.");
            return;
        }

        let finalMessage = `Hola, mi nombre es _*${userName}*_\nConfirmo que _*${attendanceStatus.value}*_`;

        if (userMessage !== "") {
            finalMessage += `\nMi mensaje es: _*${userMessage}*_`;
        }

        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;

        window.open(whatsappLink, "_blank");

        document.getElementById("userFullName").value = "";
        document.getElementById("customMessage").value = "";
        document.querySelectorAll('input[name="attendanceOption"]').forEach((radio) => (radio.checked = false));

        alert("Mensaje enviado");
        window.location.hash = "correo";
    }

    document.getElementById("btnConfirmacion1").addEventListener("click", function () {
        sendMessage(recipientNumber1);
    });

    document.getElementById("btnConfirmacion2").addEventListener("click", function () {
        sendMessage(recipientNumber2);
    });
});
