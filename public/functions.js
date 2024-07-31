// Función para agregar eventos por teclado
function addEventListeners(element, callback, keys = ['Enter', 'Tab']) {
    element.addEventListener('click', callback);
    element.addEventListener('keydown', event => {
        if (keys.includes(event.key)) {
            event.preventDefault(); // previene comportamiento por defecto
            callback();
        }
    });
}

let horaInicial = 0;
let horaFinal = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    const textarea = document.querySelector('.input-observaciones');
    const buttonContador = document.getElementById('inicia-contador');
    const copiar = document.getElementById('copiar')
    const reiniciar = document.getElementById('reiniciar')
    const horarioB2B = document.getElementById('horario_b2b');
    const b2bDetails = document.getElementById('b2b-details');

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
    horaInicial = new Date().getTime();
    const idLlamada = document.getElementById('id-llamada');
    idLlamada.focus();

     // Bloquear el botón después de iniciar el contador
     const buttonContador = document.getElementById('inicia-contador');
     buttonContador.disabled = true;
}



function insertarTexto(){
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

    const totalTexto = `${idLlamadaValue}, y el cliente es ${nombreClient}, ${documentValue}, ${smnet}, ${tipiWeb}, ${observaciones}, ${tecnologia}, ${tiposervicio}, ${naturaleza}, ${celular}`


    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `La hora inicial fue ${new Date(horaInicial).toLocaleTimeString('en-GB', { hour12: false })}, ${totalTexto}`;

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
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = ''

    const buttonContador = document.getElementById('inicia-contador');
    buttonContador.focus();

    horaFinal = new Date().getTime();
    // Bloquear el botón después de iniciar el contador
    buttonContador.disabled = false;
}

function toggleB2BDetails() {
    const horarioB2B = document.getElementById('horario_b2b');
    const b2bDetails = document.getElementById('b2b-details');
    
    if (horarioB2B.value === 'SI') {
        b2bDetails.style.display = 'flex'; // Mostrar el div
    } else {
        b2bDetails.style.display = 'none'; // Ocultar el div
    }
}