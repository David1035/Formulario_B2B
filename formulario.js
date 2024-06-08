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
        optionServicio.textContent = 'Seleccione un tipo de servicio';
        tiposervicio.appendChild(optionServicio);

        const optionNaturaleza = document.createElement('option');
        optionNaturaleza.value = '';
        optionNaturaleza.textContent = 'Seleccione la naturaleza del problema';
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
        option.textContent = 'Seleccione la naturaleza del problema';
        naturaleza.appendChild(option);
    }
});

document.getElementById('copiar').addEventListener('click', function() {
    const idLlamada = document.getElementById('id-llamada').value;
    const smnet = document.getElementById('smnet').value;
    const observaciones = document.getElementById('observaciones').value;
    const tecnologia = document.getElementById('tecnologia').value;
    const tiposervicio = document.getElementById('tiposervicio').value;
    const naturaleza = document.getElementById('naturaleza').value;

    const texto = `ID: ${idLlamada}\nSMNET: ${smnet}\nOBSERVACIONES: ${observaciones}\nTECNOLOGIA: ${tecnologia}\nTIPOSERVICIO: ${tiposervicio}\nNATURALEZA: ${naturaleza}`;

    navigator.clipboard.writeText(texto).then(function() {
        alert('Texto copiado al portapapeles');
    }).catch(function(err) {
        console.error('Error al copiar el texto: ', err);
    });

    document.getElementById('resultado').textContent = texto;
});
