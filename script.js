// ============================================================
// 🗿 RAPA NUI FUTURO
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

        // Dar tiempo al navegador para mostrar el panel
        // antes de recalcular gráficos.
        setTimeout(() => {

            if (grafico) {
                grafico.resize();
            }

            if (typeof redimensionar3D === "function") {
                redimensionar3D();
            }

        }, 100);
    }
}


// Mostrar Océano al iniciar
mostrar("mar");


// ============================================================
// CONDICIONES ACTUALES DEL OCÉANO
// ============================================================

async function cargarCondiciones() {

    const elementoTemp =
        document.getElementById("tempMar");

    const elementoOleaje =
        document.getElementById("oleaje");

    if (!elementoTemp || !elementoOleaje) {
        return;
    }

    elementoTemp.innerHTML = "Cargando...";
    elementoOleaje.innerHTML = "Cargando...";

    try {

        const url =
            "https://marine-api.open-meteo.com/v1/marine" +
            "?latitude=-27.1127" +
            "&longitude=-109.3497" +
            "&hourly=wave_height,sea_surface_temperature" +
            "&forecast_days=1" +
            "&timezone=auto";

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("Error en Marine API");
        }

        const datos = await respuesta.json();

        if (
            !datos.hourly ||
            !datos.hourly.sea_surface_temperature ||
            !datos.hourly.wave_height
        ) {
            throw new Error("Datos marinos no disponibles");
        }

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


        // Temperatura

        if (
            temperatura !== undefined &&
            temperatura !== null
        ) {

            elementoTemp.innerHTML =
                Number(temperatura).toFixed(1) +
                " °C";

        } else {

            elementoTemp.innerHTML =
                "No disponible";

        }


        // Oleaje

        if (
            oleaje !== undefined &&
            oleaje !== null
        ) {

            elementoOleaje.innerHTML =
                Number(oleaje).toFixed(2) +
                " m";

        } else {

            elementoOleaje.innerHTML =
                "No disponible";

        }

    }

    catch (error) {

        console.error(
            "Error obteniendo datos marinos:",
            error
        );

        elementoTemp.innerHTML =
            "No disponible";

        elementoOleaje.innerHTML =
            "No disponible";
    }
}


// ============================================================
// VIENTO
// ============================================================

async function cargarViento() {

    const elemento =
        document.getElementById("viento");

    if (!elemento) {
        return;
    }

    elemento.innerHTML = "Cargando...";

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

        if (
            !datos.current ||
            datos.current.wind_speed_10m === undefined
        ) {
            throw new Error("Viento no disponible");
        }

        const viento =
            datos.current.wind_speed_10m;

        elemento.innerHTML =
            Number(viento).toFixed(1) +
            " km/h";

    }

    catch (error) {

        console.error(
            "Error obteniendo viento:",
            error
        );

        elemento.innerHTML =
            "No disponible";
    }
}


// ============================================================
// SALINIDAD
// ============================================================

const salinidad =
    document.getElementById("salinidad");

if (salinidad) {

    salinidad.innerHTML =
        "≈ 35 PSU";

}


// Ejecutar condiciones actuales
cargarCondiciones();
cargarViento();


// ============================================================
// DATOS CIENTÍFICOS
// ============================================================


// ============================================================
// NIVEL DEL MAR — SSP2-4.5
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
// NIVEL DEL MAR — SSP5-8.5
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
// CO₂ HISTÓRICO — NOAA
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
// CO₂ PROYECCIÓN EDUCATIVA
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
// TEMPERATURA DEL OCÉANO
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
// CONTAMINACIÓN
// ============================================================

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


// ============================================================
// INTERPOLACIÓN
// ============================================================

function interpolar(objeto, año) {

    if (!objeto) {
        return null;
    }

    const años =
        Object.keys(objeto)
            .map(Number)
            .sort((a, b) => a - b);


    if (años.length === 0) {
        return null;
    }


    // Año exacto

    if (objeto[año] !== undefined) {

        return Number(objeto[año]);

    }


    // Antes del primer año

    if (año <= años[0]) {

        return Number(
            objeto[años[0]]
        );

    }


    // Después del último año

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


    // Interpolación lineal

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
                Number(objeto[año1]);

            const valor2 =
                Number(objeto[año2]);


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


// ============================================================
// DATOS PARA GRÁFICOS
// ============================================================

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

        objeto:
            {
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

                labels: [],

                datasets: [

                    {

                        label:
                            "Nivel del mar",

                        data: [],

                        borderColor:
                            "#1565c0",

                        backgroundColor:
                            "rgba(21, 101, 192, 0.10)",

                        borderWidth:
                            3,

                        pointBackgroundColor:
                            "#1565c0",

                        pointBorderColor:
                            "#1565c0",

                        pointRadius:
                            2,

                        pointHoverRadius:
                            6,

                        fill:
                            false,

                        tension:
                            0.25,

                        spanGaps:
                            true

                    },

                    {

                        label:
                            "Año seleccionado",

                        data: [],

                        borderWidth:
                            0,

                        backgroundColor:
                            "#e53935",

                        borderColor:
                            "#e53935",

                        pointBackgroundColor:
                            "#e53935",

                        pointBorderColor:
                            "#ffffff",

                        pointBorderWidth:
                            2,

                        pointRadius:
                            7,

                        pointHoverRadius:
                            9,

                        showLine:
                            false,

                        fill:
                            false

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
                        "nearest",

                    intersect:
                        false

                },


                plugins: {

                    legend: {

                        display:
                            true

                    },

                    tooltip: {

                        callbacks: {

                            label: function(context) {

                                const variable =
                                    document.getElementById(
                                        "variableSelect"
                                    );

                                let unidad =
                                    "";

                                if (
                                    variable &&
                                    datos[variable.value]
                                ) {

                                    unidad =
                                        datos[
                                            variable.value
                                        ].unidad;

                                }

                                return (
                                    Number(
                                        context.parsed.y
                                    ).toFixed(1) +
                                    " " +
                                    unidad
                                );

                            }

                        }

                    }

                },


                scales: {

                    x: {

                        type:
                            "linear",

                        title: {

                            display:
                                true,

                            text:
                                "Año"

                        },

                        ticks: {

                            maxTicksLimit:
                                10

                        }

                    },


                    y: {

                        beginAtZero:
                            false,

                        title: {

                            display:
                                true,

                            text:
                                "Valor"

                        }

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


    // Mostrar año

    if (selectedYearElement) {

        selectedYearElement.innerHTML =
            "Año: " + año;

    }


    // ========================================================
    // CREAR DATOS
    // ========================================================

    const añosMostrar = [];
    const valoresMostrar = [];


    for (
        let y = 2000;
        y <= 2100;
        y++
    ) {

        añosMostrar.push(y);


        const valor =
            interpolar(
                dataset.objeto,
                y
            );


        valoresMostrar.push(
            valor
        );

    }


    // ========================================================
    // PUNTO DEL AÑO SELECCIONADO
    // ========================================================

    const puntoSeleccionado =
        new Array(
            añosMostrar.length
        ).fill(null);


    const indice =
        añosMostrar.indexOf(año);


    if (
        indice >= 0 &&
        valoresMostrar[indice] !== null
    ) {

        puntoSeleccionado[indice] =
            valoresMostrar[indice];

    }


    // ========================================================
    // ACTUALIZAR LÍNEA
    // ========================================================

    grafico.data.labels =
        añosMostrar;


    grafico.data.datasets[0].data =
        valoresMostrar;


    grafico.data.datasets[0].label =
        dataset.nombre;


    // ========================================================
    // ACTUALIZAR PUNTO ROJO
    // ========================================================

    grafico.data.datasets[1].data =
        puntoSeleccionado;


    grafico.data.datasets[1].label =
        "Año " + año;


    // ========================================================
    // UNIDAD
    // ========================================================

    grafico.options.scales.y.title.text =
        dataset.unidad;


    // ========================================================
    // VALOR SELECCIONADO
    // ========================================================

    const valor =
        interpolar(
            dataset.objeto,
            año
        );


    if (valorSeleccionado) {

        const valorTexto =
            valor !== null
                ? Number(valor).toFixed(1)
                : "No disponible";


        valorSeleccionado.innerHTML =

            "<div>" +
            dataset.nombre +
            "</div>" +

            "<div class='valorGrande'>" +
            valorTexto +
            " " +
            dataset.unidad +
            "</div>" +

            "<div>" +
            "Año seleccionado: " +
            año +
            "</div>";

    }


    // ========================================================
    // DESCRIPCIÓN
    // ========================================================

    if (descripcionDatos) {

        if (variable === "mar") {

            descripcionDatos.innerHTML =
                "Proyección educativa del aumento " +
                "relativo del nivel del mar basada en " +
                "escenarios climáticos. Los valores se " +
                "utilizan para visualizar posibles cambios " +
                "y no representan una predicción exacta " +
                "para una propiedad específica.";

        }

        else if (variable === "temperatura") {

            descripcionDatos.innerHTML =
                "Serie de referencia utilizada para " +
                "visualizar una posible evolución de la " +
                "temperatura del océano. No representa " +
                "una medición anual oficial específica " +
                "de Rapa Nui.";

        }

        else if (variable === "co2") {

            descripcionDatos.innerHTML =
                "Los valores históricos corresponden " +
                "a mediciones atmosféricas de CO₂. " +
                "Los valores posteriores se utilizan " +
                "como proyección educativa.";

        }

        else if (variable === "contaminacion") {

            descripcionDatos.innerHTML =
                "Índice educativo utilizado para " +
                "representar una posible evolución de " +
                "la presión de contaminación marina. " +
                "No corresponde a una medición oficial " +
                "de contaminación de Rapa Nui.";

        }

    }


    // Actualizar gráfico

    grafico.update("none");
}


// ============================================================
// EVENTOS DEL GRÁFICO
// ============================================================

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

    yearSlider.addEventListener(
        "change",
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

const contenedor =
    document.getElementById(
        "escena3D"
    );


let escena = null;
let camara = null;
let renderer = null;
let mar = null;
let isla = null;


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


if (
    contenedor &&
    typeof THREE !== "undefined"
) {

    // ========================================================
    // ESCENA
    // ========================================================

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

            antialias:
                true

        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio || 1,
            2
        )
    );


    contenedor.appendChild(
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


    escena.add(
        luz
    );


    const luzAmbiente =
        new THREE.AmbientLight(
            0xffffff,
            0.65
        );


    escena.add(
        luzAmbiente
    );


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

            color:
                0x2196f3,

            transparent:
                true,

            opacity:
                0.75

        });


    mar =
        new THREE.Mesh(
            marGeometry,
            marMaterial
        );


    mar.position.y =
        0;


    escena.add(
        mar
    );


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

                color:
                    0xf4d28c

            })

        );


    playa.position.y =
        0.25;


    escena.add(
        playa
    );


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

            color:
                0x3d8b37

        });


    isla =
        new THREE.Mesh(
            islaGeometry,
            islaMaterial
        );


    isla.position.y =
        1.5;


    escena.add(
        isla
    );


    // ========================================================
    // MOAI
    // ========================================================

    const moaiGroup =
        new THREE.Group();


    const moaiMaterial =
        new THREE.MeshPhongMaterial({

            color:
                0x777777

        });


    // Cabeza

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


    // Cuerpo

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


    // Nariz simple

    const nariz =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                0.18,
                0.18,
                0.45
            ),

            moaiMaterial

        );


    nariz.position.set(
        0,
        3.15,
        0.42
    );


    moaiGroup.add(
        nariz
    );


    escena.add(
        moaiGroup
    );


    // ========================================================
    // REDIMENSIONAR
    // ========================================================

    redimensionar3D();


    // ========================================================
    // ANIMACIÓN
    // ========================================================

    function animar() {

        requestAnimationFrame(
            animar
        );


        if (isla) {

            isla.rotation.y +=
                0.002;

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
// OBTENER AUMENTO DEL NIVEL DEL MAR
// ============================================================

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


    if (
        aumento === null ||
        aumento === undefined
    ) {

        return;

    }


    // ========================================================
    // TEXTO
    // ========================================================

    if (anio3D) {

        anio3D.innerHTML =
            "Año: " + año;

    }


    if (nivel3D) {

        nivel3D.innerHTML =
            "Aumento estimado: " +
            Number(aumento).toFixed(1) +
            " cm";

    }


    // ========================================================
    // SUBIR EL MAR
    // ========================================================

    if (mar) {

        const alturaVisual =
            (
                aumento /
                100
            ) *
            3;


        mar.position.y =
            alturaVisual;

    }


    // ========================================================
    // RIESGO COSTERO
    // ========================================================

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


// ============================================================
// EVENTOS DEL SIMULADOR
// ============================================================

if (slider3D) {

    slider3D.addEventListener(
        "input",
        actualizarSimuladorMar
    );

    slider3D.addEventListener(
        "change",
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
// ABRIR SIMULADOR
// ============================================================

if (abrirSimulador) {

    abrirSimulador.addEventListener(
        "click",
        function() {

            if (simuladorPage) {

                simuladorPage.style.display =
                    "block";

            }


            setTimeout(
                function() {

                    redimensionar3D();

                    actualizarSimuladorMar();

                },
                100
            );


            if (simuladorPage) {

                simuladorPage.scrollIntoView({

                    behavior:
                        "smooth",

                    block:
                        "start"

                });

            }

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

            if (simuladorPage) {

                simuladorPage.style.display =
                    "none";

            }

        }
    );

}


actualizarSimuladorMar();


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
        (
            año - 2000
        ) /
        100;


    if (
        progreso < 0.25
    ) {

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

    }


    else if (
        progreso < 0.50
    ) {

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

    }


    else if (
        progreso < 0.75
    ) {

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

    }


    else {

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

    impactoSlider.addEventListener(
        "change",
        actualizarImpacto
    );

}


actualizarImpacto();


// ============================================================
// REDIMENSIONAR TODO
// ============================================================

window.addEventListener(
    "resize",
    function() {

        redimensionar3D();


        if (grafico) {

            setTimeout(
                function() {

                    grafico.resize();

                },
                100
            );

        }

    }
);


// ============================================================
// CARGA INICIAL
// ============================================================

window.addEventListener(
    "load",
    function() {

        setTimeout(
            function() {

                if (grafico) {
                    grafico.resize();
                    grafico.update("none");
                }


                redimensionar3D();


                actualizarGrafico();


                actualizarSimuladorMar();


                actualizarImpacto();

            },
            300
        );

    }
);


// ============================================================
// ORIENTACIÓN DEL TELÉFONO
// ============================================================

window.addEventListener(
    "orientationchange",
    function() {

        setTimeout(
            function() {

                if (grafico) {

                    grafico.resize();

                }


                redimensionar3D();

            },
            400
        );

    }
);


// ============================================================
// FIN DEL SCRIPT
// ============================================================