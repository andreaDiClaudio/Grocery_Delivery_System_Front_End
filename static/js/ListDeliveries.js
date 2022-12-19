console.log("Inside LisDeliveries")
//Url
const getDeliveriesUrl = "http://localhost:8080/deliveries"

//Elements from Html
const deliveryTableBody =  document.getElementById("delivery-table-body")

//onload
window.onload = loadDeliveryTable()

//Function to fetch Products
async function getDeliveries() {
    return (await fetch(getDeliveriesUrl)).json()
}

//Function to load the table
async function loadDeliveryTable() {
    let productsArray = await getDeliveries()
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
