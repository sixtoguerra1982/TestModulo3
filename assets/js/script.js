// ... Retona numero con el siguiente formato → 123.456,789
let formatNumber = (num) => {
    return new Intl.NumberFormat('de-DE').format(num)
}



// Formulario de ingreso presupuesto
const formBudget = document.getElementById("formbudget")
formBudget.addEventListener("submit", (event) =>{
    event.preventDefault();
    let txtPresupuesto = document.getElementById("txtpresupuesto")
    let inputBudgetValue = parseInt(document.getElementById("inputbudget").value)
    if (inputBudgetValue) {
        txtPresupuesto.innerHTML = formatNumber(inputBudgetValue)
    } else {
        alert("Ingrese Presupuesto")
    }
})


// Formulario de ingreso de gastos
const formExpenditure= document.getElementById("formexpenditure")
formExpenditure.addEventListener("submit", (event) =>{
    event.preventDefault();
    alert("Click formexpenditure")
})
