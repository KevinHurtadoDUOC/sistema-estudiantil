function agregarEstudiante() {
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const promedioInput = document.getElementById('promedio');
    const tablaEstudiantes = document.getElementById('tablaEstudiantes');
    const formEstudiante = document.getElementById('formEstudiante');

    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();
    const promedio = promedioInput.value.trim();

    if (!nombre || !apellido) {
        alert('Nombre y Apellido son campos obligatorios.');
        return;
    }

    const promedioNumerico = Number(promedio);

    if (!Number.isFinite(promedioNumerico) || promedioNumerico < 1 || promedioNumerico > 7) {
        alert('El promedio final debe ser un valor numérico válido en el rango de 1.0 a 7.0.');
        promedioInput.focus();
        return;
    }

    const estado = promedioNumerico >= 4 ? 'Aprobado' : 'Reprobado';
    const estadoClase = promedioNumerico >= 4 ? 'aprobado' : 'reprobado';
    const promedioClase = promedioNumerico < 4 ? 'promedio-bajo' : '';

    tablaEstudiantes.insertAdjacentHTML(
        'beforeend',
        `
            <tr>
                <td>${nombre}</td>
                <td>${apellido}</td>
                <td class="${promedioClase}">${promedioNumerico.toFixed(1)}</td>
                <td>
                    <span class="${estadoClase}">${estado}</span>
                </td>
            </tr>
        `
    );

    formEstudiante.reset();
    nombreInput.focus();
}
