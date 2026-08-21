/* =========================================================
   RAPANUI FUTURO
   script.js
   ========================================================= */


/* =========================================================
   NAVEGACIÓN
   ========================================================= */

function mostrar(id, boton) {

    document
        .querySelectorAll(".panel")
        .forEach(panel => {
            panel.style.display = "none";
        });

    const panel =
        document.getElementById(id);

    if (panel) {
        panel.style.display = "block";
    }

    document
        .querySelectorAll(".navButton")
        .forEach(button => {
            button.classList.remove("active");
        });

    if (boton) {
        boton.classList.add("active");
    }

}


/* Mostrar página inicial */

mostrar("mar");


/* =========================================================
   CONDICIONES ACTUALES
   ========================================================= */

async function cargarCondiciones() {

    try {

        const url =
            "https://marine-api.open-meteo.com/v1/marine" +
            "?latitude=-27.1127" +
            "&longitude=-109.3497" +
            "&hourly=wave_height,sea_surface_temperature" +
            "&forecast_days=1" +
            "&timezone=auto";


        const respuesta =
            await fetch(url);


        if (!respuesta.ok) {

            throw new Error(
                "Error en Marine API"
            );

        }


        const datos =
            await respuesta.json();


        const temperaturas =
            datos.hourly?.sea_surface_temperature || [];


        const oleajes =
            datos.hourly?.wave_height || [];


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
            document.getElementById(
                "tempMar"
            );


        const elementoOleaje =
            document.getElementById(
                "oleaje"
            );


        if (elementoTemp) {

            elementoTemp.textContent =
                temperatura !== undefined
                    ? Number(temperatura).toFixed(1) + " °C"
                    : "No disponible";

        }


        if (elementoOleaje) {

            elementoOleaje.textContent =
                oleaje !== undefined
                    ? Number(oleaje).toFixed(2) + " m"
                    : "No disponible";

        }

    }

    catch (error) {

        console.error(
            "Error obteniendo datos marinos:",
            error
        );


        const temp =
            document.getElementById(
                "tempMar"
            );


        const oleaje =
            document.getElementById(
                "oleaje"
            );


        if (temp) {
            temp.textContent =
                "No disponible";
        }


        if (oleaje) {
            oleaje.textContent =
                "No disponible";
        }

    }

}


/* =========================================================
   VIENTO
   ========================================================= */

async function cargarViento() {

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
                "Error en Weather API"
            );

        }


        const datos =
            await respuesta.json();


        const viento =
            datos.current?.wind_speed_10m;


        const elemento =
            document.getElementById(
                "viento"
            );


        if (elemento) {

            elemento.textContent =
                viento !== undefined
                    ? Number(viento).toFixed(1) + " km/h"
                    : "No disponible";

        }

    }

    catch (error) {

        console.error(
            "Error obteniendo viento:",
            error
        );


        const elemento =
            document.getElementById(
                "viento"
            );


        if (elemento) {

            elemento.textContent =
                "No disponible";

        }

    }

}


/* =========================================================
   SALINIDAD
   ========================================================= */

const salinidad =
    document.getElementById(
        "salinidad"
    );


if (salinidad) {

    salinidad.textContent =
        "≈ 35 PSU";

}


cargarCondiciones();

cargarViento();


/* =========================================================
   DATOS CIENTÍFICOS
   ========================================================= */


/* =========================================================
   NIVEL DEL MAR
   ========================================================= */

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


/* =========================================================
   CO2
   ========================================================= */

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


/* =========================================================
   TEMPERATURA DEL OCÉANO
   ========================================================= */

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


/* =========================================================
   CONTAMINACIÓN
   ========================================================= */

const contaminacion = {

    2000: 15,
    2005: 18,
    2010: 22,
    2015: 28,
    2020: 35,
    2025: 42,
    2030: 48,
    2035: 54,
    2040: 59,
    2045: 63,
    2050: 67,
    2055: 70,
    2060: 72,
    2065: 74,
    2070: 75,
    2075: 76,
    2080: 77,
    2085: 78,
    2090: 79,
    2095: 80,
    2100: 81

};


/* =========================================================
   INTERPOLACIÓN
   ========================================================= */

function interpolar(objeto, año) {

    const años =
        Object.keys(objeto)
            .map(Number)
            .sort(
                (a, b) => a - b
            );


    if (
        Object.prototype.hasOwnProperty
            .call(objeto, año)
    ) {

        return objeto[año];

    }


    if (año <= años[0]) {

        return objeto[años[0]];

    }


    if (
        año >=
        años[años.length - 1]
    ) {

        return objeto[
            años[años.length - 1]
        ];

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
                objeto[año1];

            const valor2 =
                objeto[año2];


            const porcentaje =
                (año - año1) /
                (año2 - año1);


            return (
                valor1 +
                (valor2 - valor1) *
                porcentaje
            );

        }

    }


    return null;

}


/* =========================================================
   DATOS PARA GRÁFICOS
   ========================================================= */

const datos = {

    mar: {

        nombre:
            "Nivel del mar",

        unidad:
            "cm",

        objeto:
            nivelMarSSP245

    },


    temperatura: {

        nombre:
            "Temperatura del océano",

        unidad:
            "°C",

        objeto:
            temperaturaReferencia

    },


    co2: {

        nombre:
            "CO₂ atmosférico",

        unidad:
            "ppm",

        objeto: {
            ...co2NOAA,
            ...co2Proyeccion
        }

    },


    contaminacion: {

        nombre:
            "Contaminación marina",

        unidad:
            "Índice",

        objeto:
            contaminacion

    }

};


/* =========================================================
   GRÁFICO
   ========================================================= */

const canvasGrafico =
    document.getElementById(
        "grafico"
    );


let grafico = null;


if (
    canvasGrafico &&
    typeof Chart !== "undefined"
) {

    const ctx =
        canvasGrafico.getContext(
            "2d"
        );


    grafico =
        new Chart(
            ctx,
            {

                type: "line",

                data: {

                    labels: [],

                    datasets: [

                        {

                            label:
                                "Nivel del mar",

                            data: [],

                            borderColor:
                                "#1261a0",

                            backgroundColor:
                                "rgba(18, 97, 160, 0.10)",

                            borderWidth:
                                3,

                            pointBackgroundColor:
                                "#1261a0",

                            pointBorderColor:
                                "#ffffff",

                            pointBorderWidth:
                                2,

                            pointRadius:
                                2,

                            pointHoverRadius:
                                6,

                            fill:
                                true,

                            tension:
                                0.3

                        }

                    ]

                },


                options: {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    animation:
                        false,


                    interaction: {

                        mode:
                            "index",

                        intersect:
                            false

                    },


                    plugins: {

                        legend: {

                            display:
                                true,

                            labels: {

                                usePointStyle:
                                    true,

                                padding:
                                    20

                            }

                        },

                        tooltip: {

                            backgroundColor:
                                "#102333",

                            padding:
                                12,

                            cornerRadius:
                                10

                        }

                    },


                    scales: {

                        x: {

                            grid: {

                                display:
                                    false

                            },

                            title: {

                                display:
                                    true,

                                text:
                                    "Año"

                            }

                        },


                        y: {

                            beginAtZero:
                                false,

                            grid: {

                                color:
                                    "rgba(100,130,145,0.10)"

                            },

                            title: {

                                display:
                                    true,

                                text:
                                    "Valor"

                            }

                        }

                    }

                }

            }

        );

}


/* =========================================================
   ACTUALIZAR GRÁFICO
   ========================================================= */

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


    const añosMostrar = [];

    const valoresMostrar = [];


    for (
        let y = 2000;
        y <= año;
        y++
    ) {

        añosMostrar.push(y);


        const valor =
            interpolar(
                dataset.objeto,
                y
            );


        valoresMostrar.push(valor);

    }


    grafico.data.labels =
        añosMostrar;


    grafico.data.datasets[0].data =
        valoresMostrar;


    grafico.data.datasets[0].label =
        dataset.nombre;


    grafico.options.scales.y.title.text =
        dataset.unidad;


    const valor =
        interpolar(
            dataset.objeto,
            año
        );


    if (valorSeleccionado) {

        valorSeleccionado.innerHTML =

            "<div>" +
            dataset.nombre +
            "</div>" +

            "<div class='valorGrande'>" +
            Number(valor).toFixed(1) +
            " " +
            dataset.unidad +
            "</div>" +

            "<div>" +
            "Año seleccionado: " +
            año +
            "</div>";

    }


    grafico.update();

}


/* =========================================================
   EVENTOS DEL GRÁFICO
   ========================================================= */

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


actualizarGrafico();


/* =========================================================
   SIMULADOR 3D
   ========================================================= */

const contenedor =
    document.getElementById(
        "escena3D"
    );


let escena = null;

let camara = null;

let renderer = null;

let mar = null;

let isla = null;

let playa = null;


if (
    contenedor &&
    typeof THREE !== "undefined"
) {

    escena =
        new THREE.Scene();


    escena.background =
        new THREE.Color(
            0x8ed8eb
        );


    /* CÁMARA */

    camara =
        new THREE.PerspectiveCamera(
            55,
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


    /* RENDERER */

    renderer =
        new THREE.WebGLRenderer({

            antialias:
                true

        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.shadowMap.enabled =
        true;


    contenedor.appendChild(
        renderer.domElement
    );


    /* LUZ */

    const luz =
        new THREE.DirectionalLight(
            0xffffff,
            1.6
        );


    luz.position.set(
        6,
        12,
        5
    );


    luz.castShadow =
        true;


    escena.add(luz);


    const luzAmbiente =
        new THREE.AmbientLight(
            0xffffff,
            0.65
        );


    escena.add(
        luzAmbiente
    );


    /* MAR */

    const marGeometry =
        new THREE.BoxGeometry(
            24,
            0.8,
            24
        );


    const marMaterial =
        new THREE.MeshPhongMaterial({

            color:
                0x168dcc,

            transparent:
                true,

            opacity:
                0.78

        });


    mar =
        new THREE.Mesh(
            marGeometry,
            marMaterial
        );


    mar.position.y =
        0;


    mar.receiveShadow =
        true;


    escena.add(mar);


    /* PLAYA */

    playa =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                5.5,
                5.5,
                0.3,
                48
            ),

            new THREE.MeshPhongMaterial({

                color:
                    0xe8c77f

            })

        );


    playa.position.y =
        0.35;


    playa.receiveShadow =
        true;


    escena.add(playa);


    /* ISLA */

    const islaGeometry =
        new THREE.CylinderGeometry(
            2.2,
            5,
            4,
            48
        );


    const islaMaterial =
        new THREE.MeshPhongMaterial({

            color:
                0x3c893c

        });


    isla =
        new THREE.Mesh(
            islaGeometry,
            islaMaterial
        );


    isla.position.y =
        1.8;


    isla.castShadow =
        true;


    isla.receiveShadow =
        true;


    escena.add(isla);


    /* MOAI */

    const moaiGroup =
        new THREE.Group();


    const moaiMaterial =
        new THREE.MeshPhongMaterial({

            color:
                0x77746d

        });


    const cuerpo =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.45,
                0.68,
                1.5,
                16
            ),

            moaiMaterial

        );


    cuerpo.position.y =
        2.8;


    cuerpo.castShadow =
        true;


    moaiGroup.add(
        cuerpo
    );


    const cabeza =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.38,
                0.48,
                0.85,
                16
            ),

            moaiMaterial

        );


    cabeza.position.y =
        3.95;


    cabeza.castShadow =
        true;


    moaiGroup.add(
        cabeza
    );


    escena.add(
        moaiGroup
    );


    /* SEGUNDO MOAI */

    const moai2 =
        moaiGroup.clone();


    moai2.scale.set(
        0.65,
        0.65,
        0.65
    );


    moai2.position.set(
        2.5,
        0,
        -1
    );


    escena.add(
        moai2
    );


    /* REDIMENSIONAR */

    function redimensionar3D() {

        if (
            !contenedor ||
            !renderer ||
            !camara
        ) {

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
            alto,
            false
        );


        camara.aspect =
            ancho / alto;


        camara.updateProjectionMatrix();

    }


    redimensionar3D();


    /* ANIMACIÓN */

    function animar() {

        requestAnimationFrame(
            animar
        );


        if (isla) {

            isla.rotation.y +=
                0.0015;

        }


        renderer.render(
            escena,
            camara
        );

    }


    animar();


    window.addEventListener(
        "resize",
        redimensionar3D
    );

}


/* =========================================================
   ELEMENTOS DEL SIMULADOR
   ========================================================= */

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


/* =========================================================
   AUMENTO DEL MAR
   ========================================================= */

function obtenerAumentoMar(
    año,
    escenario
) {

    let datosEscenario;


    if (
        escenario ===
        "SSP5-8.5"
    ) {

        datosEscenario =
            nivelMarSSP585;

    }

    else {

        datosEscenario =
            nivelMarSSP245;

    }


    return interpolar(
        datosEscenario,
        año
    );

}


/* =========================================================
   ACTUALIZAR SIMULADOR
   ========================================================= */

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


    /* TEXTO */

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


    /* SUBIR EL MAR */

    if (mar) {

        const alturaVisual =
            (aumento / 100) * 3;


        mar.position.y =
            alturaVisual;

    }


    /* RIESGO */

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


/* =========================================================
   EVENTOS DEL SIMULADOR
   ========================================================= */

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


/* =========================================================
   ABRIR SIMULADOR
   ========================================================= */

if (abrirSimulador) {

    abrirSimulador.addEventListener(
        "click",
        function () {

            if (simuladorPage) {

                simuladorPage.style.display =
                    "block";

            }


            setTimeout(
                function () {

                    if (
                        renderer &&
                        camara &&
                        contenedor
                    ) {

                        const ancho =
                            contenedor.clientWidth;


                        const alto =
                            contenedor.clientHeight;


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


            if (simuladorPage) {

                simuladorPage.scrollIntoView({

                    behavior:
                        "smooth"

                });

            }

        }
    );

}


/* =========================================================
   CERRAR SIMULADOR
   ========================================================= */

if (cerrarSimulador) {

    cerrarSimulador.addEventListener(
        "click",
        function () {

            if (simuladorPage) {

                simuladorPage.style.display =
                    "none";

            }

        }
    );

}


actualizarSimuladorMar();


/* =========================================================
   IMPACTO EN LA COMUNIDAD
   ========================================================= */

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
                "Las condiciones proyectadas presentan " +
                "un impacto relativamente bajo sobre " +
                "la comunidad.";

        }

    }


    else if (progreso < 0.50) {

        if (impactoNivel) {

            impactoNivel.textContent =
                "🟡 Impacto: Moderado";

        }


        if (impactoDescripcion) {

            impactoDescripcion.textContent =
                "Comienzan a aumentar los posibles " +
                "efectos sobre recursos, infraestructura " +
                "y actividades de la comunidad.";

        }

    }


    else if (progreso < 0.75) {

        if (impactoNivel) {

            impactoNivel.textContent =
                "🟠 Impacto: Alto";

        }


        if (impactoDescripcion) {

            impactoDescripcion.textContent =
                "La comunidad podría enfrentar una " +
                "mayor exposición a riesgos costeros " +
                "y presión sobre recursos naturales.";

        }

    }


    else {

        if (impactoNivel) {

            impactoNivel.textContent =
                "🔴 Impacto: Muy alto";

        }


        if (impactoDescripcion) {

            impactoDescripcion.textContent =
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

}


actualizarImpacto();


/* =========================================================
   FIN
   ========================================================= */