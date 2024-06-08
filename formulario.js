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

document.getElementById('horario_b2b').addEventListener('change', function() {
    const b2bDetails = document.getElementById('b2b-details');
    if (this.value === 'SI') {
        b2bDetails.classList.remove('input__group--items-llamada__oculto');
    } else {
        b2bDetails.classList.add('input__group--items-llamada__oculto');
    }
});

document.getElementById('copiar').addEventListener('click', function() {
    const idLlamada = document.getElementById('id-llamada').value;
    const smnet = document.getElementById('smnet').value;
    const observaciones = document.getElementById('observaciones').value;
    const tecnologia = document.getElementById('tecnologia').value;
    const tiposervicio = document.getElementById('tiposervicio').value;
    const naturaleza = document.getElementById('naturaleza').value;
    const horarioB2B = document.getElementById('horario_b2b').value;
    const documento = document.getElementById('document').value;

    let b2bDetails = '';
    if (horarioB2B === 'SI') {
        const nombreAti = document.getElementById('nombre_atiende').value;
        const celularAti = document.getElementById('celular_atiende').value;
        const diasAti = document.getElementById('dias_atiende').value;
        b2bDetails = `\nNombre de quien atiende: ${nombreAti}\nCelular de quien atiende: ${celularAti}\nDías en los que atiende: ${diasAti}`;
    }

    const texto = `Observaciones: Se ha puesto en contacto para informar que: ${observaciones}\nID de la llamada: ${idLlamada}\nSMNET: ${smnet}\nTecnología: ${tecnologia}\nServicio: ${tiposervicio}\nNaturaleza: ${naturaleza}\n¿Aplica horario B2B?: ${horarioB2B}${b2bDetails}`;

    // Guardar en localStorage
    localStorage.setItem(documento, texto);

    navigator.clipboard.writeText(texto).then(function() {

    }).catch(function(err) {
        console.error('Error al copiar el texto: ', err);
    });

    document.getElementById('resultado').textContent = texto;
});

// Función para consultar información por número de documento
function consultarPorDocumento(documento) {
    const informacion = localStorage.getItem(documento);
    if (informacion) {
        console.log(`Información para el documento ${documento}: ${informacion}`);
    } else {
        console.log(`No se encontró información para el documento ${documento}`);
    }
}

// Función para reiniciar el formulario y limpiar localStorage
function reiniciarFormulario() {
    document.querySelectorAll('.item-input').forEach(input => input.value = '');
    document.getElementById('tecnologia').selectedIndex = 0;
    document.getElementById('tipiWeb').selectedIndex = 0;
    document.getElementById('tiposervicio').innerHTML = '<option value="">Tipo Servicio</option>';
    document.getElementById('naturaleza').innerHTML = '<option value="">Naturaleza</option>';
    document.getElementById('horario_b2b').selectedIndex = 0;
    document.getElementById('b2b-details').classList.add('input__group--items-llamada__oculto');
    document.getElementById('resultado').textContent = '';
    localStorage.clear();

    // Enfocar en el campo id-llamada
    document.getElementById('id-llamada').focus(); 
}

// Agregar el event listener al botón de reinicio
document.getElementById('reiniciar').addEventListener('click', reiniciarFormulario);

document.getElementById('id-llamada').focus();

