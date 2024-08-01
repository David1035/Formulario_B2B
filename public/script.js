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

// Función para enviar datos al servidor
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
}