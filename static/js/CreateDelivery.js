//TASK 3 - Create New Delivery - DONE
console.log("Inside CreateDelivery")
//Url
const postDeliveryUrl = "http://localhost:8080/delivery"
const getProductsUrl = "http://localhost:8080/products"
const getProductByIdUrl = "http://localhost:8080/product/"

//Elements from Html
const createDeliveryButton = document.getElementById("create-delivery-button")
const addRowButton = document.getElementById("add-product-quantity-button")
const productTableBody = document.getElementById("product-table-body")

//EventListener
createDeliveryButton.addEventListener('click', postDelivery)
addRowButton.addEventListener('click', createProductQuantityTable)

//varibale to increment the id of the quantityInputTable inside create table function
let quantityInputTableId = 1
let productInputTableId = 1

let dropDownPrice
let dropDownWeight

async function getProduct() {
    return (await fetch(getProductsUrl)).json()
}

//Create the table
async function createProductQuantityTable() {

    let products = await getProduct()

    let cellCount = 0
    let rowCount = productTableBody.rows.length

    let row = productTableBody.insertRow(rowCount)

    //Product Dropdown
    let cell = row.insertCell(cellCount++)
    let dropDownProductTable = document.createElement('select')
    dropDownProductTable.onchange = function () {
        readDropDown(this)
    }

    let opt = document.createElement('option');
    opt.value = ""
    opt.innerHTML = "Choose Product";
    opt.hidden = true
    opt.disabled = true
    opt.selected = true
    dropDownProductTable.appendChild(opt);

    dropDownProductTable.id = "drop-down-product-table" + quantityInputTableId

    products.forEach(product => {
        const option = document.createElement('option')

        option.id = productInputTableId
        option.value = [product.price, product.weight]
        option.textContent = product.name
        dropDownProductTable.appendChild(option)
        productInputTableId++
    })
    cell.appendChild(dropDownProductTable)

    //Quantity
    cell = row.insertCell(cellCount++)
    let quatityInputTable = document.createElement('input')
    quatityInputTable.id = "quantity-input-table" + quantityInputTableId
    quatityInputTable.type = "number"
    quatityInputTable.onchange = function () {
        readQuantityInput(this)
    }
    cell.appendChild(quatityInputTable)

    quantityInputTableId++
    productInputTableId = 1
}

//function to post new Delivery
async function postDelivery() {

    let year = document.getElementById("delivery-date-year-input").value
    let month = document.getElementById("delivery-date-month-input").value
    let day = document.getElementById("delivery-date-day-input").value
    let warehouse = document.querySelector("#warehouse-drop-down").value
    let destination = document.getElementById("destination-input").value

    console.log(warehouse)

    let date = year + "-" + month + "-" + day

    //TODO create deeper constraints for day/month/year
    if (year != "" && year > 2021
        && month != "" && month < 13 && month > 0
        && day != "" && day > 0 && day < 32
        && warehouse != ""
        && destination != "") {

        const delivery = {
            "deliveryDate": date,
            "fromWarehouse": warehouse,
            "destination": destination
        }

        const fetchOptions = {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: ""
        }

        fetchOptions.body = JSON.stringify(delivery)

        const response = await fetch(postDeliveryUrl, fetchOptions)

        if (!response.ok) {
            const errorMessage = await response.text()
            throw new Error(errorMessage)
        }
        location.reload()
    } else {
        alert("Please fill all the fields with the correct info before creating a new Delivery")
    }
}

//Create pOst for ProductOrder after posting the delivery, insert in the postMethod of the ProductOrder the product retreieved from table, the quantity retrieved from table and the delivery retrieved from db
async function postProductOrder() {

    let year = document.getElementById("delivery-date-year-input").value
    let month = document.getElementById("delivery-date-month-input").value
    let day = document.getElementById("delivery-date-day-input").value
    let warehouse = document.querySelector("#warehouse-drop-down").value
    let destination = document.getElementById("destination-input").value

    console.log(warehouse)

    let date = year + "-" + month + "-" + day

    //TODO create deeper constraints for day/month/year
    if (year != "" && year > 2021
        && month != "" && month < 13 && month > 0
        && day != "" && day > 0 && day < 32
        && warehouse != ""
        && destination != "") {

        const productOrder = {
            "quantity": 7,
            "delivery": {
                "deliveryId": 7,
                "deliveryDate": "2022-12-23",
                "fromWarehouse": "W1",
                "destination": "Mads Sørensen, Bygmestervej 82, 1592"
            },
            "product": {
                "productId": 5,
            }
        }
    } else {
        alert("Please fill all the fields with the correct info before creating a new Delivery")
    }
}

//GET By id product from table and pass it in the post of productOrder
async function getProductById() {
    return (await fetch(getProductByIdUrl)).json()
}

//Get By id quantity from table and pass it in the post of productOrder

function readQuantityInput(selectedValue) {
    let x = selectedValue.value
    console.log(x)
}

function readDropDown(selectedValue) {
    let valueArray = selectedValue.value.split(",")
    dropDownPrice = valueArray[0]
    dropDownWeight = valueArray[1]

    console.log(dropDownPrice)
    console.log(dropDownWeight)
}

