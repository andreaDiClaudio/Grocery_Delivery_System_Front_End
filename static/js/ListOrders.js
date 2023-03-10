//TASK 3 - DONE
console.log("Inside LisDeliveries")
//Url
const getDeliveriesUrl = "http://localhost:8080/deliveries"
const getProductOrdersUrl = "http://localhost:8080/productOrders"
const getProductOrdersFromWarehouseUrl = "http://localhost:8080/productOrders/"
const getVansUrl = "http://localhost:8080/vans"

//Elements from Html
const ordersTableBody = document.getElementById("orders-table-body")
const ordersDropDown = document.querySelector("#orders-drop-down")
const warehouseSortButton = document.getElementById("sort-by-warehouse-drop-down-button")
const vanDropDown = document.querySelector("#van-drop-down")

//EventListener
warehouseSortButton.addEventListener('click', checkDropDownValue)

let warehouseArray = []

//onload
window.onload = loadDeliveryFunctions()

function loadDeliveryFunctions() {
    loadOrdersTable()
    fillDropDownDelivery(ordersDropDown)
    fillDropDownDelivery(document.querySelector("#warehouse-drop-down"))
    //fillDropDownDelivery(document.querySelector("#orders-drop-down"))
    fillDropDownVan()
}

//Function that redirects the creation of the table based on the value selected in the dropdown
function checkDropDownValue() {
    if (document.querySelector("#orders-drop-down").value == "all") {
        loadOrdersTable()
    } else {
        loadTableByWarehouse()
    }
}


//Function to fetch Deliveries
async function getDeliveries() {
    return (await fetch(getDeliveriesUrl)).json()
}

//get Van
async function getVans() {
    return (await fetch(getVansUrl)).json()
}

//Function to fill dropdown Van
async function fillDropDownVan() {

    const options = await getVans()

    for (let i = 0; i < options.length; i++) {

        let opt = document.createElement('option');

        opt.id = options[i].vanId;
        opt.value = options[i].vanId;
        opt.innerHTML = options[i].brand + ", " + options[i].model;

        vanDropDown.appendChild(opt);
    }
}

//Function to fetch Deliveries including ProductOrder
async function getDeliveriesIncludingProductOrder() {
    return (await fetch(getProductOrdersUrl)).json()
}

//TASK 3- Find a Specific Delivery - DONE
async function getProductOrdersByWarehouse(warehouse) {
    return (await fetch(getProductOrdersFromWarehouseUrl + warehouse)).json()
}

//TASK 3 - Find a Specific Delivery - DONE
async function loadTableByWarehouse() {
    const warehouseArr = await getProductOrdersByWarehouse(document.querySelector("#orders-drop-down").value)
    ordersTableBody.innerHTML = "";
    warehouseArr.forEach(delivery => createOrdersTable(delivery))
}

//Function to fill dropdown Product
async function fillDropDownDelivery(list) {

    const options = await getDeliveries()

    //Filters only unique warehouses
    options.forEach(delivery => {
        if (warehouseArray.includes(delivery.fromWarehouse)) {

        } else {
            warehouseArray.push(delivery.fromWarehouse)
        }
    })

    for (let i = 0; i < warehouseArray.length; i++) {

        let opt = document.createElement('option');

        opt.id = warehouseArray[i];
        opt.value = warehouseArray[i];
        opt.innerHTML = warehouseArray[i];

        list.appendChild(opt);
    }
}

//Function to load the table
async function loadOrdersTable() {
    let productsArray = await getDeliveriesIncludingProductOrder()
    ordersTableBody.innerHTML = "";
    productsArray.forEach(productOrder => createOrdersTable(productOrder))
}

//Function to Create the table
async function createOrdersTable(productOrder) {

    let cellCount = 0
    let rowCount = ordersTableBody.rows.length

    let row = ordersTableBody.insertRow(rowCount)

    //Id
    let cell = row.insertCell(cellCount++)
    cell.innerHTML = productOrder.delivery.deliveryId

    //Date
    cell = row.insertCell(cellCount++)
    cell.innerHTML = productOrder.delivery.deliveryDate

    //Warehouse
    cell = row.insertCell(cellCount++)
    cell.innerHTML = productOrder.delivery.fromWarehouse

    //Destination
    cell = row.insertCell(cellCount++)
    cell.innerHTML = productOrder.delivery.destination

    //Product
    cell = row.insertCell(cellCount++)
    cell.innerHTML = productOrder.product.name

    //Quantity
    cell = row.insertCell(cellCount++)
    cell.innerHTML = productOrder.quantity

    //Total Price
    cell = row.insertCell(cellCount++)
    let totalPrice = productOrder.quantity * productOrder.product.price
    cell.innerHTML = totalPrice + " dkk"

    //Total Weight
    cell = row.insertCell(cellCount++)
    let totalWeight = productOrder.quantity * productOrder.product.weight
    cell.innerHTML = totalWeight + " g"
}