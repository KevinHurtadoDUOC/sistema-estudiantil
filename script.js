function agregarEstudiante() {
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const notaInputs = [
        document.getElementById('nota1'),
        document.getElementById('nota2'),
        document.getElementById('nota3')
    ];
    const asistenciaInput = document.getElementById('asistencia');
    const tablaEstudiantes = document.getElementById('tablaEstudiantes');
    const formEstudiante = document.getElementById('formEstudiante');

    const nombre = nombreInput.value.trim();
    const apellido = apellidoInput.value.trim();

    if (!nombre || !apellido) {
        alert('Nombre y Apellido son campos obligatorios.');
        return;
    }

    const notasNumericas = [];

    for (let i = 0; i < notaInputs.length; i += 1) {
        const nota = notaInputs[i].value.trim();
        const notaNumerica = Number(nota);

        if (!nota || !Number.isFinite(notaNumerica) || notaNumerica < 1 || notaNumerica > 7) {
            alert('Las notas ingresadas deben ser valores numéricos válidos en el rango de 1.0 a 7.0.');
            notaInputs[i].focus();
            return;
        }

        notasNumericas.push(notaNumerica);
    }

    const asistencia = asistenciaInput.value.trim();
    const asistenciaNumerica = Number(asistencia);

    if (!asistencia || !Number.isFinite(asistenciaNumerica) || asistenciaNumerica < 0 || asistenciaNumerica > 100) {
        alert('La asistencia ingresada debe ser un valor numérico válido en el rango de 0% a 100%.');
        asistenciaInput.focus();
        return;
    }

    const promedioFinal = (
        (notasNumericas[0] * 0.3) +
        (notasNumericas[1] * 0.4) +
        (notasNumericas[2] * 0.3)
    );

    let estado = 'Reprobado';
    let estadoClase = 'reprobado';

    if (asistenciaNumerica < 60) {
        estado = 'Reprobado por inasistencia';
        estadoClase = 'inasistencia';
    } else if (asistenciaNumerica >= 60 && asistenciaNumerica < 70) {
        if (promedioFinal >= 5) {
            estado = 'Aprobado';
            estadoClase = 'aprobado';
        }
    } else if (promedioFinal >= 4) {
        estado = 'Aprobado';
        estadoClase = 'aprobado';
    }

    const promedioClase = promedioFinal < 4 ? 'promedio-bajo' : '';

    tablaEstudiantes.insertAdjacentHTML(
        'beforeend',
        `
            <tr>
                <td>${nombre}</td>
                <td>${apellido}</td>
                <td class="${promedioClase}">${promedioFinal.toFixed(1)}</td>
                <td>
                    <span class="${estadoClase}">${estado}</span>
                </td>
            </tr>
        `
    );

    formEstudiante.reset();
    nombreInput.focus();
}
