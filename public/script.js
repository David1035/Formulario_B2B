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
