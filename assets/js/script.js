// Objeto Presupuesto para llevar el registro de las transacciones
const BUDGET = {
    presupuesto: 0,
    gastos: [],
    sumaGastos: function() {
        let sum = 0
        this.gastos.forEach(function(item){
            sum += item.valor
        })
        return sum
    },
    saldo: function(){
        return this.presupuesto - this.sumaGastos()
    }
}

// Este código crea un objeto Date con la fecha y hora actual y luego llama al método getTime() para obtener 
// un número de milisegundos que puede ser utilizado como clave única.
let idUnique = () => {
    let now = new Date()
    let uniqueKey = now.getTime()
    return uniqueKey
}


// ... Retona numero con el siguiente formato → 123.456,789
let formatNumber = (num) => {
    return new Intl.NumberFormat('de-DE').format(num)
}

// Capitalizar String
function capitalizar(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Formulario de ingreso presupuesto
const formBudget = document.getElementById("formbudget")
formBudget.addEventListener("submit", (event) =>{
    event.preventDefault();
    let txtPresupuesto = document.getElementById("txtpresupuesto")
    let inputBudgetValue = parseInt(document.getElementById("inputbudget").value)
    if (inputBudgetValue) {
        txtPresupuesto.innerHTML = formatNumber(inputBudgetValue)
        BUDGET.presupuesto = inputBudgetValue
        document.getElementById("txtgastos").innerHTML = formatNumber(BUDGET.sumaGastos())
        document.getElementById("txtsaldos").innerHTML = formatNumber(BUDGET.saldo())
    } else {
        alert("Ingrese Presupuesto")
    }
})


// Formulario de ingreso de gastos
const formExpenditure= document.getElementById("formexpenditure")
formExpenditure.addEventListener("submit", (event) =>{
    event.preventDefault();

    inputExpenditureName = document.getElementById("inputexpenditurename")
    inputExpenditureValue = document.getElementById("inputexpenditurevalue")

    let arrayGasto = { gasto: inputExpenditureName.value, valor: parseInt(inputExpenditureValue.value)}
    BUDGET.gastos.push(arrayGasto)
    console.log(BUDGET)

    inputExpenditureName.value = ""
    inputExpenditureValue.value = ""

    let id = idUnique()
    let newRow = document.getElementsByTagName("tbody")[0]
    newRow.innerHTML += `
                        <tr id="${id}">
                            <th scope="row">${BUDGET.gastos.length}</th>
                            <td>${capitalizar(arrayGasto.gasto)}</td>
                            <td>${formatNumber(arrayGasto.valor)}</td>
                            <td>${'---'}</td>
                        </tr>`


    document.getElementById("txtgastos").innerHTML = formatNumber(BUDGET.sumaGastos())
    document.getElementById("txtsaldos").innerHTML = formatNumber(BUDGET.saldo())
})
