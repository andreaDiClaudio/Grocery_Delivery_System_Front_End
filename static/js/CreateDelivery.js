//TASK 3 - Create New Delivery - DONE
console.log("Inside CreateDelivery")
//Url
const postDeliveryUrl = "http://localhost:8080/delivery"
const getProductsUrl = "http://localhost:8080/products"
const getProductByIdUrl = "http://localhost:8080/product/"
const postProductOrderUrl = "http://localhost:8080/productOrder"

//Elements from Html
const createDeliveryButton = document.getElementById("create-delivery-button")
const addRowButton = document.getElementById("add-product-quantity-button")
const productTableBody = document.getElementById("product-table-body")
const priceWeightTableBody = document.getElementById("price-weight-table-body")

//EventListener
createDeliveryButton.addEventListener('click', doPostProductOrder)
addRowButton.addEventListener('click', createProductQuantityTable)

//varibale to increment the id of the quantityInputTable inside create table function
let quantityInputTableId = 1
let productInputTableId = 1
let quantityInputTaleIdArray = []

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
        readDropdown(this)
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

        option.id = [product.price, product.weight]
        option.value = productInputTableId
        option.textContent = product.name
        dropDownProductTable.appendChild(option)
        productInputTableId++
    })
    cell.appendChild(dropDownProductTable)

    //Quantity
    cell = row.insertCell(cellCount++)
    let quantityInputTable = document.createElement('input')
    quantityInputTable.onchange = function (){
        readQuantityInput(this)
    }
    quantityInputTable.id = "quantity-input-table" + quantityInputTableId
    quantityInputTable.type = "number"
    cell.appendChild(quantityInputTable)

    quantityInputTaleIdArray.push(quantityInputTableId)
    quantityInputTableId++
    productInputTableId = 1
}

function doPostProductOrder(){
    console.log(quantityInputTaleIdArray)
    if (quantityInputTaleIdArray.length > 0){
        console.log(quantityInputTaleIdArray)

        for (let i = 0; i < quantityInputTaleIdArray.length; i++) {
            postProductOrder(quantityInputTaleIdArray[i])
        }
    } else {
        alert("Fill all the fields correctly")
    }
}

//Create pOst for ProductOrder after posting the delivery, insert in the postMethod of the ProductOrder the product retreieved from table, the quantity retrieved from table and the delivery retrieved from db
async function postProductOrder(id) {

    let year = document.getElementById("delivery-date-year-input").value
    let month = document.getElementById("delivery-date-month-input").value
    let day = document.getElementById("delivery-date-day-input").value
    let warehouse = document.querySelector("#warehouse-drop-down").value
    let destination = document.getElementById("destination-input").value

    let date = year + "-" + month + "-" + day

    console.log("Date:" + date)
    console.log("Warehouse:" + warehouse)
    console.log("Destination:" + destination)
    console.log("VanDROPDOWN: " +document.querySelector("#van-drop-down").value)
    console.log("Quantity:" + document.querySelector("#quantity-input-table" + id).value)
    console.log("Product id:" + document.querySelector("#drop-down-product-table" + id).value)

    if (year != "" && year > 2021
        && month != "" && month < 13 && month > 0
        && day != "" && day > 0 && day < 32
        && warehouse != ""
        && destination != "") {

        const productOrder = {
            "quantity": document.querySelector("#quantity-input-table" + id).value,
            "delivery": {
                "deliveryDate": date,
                "fromWarehouse": warehouse,
                "destination": destination,
                "van": {
                    "vanId": document.querySelector("#van-drop-down").value
                }
            },
            "product": {
                "productId": document.querySelector("#drop-down-product-table" + id).value,
            }
        }

        const fetchOptions = {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: ""
        }

        fetchOptions.body = JSON.stringify(productOrder)

        const response = await fetch(postProductOrderUrl, fetchOptions)

        if (!response.ok) {
            const errorMessage = await response.text()
            throw new Error(errorMessage)
        }
        //location.reload()

    } else {
        alert("Please fill all the fields with the correct info before creating a new Delivery")
    }
}

let pricesArray = []
let weightsArray= []
let quantityArray = []
let oldQuantityInputTaleIdArray = []

function readDropdown(select){
    let x = select.options[select.selectedIndex].id.split(",")
    console.log(x)
    pricesArray.push(x[0])
    weightsArray.push(x[1])

}

function readQuantityInput(quantity){
    console.log(quantity.value)
    quantityArray.push(quantity.value)

    quantityInputTaleIdArray.forEach(row => {
        updatePriceTable(pricesArray, quantityArray, weightsArray)
    })
}

function updatePriceTable(price, quantity, weight){

    console.log(price)
    console.log(quantity)
    console.log(weight)

    priceWeightTableBody.innerHTML = ""

    let currentPrice
    let currentWeight

    currentPrice = price[0] * quantity[0]
    currentWeight = weight[0] * quantity[0]


    for (let i = 1; i <quantityInputTaleIdArray.length; i++) {

        console.log("CUrrent price= " + currentPrice)
        console.log("Prices" + price[i])
        console.log("weights" + weight[i])

        currentPrice = (currentPrice + price[i]) + quantity[i]
        currentWeight = (currentWeight + weight[i])  + quantity[i]
    }

    console.log(currentPrice, currentWeight)

    let cellCount = 0
    let rowCount = priceWeightTableBody.rows.length

    let row = priceWeightTableBody.insertRow(rowCount)

    //Current price
    let cell = row.insertCell(cellCount++)
    cell.innerHTML = currentPrice

    //Current weight
    cell = row.insertCell(cellCount++)
    cell.innerHTML = currentWeight

}