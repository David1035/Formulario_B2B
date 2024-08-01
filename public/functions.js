// Variable global para almacenar el texto a copiar

let horaInicial = 0;
let fechaActual = '';

// Función para agregar eventos por teclado
function addEventListeners(element, callback, keys = ['Enter', 'Tab']) {
    if (element) {
        element.addEventListener('click', callback);
        element.addEventListener('keydown', event => {
            if (keys.includes(event.key)) {
                event.preventDefault(); // previene comportamiento por defecto
                callback();
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const textarea = document.querySelector('.input-observaciones');
    const buttonContador = document.getElementById('inicia-contador');
    const copiar = document.getElementById('copiar')
    const reiniciar = document.getElementById('reiniciar')
    const horarioB2B = document.getElementById('horario_b2b');
    //const b2bDetails = document.getElementById('b2b-details');

    textarea.addEventListener('input', function() {
        this.style.height = 'auto'; // Reset the height
        this.style.height = this.scrollHeight + 'px'; // Set the height based on the content
    });
    addEventListeners(buttonContador, iniciarContador);
    addEventListeners(copiar, insertarTexto)
    addEventListeners(reiniciar, reiniciarFormulario, ['Enter']);
    horarioB2B.addEventListener('change', toggleB2BDetails);
    
});

function iniciarContador() {
    horaInicial = new Date() //.toLocaleTimeString('en-GB', { hour12: false });
    fechaActual = new Date() // Obtener la fecha actual
    const idLlamada = document.getElementById('id-llamada');
    idLlamada.focus();

     // Bloquear el botón después de iniciar el contador
     const buttonContador = document.getElementById('inicia-contador');
     buttonContador.disabled = true;
}



async function insertarTexto(){
    const idLlamadaValue = document.getElementById('id-llamada')?.value;
    const nombreClient = document.getElementById('nombre-client')?.value;
    const documentValue = document.getElementById('document')?.value;
    const smnet = document.getElementById('smnet')?.value;
    const tipiWeb = document.getElementById('tipiWeb')?.value;
    const observaciones = document.getElementById('observaciones')?.value;
    const tecnologia = document.getElementById('tecnologia')?.value;
    const tiposervicio = document.getElementById('tiposervicio')?.value;
    const naturaleza = document.getElementById('naturaleza')?.value;
    const celular = document.getElementById('celular')?.value;
    const horarioB2B = document.getElementById('horario_b2b');
    
    let textob2b = '';
    if (horarioB2B.value === 'SI') {
        
        const nombreAtiende = document.getElementById('nombre_atiende')?.value;
        const celularAtiende = document.getElementById('celular_atiende')?.value;
        const diasAtiende = document.getElementById('dias_atiende')?.value;
        const horarioAtiende = document.getElementById('horario_atiende')?.value;

        textob2b = `Nombre de quién atiende: ${nombreAtiende}, celular de quién atiende: ${celularAtiende}, días en los que atiende: ${diasAtiende}, horario en qué atiende: ${horarioAtiende}.`
    }

    const totalTexto = `hora ${horaInicial}, fecha ${fechaActual} ${idLlamadaValue}, y el cliente es ${nombreClient}, ${documentValue}, ${smnet}, ${tipiWeb}, ${observaciones}, ${tecnologia}, ${tiposervicio}, ${naturaleza}, ${celular}, aplica horario b2b: ${horarioB2B.value}. ${textob2b}`


    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `La hora inicial fue ${new Date(horaInicial).toLocaleTimeString('en-GB', { hour12: false })}, ${totalTexto}`;


    try {
        await navigator.clipboard.writeText(totalTexto);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }

    reiniciar.focus()

}


function reiniciarFormulario (){
    
    // Limpiar todos los campos del formulario
    document.getElementById('id-llamada').value = '';
    document.getElementById('nombre-client').value = '';
    document.getElementById('document').value = '';
    document.getElementById('smnet').value = '';
    document.getElementById('tipiWeb').value = 'NO';
    document.getElementById('observaciones').value = '';
    document.getElementById('tecnologia').value = '';
    document.getElementById('tiposervicio').value = '';
    document.getElementById('naturaleza').value = '';
    document.getElementById('celular').value = '';
    document.getElementById('horario_b2b').value = 'NO'

    toggleB2BDetails();

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = ''

    

    horaFinal = new Date() //.toLocaleTimeString('en-GB', { hour12: false });

    // Enviar datos al servidor
    fetch('/save-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            horaInicial: new Date(horaInicial).toISOString(), // Convertir a formato ISO
            horaFinal: new Date(horaFinal).toISOString(), // Convertir a formato ISO
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
        }),
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    

    // Bloquear el botón después de iniciar el contador
    const buttonContador = document.getElementById('inicia-contador')
    if (buttonContador) {
        buttonContador.disabled = false;
        buttonContador.focus();
    }

    
}


function toggleB2BDetails() {
    const horarioB2B = document.getElementById('horario_b2b');
    const b2bDetails = document.getElementById('b2b-details');

    if (b2bDetails) {
        b2bDetails.style.display = (horarioB2B && horarioB2B.value === 'SI') ? 'flex' : 'none';
    }
}


// Llama a la función para obtener y mostrar el tiempo total cuando se cargue la página