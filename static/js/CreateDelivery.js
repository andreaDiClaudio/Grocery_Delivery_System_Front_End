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
    quantityInputTable.id = "quantity-input-table" + quantityInputTableId
    quantityInputTable.type = "number"
    cell.appendChild(quantityInputTable)

    quantityInputTaleIdArray.push(quantityInputTableId)
    quantityInputTableId++
    productInputTableId = 1
}

function doPostProductOrder(){
    if (quantityInputTaleIdArray.length > 0){
        quantityInputTaleIdArray.forEach(id => postProductOrder(id))
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

    //number of rows of the table that is equal to the number of the tableid
    console.log(quantityInputTableId - 1)

    let date = year + "-" + month + "-" + day

    //TODO create deeper constraints for day/month/year
    if (year != "" && year > 2021
        && month != "" && month < 13 && month > 0
        && day != "" && day > 0 && day < 32
        && warehouse != ""
        && destination != "") {

        const productOrder = {
            "quantity": document.querySelector("#drop-down-product-table" + id).value,
            "delivery": {
                "deliveryDate": date,
                "fromWarehouse": warehouse,
                "destination": destination,
                "van": {
                    "vanId": document.querySelector("#van-drop-down").value
                }
            },
            "product": {
                "productId": document.querySelector("#quantity-input-table" + id).value,
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
        location.reload()

    } else {
        alert("Please fill all the fields with the correct info before creating a new Delivery")
    }
}