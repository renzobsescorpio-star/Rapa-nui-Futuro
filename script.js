// ============================================================
// RAPA NUI FUTURO
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
    }
}

mostrar("mar");


// ============================================================
// CONDICIONES ACTUALES
// ============================================================

async function cargarCondiciones() {

    try {

        const url =
            "https://marine-api.open-meteo.com/v1/marine" +
            "?latitude=-27.1127" +
            "&longitude=-109.3497" +
            "&hourly=wave_height,sea_surface_temperature" +
            "&timezone=auto";

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("Error en Marine API");
        }

        const datos = await respuesta.json();

        const temperaturas =
            datos.hourly.sea_surface_temperature;

        const oleajes =
            datos.hourly.wave_height;

        const temperatura =
            temperaturas.find(
                valor =>
                    valor !== null &&
                    valor !== undefined
            );

        const oleaje =
            oleajes.find(
                valor =>
                    valor !== null &&
                    valor !== undefined
            );

        const elementoTemp =
            document.getElementById("tempMar");

        const elementoOleaje =
            document.getElementById("oleaje");

        if (temperatura !== undefined) {

            elementoTemp.innerHTML =
                Number(temperatura).toFixed(1) +
                " °C";

        } else {

            elementoTemp.innerHTML =
                "No disponible";
        }

        if (oleaje !== undefined) {

            elementoOleaje.innerHTML =
                Number(oleaje).toFixed(2) +
                " m";

        } else {

            elementoOleaje.innerHTML =
                "No disponible";
        }

    } catch (error) {

        console.error(
            "Error obteniendo datos marinos:",
            error
        );

        document.getElementById("tempMar").innerHTML =
            "No disponible";

        document.getElementById("oleaje").innerHTML =
            "No disponible";
    }
}


// ============================================================
// VIENTO
// ============================================================

async function cargarViento() {

    try {

        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=-27.1127" +
            "&longitude=-109.3497" +
            "&current=wind_speed_10m" +
            "&timezone=auto";

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("Error en Weather API");
        }

        const datos = await respuesta.json();

        const viento =
            datos.current.wind_speed_10m;

        document.getElementById("viento").innerHTML =
            Number(viento).toFixed(1) +
            " km/h";

    } catch (error) {

        console.error(
            "Error obteniendo viento:",
            error
        );

        document.getElementById("viento").innerHTML =
            "No disponible";
    }
}


// ============================================================
// SALINIDAD
// ============================================================

document.getElementById("salinidad").innerHTML =
    "≈ 35 PSU";

cargarCondiciones();
cargarViento();


// ============================================================
// DATOS PARA LA ESTADÍSTICA
// ============================================================

const datos = {

    mar: {

        nombre: "Nivel del mar",

        unidad: "cm",

        años: [
            2000, 2005, 2010, 2015, 2020,
            2025, 2030, 2035, 2040, 2045,
            2050, 2055, 2060, 2065, 2070,
            2075, 2080, 2085, 2090, 2095, 2100
        ],

        valores: [
            0,
            2,
            4,
            6,
            8,
            10,
            13,
            16,
            19,
            22,
            25,
            29,
            33,
            37,
            41,
            45,
            49,
            53,
            57,
            61,
            66
        ]
    },


    temperatura: {

        nombre: "Temperatura del Océano",

        unidad: "°C",

        años: [
            2000, 2005, 2010, 2015, 2020,
            2025, 2030, 2035, 2040, 2045,
            2050, 2055, 2060, 2065, 2070,
            2075, 2080, 2085, 2090, 2095, 2100
        ],

        valores: [
            22.4,
            22.5,
            22.6,
            22.8,
            23.0,
            23.2,
            23.4,
            23.6,
            23.8,
            24.0,
            24.2,
            24.4,
            24.6,
            24.8,
            25.0,
            25.1,
            25.2,
            25.3,
            25.4,
            25.5,
            25.6
        ]
    },


    co2: {

        nombre: "CO₂ Atmosférico",

        unidad: "ppm",

        años: [
            2000, 2005, 2010, 2015, 2020,
            2025, 2030, 2035, 2040, 2045,
            2050, 2055, 2060, 2065, 2070,
            2075, 2080, 2085, 2090, 2095, 2100
        ],

        valores: [
            370,
            379,
            390,
            401,
            414,
            425,
            438,
            451,
            465,
            480,
            495,
            510,
            525,
            540,
            555,
            570,
            585,
            600,
            615,
            630,
            645
        ]
    },


    contaminacion: {

        nombre: "Contaminación Marina",

        unidad: "Índice",

        años: [
            2000, 2005, 2010, 2015, 2020,
            2025, 2030, 2035, 2040, 2045,
            2050, 2055, 2060, 2065, 2070,
            2075, 2080, 2085, 2090, 2095, 2100
        ],

        valores: [
            15,
            18,
            22,
            28,
            35,
            42,
            48,
            54,
            59,
            63,
            67,
            70,
            72,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81
        ]
    }
};


// ============================================================
// GRÁFICO INTERACTIVO
// ============================================================

const canvasGrafico =
    document.getElementById("grafico");

const ctx =
    canvasGrafico.getContext("2d");


const grafico =
    new Chart(ctx, {

        type: "line",

        data: {

            labels: [],

            datasets: [
                {

                    label: "Nivel del mar",

                    data: [],

                    borderColor: "#1565c0",

                    backgroundColor: "#1565c0",

                    borderWidth: 3,

                    pointBackgroundColor: "#1565c0",

                    pointBorderColor: "#1565c0",

                    pointRadius: 4,

                    pointHoverRadius: 6,

                    fill: false,

                    tension: 0.25

                }
            ]
        },

        options: {

            responsive: true,

            maintainAspectRatio: true,

            animation: {
                duration: 300
            },

            plugins: {

                legend: {
                    display: true
                }

            },

            scales: {

                x: {

                    title: {
                        display: true,
                        text: "Año"
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


// ============================================================
// ACTUALIZAR GRÁFICO
// ============================================================

function actualizarGrafico() {

    const variableElement =
        document.getElementById("variableSelect");

    const yearElement =
        document.getElementById("yearSlider");

    const selectedYearElement =
        document.getElementById("selectedYear");


    if (
        !variableElement ||
        !yearElement ||
        !selectedYearElement
    ) {
        return;
    }


    const variable =
        variableElement.value;

    const año =
        parseInt(yearElement.value);


    selectedYearElement.innerHTML =
        "Año: " + año;


    const dataset =
        datos[variable];


    if (!dataset) {
        return;
    }


    // Buscar el año seleccionado

    let indice =
        dataset.años.indexOf(año);


    // Si no existe exactamente,
    // buscar el año anterior más cercano

    if (indice === -1) {

        indice = dataset.años.findIndex(
            añoDato => añoDato > año
        );

        if (indice === -1) {
            indice = dataset.años.length - 1;
        } else {
            indice--;
        }
    }


    // Datos hasta el año seleccionado

    const añosMostrar =
        dataset.años.slice(
            0,
            indice + 1
        );

    const valoresMostrar =
        dataset.valores.slice(
            0,
            indice + 1
        );


    // Actualizar gráfico

    grafico.data.labels =
        añosMostrar;

    grafico.data.datasets[0].data =
        valoresMostrar;


    grafico.data.datasets[0].label =
        dataset.nombre;


    grafico.options.scales.y.title.text =
        dataset.unidad;


    grafico.update();

}


// ============================================================
// EVENTOS DE LA ESTADÍSTICA
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
// PROYECCIONES DEL NIVEL DEL MAR
// ============================================================

const proyeccionesMar = {

    "SSP2-4.5": {

        nombre:
            "SSP2-4.5 — emisiones intermedias",

        datos: {

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

        }
    },


    "SSP5-8.5": {

        nombre:
            "SSP5-8.5 — emisiones muy altas",

        datos: {

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

        }
    }
};


// ============================================================
// THREE.JS
// ============================================================

const contenedor =
    document.getElementById("escena3D");

const escena =
    new THREE.Scene();

escena.background =
    new THREE.Color(0x87ceeb);


const camara =
    new THREE.PerspectiveCamera(
        60,
        1,
        0.1,
        1000
    );


const renderer =
    new THREE.WebGLRenderer({
        antialias: true
    });


renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);


if (contenedor) {

    contenedor.appendChild(
        renderer.domElement
    );

}


// ============================================================
// LUCES
// ============================================================

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


// ============================================================
// MAR
// ============================================================

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


const mar =
    new THREE.Mesh(
        marGeometry,
        marMaterial
    );


mar.position.y = 0;

escena.add(mar);


// ============================================================
// PLAYA
// ============================================================

const playaGeometry =
    new THREE.CylinderGeometry(
        5.2,
        5.2,
        0.3,
        32
    );


const playaMaterial =
    new THREE.MeshPhongMaterial({

        color: 0xf4d28c

    });


const playa =
    new THREE.Mesh(
        playaGeometry,
        playaMaterial
    );


playa.position.y = 0.25;

escena.add(playa);


// ============================================================
// ISLA
// ============================================================

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


const isla =
    new THREE.Mesh(
        islaGeometry,
        islaMaterial
    );


isla.position.y = 1.5;

escena.add(isla);


// ============================================================
// MOAI
// ============================================================

const moaiGroup =
    new THREE.Group();


const cabezaGeometry =
    new THREE.CylinderGeometry(
        0.35,
        0.45,
        0.8,
        12
    );


const moaiMaterial =
    new THREE.MeshPhongMaterial({

        color: 0x777777

    });


const cabeza =
    new THREE.Mesh(
        cabezaGeometry,
        moaiMaterial
    );


cabeza.position.y = 3.2;

moaiGroup.add(cabeza);


const cuerpoGeometry =
    new THREE.CylinderGeometry(
        0.45,
        0.65,
        1.4,
        12
    );


const cuerpo =
    new THREE.Mesh(
        cuerpoGeometry,
        moaiMaterial
    );


cuerpo.position.y = 2.25;

moaiGroup.add(cuerpo);


moaiGroup.position.set(
    0,
    0,
    0
);

escena.add(moaiGroup);


// ============================================================
// CAMARA
// ============================================================

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


// ============================================================
// REDIMENSIONAR
// ============================================================

function redimensionar3D() {

    if (!contenedor) {
        return;
    }

    const ancho =
        contenedor.clientWidth;

    const alto =
        contenedor.clientHeight;


    if (
        ancho <= 0 ||
        alto <= 0
    ) {
        return;
    }


    renderer.setSize(
        ancho,
        alto
    );


    camara.aspect =
        ancho / alto;

    camara.updateProjectionMatrix();

}


redimensionar3D();


// ============================================================
// ANIMACIÓN
// ============================================================

function animar() {

    requestAnimationFrame(
        animar
    );

    isla.rotation.y += 0.002;

    renderer.render(
        escena,
        camara
    );

}

animar();


// ============================================================
// SIMULADOR
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


if (abrirSimulador) {

    abrirSimulador.addEventListener(
        "click",
        function () {

            simuladorPage.style.display =
                "block";

            setTimeout(
                function () {

                    redimensionar3D();

                    actualizarSimuladorMar();

                },
                50
            );

            simuladorPage.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

}


if (cerrarSimulador) {

    cerrarSimulador.addEventListener(
        "click",
        function () {

            simuladorPage.style.display =
                "none";

        }
    );

}


// ============================================================
// ELEMENTOS SIMULADOR
// ============================================================

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

const selectorEscenario =
    document.getElementById(
        "escenarioMar"
    );


// ============================================================
// CREAR SELECTOR SI NO EXISTE
// ============================================================

if (
    slider3D &&
    !selectorEscenario
) {

    const selector =
        document.createElement("select");

    selector.id =
        "escenarioMar";

    selector.style.width =
        "100%";

    selector.style.padding =
        "10px";

    selector.style.marginTop =
        "15px";

    selector.style.borderRadius =
        "8px";

    selector.style.border =
        "1px solid #ccc";


    selector.innerHTML = `

        <option value="SSP2-4.5">
            SSP2-4.5 — Emisiones intermedias
        </option>

        <option value="SSP5-8.5">
            SSP5-8.5 — Emisiones muy altas
        </option>

    `;


    slider3D.parentNode.insertBefore(
        selector,
        slider3D
    );


    const titulo =
        document.createElement("h3");

    titulo.innerHTML =
        "🌍 Escenario climático";


    selector.parentNode.insertBefore(
        titulo,
        selector
    );
}


// Obtener selector después de crearlo

const selectorMar =
    document.getElementById(
        "escenarioMar"
    );


// ============================================================
// TEXTO DEL ESCENARIO
// ============================================================

let textoEscenario =
    document.getElementById(
        "textoEscenario"
    );


if (
    !textoEscenario &&
    nivel3D
) {

    textoEscenario =
        document.createElement("p");

    textoEscenario.id =
        "textoEscenario";

    textoEscenario.style.marginTop =
        "10px";

    textoEscenario.style.padding =
        "12px";

    textoEscenario.style.background =
        "#eef6ff";

    textoEscenario.style.borderRadius =
        "10px";

    nivel3D.insertAdjacentElement(
        "afterend",
        textoEscenario
    );

}


// ============================================================
// OBTENER AUMENTO
// ============================================================

function obtenerAumentoReal(
    anio,
    escenario
) {

    const datosEscenario =
        proyeccionesMar[
            escenario
        ].datos;


    const años =
        Object.keys(
            datosEscenario
        )
        .map(Number)
        .sort(
            (a, b) => a - b
        );


    if (
        datosEscenario[anio]
        !== undefined
    ) {

        return datosEscenario[anio];

    }


    let añoAnterior =
        años[0];

    let añoSiguiente =
        años[
            años.length - 1
        ];


    for (
        let i = 0;
        i < años.length - 1;
        i++
    ) {

        if (
            anio >= años[i] &&
            anio <= años[i + 1]
        ) {

            añoAnterior =
                años[i];

            añoSiguiente =
                años[i + 1];

            break;
        }
    }


    const valorAnterior =
        datosEscenario[
            añoAnterior
        ];

    const valorSiguiente =
        datosEscenario[
            añoSiguiente
        ];


    const porcentaje =
        (
            anio - añoAnterior
        ) /
        (
            añoSiguiente -
            añoAnterior
        );


    return (
        valorAnterior +
        (
            valorSiguiente -
            valorAnterior
        ) *
        porcentaje
    );
}


// ============================================================
// ACTUALIZAR SIMULADOR
// ============================================================

function actualizarSimuladorMar() {

    if (
        !slider3D ||
        !selectorMar
    ) {
        return;
    }


    const anio =
        parseInt(
            slider3D.value
        );


    const escenario =
        selectorMar.value;


    const aumento =
        obtenerAumentoReal(
            anio,
            escenario
        );


    if (anio3D) {

        anio3D.innerHTML =
            "Año: " + anio;

    }


    if (nivel3D) {

        nivel3D.innerHTML =
            "Aumento estimado: " +
            aumento.toFixed(1) +
            " cm";

    }


    if (textoEscenario) {

        textoEscenario.innerHTML =
            "<strong>Escenario:</strong> " +
            proyeccionesMar[
                escenario
            ].nombre;

    }


    const alturaVisual =
        (
            aumento /
            100
        ) *
        3;


    mar.position.y =
        alturaVisual;


    if (riesgo) {

        if (aumento < 20) {

            riesgo.innerHTML =
                "🟢 Riesgo costero: Bajo";

        }

        else if (aumento < 50) {

            riesgo.innerHTML =
                "🟡 Riesgo costero: Moderado";

        }

        else if (aumento < 80) {

            riesgo.innerHTML =
                "🟠 Riesgo costero: Alto";

        }

        else {

            riesgo.innerHTML =
                "🔴 Riesgo costero: Muy alto";

        }
    }
}


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


actualizarSimuladorMar();


// ============================================================
// IMPACTO COMUNIDAD
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
            impactoSlider.value
        );


    impactoAnio.innerHTML =
        "Año: " + año;


    const progreso =
        (
            (
                año - 2000
            ) / 100
        ) * 100;


    if (progreso < 25) {

        impactoNivel.innerHTML =
            "🟢 Impacto: Bajo";

        impactoDescripcion.innerHTML =
            "Las condiciones proyectadas presentan " +
            "un impacto relativamente bajo sobre " +
            "la comunidad.";

    }

    else if (progreso < 50) {

        impactoNivel.innerHTML =
            "🟡 Impacto: Moderado";

        impactoDescripcion.innerHTML =
            "Comienzan a aumentar los posibles " +
            "efectos sobre recursos, infraestructura " +
            "y actividades de la comunidad.";

    }

    else if (progreso < 75) {

        impactoNivel.innerHTML =
            "🟠 Impacto: Alto";

        impactoDescripcion.innerHTML =
            "La comunidad podría enfrentar una mayor " +
            "exposición a riesgos costeros y presión " +
            "sobre recursos naturales.";

    }

    else {

        impactoNivel.innerHTML =
            "🔴 Impacto: Muy alto";

        impactoDescripcion.innerHTML =
            "Las proyecciones indican una mayor " +
            "necesidad de adaptación de infraestructura, " +
            "gestión de recursos y protección de " +
            "los ecosistemas.";
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
// REDIMENSIONAR
// ============================================================

window.addEventListener(
    "resize",
    function () {

        redimensionar3D();

    }
);


// ============================================================
// FIN
// ============================================================