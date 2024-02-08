const tablaDatos = document.getElementById('tabla-metalico-total-datos');
const tablaTotales = document.getElementById('tabla-metalico-total-totales');

// Tabla datos
// Cada vez que el usuario cambia el valor de un input, se actualiza la columna 'total'
tablaDatos.addEventListener('input', (e) => {
    const input = e.target;
    // la fila es el tr más cercano al input
    const fila = input.closest('tr');
    const inputs = fila.querySelectorAll('input');
    const currentRow = fila.rowIndex;
    const total = fila.querySelector('.caja' + currentRow);
    let suma = 0;
    inputs.forEach((input) => {
        // suma si el valor es un número y no está vacío
        if (!isNaN(input.value) && input.value !== '') {
            suma += parseFloat(input.value);
        }
    });
    suma = suma.toFixed(2);
    total.innerHTML = suma + '&euro;';
    actualizarTotales();
});

// Actualiza los totales de la tabla
function actualizarTotales() {
    // Select the tbody element
    var tbody = document.querySelector('tbody');

    // Select all input fields with class 'form-control' within the tbody
    var inputs = tbody.querySelectorAll('input.form-control');

    // Create an empty object to store the columns organized by type
    var columnsByType = {
        billetes: [],
        monedas: [],
        retirada: [],
        total: []
    };

    // Iterate over each input field
    inputs.forEach(function (input) {
        // Get the ID of the input field
        var id = input.id;

        // Extract the type of the column from the ID
        var type = id.split('-')[1]; // Split the ID by '-' and get the third part

        // Ensure the array exists before pushing elements into it
        if (!columnsByType[type]) {
            columnsByType[type] = [];
        }

        // Add the input field to the corresponding type in the columnsByType object
        columnsByType[type].push(Number(input.value));
    });

    // Calculate the sum of each column
    let sumaBilletes = 0;
    columnsByType.billetes.forEach((input) => {
        if (!isNaN(input) && input !== '') {

            sumaBilletes += parseFloat(input);
        }
    });
    sumaBilletes = sumaBilletes.toFixed(2);
    document.getElementById('total-billetes').innerHTML = sumaBilletes + '&euro;';

    let sumaMonedas = 0;
    columnsByType.monedas.forEach((input) => {
        if (!isNaN(input) && input !== '') {
            sumaMonedas += parseFloat(input);
        }
    });
    sumaMonedas = sumaMonedas.toFixed(2);
    document.getElementById('total-monedas').innerHTML = sumaMonedas + '&euro;';

    let sumaRetirada = 0;
    columnsByType.retirada.forEach((input) => {
        if (!isNaN(input) && input !== '') {
            sumaRetirada += parseFloat(input);
        }
    });
    sumaRetirada = sumaRetirada.toFixed(2);
    document.getElementById('total-retirada').innerHTML = sumaRetirada + '&euro;';

    let sumaTotal = 0;
    columnsByType.total.forEach((input) => {
        if (!isNaN(input) && input !== '') {
            sumaTotal += parseFloat(input);
        }
    });
    sumaTotal = sumaTotal.toFixed(2);


    sumaTotales()
}

const sumaTotales = () => {
    // Select all <p> elements with the class 'caja-total'
    var totalElements = document.querySelectorAll('p.caja-total');

    // Initialize a variable to store the total sum
    var totalSum = 0;

    // Iterate through each <p> element
    totalElements.forEach(function (element) {
        // Get the value of the element if it's a number and not empty
        var value = parseFloat(element.innerHTML.split('&euro;')[0]);
        if (isNaN(value)) {
            value = 0;
        }
        // Add the value to the total sum
        totalSum += value;
    });

    // Display the total sum
    console.log('Total sum:', totalSum);
    document.getElementById('total-ingresado').innerHTML = totalSum + '&euro;';
    document.getElementById('total-dif-pos').innerHTML = calculaDifPos(totalSum) + '&euro;';
}

const calculaDifPos = (sumaTotal) => {
    let difPos = sumaTotal;
    let efectivoPos = document.getElementById('efectivo-pos').value;
    console.log('total' + sumaTotal + 'efectivo pos' + efectivoPos);
    if (!isNaN(efectivoPos) && efectivoPos !== '') {
        difPos -= parseFloat(efectivoPos);
    }
    difPos = Number(difPos) * -1;
    return difPos.toFixed(2);
}

// Actualiza el total de la tabla cuando introduce el efectivo en el POS
document.getElementById('efectivo-pos').addEventListener('input', (e) => {
    actualizarTotales();
});