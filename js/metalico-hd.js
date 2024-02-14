const tablaDatos = document.getElementById('tabla-metalico-hd-datos');
const tablaTotales = document.getElementById('tabla-metalico-hd-totales');
const ROW_COUNT = 1;

// Create input cell to add to row
const createInputCell = (id) => {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = 0;
    input.classList.add('form-control');
    input.id = id;
    return input;
}
// create an array of values to add to the table with a given ammount of rows
const createValues = (rows) => {
    let values = [];
    for (let i = 0; i < rows; i++) {
        values.push({
            total: 0
        });
    }
    return values;
}

let values = createValues(ROW_COUNT);
console.log("create values array", values);

const createElementsFromValues = (values) => {
    return values.map((value, i) => {
        const elements = [];
        elements.push(createInputCell(`total-${i}`));
        return elements;
    });
}

tablaDatos.classList.add('text-center');


// Add row to table
const addRow = (table, element) => {
    const row = table.insertRow(-1);
    row.insertCell(-1).appendChild(element[0]);
}

for(let i = 0; i < ROW_COUNT; i++) {
    addRow(tablaDatos.querySelector("tbody"), createElementsFromValues(values)[i]);
}

tablaDatos.addEventListener('input', (e) => {
    // target is input element inside cell so we need to get the cell and row index from the parent elements (cell and row)
    const rowIndex = e.target.parentElement.parentElement.rowIndex;

    // update values array with new value
    // cell index comes from the input id: billetes-2, monedas-2, etc
    // value is either a number or 0
    values[rowIndex - 1][e.target.id.split('-')[0]] = (e.target.value) ? parseFloat(e.target.value) : 0;

    updatehdValues();
});

const hdValues = {
    totalEfectivo: 0
}

const updatehdValues = () => {
    // empty total values to recalculate
    hdValues.totalEfectivo = 0;

    // calculate new total values from values array
    values.forEach((value) => {
        hdValues.totalEfectivo += parseFloat(value.total);
    });
    
    // update total values in table
    tablaTotales.querySelector('#total-ingresado').textContent =  hdValues.totalEfectivo + '€';
    setDifPos();
}

const totalPos = document.getElementById('total-dif-pos');
const difPos = document.getElementById('efectivo-pos');

difPos.addEventListener('input', (e) => {
    setDifPos(e.target.value);
});

const setDifPos = (posvalue) => {
    const difPosValue = parseFloat(posvalue);
    const totalIngresado = hdValues.totalEfectivo;
    const totalDifPos = isNaN(difPosValue) ? totalIngresado : totalIngresado - difPosValue;
    tablaTotales.querySelector('#total-dif-pos').textContent = totalDifPos + '€';
}


const onAddRowClicked = () => {
    values.push({
        total: 0
    });
    addRow(tablaDatos.querySelector("tbody"), createElementsFromValues(values)[values.length - 1]);
}