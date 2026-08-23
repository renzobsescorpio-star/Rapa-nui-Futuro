// ============================================================
// RAPANUI FUTURO
// SCRIPT PRINCIPAL
// VERSION COMPLETA CORREGIDA
// ============================================================


// ============================================================
// NAVEGACIÓN
// ============================================================

function mostrar(id) {

    const paneles =
        document.querySelectorAll(".panel");


    paneles.forEach(function(panel) {

        panel.classList.remove("activo");

        panel.style.display = "none";

    });


    const panel =
        document.getElementById(id);


    if (!panel) {
        return;
    }


    panel.classList.add("activo");

    panel.style.display = "block";


    window.scrollTo({
        top: 0,
        behavior: "auto"
    });


    // Si se abre el simulador, actualizar su tamaño

    if (
        id === "mar" &&
        simuladorInicializado &&
        simuladorPage &&
        simuladorPage.style.display !== "none"
    ) {

        setTimeout(
            actualizarTamaño3D,
            50
        );

    }


    // Si se abre IA, enfocar entrada

    if (id === "ia" && iaInput) {

        setTimeout(
            function() {

                iaInput.focus();

            },
            100
        );

    }

}


// ============================================================
// PANEL INICIAL
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        mostrar("mar");

    }
);


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


        const respuesta =
            await fetch(url);


        if (!respuesta.ok) {

            throw new Error(
                "Error Marine API: " +
                respuesta.status
            );

        }


        const datos =
            await respuesta.json();


        const temperatura =
            datos.current?.sea_surface_temperature;


        const oleaje =
            datos.current?.wave_height;


        if (elementoTemp) {

            if (
                temperatura !== null &&
                temperatura !== undefined &&
                Number.isFinite(
                    Number(temperatura)
                )
            ) {

                elementoTemp.innerHTML =
                    Number(temperatura).toFixed(1) +
                    " °C";

            } else {

                elementoTemp.innerHTML =
                    "No disponible";

            }

        }


        if (elementoOleaje) {

            if (
                oleaje !== null &&
                oleaje !== undefined &&
                Number.isFinite(
                    Number(oleaje)
                )
            ) {

                elementoOleaje.innerHTML =
                    Number(oleaje).toFixed(2) +
                    " m";

            } else {

                elementoOleaje.innerHTML =
                    "No disponible";

            }

        }


    } catch (error) {

        console.error(
            "Error obteniendo datos marinos:",
            error
        );


        if (elementoTemp) {

            elementoTemp.innerHTML =
                "No disponible";

        }


        if (elementoOleaje) {

            elementoOleaje.innerHTML =
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
                Number.isFinite(
                    Number(viento)
                )
            ) {

                elemento.innerHTML =
                    Number(viento).toFixed(1) +
                    " km/h";

            } else {

                elemento.innerHTML =
                    "No disponible";

            }

        }


    } catch (error) {

        console.error(
            "Error obteniendo viento:",
            error
        );


        if (elemento) {

            elemento.innerHTML =
                "No disponible";

        }

    }

}


// ============================================================
// INICIAR DATOS ACTUALES
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const salinidad =
            document.getElementById("salinidad");


        if (salinidad) {

            salinidad.innerHTML =
                "≈ 35 PSU";

        }


        cargarCondiciones();

        cargarViento();

    }
);


// ============================================================
// DATOS CIENTÍFICOS
// ============================================================


// ============================================================
// NIVEL DEL MAR SSP2-4.5
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


// ============================================================
// NIVEL DEL MAR SSP5-8.5
// ============================================================

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


// ============================================================
// CO2 NOAA
// ============================================================

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


// ============================================================
// CO2 PROYECCIÓN
// ============================================================

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


// ============================================================
// TEMPERATURA
// ============================================================

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
            .sort(
                function(a, b) {
                    return a - b;
                }
            );


    if (objeto[año] !== undefined) {

        return Number(
            objeto[año]
        );

    }


    if (año <= años[0]) {

        return Number(
            objeto[años[0]]
        );

    }


    if (
        año >=
        años[años.length - 1]
    ) {

        return Number(
            objeto[
                años[años.length - 1]
            ]
        );

    }


    for (
        let i = 0;
        i < años.length - 1;
        i++
    ) {

        const año1 =
            años[i];


        const año2 =
            años[i + 1];


        if (
            año >= año1 &&
            año <= año2
        ) {

            const valor1 =
                Number(
                    objeto[año1]
                );


            const valor2 =
                Number(
                    objeto[año2]
                );


            const porcentaje =
                (
                    año - año1
                ) /
                (
                    año2 - año1
                );


            return (
                valor1 +
                (
                    valor2 - valor1
                ) *
                porcentaje
            );

        }

    }


    return null;

}


// ============================================================
// DATOS
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
            "CO₂ atmosférico — NOAA + proyección",

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
        "atmosférico de referencia asociadas al registro de NOAA. " +
        "Los valores posteriores son una proyección educativa."

};


// ============================================================
// GRÁFICO
// ============================================================

let grafico = null;

let graficoInicializado = false;


function crearGrafico() {

    if (graficoInicializado) {
        return;
    }


    const canvas =
        document.getElementById("grafico");


    if (!canvas) {
        return;
    }


    if (typeof Chart === "undefined") {

        console.error(
            "Chart.js no está disponible."
        );

        return;
    }


    const ctx =
        canvas.getContext("2d");


    grafico =
        new Chart(
            ctx,
            {

                type: "line",

                data: {

                    datasets: [

                        {

                            label: "",

                            data: [],

                            borderColor: "#1565c0",

                            backgroundColor:
                                "rgba(21, 101, 192, 0.10)",

                            borderWidth: 3,

                            pointBackgroundColor:
                                "#1565c0",

                            pointBorderColor:
                                "#1565c0",

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

                            pointBackgroundColor:
                                "#e53935",

                            pointBorderColor:
                                "#e53935",

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

                    resizeDelay: 200,


                    plugins: {

                        legend: {

                            display: true

                        }

                    },


                    interaction: {

                        mode: "nearest",

                        intersect: false

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

            }
        );


    graficoInicializado =
        true;


    actualizarGrafico();

}


// ============================================================
// ACTUALIZAR GRÁFICO
// ============================================================

function actualizarGrafico() {

    if (!grafico) {
        return;
    }


    const variableElement =
        document.getElementById(
            "variableSelect"
        );


    const yearElement =
        document.getElementById(
            "yearSlider"
        );


    const selectedYearElement =
        document.getElementById(
            "selectedYear"
        );


    const valorSeleccionado =
        document.getElementById(
            "valorSeleccionado"
        );


    const descripcionDatos =
        document.getElementById(
            "descripcionDatos"
        );


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

        selectedYearElement.innerHTML =
            "Año: " + año;

    }


    if (descripcionDatos) {

        descripcionDatos.innerHTML =
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


    const puntoSeleccionado =
        [];


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

                '<div class="valorGrande">' +
                valorActual.toFixed(1) +
                " " +
                dataset.unidad +
                "</div>" +

                "<div>" +
                "Año seleccionado: " +
                año +
                "</div>";

        } else {

            valorSeleccionado.innerHTML =
                "No disponible";

        }

    }


    grafico.update("none");

}


// ============================================================
// INICIAR GRÁFICO
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const yearSlider =
            document.getElementById(
                "yearSlider"
            );


        const variableSelect =
            document.getElementById(
                "variableSelect"
            );


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


        setTimeout(
            crearGrafico,
            100
        );

    }
);


// ============================================================
// SIMULADOR 3D
// ============================================================

const contenedor3D =
    document.getElementById(
        "escena3D"
    );


let escena = null;

let camara = null;

let renderer = null;

let mar3D = null;

let isla3D = null;

let simuladorInicializado =
    false;


// ============================================================
// CREAR SIMULADOR
// ============================================================

function crearSimulador3D() {

    if (simuladorInicializado) {
        return;
    }


    if (
        !contenedor3D ||
        typeof THREE === "undefined"
    ) {

        return;

    }


    escena =
        new THREE.Scene();


    escena.background =
        new THREE.Color(
            0x87ceeb
        );


    // ========================================================
    // CÁMARA
    // ========================================================

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


    // ========================================================
    // RENDERER
    // ========================================================

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


    renderer.setSize(
        contenedor3D.clientWidth || 800,
        contenedor3D.clientHeight || 500,
        false
    );


    contenedor3D.innerHTML =
        "";


    contenedor3D.appendChild(
        renderer.domElement
    );


    // ========================================================
    // LUCES
    // ========================================================

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


    // ========================================================
    // MAR
    // ========================================================

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


    mar3D.position.y =
        0;


    escena.add(mar3D);


    // ========================================================
    // PLAYA
    // ========================================================

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


    playa.position.y =
        0.25;


    escena.add(playa);


    // ========================================================
    // ISLA
    // ========================================================

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


    isla3D.position.y =
        1.5;


    escena.add(isla3D);


    // ========================================================
    // MOÁI
    // ========================================================

    const moaiGroup =
        new THREE.Group();


    const moaiMaterial =
        new THREE.MeshPhongMaterial({

            color: 0x777777

        });


    // CABEZA

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


    cabeza.position.y =
        3.2;


    moaiGroup.add(
        cabeza
    );


    // CUERPO

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


    cuerpo.position.y =
        2.25;


    moaiGroup.add(
        cuerpo
    );


    // NARIZ

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


    moaiGroup.add(
        nariz
    );


    moaiGroup.position.z =
        -1.2;


    escena.add(
        moaiGroup
    );


    simuladorInicializado =
        true;


    actualizarTamaño3D();


    actualizarSimuladorMar();


    animar3D();

}


// ============================================================
// TAMAÑO 3D
// ============================================================

function actualizarTamaño3D() {

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


// ============================================================
// ANIMACIÓN 3D
// ============================================================

function animar3D() {

    if (
        !renderer ||
        !escena ||
        !camara
    ) {

        return;

    }


    requestAnimationFrame(
        animar3D
    );


    if (isla3D) {

        isla3D.rotation.y +=
            0.002;

    }


    renderer.render(
        escena,
        camara
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

        anio3D.innerHTML =
            "Año: " + año;

    }


    if (nivel3D) {

        nivel3D.innerHTML =
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

            riesgo.innerHTML =
                "🟢 Riesgo costero: Bajo";


        } else if (aumento < 50) {

            riesgo.innerHTML =
                "🟡 Riesgo costero: Moderado";


        } else if (aumento < 80) {

            riesgo.innerHTML =
                "🟠 Riesgo costero: Alto";


        } else {

            riesgo.innerHTML =
                "🔴 Riesgo costero: Muy alto";

        }

    }

}


// ============================================================
// ABRIR SIMULADOR
// ============================================================

if (abrirSimulador) {

    abrirSimulador.addEventListener(
        "click",
        function() {

            if (!simuladorPage) {
                return;
            }


            simuladorPage.classList.remove(
                "simuladorOculto"
            );


            simuladorPage.classList.add(
                "simuladorVisible"
            );


            simuladorPage.style.display =
                "block";


            crearSimulador3D();


            setTimeout(
                function() {

                    actualizarTamaño3D();

                    actualizarSimuladorMar();

                },
                50
            );

        }
    );

}


// ============================================================
// CERRAR SIMULADOR
// ============================================================

if (cerrarSimulador) {

    cerrarSimulador.addEventListener(
        "click",
        function() {

            if (!simuladorPage) {
                return;
            }


            simuladorPage.classList.remove(
                "simuladorVisible"
            );


            simuladorPage.classList.add(
                "simuladorOculto"
            );


            simuladorPage.style.display =
                "none";

        }
    );

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


// ============================================================
// IMPACTO EN LA COMUNIDAD
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

        impactoAnio.innerHTML =
            "Año: " + año;

    }


    const progreso =
        (año - 2000) / 100;


    if (progreso < 0.25) {

        if (impactoNivel) {

            impactoNivel.innerHTML =
                "🟢 Impacto: Bajo";

        }


        if (impactoDescripcion) {

            impactoDescripcion.innerHTML =
                "Las condiciones proyectadas " +
                "presentan un impacto relativamente " +
                "bajo sobre la comunidad.";

        }


    } else if (progreso < 0.50) {

        if (impactoNivel) {

            impactoNivel.innerHTML =
                "🟡 Impacto: Moderado";

        }


        if (impactoDescripcion) {

            impactoDescripcion.innerHTML =
                "Comienzan a aumentar los posibles " +
                "efectos sobre recursos, infraestructura " +
                "y actividades de la comunidad.";

        }


    } else if (progreso < 0.75) {

        if (impactoNivel) {

            impactoNivel.innerHTML =
                "🟠 Impacto: Alto";

        }


        if (impactoDescripcion) {

            impactoDescripcion.innerHTML =
                "La comunidad podría enfrentar una " +
                "mayor exposición a riesgos costeros " +
                "y presión sobre recursos naturales.";

        }


    } else {

        if (impactoNivel) {

            impactoNivel.innerHTML =
                "🔴 Impacto: Muy alto";

        }


        if (impactoDescripcion) {

            impactoDescripcion.innerHTML =
                "Las proyecciones indican una mayor " +
                "necesidad de adaptación de infraestructura, " +
                "gestión de recursos y protección de " +
                "los ecosistemas.";

        }

    }

}


if (impactoSlider) {

    impactoSlider.addEventListener(
        "input",
        actualizarImpacto
    );


    actualizarImpacto();

}


// ============================================================
// REDIMENSIONAR SOLAMENTE EL SIMULADOR
// ============================================================

window.addEventListener(
    "resize",
    function() {

        if (
            simuladorPage &&
            simuladorPage.style.display !== "none" &&
            simuladorInicializado
        ) {

            actualizarTamaño3D();

        }

    }
);



// ============================================================
// ============================================================
// RAPANUI FUTURO IA
// CONEXIÓN CON EL SERVIDOR SEGURO
// ============================================================
// ============================================================


// ============================================================
// URL DEL SERVIDOR
// ============================================================

const IA_SERVIDOR =
    "https://rapa-nui-futuro-ia.renzo-b-s-escorpio.workers.dev/";


// ============================================================
// ELEMENTOS DE LA IA
// ============================================================

const iaInput =
    document.getElementById(
        "iaInput"
    );


const iaEnviar =
    document.getElementById(
        "iaEnviar"
    );


const iaRespuesta =
    document.getElementById(
        "iaRespuesta"
    );


const iaEstado =
    document.getElementById(
        "iaEstado"
    );


// ============================================================
// MOSTRAR MENSAJE
// ============================================================

function agregarMensajeIA(
    tipo,
    texto
) {

    if (!iaRespuesta) {
        return;
    }


    const mensaje =
        document.createElement(
            "div"
        );


    mensaje.className =
        "iaMensaje " + tipo;


    mensaje.textContent =
        texto;


    iaRespuesta.appendChild(
        mensaje
    );


    iaRespuesta.scrollTop =
        iaRespuesta.scrollHeight;

}


// ============================================================
// ESTADO
// ============================================================

function cambiarEstadoIA(
    texto,
    tipo
) {

    if (!iaEstado) {
        return;
    }


    iaEstado.textContent =
        texto;


    iaEstado.className =
        "iaEstado " +
        (
            tipo || ""
        );

}


// ============================================================
// ENVIAR PREGUNTA A LA IA
// ============================================================

async function enviarPreguntaIA() {

    if (!iaInput) {
        return;
    }


    const pregunta =
        iaInput.value.trim();


    if (!pregunta) {

        iaInput.focus();

        return;

    }


    // ========================================================
    // MOSTRAR PREGUNTA
    // ========================================================

    agregarMensajeIA(
        "usuario",
        "👤 Tú: " +
        pregunta
    );


    // ========================================================
    // LIMPIAR INPUT
    // ========================================================

    iaInput.value =
        "";


    // ========================================================
    // DESACTIVAR BOTÓN
    // ========================================================

    if (iaEnviar) {

        iaEnviar.disabled =
            true;

    }


    // ========================================================
    // ESTADO
    // ========================================================

    cambiarEstadoIA(
        "🟡 Rapa Nui Futuro IA está pensando...",
        "cargando"
    );


    // ========================================================
    // MENSAJE TEMPORAL
    // ========================================================

    const mensajeCargando =
        document.createElement(
            "div"
        );


    mensajeCargando.className =
        "iaMensaje cargandoIA";


    mensajeCargando.textContent =
        "🤖 Rapa Nui Futuro IA: Pensando...";


    if (iaRespuesta) {

        iaRespuesta.appendChild(
            mensajeCargando
        );


        iaRespuesta.scrollTop =
            iaRespuesta.scrollHeight;

    }


    try {


        // ====================================================
        // DATOS ENVIADOS AL WORKER
        // ====================================================
        //
        // IMPORTANTE:
        //
        // El servidor espera:
        //
        // {
        //     "messages": [...]
        // }
        //
        // Este era el problema anterior.
        //
        // ====================================================

        const datosEnviar = {

            messages: [

                {

                    role: "system",

                    content:
                        "Eres Rapa Nui Futuro IA, una inteligencia artificial educativa especializada en Rapa Nui, Isla de Pascua, océano, biodiversidad, cambio climático, medio ambiente, patrimonio y comunidad. Responde en español de forma clara, educativa y responsable. Cuando corresponda, reconoce que Rapa Nui también es conocida como Isla de Pascua. Si no conoces un dato con seguridad, indícalo claramente y no inventes información."

                },


                {

                    role: "user",

                    content:
                        pregunta

                }

            ]

        };


        console.log(
            "Enviando a Rapa Nui Futuro IA:",
            datosEnviar
        );


        // ====================================================
        // PETICIÓN AL SERVIDOR
        // ====================================================

        const respuesta =
            await fetch(
                IA_SERVIDOR,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            datosEnviar
                        )

                }
            );


        // ====================================================
        // LEER RESPUESTA
        // ====================================================

        const texto =
            await respuesta.text();


        console.log(
            "Código HTTP:",
            respuesta.status
        );


        console.log(
            "Respuesta:",
            texto
        );


        // ====================================================
        // CONVERTIR A JSON
        // ====================================================

        let datos;


        try {

            datos =
                JSON.parse(
                    texto
                );

        } catch (error) {

            throw new Error(
                "El servidor no devolvió JSON válido."
            );

        }


        // ====================================================
        // COMPROBAR ERROR DEL SERVIDOR
        // ====================================================

        if (
            !respuesta.ok ||
            datos.ok === false
        ) {

            const detalle =
                datos.detalle ||
                datos.error ||
                "Error desconocido del servidor.";


            throw new Error(
                detalle
            );

        }


        // ====================================================
        // OBTENER RESPUESTA DE LA IA
        // ====================================================

        let respuestaIA =
            datos.respuesta;


        if (
            respuestaIA === undefined ||
            respuestaIA === null
        ) {

            respuestaIA =
                datos.message ||
                datos.content ||
                datos.output ||
                "";


        }


        // ====================================================
        // CONVERTIR A TEXTO
        // ====================================================

        respuestaIA =
            String(
                respuestaIA
            ).trim();


        // ====================================================
        // COMPROBAR RESPUESTA VACÍA
        // ====================================================

        if (!respuestaIA) {

            throw new Error(
                "La IA devolvió una respuesta vacía."
            );

        }


        // ====================================================
        // ELIMINAR "PENSANDO"
        // ====================================================

        if (mensajeCargando) {

            mensajeCargando.remove();

        }


        // ====================================================
        // MOSTRAR RESPUESTA
        // ====================================================

        agregarMensajeIA(
            "asistente",
            "🤖 Rapa Nui Futuro IA:\n\n" +
            respuestaIA
        );


        // ====================================================
        // ESTADO CORRECTO
        // ====================================================

        cambiarEstadoIA(
            "🟢 Servidor de Rapa Nui Futuro listo",
            "ok"
        );


    } catch (error) {


        // ====================================================
        // MOSTRAR ERROR EN CONSOLA
        // ====================================================

        console.error(
            "Error Rapa Nui Futuro IA:",
            error
        );


        // ====================================================
        // QUITAR "PENSANDO"
        // ====================================================

        if (mensajeCargando) {

            mensajeCargando.remove();

        }


        // ====================================================
        // MOSTRAR ERROR
        // ====================================================

        agregarMensajeIA(
            "error",
            "❌ No pude obtener una respuesta de Rapa Nui Futuro IA.\n\n" +
            "Detalle: " +
            error.message
        );


        // ====================================================
        // ESTADO
        // ====================================================

        cambiarEstadoIA(
            "🔴 Error al conectar con la IA",
            "error"
        );

    } finally {


        // ====================================================
        // ACTIVAR BOTÓN NUEVAMENTE
        // ====================================================

        if (iaEnviar) {

            iaEnviar.disabled =
                false;

        }


        if (iaInput) {

            iaInput.focus();

        }

    }

}


// ============================================================
// BOTÓN ENVIAR
// ============================================================

if (iaEnviar) {

    iaEnviar.addEventListener(
        "click",
        enviarPreguntaIA
    );

}


// ============================================================
// ENTER PARA ENVIAR
// ============================================================

if (iaInput) {

    iaInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                enviarPreguntaIA();

            }

        }
    );

}


// ============================================================
// COMPROBAR SERVIDOR IA
// ============================================================

async function comprobarServidorIA() {

    if (!iaEstado) {
        return;
    }


    cambiarEstadoIA(
        "🟡 Comprobando servidor...",
        "cargando"
    );


    try {

        const respuesta =
            await fetch(
                IA_SERVIDOR,
                {

                    method: "GET",

                    headers: {

                        "Accept":
                            "application/json"

                    }

                }
            );


        const texto =
            await respuesta.text();


        console.log(
            "Estado servidor IA:",
            texto
        );


        if (!respuesta.ok) {

            throw new Error(
                "Servidor respondió HTTP " +
                respuesta.status
            );

        }


        let datos;


        try {

            datos =
                JSON.parse(
                    texto
                );

        } catch {

            throw new Error(
                "Respuesta del servidor no válida."
            );

        }


        if (datos.ok) {

            cambiarEstadoIA(
                "🟢 Servidor de Rapa Nui Futuro listo",
                "ok"
            );

        } else {

            cambiarEstadoIA(
                "🔴 API Key no configurada",
                "error"
            );

        }


    } catch (error) {

        console.error(
            "No se pudo comprobar el servidor IA:",
            error
        );


        cambiarEstadoIA(
            "🔴 No se pudo conectar con el servidor",
            "error"
        );

    }

}


// ============================================================
// INICIAR IA
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        comprobarServidorIA();

    }
);