//TASK 2 - List all Products
console.log("Inside ListProducts.js")

//Url
const getProductsUrl = "http://localhost:8080/products"

//Elements from Html
const tableBody = document.getElementById("table-body")

//onload
window.onload = loadTable()

//Function to fetch Products
async function getProducts(){
    return (await fetch(getProductsUrl)).json()
}

//Function to load the table
async function loadTable(){
    let productsArray = await getProducts()
    productsArray.forEach(product => createProductTable(product))
}

//Function to Create the table
function createProductTable(product){

    let cellCount = 0
    let rowCount = tableBody.rows.length

    let row = tableBody.insertRow(rowCount)

    //Id
    let cell = row.insertCell(cellCount++)
    cell.innerHTML = product.productId

    //Name
    cell = row.insertCell(cellCount++)
    let nameInputTable = document.createElement('input')
    nameInputTable.id = "first-name-input-table" + product.productId
    nameInputTable.type = "text"
    nameInputTable.setAttribute('value', product.name)
    cell.appendChild(nameInputTable)

    //Price
    cell = row.insertCell(cellCount++)
    let priceInputTable = document.createElement('input')
    priceInputTable.id = "age-input-table" + product.productId
    priceInputTable.type = "number"
    priceInputTable.setAttribute('value', product.price)
    cell.appendChild(priceInputTable)

    //Weight
    cell = row.insertCell(cellCount++)
    let weightInputTable = document.createElement('input')
    weightInputTable.id = "age-input-table" + product.productId
    weightInputTable.type = "number"
    weightInputTable.setAttribute('value', product.weight)
    cell.appendChild(weightInputTable)


    //Edit Button
    cell = row.insertCell(cellCount++)
    let editButton = document.createElement("button")
    editButton.textContent = "Edit"
    /*
    editButton.addEventListener('click', function () {
        let result = confirm("You are updating racer: '" + product.name + "\nPress ok to continue")
        if (result) {
            doUpdateProduct(product.productId)
            alert("Racer Successfully updated")
        } else {
        }
    })

     */
    cell.appendChild(editButton)


    //Delete Button
    let deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete"
    /*
    deleteButton.addEventListener('click', function () {
        console.log("Delete working")
        let result = confirm("You are deleting racer: '" + racer.firstName + " " + racer.lastName + "'. " +
            "\nYou cannot undo this action." +
            "\nPress ok to continue")
        if (result) {
            doDeleteRacer(racer.racerId)
            alert("Racer Successfully deleted")
            location.reload()
        } else {
        }
    })

     */
    cell.appendChild(deleteButton)
}