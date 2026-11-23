const API_URL = "https://api-colombia.com/api/v1";

const estado = document.querySelector("#estado");

// Se identifica la página para consultar el recurso correspondiente.
if (document.body.dataset.pagina === "presidentes") {
    cargarPresidentes();
} else if (document.body.dataset.pagina === "sabores") {
    cargarPlatos();
}

async function cargarPresidentes() {
    const contenedor = document.querySelector("#lista-presidentes");

    try {
        const respuesta = await fetch(`${API_URL}/President`);

        if (!respuesta.ok) {
            throw new Error("No fue posible consultar los presidentes.");
        }

        const presidentes = await respuesta.json();

        // Se ordenan los registros por el año de inicio del periodo.
        presidentes.sort((a, b) => {
            return new Date(a.startPeriodDate).getTime() - new Date(b.startPeriodDate).getTime();
        });

        if (presidentes.length === 0) {
            estado.textContent = "No se encontraron presidentes para mostrar.";
            return;
        }

        presidentes.forEach((presidente) => {
            const tarjeta = document.createElement("article");
            tarjeta.classList.add("tarjeta-dato");

            const imagen = document.createElement("img");
            imagen.classList.add("imagen-presidente");
            imagen.src = presidente.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80";
            imagen.alt = `Retrato de ${presidente.name || "presidente"} ${presidente.lastName || ""}`;
            imagen.loading = "lazy";
            imagen.addEventListener("error", () => {
                imagen.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80";
            }, { once: true });

            const contenido = document.createElement("div");
            contenido.classList.add("contenido-tarjeta");

            const nombre = document.createElement("h2");
            nombre.textContent = `${presidente.name || "Nombre no disponible"} ${presidente.lastName || ""}`.trim();

            const periodo = document.createElement("p");
            periodo.innerHTML = `<strong>Periodo:</strong> ${formatearFecha(presidente.startPeriodDate)} - ${formatearFecha(presidente.endPeriodDate)}`;

            const partido = document.createElement("p");
            partido.innerHTML = `<strong>Partido político:</strong> ${escaparTexto(presidente.politicalParty || "No especificado")}`;

            contenido.append(nombre, periodo, partido);
            tarjeta.append(imagen, contenido);
            contenedor.append(tarjeta);
        });

        estado.textContent = `Se encontraron ${presidentes.length} presidentes.`;
    } catch (error) {
        console.error("Error al cargar los presidentes:", error);
        estado.textContent = "Ocurrió un error al cargar la información. Verifica tu conexión e inténtalo de nuevo.";
        estado.classList.add("mensaje-error");
    }
}

async function cargarPlatos() {
    const contenedor = document.querySelector("#lista-platos");
    const total = document.querySelector("#total-platos");

    try {
        const respuesta = await fetch(`${API_URL}/TypicalDish`);

        if (!respuesta.ok) {
            throw new Error("No fue posible consultar los platos típicos.");
        }

        const platos = await respuesta.json();

        if (platos.length === 0) {
            estado.textContent = "No se encontraron platos típicos para mostrar.";
            total.textContent = "0";
            return;
        }

        platos.forEach((plato) => {
            const tarjeta = document.createElement("article");
            tarjeta.classList.add("tarjeta-dato", "tarjeta-plato");

            const imagen = document.createElement("img");
            imagen.src = plato.imageUrl || "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80";
            imagen.alt = `Imagen de ${plato.name || "plato típico colombiano"}`;
            imagen.loading = "lazy";
            imagen.addEventListener("error", () => {
                imagen.src = "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80";
            }, { once: true });

            const contenido = document.createElement("div");
            contenido.classList.add("contenido-tarjeta");

            const nombre = document.createElement("h2");
            nombre.textContent = plato.name || "Nombre no disponible";

            const descripcion = document.createElement("p");
            descripcion.textContent = plato.description || "No hay una descripción disponible para este plato.";

            const departamento = document.createElement("p");
            const nombreDepartamento = plato.department?.name || "No especificado";
            departamento.innerHTML = `<strong>Departamento:</strong> ${escaparTexto(nombreDepartamento)}`;

            contenido.append(nombre, descripcion, departamento);
            tarjeta.append(imagen, contenido);
            contenedor.append(tarjeta);
        });

        total.textContent = platos.length;
        estado.textContent = `Se cargaron ${platos.length} platos típicos.`;
    } catch (error) {
        console.error("Error al cargar los platos:", error);
        estado.textContent = "Ocurrió un error al cargar la información. Verifica tu conexión e inténtalo de nuevo.";
        estado.classList.add("mensaje-error");
    }
}

function formatearFecha(fecha) {
    if (!fecha) {
        return "Fecha no disponible";
    }

    const fechaValida = new Date(fecha);

    if (Number.isNaN(fechaValida.getTime())) {
        return fecha;
    }

    return fechaValida.getFullYear();
}

// Evita interpretar como HTML los textos recibidos desde la API.
function escaparTexto(texto) {
    return String(texto)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
