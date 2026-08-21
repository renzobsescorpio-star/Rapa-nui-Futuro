/* =========================================================
   RAPANUI FUTURO
   script.js
========================================================= */


/* =========================================================
   VARIABLES GLOBALES
========================================================= */

let grafico = null;

let renderer = null;

let escena = null;

let camara = null;

let mar3D = null;

let isla3D = null;

let playa3D = null;

let threeInicializado = false;

let datosActuales = {

    temperatura: null,

    oleaje: null,

    viento: null

};


/* =========================================================
   COORDENADAS RAPA NUI
========================================================= */

const LATITUD =
    -27.1127;

const LONGITUD =
    -109.3497;


/* =========================================================
   NAVEGACIÓN
========================================================= */

function mostrar(id) {

    const paneles =
        document.querySelectorAll(".panel");

    paneles.forEach(panel => {

        panel.style.display = "none";

        panel.classList.remove("activo");

    });


    const botones =
        document.querySelectorAll(".menuBtn");

    botones.forEach(boton => {

        boton.classList.remove("activo");

    });


    const panel =
        document.getElementById(id);


    if (!panel) {

        console.warn(
            "Panel no encontrado:",
            id
        );

        return;

    }


    panel.style.display =
        "block";

    panel.classList.add("activo");


    const botonActivo =
        document.querySelector(
            `.menuBtn[data-panel="${id}"]`
        );


    if (botonActivo) {

        botonActivo.classList.add("activo");

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });


    setTimeout(() => {

        if (grafico) {

            grafico.resize();

            grafico.update("none");

        }


        if (renderer) {

            ajustarThree();

        }

    }, 150);

}


/* =========================================================
   UTILIDAD: ELEMENTO
========================================================= */

function elemento(id) {

    return document.getElementById(id);

}


/* =========================================================
   UTILIDAD: FORMATO
========================================================= */

function numeroSeguro(
    valor,
    decimales = 1
) {

    const numero =
        Number(valor);


    if (!Number.isFinite(numero)) {

        return null;

    }


    return numero.toFixed(decimales);

}


/* =========================================================
   CONDICIONES ACTUALES
========================================================= */

async function cargarCondiciones() {

    const estado =
        elemento("estadoDatos");


    if (estado) {

        estado.innerHTML =
            "🟡 Actualizando datos...";

    }


    try {

        const url =
            "https://marine-api.open-meteo.com/v1/marine" +

            "?latitude=" +
            LATITUD +

            "&longitude=" +
            LONGITUD +

            "&hourly=wave_height,sea_surface_temperature" +

            "&forecast_days=1" +

            "&timezone=UTC";


        const respuesta =
            await fetch(
                url,
                {
                    cache: "no-store"
                }
            );


        if (!respuesta.ok) {

            throw new Error(
                "Error HTTP " +
                respuesta.status
            );

        }


        const datos =
            await respuesta.json();


        if (
            !datos.hourly ||
            !datos.hourly.time
        ) {

            throw new Error(
                "Datos marinos no disponibles"
            );

        }


        const tiempos =
            datos.hourly.time || [];

        const temperaturas =
            datos.hourly.sea_surface_temperature || [];

        const oleajes =
            datos.hourly.wave_height || [];


        /*
         * Intentamos obtener la hora actual
         * para seleccionar la medición más cercana.
         */

        const ahora =
            Date.now();


        let indiceMejor =
            0;

        let diferenciaMenor =
            Infinity;


        tiempos.forEach(
            (tiempo, indice) => {

                const fecha =
                    new Date(tiempo)
                    .getTime();


                if (!Number.isFinite(fecha)) {

                    return;

                }


                const diferencia =
                    Math.abs(
                        fecha - ahora
                    );


                if (
                    diferencia <
                    diferenciaMenor
                ) {

                    diferenciaMenor =
                        diferencia;

                    indiceMejor =
                        indice;

                }

            }
        );


        let temperatura =
            temperaturas[indiceMejor];


        let oleaje =
            oleajes[indiceMejor];


        /*
         * Si el punto más cercano no tiene datos,
         * buscamos el primer valor disponible.
         */

        if (
            temperatura === null ||
            temperatura === undefined
        ) {

            temperatura =
                temperaturas.find(
                    valor =>
                        valor !== null &&
                        valor !== undefined
                );

        }


        if (
            oleaje === null ||
            oleaje === undefined
        ) {

            oleaje =
                oleajes.find(
                    valor =>
                        valor !== null &&
                        valor !== undefined
                );

        }


        datosActuales.temperatura =
            Number(temperatura);

        datosActuales.oleaje =
            Number(oleaje);


        if (
            Number.isFinite(
                datosActuales.temperatura
            )
        ) {

            elemento("tempMar").innerHTML =
                datosActuales.temperatura.toFixed(2)
                + " °C";

        }

        else {

            elemento("tempMar").innerHTML =
                "No disponible";

        }


        if (
            Number.isFinite(
                datosActuales.oleaje
            )
        ) {

            elemento("oleaje").innerHTML =
                datosActuales.oleaje.toFixed(2)
                + " m";

        }

        else {

            elemento("oleaje").innerHTML =
                "No disponible";

        }


        actualizarMonitoreo();


        if (estado) {

            estado.innerHTML =
                "🟢 Datos actualizados";

        }

    }

    catch (error) {

        console.error(
            "Error al cargar datos marinos:",
            error
        );


        elemento("tempMar").innerHTML =
            "No disponible";


        elemento("oleaje").innerHTML =
            "No disponible";


        if (estado) {

            estado.innerHTML =
                "🟠 No fue posible actualizar los datos marinos";

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

            "?latitude=" +
            LATITUD +

            "&longitude=" +
            LONGITUD +

            "&current=wind_speed_10m" +

            "&timezone=auto";


        const respuesta =
            await fetch(
                url,
                {
                    cache: "no-store"
                }
            );


        if (!respuesta.ok) {

            throw new Error(
                "Error HTTP " +
                respuesta.status
            );

        }


        const datos =
            await respuesta.json();


        const viento =
            Number(
                datos?.current?.wind_speed_10m
            );


        if (!Number.isFinite(viento)) {

            throw new Error(
                "Viento no disponible"
            );

        }


        datosActuales.viento =
            viento;


        elemento("viento").innerHTML =
            viento.toFixed(1)
            + " km/h";


        actualizarMonitoreo();

    }

    catch (error) {

        console.error(
            "Error viento:",
            error
        );


        elemento("viento").innerHTML =
            "No disponible";

    }

}


/* =========================================================
   MONITOREO
========================================================= */

function actualizarMonitoreo() {

    const temp =
        elemento("monitorTemp");

    const oleaje =
        elemento("monitorOleaje");

    const viento =
        elemento("monitorViento");


    if (temp) {

        temp.innerHTML =
            Number.isFinite(
                datosActuales.temperatura
            )

            ? datosActuales.temperatura.toFixed(2)
              + " °C"

            : "No disponible";

    }


    if (oleaje) {

        oleaje.innerHTML =
            Number.isFinite(
                datosActuales.oleaje
            )

            ? datosActuales.oleaje.toFixed(2)
              + " m"

            : "No disponible";

    }


    if (viento) {

        viento.innerHTML =
            Number.isFinite(
                datosActuales.viento
            )

            ? datosActuales.viento.toFixed(1)
              + " km/h"

            : "No disponible";

    }

}


/* =========================================================
   DATOS CLIMÁTICOS
========================================================= */


/*
 * Estos valores son utilizados como representación
 * educativa para la visualización del sitio.
 */

const nivelMarSSP245 = {

    2020: 0,
    2025: 3,
    2030: 6,
    2035: 9,
    2040: 12,
    2045: 16,
    2050: 20,
    2055: 24,
    2060: 28,
    2065: 32,
    2070: 36,
    2075: 40,
    2080: 44,
    2085: 48,
    2090: 52,
    2095: 57,
    2100: 62

};


const nivelMarSSP585 = {

    2020: 0,
    2025: 4,
    2030: 8,
    2035: 12,
    2040: 17,
    2045: 22,
    2050: 28,
    2055: 34,
    2060: 40,
    2065: 46,
    2070: 52,
    2075: 58,
    2080: 64,
    2085: 70,
    2090: 76,
    2095: 82,
    2100: 88

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
    2040: 23.8,
    2050: 24.2,
    2060: 24.6,
    2070: 25.0,
    2080: 25.2,
    2090: 25.4,
    2100: 25.6

};


/* =========================================================
   INTERPOLACIÓN
========================================================= */

function interpolar(
    objeto,
    año
) {

    const años =
        Object.keys(objeto)
            .map(Number)
            .sort(
                (a, b) => a - b
            );


    if (
        objeto[año] !== undefined
    ) {

        return Number(
            objeto[año]
        );

    }


    if (
        año <= años[0]
    ) {

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
                años[
                    años.length - 1
                ]
            ]
        );

    }


    for (
        let i = 0;
        i < años.length - 1;
        i++
    ) {

        const a1 =
            años[i];

        const a2 =
            años[i + 1];


        if (
            año >= a1 &&
            año <= a2
        ) {

            const v1 =
                Number(
                    objeto[a1]
                );

            const v2 =
                Number(
                    objeto[a2]
                );


            const porcentaje =
                (
                    año - a1
                ) /
                (
                    a2 - a1
                );


            return (
                v1 +
                (
                    v2 - v1
                ) *
                porcentaje
            );

        }

    }


    return null;

}


/* =========================================================
   CREAR GRÁFICO
========================================================= */

function crearGrafico() {

    const canvas =
        elemento("grafico");


    if (!canvas) {

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

                    labels: [],

                    datasets: [

                        {

                            label: "",

                            data: [],

                            borderWidth: 3,

                            borderColor:
                                "#1565c0",

                            backgroundColor:
                                "rgba(21,101,192,.12)",

                            pointRadius: 0,

                            pointHoverRadius: 6,

                            tension: .25,

                            fill: true,

                            spanGaps: true

                        },


                        {

                            label:
                                "Año seleccionado",

                            data: [],

                            borderWidth: 0,

                            backgroundColor:
                                "#e53935",

                            borderColor:
                                "#e53935",

                            pointBackgroundColor:
                                "#e53935",

                            pointBorderColor:
                                "#ffffff",

                            pointBorderWidth: 2,

                            pointRadius: 7,

                            pointHoverRadius: 9,

                            showLine: false,

                            fill: false

                        }

                    ]

                },


                options: {

                    responsive: true,

                    maintainAspectRatio: false,

                    animation: false,

                    resizeDelay: 50,


                    interaction: {

                        mode: "nearest",

                        intersect: false

                    },


                    plugins: {

                        legend: {

                            display: true

                        },

                        tooltip: {

                            callbacks: {

                                title: function(
                                    elementos
                                ) {

                                    if (
                                        !elementos.length
                                    ) {

                                        return "";

                                    }

                                    return "Año: " +
                                        elementos[0]
                                            .label;

                                }

                            }

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

                                maxTicksLimit: 8

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

}


/* =========================================================
   ACTUALIZAR GRÁFICO
========================================================= */

function actualizarGrafico() {

    if (!grafico) {

        return;

    }


    const select =
        elemento(
            "variableSelect"
        );


    const slider =
        elemento(
            "yearSlider"
        );


    if (
        !select ||
        !slider
    ) {

        return;

    }


    const variable =
        select.value;


    const año =
        parseInt(
            slider.value
        );


    elemento(
        "selectedYear"
    ).innerHTML =
        "Año: " + año;


    let labels = [];

    let valores = [];

    let valorActual = null;

    let unidad = "";

    let nombre = "";

    let descripcion = "";


    /* =====================================================
       NIVEL DEL MAR
    ===================================================== */

    if (
        variable === "mar"
    ) {

        nombre =
            "Nivel del mar — SSP2-4.5";

        unidad =
            "cm";


        for (
            let y = 2020;
            y <= 2100;
            y++
        ) {

            labels.push(y);

            valores.push(
                interpolar(
                    nivelMarSSP245,
                    y
                )
            );

        }


        valorActual =
            interpolar(
                nivelMarSSP245,
                año
            );


        descripcion =
            "Proyección educativa del aumento relativo " +
            "del nivel del mar. Los valores permiten " +
            "visualizar escenarios climáticos y no " +
            "representan una predicción exacta para " +
            "un punto específico de Rapa Nui.";

    }


    /* =====================================================
       TEMPERATURA
    ===================================================== */

    else if (
        variable === "temperatura"
    ) {

        nombre =
            "Temperatura del océano";

        unidad =
            "°C";


        for (
            let y = 2000;
            y <= 2100;
            y++
        ) {

            labels.push(y);

            valores.push(
                interpolar(
                    temperaturaReferencia,
                    y
                )
            );

        }


        valorActual =
            interpolar(
                temperaturaReferencia,
                año
            );


        descripcion =
            "Serie de referencia utilizada para " +
            "visualización educativa. No debe interpretarse " +
            "como una medición anual oficial local.";

    }


    /* =====================================================
       CO2
    ===================================================== */

    else if (
        variable === "co2"
    ) {

        nombre =
            "CO₂ atmosférico — NOAA";

        unidad =
            "ppm";


        for (
            let y = 2000;
            y <= 2100;
            y++
        ) {

            labels.push(y);


            if (
                y <= 2025
            ) {

                valores.push(
                    interpolar(
                        co2NOAA,
                        y
                    )
                );

            }

            else {

                valores.push(
                    interpolar(
                        co2Proyeccion,
                        y
                    )
                );

            }

        }


        if (
            año <= 2025
        ) {

            valorActual =
                interpolar(
                    co2NOAA,
                    año
                );

        }

        else {

            valorActual =
                interpolar(
                    co2Proyeccion,
                    año
                );

        }


        descripcion =
            "Los valores históricos corresponden a " +
            "mediciones atmosféricas de NOAA en Mauna Loa. " +
            "Los valores posteriores se utilizan como " +
            "proyección educativa para visualizar una " +
            "posible evolución.";

    }


    /* =====================================================
       PUNTO SELECCIONADO
    ===================================================== */

    const puntoSeleccionado =
        new Array(
            labels.length
        ).fill(null);


    const indice =
        labels.indexOf(año);


    if (
        indice >= 0 &&
        valores[indice] !== null &&
        valores[indice] !== undefined
    ) {

        puntoSeleccionado[indice] =
            valores[indice];

    }


    /* =====================================================
       ACTUALIZAR CHART
    ===================================================== */

    grafico.data.labels =
        labels;


    grafico.data.datasets[0].data =
        valores;


    grafico.data.datasets[0].label =
        nombre;


    grafico.data.datasets[1].data =
        puntoSeleccionado;


    grafico.data.datasets[1].label =
        "Año " + año;


    grafico.options.scales.y.title.text =
        unidad;


    grafico.update("none");


    /* =====================================================
       TEXTO
    ===================================================== */

    const valorTexto =
        valorActual !== null &&
        valorActual !== undefined &&
        Number.isFinite(
            valorActual
        )

            ? valorActual.toFixed(1)

            : "No disponible";


    elemento(
        "valorSeleccionado"
    ).innerHTML =

        "<div>" +
        nombre +
        "</div>" +

        "<div class='valorGrande'>" +
        valorTexto +
        " " +
        unidad +
        "</div>" +

        "<div>" +
        "Año seleccionado: " +
        año +
        "</div>";


    elemento(
        "descripcionDatos"
    ).innerHTML =
        descripcion;

}


/* =========================================================
   THREE.JS
========================================================= */

function iniciarThree() {

    if (
        threeInicializado
    ) {

        ajustarThree();

        return;

    }


    const contenedor =
        elemento(
            "escena3D"
        );


    if (
        !contenedor ||
        typeof THREE === "undefined"
    ) {

        console.error(
            "Three.js no está disponible."
        );

        return;

    }


    escena =
        new THREE.Scene();


    escena.background =
        new THREE.Color(
            0x87ceeb
        );


    camara =
        new THREE.PerspectiveCamera(
            55,
            1,
            .1,
            1000
        );


    renderer =
        new THREE.WebGLRenderer({

            antialias: true,

            powerPreference:
                "high-performance"

        });


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio || 1,
            2
        )
    );


    renderer.setSize(
        contenedor.clientWidth || 600,
        contenedor.clientHeight || 500,
        false
    );


    contenedor.innerHTML = "";

    contenedor.appendChild(
        renderer.domElement
    );


    /* =====================================================
       LUCES
    ===================================================== */

    const luz =
        new THREE.DirectionalLight(
            0xffffff,
            1
        );


    luz.position.set(
        5,
        10,
        5
    );


    escena.add(luz);


    escena.add(
        new THREE.AmbientLight(
            0xffffff,
            .65
        )
    );


    /* =====================================================
       MAR
    ===================================================== */

    mar3D =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                20,
                1,
                20
            ),

            new THREE.MeshPhongMaterial({

                color:
                    0x1687d9,

                transparent:
                    true,

                opacity:
                    .72

            })

        );


    mar3D.position.y =
        0;


    escena.add(
        mar3D
    );


    /* =====================================================
       PLAYA
    ===================================================== */

    playa3D =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                5.2,
                5.2,
                .3,
                32
            ),

            new THREE.MeshPhongMaterial({

                color:
                    0xf4d28c

            })

        );


    playa3D.position.y =
        .3;


    escena.add(
        playa3D
    );


    /* =====================================================
       ISLA
    ===================================================== */

    isla3D =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                2,
                5,
                4,
                32
            ),

            new THREE.MeshPhongMaterial({

                color:
                    0x3d8b37

            })

        );


    isla3D.position.y =
        1.5;


    escena.add(
        isla3D
    );


    /* =====================================================
       MOAI SIMPLE
    ===================================================== */

    const moaiMaterial =
        new THREE.MeshPhongMaterial({

            color:
                0x777777

        });


    const moaiCabeza =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                .6,
                1.1,
                .5
            ),

            moaiMaterial

        );


    moaiCabeza.position.set(
        0,
        3.8,
        0
    );


    escena.add(
        moaiCabeza
    );


    const moaiCuerpo =
        new THREE.Mesh(

            new THREE.CylinderGeometry(
                .25,
                .4,
                1.4,
                12
            ),

            moaiMaterial

        );


    moaiCuerpo.position.set(
        0,
        2.8,
        0
    );


    escena.add(
        moaiCuerpo
    );


    /* =====================================================
       CÁMARA
    ===================================================== */

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


    threeInicializado =
        true;


    ajustarThree();


    animarThree();

}


/* =========================================================
   AJUSTAR THREE
========================================================= */

function ajustarThree() {

    if (
        !renderer ||
        !camara
    ) {

        return;

    }


    const contenedor =
        elemento(
            "escena3D"
        );


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
        alto,
        false
    );


    camara.aspect =
        ancho / alto;


    camara.updateProjectionMatrix();

}


/* =========================================================
   ANIMACIÓN THREE
========================================================= */

function animarThree() {

    requestAnimationFrame(
        animarThree
    );


    if (
        isla3D
    ) {

        isla3D.rotation.y +=
            .002;

    }


    if (
        playa3D
    ) {

        playa3D.rotation.y +=
            .0005;

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


/* =========================================================
   SIMULADOR 3D
========================================================= */

function actualizarSimulador() {

    const slider =
        elemento(
            "simuladorSlider"
        );


    const escenario =
        elemento(
            "escenarioMar"
        );


    if (
        !slider ||
        !escenario
    ) {

        return;

    }


    const año =
        parseInt(
            slider.value
        );


    let aumento;


    if (
        escenario.value ===
        "SSP2-4.5"
    ) {

        aumento =
            interpolar(
                nivelMarSSP245,
                año
            );

    }

    else {

        aumento =
            interpolar(
                nivelMarSSP585,
                año
            );

    }


    if (
        aumento === null
    ) {

        return;

    }


    elemento(
        "simuladorAnio"
    ).innerHTML =
        "Año: " + año;


    elemento(
        "simuladorNivel"
    ).innerHTML =
        "Aumento estimado: " +
        aumento.toFixed(1) +
        " cm";


    /*
     * El desplazamiento visual está exagerado
     * intencionalmente para que pueda observarse
     * claramente en el modelo 3D.
     */

    const alturaVisual =
        (aumento / 100) * 3;


    if (mar3D) {

        mar3D.position.y =
            alturaVisual;

    }


    const riesgo =
        elemento(
            "riesgoCosta"
        );


    if (
        aumento < 20
    ) {

        riesgo.innerHTML =
            "🟢 Riesgo costero: Bajo";

    }

    else if (
        aumento < 50
    ) {

        riesgo.innerHTML =
            "🟡 Riesgo costero: Moderado";

    }

    else if (
        aumento < 80
    ) {

        riesgo.innerHTML =
            "🟠 Riesgo costero: Alto";

    }

    else {

        riesgo.innerHTML =
            "🔴 Riesgo costero: Muy alto";

    }

}


/* =========================================================
   ABRIR SIMULADOR
========================================================= */

function abrirSimulador() {

    const pagina =
        elemento(
            "simuladorPage"
        );


    if (!pagina) {

        return;

    }


    pagina.style.display =
        "block";


    iniciarThree();


    setTimeout(() => {

        ajustarThree();

        actualizarSimulador();


        pagina.scrollIntoView({

            behavior:
                "smooth",

            block:
                "start"

        });

    }, 150);

}


/* =========================================================
   CERRAR SIMULADOR
========================================================= */

function cerrarSimulador() {

    const pagina =
        elemento(
            "simuladorPage"
        );


    if (!pagina) {

        return;

    }


    pagina.style.display =
        "none";

}


/* =========================================================
   IMPACTO
========================================================= */

function actualizarImpacto() {

    const slider =
        elemento(
            "impactoSlider"
        );


    if (!slider) {

        return;

    }


    const año =
        parseInt(
            slider.value
        );


    elemento(
        "impactoAnio"
    ).innerHTML =
        "Año: " + año;


    const progreso =
        (año - 2000) / 100;


    const nivel =
        elemento(
            "impactoNivel"
        );


    const descripcion =
        elemento(
            "impactoDescripcion"
        );


    if (
        progreso < .25
    ) {

        nivel.innerHTML =
            "🟢 Impacto: Bajo";


        descripcion.innerHTML =
            "La exposición proyectada " +
            "es relativamente baja.";

    }

    else if (
        progreso < .50
    ) {

        nivel.innerHTML =
            "🟡 Impacto: Moderado";


        descripcion.innerHTML =
            "Aumentan progresivamente los " +
            "posibles efectos sobre infraestructura " +
            "y recursos.";

    }

    else if (
        progreso < .75
    ) {

        nivel.innerHTML =
            "🟠 Impacto: Alto";


        descripcion.innerHTML =
            "La exposición a riesgos climáticos " +
            "puede aumentar.";

    }

    else {

        nivel.innerHTML =
            "🔴 Impacto: Muy alto";


        descripcion.innerHTML =
            "Se requiere una mayor planificación " +
            "y adaptación frente a los riesgos " +
            "climáticos.";

    }

}


/* =========================================================
   IR A DATOS
========================================================= */

function irDatos() {

    mostrar("mar");


    setTimeout(() => {

        const elementoDestino =
            document.getElementById(
                "variableSelect"
            );


        if (elementoDestino) {

            elementoDestino.scrollIntoView({

                behavior:
                    "smooth",

                block:
                    "center"

            });

        }

    }, 200);

}


/* =========================================================
   EVENTOS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        /* ================================================
           GRÁFICO
        ================================================ */

        crearGrafico();


        const variableSelect =
            elemento(
                "variableSelect"
            );


        const yearSlider =
            elemento(
                "yearSlider"
            );


        if (variableSelect) {

            variableSelect.addEventListener(
                "change",
                actualizarGrafico
            );

        }


        if (yearSlider) {

            yearSlider.addEventListener(
                "input",
                actualizarGrafico
            );

        }


        actualizarGrafico();


        /* ================================================
           SIMULADOR
        ================================================ */

        const abrir =
            elemento(
                "abrirSimulador"
            );


        const cerrar =
            elemento(
                "cerrarSimulador"
            );


        const slider3D =
            elemento(
                "simuladorSlider"
            );


        const escenario =
            elemento(
                "escenarioMar"
            );


        if (abrir) {

            abrir.addEventListener(
                "click",
                abrirSimulador
            );

        }


        if (cerrar) {

            cerrar.addEventListener(
                "click",
                cerrarSimulador
            );

        }


        if (slider3D) {

            slider3D.addEventListener(
                "input",
                actualizarSimulador
            );

        }


        if (escenario) {

            escenario.addEventListener(
                "change",
                actualizarSimulador
            );

        }


        /* ================================================
           IMPACTO
        ================================================ */

        const impactoSlider =
            elemento(
                "impactoSlider"
            );


        if (impactoSlider) {

            impactoSlider.addEventListener(
                "input",
                actualizarImpacto
            );

        }


        actualizarImpacto();


        /* ================================================
           ACTUALIZAR DATOS
        ================================================ */

        const actualizar =
            elemento(
                "actualizarDatosBtn"
            );


        if (actualizar) {

            actualizar.addEventListener(
                "click",
                async function() {

                    actualizar.disabled =
                        true;

                    actualizar.innerHTML =
                        "🔄 Actualizando...";


                    await Promise.allSettled([

                        cargarCondiciones(),

                        cargarViento()

                    ]);


                    actualizar.disabled =
                        false;

                    actualizar.innerHTML =
                        "🔄 Actualizar";

                }
            );

        }


        /* ================================================
           IR A DATOS
        ================================================ */

        const irDatosBoton =
            elemento(
                "irDatosBtn"
            );


        if (irDatosBoton) {

            irDatosBoton.addEventListener(
                "click",
                irDatos
            );

        }


        /* ================================================
           CARGAR DATOS
        ================================================ */

        cargarCondiciones();

        cargarViento();


        /* ================================================
           PANEL INICIAL
        ================================================ */

        mostrar("mar");

    }
);


/* =========================================================
   REDIMENSIONAR
========================================================= */

window.addEventListener(
    "resize",
    function() {

        ajustarThree();


        if (grafico) {

            setTimeout(
                () => {

                    grafico.resize();

                    grafico.update("none");

                },
                100
            );

        }

    }
);


/* =========================================================
   ORIENTACIÓN DEL CELULAR
========================================================= */

window.addEventListener(
    "orientationchange",
    function() {

        setTimeout(
            () => {

                ajustarThree();


                if (grafico) {

                    grafico.resize();

                    grafico.update("none");

                }

            },
            400
        );

    }
);


/* =========================================================
   CARGA INICIAL
========================================================= */

window.addEventListener(
    "load",
    function() {

        setTimeout(
            () => {

                ajustarThree();


                if (grafico) {

                    grafico.resize();

                    grafico.update("none");

                }

            },
            500
        );

    }
);