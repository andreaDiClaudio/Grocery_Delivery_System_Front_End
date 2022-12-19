console.log("Inside LisDeliveries")
//Url
const getDeliveriesUrl = "http://localhost:8080/deliveries"

//Elements from Html
const deliveryTableBody = document.getElementById("delivery-table-body")
const deliveryDropDown = document.querySelector("#delivery-drop-down")

let warehouseArray = []

//onload
window.onload = loadDeliveryFunctions()

function loadDeliveryFunctions() {
    loadDeliveryTable()
    fillDropDownDelivery()
}


//Function that redirects the creation of the table based on the value selected in the dropdown
function checkDropDownValue() {
    if (document.querySelector("#delivery-drop-down").value == "all") {
        loadDeliveryTable()
    } else {
        loadTableById()
    }
}

//Function to fetch Products
async function getDeliveries() {
    return (await fetch(getDeliveriesUrl)).json()
}

//Function to fill dropdown Product
async function fillDropDownDelivery() {

    const options = await getDeliveries()

    let opt = document.createElement('option');
    opt.id = "all";
    opt.value = "all"
    opt.innerHTML = "All";
    deliveryDropDown.appendChild(opt);


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

        deliveryDropDown.appendChild(opt);
    }
}


//TASK 2 - Find a Specific Product - DONE
async function loadTableByWarehouse() {
    const product = await getDeliveryByWarehouse(document.querySelector("#drop-down").value)
    deliveryTableBody.innerHTML = "";
    createProductTable(product)
}

//Function to load the table
async function loadDeliveryTable() {
    let productsArray = await getDeliveries()
    deliveryTableBody.innerHTML = "";
    productsArray.forEach(delivery => createDeliveryTable(delivery))
}

//Function to Create the table
function createDeliveryTable(delivery) {

    let cellCount = 0
    let rowCount = deliveryTableBody.rows.length

    let row = deliveryTableBody.insertRow(rowCount)

    //Id
    let cell = row.insertCell(cellCount++)
    cell.innerHTML = delivery.deliveryId

    //Date
    cell = row.insertCell(cellCount++)
    cell.innerHTML = delivery.deliveryDate

    //Warehouse
    cell = row.insertCell(cellCount++)
    cell.innerHTML = delivery.fromWarehouse

    //Destination
    cell = row.insertCell(cellCount++)
    cell.innerHTML = delivery.destination
}
