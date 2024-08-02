async function fetchTiempoTotal() {
    try {
        const response = await fetch('/tiempoTotal');
        const data = await response.json();
        const minutosGlobal = data.minutosGlobal;
        const segundosGlobal = data.segundosGlobal;
        const minutosPromedio = data.minutosPromedio;
        const segundosPromedio = data.segundosPromedio;
        const cantidadIngresos = data.cantidadIngresos;

        document.getElementById('conteoDiario').textContent = 
            `Tiempo Total: ${minutosGlobal}.${segundosGlobal.toFixed()}, ` +
            `AHT: ${minutosPromedio}.${segundosPromedio.toFixed()}, ` +
            `Cantidad: ${cantidadIngresos}`;
    } catch (error) {
        console.error('Error al obtener el tiempo total:', error);
        document.getElementById('conteoDiario').textContent = 'Error al cargar los datos';
    }
}

// Llama a la función para obtener y mostrar el tiempo total cuando se cargue la página
fetchTiempoTotal();

async function enviarDatosAlServidor() {
    // Recopila los datos del formulario
    const data = {
        horaInicial: new Date(horaInicial).toISOString(), // Convertir a formato ISO
        horaFinal: new Date().toISOString(), // Asume que la hora final es el momento actual
        fechaActual: fechaActual,
        idLlamada: document.getElementById('id-llamada').value,
        nombreClient: document.getElementById('nombre-client').value,
        documentValue: document.getElementById('document').value,
        smnet: document.getElementById('smnet').value,
        tipiWeb: document.getElementById('tipiWeb').value,
        observaciones: document.getElementById('observaciones').value,
        tecnologia: document.getElementById('tecnologia').value,
        tiposervicio: document.getElementById('tiposervicio').value,
        naturaleza: document.getElementById('naturaleza').value,
        celular: document.getElementById('celular').value,
        horarioB2B: document.getElementById('horario_b2b').value,
        nombreAtiende: document.getElementById('nombre_atiende')?.value || '',
        celularAtiende: document.getElementById('celular_atiende')?.value || '',
        diasAtiende: document.getElementById('dias_atiende')?.value || '',
        horarioAtiende: document.getElementById('horario_atiende')?.value || ''
    };

    try {
        const response = await fetch('/save-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.text();
            console.log('Datos guardados correctamente:', result);
        } else {
            console.error('Error al guardar los datos:', response.statusText);
        }
    } catch (error) {
        console.error('Error al enviar los datos al servidor:', error);
    }
    fetchTiempoTotal();
}


const opcionesTiposervicio = {
    'HFC': ['Internet', 'Telefonía', 'TV_Digital', 'One_TV_2.0'],
    'GPON': ['Internet', 'IPTV', 'Telefonía', 'One_TV_2.0'],
    'ADSL': ['Internet', 'IPTV', 'Telefonía', 'One_TV_2.0']
};

const opcionesNaturaleza = {
    'Internet': ['No navega', 'Navegación Lenta', 'Servicio Intermitente', 'Problemas WiFi'],
    'Telefonía': ['No funciona línea telefónica', 'Servicio Intermitente', 'Mala Calidad Voz / Entrecortada', 'Ingresa llamada de otra línea', 'No salen ni entran llamadas'],
    'TV_Digital': ['Sin señal', 'Tv no visualiza algunos canales', 'Mala calidad de imagen', 'Fallas en audio / subtítulos', 'Problemas con paquetes adicionales', 'Problemas con control remoto'],
    'IPTV': ['Sin señal', 'Tv no visualiza algunos canales', 'Mala calidad de imagen', 'Fallas en audio / subtítulos', 'Problemas con paquetes adicionales', 'Problemas con control remoto'],
    'One_TV_2.0': ['Sin señal', 'DRM falló', 'Imagen congelada / TV pixelada', 'Problemas de audio', 'Error de descarga', 'Problemas en comando de voz', 'Configuración de control', 'Problemas app One TV', 'Servicio intermitente']
};

document.getElementById('tecnologia').addEventListener('change', function() {
    const tecnologia = this.value;
    const tiposervicio = document.getElementById('tiposervicio');
    const naturaleza = document.getElementById('naturaleza');

    // Limpiar opciones anteriores
    tiposervicio.innerHTML = ''; 
    naturaleza.innerHTML = ''; 

    // Actualizar tiposervicio
    if (opcionesTiposervicio[tecnologia]) {
        opcionesTiposervicio[tecnologia].forEach(function(servicio) {
            const option = document.createElement('option');
            option.value = servicio;
            option.textContent = servicio;
            tiposervicio.appendChild(option);
        });

        // Seleccionar "Internet" por defecto
        tiposervicio.value = 'Internet';

        // Actualizar naturaleza basada en "Internet"
        opcionesNaturaleza['Internet'].forEach(function(problema) {
            const option = document.createElement('option');
            option.value = problema;
            option.textContent = problema;
            naturaleza.appendChild(option);
        });

        // Seleccionar "No navega" por defecto
        naturaleza.value = 'No navega';
    } else {
        const optionServicio = document.createElement('option');
        optionServicio.value = '';
        optionServicio.textContent = 'Tipo de servicio';
        tiposervicio.appendChild(optionServicio);

        const optionNaturaleza = document.createElement('option');
        optionNaturaleza.value = '';
        optionNaturaleza.textContent = 'Naturaleza';
        naturaleza.appendChild(optionNaturaleza);
    }
});

document.getElementById('tiposervicio').addEventListener('change', function() {
    const tiposervicio = this.value;
    const naturaleza = document.getElementById('naturaleza');
    naturaleza.innerHTML = ''; // Limpiar opciones anteriores

    if (opcionesNaturaleza[tiposervicio]) {
        opcionesNaturaleza[tiposervicio].forEach(function(problema) {
            const option = document.createElement('option');
            option.value = problema;
            option.textContent = problema;
            naturaleza.appendChild(option);
        });
    } else {
        const option = document.createElement('option');
        option.value = '';
        option.textContent = 'Naturaleza';
        naturaleza.appendChild(option);
    }
});