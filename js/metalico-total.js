const tablaDatos = document.getElementById('tabla-metalico-total-datos');
const tablaTotales = document.getElementById('tabla-metalico-total-totales');
const ROW_COUNT = 5;

// Create input cell to add to row
const createInputCell = (value, id) => {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = 0;
    input.classList.add('form-control');
    input.id = id;
    return input;
}

// Create table header to add to row
const createHeaderCell = (value) => {
    const header = document.createElement('th');
    header.classList.add('table-danger');
    header.scope = 'row';
    header.appendChild(document.createTextNode(value));
    return header;
}

// Create paragraph cell to add to row
const createParagraphCell = (value, id) => {
    const paragraph = document.createElement('p');
    paragraph.classList.add('form-control');
    paragraph.classList.add('m-0');
    paragraph.textContent = value + '€';
    paragraph.id = id;
    return paragraph;
}

// create an array of values to add to the table with a given ammount of rows
const createValues = (rows) => {
    let values = [];
    for (let i = 0; i < rows; i++) {
        values.push({
            // if i is even, name is Caja 3, else Caja 1
            name: `Caja ${((i + 1) % 2 === 0) ? 3: 1}`,
            billetes: 0,
            monedas: 0,
            retirada: 0,
            total: 0
        });
    }
    // update third row with its custom name
    values[2].name = 'Caja HD';
    return values;
}

let values = createValues(ROW_COUNT);
console.log("create values array", values);

const createElementsFromValues = (values) => {
    return values.map((value, i) => {
        const elements = [];
        elements.push(createHeaderCell(value.name));
        elements.push(createInputCell(value.billetes, `billetes-${i}`));
        elements.push(createInputCell(value.monedas, `monedas-${i}`));
        elements.push(createInputCell(value.retirada, `retirada-${i}`));
        elements.push(createParagraphCell(value.total, `total-${i}`));
        return elements;
    });
}

tablaDatos.classList.add('text-center');


// Add row to table
const addRow = (table, element) => {
    const row = table.insertRow(-1);
    // add header
    row.appendChild(element[0]);

    // add rest of the cells
    for (let i = 1; i < element.length; i++) {
        const cell = row.insertCell(i);
        cell.appendChild(element[i]);
    }
}

for(let i = 0; i < ROW_COUNT; i++) {
    addRow(tablaDatos.querySelector("tbody"), createElementsFromValues(values)[i]);
}

tablaDatos.addEventListener('input', (e) => {
    // target is input element inside cell so we need to get the cell and row index from the parent elements (cell and row)
    const cellIndex = e.target.parentElement.cellIndex;
    const rowIndex = e.target.parentElement.parentElement.rowIndex;

    // update values array with new value
    // cell index comes from the input id: billetes-2, monedas-2, etc
    // value is either a number or 0
    values[rowIndex - 1][e.target.id.split('-')[0]] = (e.target.value) ? parseFloat(e.target.value) : 0;

    const total = parseFloat(values[rowIndex - 1].billetes) + parseFloat(values[rowIndex - 1].monedas) + parseFloat(values[rowIndex - 1].retirada);
    values[rowIndex - 1].total = total;
    tablaDatos.querySelector(`#total-${rowIndex - 1}`).textContent = values[rowIndex - 1].total + '€';

    updateTotalValues();
});

const totalValues = {
    totalBilletes: 0,
    totalMonedas: 0,
    totalRetirada: 0,
    totalTotal: 0
}

const updateTotalValues = () => {
    // empty total values to recalculate
    totalValues.totalBilletes = 0;
    totalValues.totalMonedas = 0;
    totalValues.totalRetirada = 0;
    totalValues.totalTotal = 0;

    // calculate new total values from values array
    values.forEach((value) => {
        totalValues.totalBilletes += parseFloat(value.billetes);
        totalValues.totalMonedas += parseFloat(value.monedas);
        totalValues.totalRetirada += parseFloat(value.retirada);
        totalValues.totalTotal += parseFloat(value.total);
    });
    
    // update total values in table
    tablaTotales.querySelector('#total-billetes').textContent =  totalValues.totalBilletes + '€';
    tablaTotales.querySelector('#total-monedas').textContent =  totalValues.totalMonedas + '€';
    tablaTotales.querySelector('#total-retirada').textContent =  totalValues.totalRetirada + '€';
    tablaTotales.querySelector('#total-ingresado').textContent =  totalValues.totalTotal + '€';
    setDifPos();
}

const totalPos = document.getElementById('total-dif-pos');
const difPos = document.getElementById('efectivo-pos');

difPos.addEventListener('input', (e) => {
    setDifPos(e.target.value);
});

const setDifPos = (posvalue) => {
    const difPosValue = parseFloat(posvalue);
    const totalIngresado = totalValues.totalTotal;
    const totalDifPos = isNaN(difPosValue) ? totalIngresado : totalIngresado - difPosValue;
    tablaTotales.querySelector('#total-dif-pos').textContent = totalDifPos + '€';
}


const onAddRowClicked = (rowName) => {
    values.push({
        name: `Caja ${rowName}`,
        billetes: 0,
        monedas: 0,
        retirada: 0,
        total: 0
    });
    addRow(tablaDatos.querySelector("tbody"), createElementsFromValues(values)[values.length - 1]);
}