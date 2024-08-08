function mostrarTabla() {
    const selector = document.getElementById('tabla-selector');
    const tablas = document.querySelectorAll('.tabla');
    tablas.forEach(tabla => {
      tabla.style.display = 'none';
    });
  
    const tablaSeleccionada = selector.value;
    if (tablaSeleccionada) {
      document.getElementById(tablaSeleccionada).style.display = 'block';
    }
  }
  
  function copiarPortapapeles(tablaId) {
    let datos = [];
    let titulo = '';
  
    switch (tablaId) {
      case 'tabla1':
        titulo = 'Agilizar recomendar';
        datos = [
          `Login: ${document.getElementById('login').value}`,
          `Número de incidente: ${document.getElementById('incidente').value}`,
          `Teléfonos (fijo-celular): ${document.getElementById('telefonos').value}`,
          `Tipo de solicitud: ${document.getElementById('solicitud').value}`,
          `Ciudad: ${document.getElementById('ciudad').value}`,
          `Id de llamada: ${document.getElementById('llamada').value}`,
          `Disponibilidad: ${document.getElementById('disponibilidad').value}`,
          `Motivo: ${document.getElementById('motivo').value}`
        ];
        break;
      case 'tabla2':
        titulo = 'Activar decos / paquetes';
        datos = [
          `Login: ${document.getElementById('login2').value}`,
          `Prueba Integrada: ${document.getElementById('prueba').value}`,
          `Pedido: ${document.getElementById('pedido').value}`,
          `ID TV: ${document.getElementById('idTv').value}`,
          `ID Llamada: ${document.getElementById('idLlamada2').value}`,
          `MAC's Deco(s) a activar: ${document.getElementById('macs').value}`,
          `ID Inconsistencias: ${document.getElementById('inconsistencias').value}`,
          `ID Chat: ${document.getElementById('idChat').value}`
        ];
        break;
      case 'tabla3':
        titulo = 'Perfil LDAP';
        datos = [
          `Login: ${document.getElementById('login3').value}`,
          `Prueba Integrada: ${document.getElementById('prueba3').value}`,
          `Pedido (velocidad del BA): ${document.getElementById('pedido3').value}`,
          `ID BA: ${document.getElementById('idBa').value}`,
          `ID Llamada: ${document.getElementById('idLlamada3').value}`,
          `MAC: ${document.getElementById('mac3').value}`,
          `Observación: ${document.getElementById('observacion3').value}`
        ];
        break;
      case 'tabla4':
        titulo = 'Portal Cautivo';
        datos = [
          `Login: ${document.getElementById('login4').value}`,
          `Prueba Integrada: ${document.getElementById('prueba4').value}`,
          `MAC Registrada en CRM: ${document.getElementById('macCrm').value}`,
          `MAC Reportada en el Portal: ${document.getElementById('macPortal').value}`,
          `ID Servicio: ${document.getElementById('idServicio').value}`,
          `CC Cliente: ${document.getElementById('ccCliente').value}`,
          `ID Llamada: ${document.getElementById('idLlamada4').value}`,
          `Dirección de servicio: ${document.getElementById('direccion').value}`,
          `Plan de Facturación: ${document.getElementById('planFacturacion').value}`,
          `Pedido de Instalación: ${document.getElementById('pedidoInstalacion').value}`,
          `Fecha de Agenda Instalación: ${document.getElementById('fechaAgenda').value}`,
          `Notas Adicionales: ${document.getElementById('notasAdicionales').value}`
        ];
        break;
      case 'tabla5':
        titulo = 'Habilitar Cupos';
        datos = [
          `Login: ${document.getElementById('login5').value}`,
          `Número de incidente: ${document.getElementById('incidente5').value}`,
          `Teléfonos: ${document.getElementById('telefonos5').value}`,
          `Tipo de solicitud: ${document.getElementById('solicitud5').value}`,
          `Ciudad: ${document.getElementById('ciudad5').value}`,
          `Id de llamada: ${document.getElementById('llamada5').value}`,
          `Disponibilidad: ${document.getElementById('disponibilidad5').value}`,
          `Motivo: ${document.getElementById('motivo5').value}`
        ];
        break;
      case 'tabla6':
        titulo = 'Habilitar Mitigo';
        datos = [
          `Login: ${document.getElementById('login6').value}`,
          `Nombre: ${document.getElementById('nombre').value}`,
          `Documento de identidad: ${document.getElementById('documento').value}`,
          `Contrato hogar: ${document.getElementById('contrato').value}`,
          `Celular: ${document.getElementById('celular').value}`,
          `Correo electrónico: ${document.getElementById('correo').value}`,
          `Falla: ${document.getElementById('falla').value}`,
          `Id de llamada: ${document.getElementById('idLlamada6').value}`,
          `Id: ${document.getElementById('id6').value}`
        ];
        break;
      case 'tabla7':
        titulo = 'Pedido en Vuelo';
        datos = [
          `Nombre Cliente: ${document.getElementById('nombreCliente').value}`,
          `Celular de contacto: ${document.getElementById('celularContacto').value}`,
          `Dirección: ${document.getElementById('direccionVuelo').value}`,
          `Motivo de contacto: ${document.getElementById('motivoContacto').value}`,
          `Id de llamada: ${document.getElementById('idLlamadaVuelo').value}`,
          `Cantidad de equipos: ${document.getElementById('cantidadEquipos').value}`,
          `Tigo de excepción: ${document.getElementById('tigoExcepcion').value}`
        ];
        break;
      case 'tabla8':
        titulo = 'Datos';
        datos = [
          `Activo: ${document.getElementById('activo').value}`,
          `Nodo: ${document.getElementById('nodo').value}`,
          `Cmts: ${document.getElementById('cmts').value}`,
          `Ciudad: ${document.getElementById('ciudadEnviar').value}`,
          `Naturaleza: ${document.getElementById('naturaleza').value}`
        ];
        break;
    }
  
    const texto = [titulo, ...datos].join('\n');
    navigator.clipboard.writeText(texto).then(() => {
      alert('Datos copiados al portapapeles');
    }).catch(err => {
      alert('Error al copiar los datos: ', err);
    });
  }
  
  function reiniciarTabla(tablaId) {
    const inputs = document.querySelectorAll(`#${tablaId} input`);
    inputs.forEach(input => {
      if (input.id.startsWith('login')) {
        input.value = 'nherngom';
      } else {
        input.value = '';
      }
    });
  }
  