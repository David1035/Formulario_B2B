// Variable global para almacenar el texto a copiar
let horaInicial = 0;
let fechaActual = '';
let isContadorStarted = false;

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

document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.querySelector('.input-observaciones');
    const buttonContador = document.getElementById('inicia-contador');
    const copiar = document.getElementById('copiar');
    const reiniciar = document.getElementById('reiniciar');
    const horarioB2B = document.getElementById('horario_b2b');
    const horarioAtiende = document.getElementById('horario_atiende');
    
    textarea.addEventListener('input', function() {
        this.style.height = 'auto'; // Reset the height
        this.style.height = this.scrollHeight + 'px'; // Set the height based on the content
    });

    addEventListeners(buttonContador, iniciarContador);
    addEventListeners(copiar, insertarTexto);
    addEventListeners(reiniciar, reiniciarFormulario, ['Enter']);
    horarioB2B.addEventListener('change', toggleB2BDetails);
    addEventListeners(horarioAtiende, () => {
        // Enfocar el botón de copiar cuando el campo horarioAtiende pierde el enfoque
        copiar.focus();
    });
});

function iniciarContador() {
    horaInicial = new Date();
    fechaActual = new Date(); // Obtener la fecha actual
    const idLlamada = document.getElementById('id-llamada');
    idLlamada.focus();

    // Bloquear el botón después de iniciar el contador
    const buttonContador = document.getElementById('inicia-contador');
    buttonContador.disabled = true;
    isContadorStarted = true;
}

async function insertarTexto() {
    const idLlamadaValue = document.getElementById('id-llamada')?.value;
    const smnet = document.getElementById('smnet')?.value;
    const observaciones = document.getElementById('observaciones')?.value;
    const tecnologia = document.getElementById('tecnologia')?.value;
    const tiposervicio = document.getElementById('tiposervicio')?.value;
    const naturaleza = document.getElementById('naturaleza')?.value;
    const horarioB2B = document.getElementById('horario_b2b');

    let textob2b = '';
    if (horarioB2B.value === 'SI') {
        const nombreAtiende = document.getElementById('nombre_atiende')?.value;
        const celularAtiende = document.getElementById('celular_atiende')?.value;
        const diasAtiende = document.getElementById('dias_atiende')?.value;
        const horarioAtiende = document.getElementById('horario_atiende')?.value;

        textob2b = `Nombre de quién atiende: ${nombreAtiende}, celular de quién atiende: ${celularAtiende}, días en los que atiende: ${diasAtiende}, horario en qué atiende: ${horarioAtiende}.`;
    }

    const totalTexto = `Observaciones: ${observaciones}. ID de la llamada: ${idLlamadaValue}, SMNET: ${smnet}, Tecnología: ${tecnologia}, Servicio: ${tiposervicio}, Naturaleza ${naturaleza}, ¿aplica horario b2b?: ${horarioB2B.value}. ${textob2b}`;

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = totalTexto;

    try {
        await navigator.clipboard.writeText(totalTexto);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }

    reiniciar.focus();
}

async function reiniciarFormulario() {
    if(isContadorStarted){
        await enviarDatosAlServidor();
    }
    isContadorStarted = false;
    
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
    document.getElementById('horario_b2b').value = 'NO';
    document.getElementById('nombre_atiende').value = '';
    document.getElementById('celular_atiende').value = '';
    document.getElementById('dias_atiende').value = 'Lunes a Viernes';
    document.getElementById('horario_atiende').value = '';

    toggleB2BDetails();

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = '';

    horaFinal = new Date();

    // Desbloquear el botón después de iniciar el contador
    const buttonContador = document.getElementById('inicia-contador');
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

