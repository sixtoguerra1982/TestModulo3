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


let refreshResultados = () => {
    
    document.getElementById("txtgastos").innerHTML = formatNumber(BUDGET.sumaGastos())
    document.getElementById("txtsaldos").innerHTML = formatNumber(BUDGET.saldo())
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

        txtPresupuesto.className += " blink"

        setTimeout(function() {
            txtPresupuesto.className = "saldo"
        },5000)

        refreshResultados()
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

    let id = idUnique()


    let objGasto = { 
                    valor: parseInt(inputExpenditureValue.value), 
                    id: id,
                    gasto: inputExpenditureName.value
                }

    BUDGET.gastos.push(objGasto)
    console.log(BUDGET)

    inputExpenditureName.value = ""
    inputExpenditureValue.value = ""

    
    let newRow = document.getElementsByTagName("tbody")[0]
    newRow.innerHTML += `
                        <tr id="elemento${id}">
                            <td>${capitalizar(objGasto.gasto)}</td>
                            <td>${formatNumber(objGasto.valor)}</td>
                            <td>
                                <a href="#" onclick="borrarGasto(${id})" ><i class="bi bi-trash3"></i></a>
                            </td>
                        </tr>`


    refreshResultados()

    document.getElementById("txtgastos").className += " blink"

    setTimeout(function() {
        document.getElementById("txtgastos").className = "saldo"
    },5000)
})

// Acción de eliminar un elemento
const borrarGasto = (id) => {
    
    BUDGET.gastos = BUDGET.gastos.filter((gasto) => {
        if (gasto.id == id) {
            let filaABorrar = document.getElementById("elemento" + gasto.id)
            filaABorrar.remove();
            return false;
        }
        return true;
    });

    refreshResultados()

}