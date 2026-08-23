// ============================================================
// RAPANUI FUTURO
// SCRIPT PRINCIPAL
// ============================================================


// ============================================================
// NAVEGACIÓN
// ============================================================

function mostrar(id) {

    document
        .querySelectorAll(".panel")
        .forEach(panel => {
            panel.style.display = "none";
        });

    const panel = document.getElementById(id);

    if (panel) {

        panel.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

}


// ============================================================
// PANEL INICIAL
// ============================================================

mostrar("mar");


// ============================================================
// CONDICIONES ACTUALES
// ============================================================

async function cargarCondiciones() {

    const elementoTemp =
        document.getElementById("tempMar");

    const elementoOleaje =
        document.getElementById("oleaje");

    try {

        const url =
            "https://marine-api.open-meteo.com/v1/marine" +
            "?latitude=-27.1127" +
            "&longitude=-109.3497" +
            "&current=wave_height,sea_surface_temperature" +
            "&timezone=auto";

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error(
                "Error Marine API: " + respuesta.status
            );
        }

        const datos = await respuesta.json();

        const temperatura =
            datos.current?.sea_surface_temperature;

        const oleaje =
            datos.current?.wave_height;


        if (elementoTemp) {

            if (
                temperatura !== null &&
                temperatura !== undefined &&
                Number.isFinite(Number(temperatura))
            ) {

                elementoTemp.textContent =
                    Number(temperatura).toFixed(1) + " °C";

            } else {

                elementoTemp.textContent =
                    "No disponible";

            }

        }


        if (elementoOleaje) {

            if (
                oleaje !== null &&
                oleaje !== undefined &&
                Number.isFinite(Number(oleaje))
            ) {

                elementoOleaje.textContent =
                    Number(oleaje).toFixed(2) + " m";

            } else {

                elementoOleaje.textContent =
                    "No disponible";

            }

        }

    }
    catch (error) {

        console.error(
            "Error obteniendo datos marinos:",
            error
        );

        if (elementoTemp) {
            elementoTemp.textContent =
                "No disponible";
        }

        if (elementoOleaje) {
            elementoOleaje.textContent =
                "No disponible";
        }

    }

}


// ============================================================
// VIENTO
// ============================================================

async function cargarViento() {

    const elemento =
        document.getElementById("viento");

    try {

        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=-27.1127" +
            "&longitude=-109.3497" +
            "&current=wind_speed_10m" +
            "&timezone=auto";

        const respuesta =
            await fetch(url);

        if (!respuesta.ok) {
            throw new Error(
                "Error Weather API: " +
                respuesta.status
            );
        }

        const datos =
            await respuesta.json();

        const viento =
            datos.current?.wind_speed_10m;

        if (elemento) {

            if (
                viento !== null &&
                viento !== undefined &&
                Number.isFinite(Number(viento))
            ) {

                elemento.textContent =
                    Number(viento).toFixed(1) +
                    " km/h";

            } else {

                elemento.textContent =
                    "No disponible";

            }

        }

    }
    catch (error) {

        console.error(
            "Error obteniendo viento:",
            error
        );

        if (elemento) {
            elemento.textContent =
                "No disponible";
        }

    }

}


// ============================================================
// SALINIDAD
// ============================================================

const salinidad =
    document.getElementById("salinidad");

if (salinidad) {
    salinidad.textContent = "≈ 35 PSU";
}


cargarCondiciones();
cargarViento();


// ============================================================
// DATOS CIENTÍFICOS
// ============================================================

const nivelMarSSP245 = {

    2000: 0,
    2005: 2,
    2010: 4,
    2015: 6,
    2020: 8,
    2025: 10,
    2030: 13,
    2035: 16,
    2040: 19,
    2045: 22,
    2050: 25,
    2055: 29,
    2060: 33,
    2065: 37,
    2070: 41,
    2075: 45,
    2080: 49,
    2085: 53,
    2090: 57,
    2095: 61,
    2100: 66

};


const nivelMarSSP585 = {

    2000: 0,
    2005: 2,
    2010: 4,
    2015: 6,
    2020: 8,
    2025: 11,
    2030: 14,
    2035: 18,
    2040: 22,
    2045: 27,
    2050: 32,
    2055: 37,
    2060: 42,
    2065: 47,
    2070: 52,
    2075: 57,
    2080: 62,
    2085: 68,
    2090: 74,
    2095: 80,
    2100: 86

};


const co2NOAA = {

    2000: 369.55,
    2001: 371.14,
    2002: 373.28,
    2003: 375.80,
    2004: 377.52,
    2005: 379.80,
    2006: 381.90,
    2007: 383.79,
    2008: 385.60,
    2009: 387.43,
    2010: 389.90,
    2011: 391.65,
    2012: 393.85,
    2013: 396.48,
    2014: 398.65,
    2015: 400.83,
    2016: 404.24,
    2017: 406.55,
    2018: 408.52,
    2019: 411.44,
    2020: 414.24,
    2021: 416.45,
    2022: 418.56,
    2023: 421.08,
    2024: 424.61,
    2025: 427.35

};


const co2Proyeccion = {

    2030: 438,
    2040: 465,
    2050: 495,
    2060: 525,
    2070: 555,
    2080: 585,
    2090: 615,
    2100: 645

};


const temperaturaReferencia = {

    2000: 22.4,
    2005: 22.5,
    2010: 22.6,
    2015: 22.8,
    2020: 23.0,
    2025: 23.2,
    2030: 23.4,
    2035: 23.6,
    2040: 23.8,
    2045: 24.0,
    2050: 24.2,
    2055: 24.4,
    2060: 24.6,
    2065: 24.8,
    2070: 25.0,
    2075: 25.1,
    2080: 25.2,
    2085: 25.3,
    2090: 25.4,
    2095: 25.5,
    2100: 25.6

};


// ============================================================
// INTERPOLACIÓN
// ============================================================

function interpolar(objeto, año) {

    const años =
        Object.keys(objeto)
            .map(Number)
            .sort((a, b) => a - b);

    if (objeto[año] !== undefined) {
        return Number(objeto[año]);
    }

    if (año <= años[0]) {
        return Number(objeto[años[0]]);
    }

    if (año >= años[años.length - 1]) {
        return Number(
            objeto[años[años.length - 1]]
        );
    }

    for (
        let i = 0;
        i < años.length - 1;
        i++
    ) {

        const año1 = años[i];
        const año2 = años[i + 1];

        if (
            año >= año1 &&
            año <= año2
        ) {

            const valor1 =
                Number(objeto[año1]);

            const valor2 =
                Number(objeto[año2]);

            const porcentaje =
                (año - año1) /
                (año2 - año1);

            return valor1 +
                (valor2 - valor1) *
                porcentaje;

        }

    }

    return null;

}


// ============================================================
// DATOS DEL GRÁFICO
// ============================================================

const datos = {

    mar: {

        nombre:
            "Nivel del mar — SSP2-4.5",

        unidad:
            "cm",

        objeto:
            nivelMarSSP245,

        inicio:
            2000,

        fin:
            2100

    },

    temperatura: {

        nombre:
            "Temperatura del océano",

        unidad:
            "°C",

        objeto:
            temperaturaReferencia,

        inicio:
            2000,

        fin:
            2100

    },

    co2: {

        nombre:
            "CO₂ atmosférico",

        unidad:
            "ppm",

        objeto: {
            ...co2NOAA,
            ...co2Proyeccion
        },

        inicio:
            2000,

        fin:
            2100

    }

};


// ============================================================
// DESCRIPCIONES
// ============================================================

const descripciones = {

    mar:
        "Proyección educativa del aumento relativo del nivel del mar. " +
        "Los valores se utilizan para visualizar posibles escenarios " +
        "climáticos y no representan una predicción exacta para una " +
        "propiedad determinada de Rapa Nui.",

    temperatura:
        "Serie de referencia utilizada para visualización educativa. " +
        "No debe interpretarse como una medición oficial local anual " +
        "de Rapa Nui.",

    co2:
        "Los valores históricos corresponden a concentraciones de CO₂ " +
        "atmosférico de referencia. Los valores posteriores son una " +
        "proyección educativa."

};


// ============================================================
// GRÁFICO
// ============================================================

const canvasGrafico =
    document.getElementById("grafico");

let grafico = null;

if (
    canvasGrafico &&
    typeof Chart !== "undefined"
) {

    const ctx =
        canvasGrafico.getContext("2d");

    grafico =
        new Chart(ctx, {

            type: "line",

            data: {

                datasets: [

                    {

                        label: "",

                        data: [],

                        borderColor: "#1565c0",

                        backgroundColor:
                            "rgba(21,101,192,0.10)",

                        borderWidth: 3,

                        pointRadius: 2,

                        pointHoverRadius: 6,

                        tension: 0.25,

                        fill: false

                    },

                    {

                        label: "Año seleccionado",

                        data: [],

                        borderColor: "#e53935",

                        backgroundColor: "#e53935",

                        pointRadius: 7,

                        pointHoverRadius: 9,

                        showLine: false

                    }

                ]

            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                animation: false,

                interaction: {

                    mode: "nearest",

                    intersect: false

                },

                plugins: {

                    legend: {
                        display: true
                    }

                },

                scales: {

                    x: {

                        type: "linear",

                        title: {

                            display: true,

                            text: "Año"

                        },

                        ticks: {

                            maxTicksLimit: 10

                        }

                    },

                    y: {

                        title: {

                            display: true,

                            text: "Valor"

                        },

                        beginAtZero: false

                    }

                }

            }

        });

}


// ============================================================
// ACTUALIZAR GRÁFICO
// ============================================================

function actualizarGrafico() {

    if (!grafico) {
        return;
    }

    const variableElement =
        document.getElementById("variableSelect");

    const yearElement =
        document.getElementById("yearSlider");

    const selectedYearElement =
        document.getElementById("selectedYear");

    const valorSeleccionado =
        document.getElementById("valorSeleccionado");

    const descripcionDatos =
        document.getElementById("descripcionDatos");

    if (
        !variableElement ||
        !yearElement
    ) {
        return;
    }

    const variable =
        variableElement.value;

    const año =
        parseInt(
            yearElement.value,
            10
        );

    const dataset =
        datos[variable];

    if (!dataset) {
        return;
    }

    if (selectedYearElement) {

        selectedYearElement.textContent =
            "Año: " + año;

    }

    if (descripcionDatos) {

        descripcionDatos.textContent =
            descripciones[variable];

    }

    const puntos = [];

    for (
        let y = dataset.inicio;
        y <= dataset.fin;
        y++
    ) {

        const valor =
            interpolar(
                dataset.objeto,
                y
            );

        if (
            valor !== null &&
            Number.isFinite(valor)
        ) {

            puntos.push({
                x: y,
                y: valor
            });

        }

    }

    const valorActual =
        interpolar(
            dataset.objeto,
            año
        );

    const puntoSeleccionado = [];

    if (
        valorActual !== null &&
        Number.isFinite(valorActual)
    ) {

        puntoSeleccionado.push({
            x: año,
            y: valorActual
        });

    }

    grafico.data.datasets[0].data =
        puntos;

    grafico.data.datasets[0].label =
        dataset.nombre;

    grafico.data.datasets[1].data =
        puntoSeleccionado;

    grafico.data.datasets[1].label =
        "Año " + año;

    grafico.options.scales.y.title.text =
        dataset.unidad;

    if (valorSeleccionado) {

        if (
            valorActual !== null &&
            Number.isFinite(valorActual)
        ) {

            valorSeleccionado.innerHTML =
                "<div>" +
                dataset.nombre +
                "</div>" +

                "<div class='valorGrande'>" +
                valorActual.toFixed(1) +
                " " +
                dataset.unidad +
                "</div>" +

                "<div>Año seleccionado: " +
                año +
                "</div>";

        } else {

            valorSeleccionado.textContent =
                "No disponible";

        }

    }

    grafico.update("none");

}


// ============================================================
// EVENTOS DEL GRÁFICO
// ============================================================

const yearSlider =
    document.getElementById("yearSlider");

const variableSelect =
    document.getElementById("variableSelect");

if (yearSlider) {

    yearSlider.addEventListener(
        "input",
        actualizarGrafico
    );

}

if (variableSelect) {

    variableSelect.addEventListener(
        "change",
        actualizarGrafico
    );

}

actualizarGrafico();


// ============================================================
// SIMULADOR 3D
// ============================================================

const contenedor3D =
    document.getElementById("escena3D");

let escena = null;
let camara = null;
let renderer = null;
let mar3D = null;
let isla3D = null;


if (
    contenedor3D &&
    typeof THREE !== "undefined"
) {

    escena = new THREE.Scene();

    escena.background =
        new THREE.Color(0x87ceeb);

    camara =
        new THREE.PerspectiveCamera(
            60,
            1,
            0.1,
            1000
        );

    camara.position.set(
        10,
        8,
        10
    );

    camara.lookAt(
        0,
        1,
        0
    );

    renderer =
        new THREE.WebGLRenderer({
            antialias: true
        });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio || 1,
            2
        )
    );

    renderer.setSize(1, 1);

    contenedor3D.appendChild(
        renderer.domElement
    );


    const luz =
        new THREE.DirectionalLight(
            0xffffff,
            1.2
        );

    luz.position.set(
        5,
        10,
        5
    );

    escena.add(luz);


    const luzAmbiente =
        new THREE.AmbientLight(
            0xffffff,
            0.65
        );

    escena.add(luzAmbiente);


    const marGeometry =
        new THREE.BoxGeometry(
            20,
            0.8,
            20
        );

    const marMaterial =
        new THREE.MeshPhongMaterial({
            color: 0x2196f3,
            transparent: true,
            opacity: 0.75
        });

    mar3D =
        new THREE.Mesh(
            marGeometry,
            marMaterial
        );

    mar3D.position.y = 0;

    escena.add(mar3D);


    const playa =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                5.2,
                5.2,
                0.3,
                32
            ),

            new THREE.MeshPhongMaterial({
                color: 0xf4d28c
            })

        );

    playa.position.y = 0.25;

    escena.add(playa);


    const islaGeometry =
        new THREE.CylinderGeometry(
            2,
            5,
            4,
            32
        );

    const islaMaterial =
        new THREE.MeshPhongMaterial({
            color: 0x3d8b37
        });

    isla3D =
        new THREE.Mesh(
            islaGeometry,
            islaMaterial
        );

    isla3D.position.y = 1.5;

    escena.add(isla3D);


    const moaiGroup =
        new THREE.Group();

    const moaiMaterial =
        new THREE.MeshPhongMaterial({
            color: 0x777777
        });


    const cabeza =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.35,
                0.45,
                0.8,
                12
            ),

            moaiMaterial

        );

    cabeza.position.y = 3.2;

    moaiGroup.add(cabeza);


    const cuerpo =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.45,
                0.65,
                1.4,
                12
            ),

            moaiMaterial

        );

    cuerpo.position.y = 2.25;

    moaiGroup.add(cuerpo);


    const nariz =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.16,
                0.18,
                0.45
            ),

            moaiMaterial

        );

    nariz.position.set(
        0,
        3.15,
        -0.42
    );

    moaiGroup.add(nariz);

    moaiGroup.position.z = -1.2;

    escena.add(moaiGroup);


    function redimensionar3D() {

        if (
            !contenedor3D ||
            !renderer ||
            !camara
        ) {
            return;
        }

        const ancho =
            contenedor3D.clientWidth;

        const alto =
            contenedor3D.clientHeight;

        if (
            ancho <= 0 ||
            alto <= 0
        ) {
            return;
        }

        renderer.setSize(
            ancho,
            alto,
            false
        );

        camara.aspect =
            ancho / alto;

        camara.updateProjectionMatrix();

    }


    function animar3D() {

        requestAnimationFrame(
            animar3D
        );

        if (isla3D) {
            isla3D.rotation.y += 0.002;
        }

        if (
            renderer &&
            escena &&
            camara
        ) {

            renderer.render(
                escena,
                camara
            );

        }

    }

    animar3D();

    window.addEventListener(
        "resize",
        redimensionar3D
    );

}


// ============================================================
// ELEMENTOS SIMULADOR
// ============================================================

const abrirSimulador =
    document.getElementById(
        "abrirSimulador"
    );

const cerrarSimulador =
    document.getElementById(
        "cerrarSimulador"
    );

const simuladorPage =
    document.getElementById(
        "simuladorPage"
    );

const slider3D =
    document.getElementById(
        "simuladorSlider"
    );

const anio3D =
    document.getElementById(
        "simuladorAnio"
    );

const nivel3D =
    document.getElementById(
        "simuladorNivel"
    );

const riesgo =
    document.getElementById(
        "riesgoCosta"
    );

const selectorMar =
    document.getElementById(
        "escenarioMar"
    );


// ============================================================
// OBTENER AUMENTO
// ============================================================

function obtenerAumentoMar(
    año,
    escenario
) {

    const datosEscenario =
        escenario === "SSP5-8.5"
            ? nivelMarSSP585
            : nivelMarSSP245;

    return interpolar(
        datosEscenario,
        año
    );

}


// ============================================================
// ACTUALIZAR SIMULADOR
// ============================================================

function actualizarSimuladorMar() {

    if (!slider3D) {
        return;
    }

    const año =
        parseInt(
            slider3D.value,
            10
        );

    const escenario =
        selectorMar
            ? selectorMar.value
            : "SSP2-4.5";

    const aumento =
        obtenerAumentoMar(
            año,
            escenario
        );

    if (aumento === null) {
        return;
    }

    if (anio3D) {
        anio3D.textContent =
            "Año: " + año;
    }

    if (nivel3D) {

        nivel3D.textContent =
            "Aumento estimado: " +
            aumento.toFixed(1) +
            " cm";

    }

    if (mar3D) {

        const alturaVisual =
            (aumento / 100) * 3;

        mar3D.position.y =
            alturaVisual;

    }

    if (riesgo) {

        if (aumento < 20) {

            riesgo.textContent =
                "🟢 Riesgo costero: Bajo";

        }

        else if (aumento < 50) {

            riesgo.textContent =
                "🟡 Riesgo costero: Moderado";

        }

        else if (aumento < 80) {

            riesgo.textContent =
                "🟠 Riesgo costero: Alto";

        }

        else {

            riesgo.textContent =
                "🔴 Riesgo costero: Muy alto";

        }

    }

}


// ============================================================
// EVENTOS SIMULADOR
// ============================================================

if (slider3D) {

    slider3D.addEventListener(
        "input",
        actualizarSimuladorMar
    );

}

if (selectorMar) {

    selectorMar.addEventListener(
        "change",
        actualizarSimuladorMar
    );

}


if (abrirSimulador) {

    abrirSimulador.addEventListener(
        "click",
        function () {

            if (!simuladorPage) {
                return;
            }

            simuladorPage.classList.remove(
                "simuladorOculto"
            );

            simuladorPage.style.display =
                "block";

            setTimeout(
                function () {

                    if (
                        renderer &&
                        camara &&
                        contenedor3D
                    ) {

                        const ancho =
                            contenedor3D.clientWidth;

                        const alto =
                            contenedor3D.clientHeight;

                        if (
                            ancho > 0 &&
                            alto > 0
                        ) {

                            renderer.setSize(
                                ancho,
                                alto,
                                false
                            );

                            camara.aspect =
                                ancho / alto;

                            camara.updateProjectionMatrix();

                        }

                    }

                    actualizarSimuladorMar();

                },
                100
            );

            setTimeout(
                function () {

                    simuladorPage.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                },
                50
            );

        }
    );

}


if (cerrarSimulador) {

    cerrarSimulador.addEventListener(
        "click",
        function () {

            if (!simuladorPage) {
                return;
            }

            simuladorPage.classList.add(
                "simuladorOculto"
            );

            simuladorPage.style.display =
                "none";

        }
    );

}


actualizarSimuladorMar();


// ============================================================
// IMPACTO
// ============================================================

const impactoSlider =
    document.getElementById(
        "impactoSlider"
    );

const impactoAnio =
    document.getElementById(
        "impactoAnio"
    );

const impactoNivel =
    document.getElementById(
        "impactoNivel"
    );

const impactoDescripcion =
    document.getElementById(
        "impactoDescripcion"
    );


function actualizarImpacto() {

    if (!impactoSlider) {
        return;
    }

    const año =
        parseInt(
            impactoSlider.value,
            10
        );

    if (impactoAnio) {
        impactoAnio.textContent =
            "Año: " + año;
    }

    const progreso =
        (año - 2000) / 100;


    if (progreso < 0.25) {

        if (impactoNivel) {
            impactoNivel.textContent =
                "🟢 Impacto: Bajo";
        }

        if (impactoDescripcion) {
            impactoDescripcion.textContent =
                "Las condiciones proyectadas presentan un impacto relativamente bajo sobre la comunidad.";
        }

    }

    else if (progreso < 0.50) {

        if (impactoNivel) {
            impactoNivel.textContent =
                "🟡 Impacto: Moderado";
        }

        if (impactoDescripcion) {
            impactoDescripcion.textContent =
                "Comienzan a aumentar los posibles efectos sobre recursos, infraestructura y actividades de la comunidad.";
        }

    }

    else if (progreso < 0.75) {

        if (impactoNivel) {
            impactoNivel.textContent =
                "🟠 Impacto: Alto";
        }

        if (impactoDescripcion) {
            impactoDescripcion.textContent =
                "La comunidad podría enfrentar una mayor exposición a riesgos costeros y presión sobre recursos naturales.";
        }

    }

    else {

        if (impactoNivel) {
            impactoNivel.textContent =
                "🔴 Impacto: Muy alto";
        }

        if (impactoDescripcion) {
            impactoDescripcion.textContent =
                "Las proyecciones indican una mayor necesidad de adaptación de infraestructura, gestión de recursos y protección de los ecosistemas.";
        }

    }

}


if (impactoSlider) {

    impactoSlider.addEventListener(
        "input",
        actualizarImpacto
    );

}

actualizarImpacto();


// ============================================================
// REDIMENSIONAR GRÁFICO
// ============================================================

window.addEventListener(
    "resize",
    function () {

        if (grafico) {

            setTimeout(
                function () {

                    grafico.resize();
                    grafico.update("none");

                },
                100
            );

        }

    }
);

// ============================================================
// 🤖 RAPA NUI FUTURO IA
// ============================================================

const IA_RAPA_NUI_URL =
    "https://rapa-nui-futuro-ia.renzo-b-s-escorpio.workers.dev";


// ============================================================
// HISTORIAL
// ============================================================

let historialIA = [];


// ============================================================
// ELEMENTOS DEL CHAT
// ============================================================

const chatForm =
    document.getElementById("chatForm");

const chatInput =
    document.getElementById("chatInput");

const chatMensajes =
    document.getElementById("chatMensajes");

const estadoApiKey =
    document.getElementById("estadoApiKey");


// ============================================================
// MOSTRAR MENSAJE
// ============================================================

function agregarMensajeIA(
    tipo,
    texto
) {

    if (!chatMensajes) {
        return;
    }

    const mensaje =
        document.createElement("div");

    mensaje.className =
        "mensaje " +
        (
            tipo === "user"
                ? "usuarioMensaje"
                : "iaMensaje"
        );


    const nombre =
        document.createElement("div");

    nombre.className =
        "mensajeNombre";


    nombre.textContent =
        tipo === "user"
            ? "👤 Tú"
            : "🤖 Rapa Nui Futuro IA";


    const contenido =
        document.createElement("div");

    contenido.className =
        "mensajeTexto";


    contenido.textContent =
        texto;


    mensaje.appendChild(nombre);
    mensaje.appendChild(contenido);

    chatMensajes.appendChild(mensaje);


    // Bajar automáticamente al último mensaje

    chatMensajes.scrollTop =
        chatMensajes.scrollHeight;

}


// ============================================================
// PREGUNTAR A LA IA
// ============================================================

async function preguntarRapaNuiIA(
    mensaje
) {

    console.log(
        "🤖 Pregunta:",
        mensaje
    );


    // Guardar pregunta

    historialIA.push({

        role: "user",

        content: mensaje

    });


    const respuesta =
        await fetch(

            IA_RAPA_NUI_URL,

            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    messages:
                        historialIA

                })

            }

        );


    console.log(
        "📡 Estado:",
        respuesta.status
    );


    const texto =
        await respuesta.text();


    console.log(
        "📦 Respuesta:",
        texto
    );


    let datos;


    try {

        datos =
            JSON.parse(texto);

    }

    catch {

        throw new Error(
            "El servidor no devolvió JSON válido."
        );

    }


    // ========================================================
    // ERROR
    // ========================================================

    if (!respuesta.ok) {

        console.error(
            "❌ Error del Worker:",
            datos
        );


        throw new Error(

            datos.detalle ||
            datos.error ||
            "Error del servidor."

        );

    }


    // ========================================================
    // RESPUESTA DE LA IA
    // ========================================================

    const respuestaIA =

        datos
            ?.choices
            ?.[0]
            ?.message
            ?.content;


    if (!respuestaIA) {

        console.error(
            "Respuesta completa:",
            datos
        );


        throw new Error(
            "La IA no devolvió ningún mensaje."
        );

    }


    // Guardar respuesta

    historialIA.push({

        role: "assistant",

        content:
            respuestaIA

    });


    return respuestaIA;

}


// ============================================================
// EVENTO DEL FORMULARIO
// ============================================================

if (chatForm) {

    chatForm.addEventListener(
        "submit",
        async function(event) {

            // ==================================================
            // MUY IMPORTANTE
            // EVITA QUE LA PÁGINA SE RECARGUE
            // ==================================================

            event.preventDefault();

            event.stopPropagation();


            // ==================================================
            // OBTENER MENSAJE
            // ==================================================

            if (!chatInput) {
                return;
            }


            const mensaje =
                chatInput.value.trim();


            // No enviar vacío

            if (!mensaje) {
                return;
            }


            console.log(
                "📨 Enviando:",
                mensaje
            );


            // ==================================================
            // MOSTRAR MENSAJE DEL USUARIO
            // ==================================================

            agregarMensajeIA(
                "user",
                mensaje
            );


            // Limpiar input

            chatInput.value = "";


            // ==================================================
            // DESACTIVAR BOTÓN
            // ==================================================

            const boton =
                chatForm.querySelector(
                    "button"
                );


            if (boton) {

                boton.disabled =
                    true;

                boton.textContent =
                    "⏳ Pensando...";

            }


            // ==================================================
            // MENSAJE TEMPORAL
            // ==================================================

            let mensajeCargando =
                null;


            if (chatMensajes) {

                mensajeCargando =
                    document.createElement(
                        "div"
                    );

                mensajeCargando.className =
                    "mensaje iaMensaje";

                mensajeCargando.innerHTML =

                    `
                    <div class="mensajeNombre">
                        🤖 Rapa Nui Futuro IA
                    </div>

                    <div class="mensajeTexto">
                        ⏳ Estoy pensando...
                    </div>
                    `;


                chatMensajes.appendChild(
                    mensajeCargando
                );


                chatMensajes.scrollTop =
                    chatMensajes.scrollHeight;

            }


            // ==================================================
            // CONSULTAR IA
            // ==================================================

            try {

                const respuesta =
                    await preguntarRapaNuiIA(
                        mensaje
                    );


                // Eliminar "Estoy pensando..."

                if (mensajeCargando) {

                    mensajeCargando.remove();

                }


                // Mostrar respuesta

                agregarMensajeIA(
                    "ia",
                    respuesta
                );


            }

            catch (error) {

                console.error(
                    "🔥 Error IA:",
                    error
                );


                if (mensajeCargando) {

                    mensajeCargando.remove();

                }


                let textoError =
                    "❌ No pude conectarme con Rapa Nui Futuro IA.";


                if (
                    error &&
                    error.message
                ) {

                    textoError +=
                        "\n\nDetalle: " +
                        error.message;

                }


                agregarMensajeIA(
                    "ia",
                    textoError
                );

            }


            // ==================================================
            // ACTIVAR BOTÓN NUEVAMENTE
            // ==================================================

            if (boton) {

                boton.disabled =
                    false;

                boton.textContent =
                    "➤ Enviar";

            }


            // Mantener el cursor en el input

            chatInput.focus();

        }
    );

}


// ============================================================
// COMPROBAR SERVIDOR
// ============================================================

async function comprobarServidorIA() {

    if (!estadoApiKey) {
        return;
    }


    estadoApiKey.textContent =
        "🟡 Comprobando conexión...";


    try {

        const respuesta =
            await fetch(
                IA_RAPA_NUI_URL,
                {
                    method: "GET"
                }
            );


        const datos =
            await respuesta.json();


        if (
            respuesta.ok &&
            datos.ok
        ) {

            estadoApiKey.textContent =
                "🟢 Servidor de Rapa Nui Futuro listo";

        }

        else {

            estadoApiKey.textContent =
                "🔴 Error de conexión con la IA";

        }


    }

    catch (error) {

        console.error(
            "Error comprobando IA:",
            error
        );


        estadoApiKey.textContent =
            "🔴 Error de conexión con la IA";

    }

}


// ============================================================
// INICIAR COMPROBACIÓN
// ============================================================

comprobarServidorIA();