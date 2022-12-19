//TASK 2 - List all Products - DONE
console.log("Inside ListProducts.js")

//Url
const getProductsUrl = "http://localhost:8080/products"
const getProductByIdUrl = "http://localhost:8080/product/" // + id
const deleteProductUrl = "http://localhost:8080/deleteProduct/" // + id
const updateProductUrl = "http://localhost:8080/editProduct/" // + id

//Elements from Html
const tableBody = document.getElementById("table-body")
const dropDownProduct = document.getElementById("drop-down")
const sortButton = document.getElementById("sort-by-drop-down-button")

//EventListener
sortButton.addEventListener('click', checkDropDownValue)

//onload
window.onload = loadFunctions

//Call the function onload of the page
function loadFunctions() {
    loadTable()
    fillDropDownProduct()
}

//Function that redirects the creation of the table based on the value selected in the dropdown
function checkDropDownValue() {
    if (document.querySelector("#drop-down").value == "all") {
        loadTable()
    } else {
        loadTableById()
    }
}

//Function to fetch Products
async function getProducts() {
    return (await fetch(getProductsUrl)).json()
}

//Function to fill dropdown Product
async function fillDropDownProduct() {

    const options = await getProducts()

    let opt = document.createElement('option');
    opt.id = "all";
    opt.value = "all"
    opt.innerHTML = "All";
    dropDownProduct.appendChild(opt);

    for (let i = 0; i < options.length; i++) {

        let opt = document.createElement('option');

        opt.id = options[i].productId;
        opt.value = options[i].productId;
        opt.innerHTML = options[i].name;

        dropDownProduct.appendChild(opt);
    }
}

//TASK 2 - Find a Specific Product - DONE
async function getProductById(productId) {
    return (await fetch(getProductByIdUrl + productId)).json()
}

//TASK 2 - Find a Specific Product - DONE
async function loadTableById() {
    const product = await getProductById(document.querySelector("#drop-down").value)
    tableBody.innerHTML = "";
    createProductTable(product)
}

//TASK 2 - Delete Product - DONE
//TODO
// Fetch delivery and check if the product is inside the delivery and in case disable the buttons/put innerHtml
// with message “cannot edit/update Because it is  already attached to a delivery
//Function to call the deleteProduct()
async function doDeleteProduct(productId) {
    const response = await deleteProduct(productId)
    return response
}

//Function send DELETE Request
async function deleteProduct(productId) {

    const fetchOptions = {
        method: 'DELETE'
    }

    const response = await fetch(deleteProductUrl + productId, fetchOptions)

    if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage)
    }
    location.reload()
}

//TASK 2 - Edit Product - DONE
//Function to call updateProduct()
async function doUpdateProduct(productId) {
    return await updateProduct(productId)
}

//Function send PUT Request
async function updateProduct(productId) {

    let name = document.getElementById("name-input-table" + productId).value
    let price = document.getElementById("price-input-table" + productId).value
    let weight = document.getElementById("weight-input-table" + productId).value

    if (name != '' && price != '' && weight != '') {

        const product = {
            "name": name,
            "price": price,
            "weight": weight
        }

        const fetchOptions = {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: ""
        }

        fetchOptions.body = JSON.stringify(product)

        const response = await fetch(updateProductUrl + productId, fetchOptions)

        if (!response.ok) {
            const errorMessage = await response.text()
            throw new Error(errorMessage)
        }
        alert("Product Successfully updated")
        location.reload()
    } else {
        alert("Please fill all the fields before editing a product")
    }
}

//Function to load the table
async function loadTable() {
    let productsArray = await getProducts()
    tableBody.innerHTML = "";
    productsArray.forEach(product => createProductTable(product))
}

//Function to Create the table
function createProductTable(product) {

    let cellCount = 0
    let rowCount = tableBody.rows.length

    let row = tableBody.insertRow(rowCount)

    //Id
    let cell = row.insertCell(cellCount++)
    cell.innerHTML = product.productId

    //Name
    cell = row.insertCell(cellCount++)
    let nameInputTable = document.createElement('input')
    nameInputTable.id = "name-input-table" + product.productId
    nameInputTable.type = "text"
    nameInputTable.setAttribute('value', product.name)
    cell.appendChild(nameInputTable)

    //Price
    cell = row.insertCell(cellCount++)
    let priceInputTable = document.createElement('input')
    priceInputTable.id = "price-input-table" + product.productId
    priceInputTable.type = "number"
    priceInputTable.setAttribute('value', product.price)
    cell.appendChild(priceInputTable)

    //Weight
    cell = row.insertCell(cellCount++)
    let weightInputTable = document.createElement('input')
    weightInputTable.id = "weight-input-table" + product.productId
    weightInputTable.type = "number"
    weightInputTable.setAttribute('value', product.weight)
    cell.appendChild(weightInputTable)


    //Edit Button
    cell = row.insertCell(cellCount++)
    let editButton = document.createElement("button")
    editButton.textContent = "Edit"

    //TASK 2 - Edit Product - DONE
    editButton.addEventListener('click', function () {
        let result = confirm("You are updating product: '" + product.name + "'" + "\nPress ok to continue")
        if (result) {
            doUpdateProduct(product.productId)
        } else {
        }
    })
    cell.appendChild(editButton)

    //Delete Button
    let deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete"

    //TASK 2 - Delete Product - DONE
    //TODO
    // Fetch delivery and check if the product is inside the delivery and in case disable the buttons/put innerHtml
    // with message “cannot edit/update Because it is  already attached to a delivery
    deleteButton.addEventListener('click', function () {
        console.log("Delete working")
        let result = confirm("You are deleting product: '" + product.name + "'" +
            "\nYou cannot undo this action." +
            "\nPress ok to continue")
        if (result) {
            doDeleteProduct(product.productId)
            alert("Product Successfully deleted")
            location.reload()
        } else {
        }
    })
    cell.appendChild(deleteButton)
}