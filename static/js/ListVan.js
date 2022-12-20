//TASK 4 -  get a list of all deliveries assigned to a Van
window.onload = fillDropDownVan

//Url
const getVansUrl = "http://localhost:8080/vans"
const getDeliveriesByVanUrl = "http://localhost:8080/deliveriesVan/"

//Elements from Html
const sortButton = document.getElementById("sort-by-van-drop-down-button")
const vanTableBody = document.getElementById("van-table-body")

//EventListener
sortButton.addEventListener('click', loadVanTable)
//Element from html
const vanDropDown = document.querySelector("#van-drop-down-list")

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

//Function to fetch deliveries
async function getDeliveriesByVan(id) {
    return (await fetch(getDeliveriesByVanUrl+ id)).json()
}


//Function to load table
async function loadVanTable() {
    let selected = vanDropDown.value
    let deliveriesVanArray = await getDeliveriesByVan(selected)
    vanTableBody.innerHTML = "";
    deliveriesVanArray.forEach(delivery => createDeliveriesByVanTable(delivery))
}


//Function to Create the table
function createDeliveriesByVanTable(delivery) {

    let cellCount = 0
    let rowCount = vanTableBody.rows.length

    let row = vanTableBody.insertRow(rowCount)

    //Id
    let cell = row.insertCell(cellCount++)
    cell.innerHTML = delivery.deliveryId

    //Brand
    cell = row.insertCell(cellCount++)
    cell.innerHTML = delivery.van.brand

    //Price
    cell = row.insertCell(cellCount++)
    cell.innerHTML = delivery.van.model

    //Capacity
    cell = row.insertCell(cellCount++)
    cell.innerHTML = delivery.van.capacity

    //Destination
    cell = row.insertCell(cellCount++)
    cell.innerHTML = delivery.destination

    //Date
    cell = row.insertCell(cellCount++)
    cell.innerHTML = delivery.deliveryDate

    //Warehouse
    cell = row.insertCell(cellCount++)
    cell.innerHTML = delivery.fromWarehouse
}