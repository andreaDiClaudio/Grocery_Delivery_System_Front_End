//TASK 3 - DONE
console.log("Inside LisDeliveries")
//Url
const getDeliveriesUrl = "http://localhost:8080/deliveries"
//const getDeliveriesFromWarehouseUrl = "http://localhost:8080/deliveries/" //+ warehouse
const getProductOrdersUrl = "http://localhost:8080/productOrders"
const getProductOrdersFromWarehouseUrl = "http://localhost:8080/productOrders/"

//Elements from Html
const ordersTableBody = document.getElementById("orders-table-body")
const ordersDropDown = document.querySelector("#orders-drop-down")
const warehouseSortButton = document.getElementById("sort-by-warehouse-drop-down-button")

//EventListener
warehouseSortButton.addEventListener('click', checkDropDownValue)

let warehouseArray = []

//onload
window.onload = loadDeliveryFunctions()

function loadDeliveryFunctions() {
    loadOrdersTable()
    fillDropDownDelivery()
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
async function fillDropDownDelivery() {

    const options = await getDeliveries()

    let opt = document.createElement('option');
    opt.id = "all";
    opt.value = "all"
    opt.innerHTML = "All";
    ordersDropDown.appendChild(opt);


    //Filters only unique warehouses
    options.forEach(delivery => {
        if (warehouseArray.includes(delivery.fromWarehouse)) {

        } else {
            warehouseArray.push(delivery.fromWarehouse)
        }
    })

    console.log(warehouseArray)

    for (let i = 0; i < warehouseArray.length; i++) {

        let opt = document.createElement('option');

        opt.id = warehouseArray[i];
        opt.value = warehouseArray[i];
        opt.innerHTML = warehouseArray[i];

        ordersDropDown.appendChild(opt);
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
}