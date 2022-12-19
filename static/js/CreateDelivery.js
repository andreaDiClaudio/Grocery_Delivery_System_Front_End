//TASK 3 - Create New Delivery - DONE
console.log("Inside CreateDelivery")
//Url
const postDeliveryUrl = "http://localhost:8080/delivery"

//Elements from Html
const createDeliveryButton = document.getElementById("create-delivery-button")

//EventListener
createDeliveryButton.addEventListener('click', postDelivery)

//function to post new Delivery
async function postDelivery() {

    let year = document.getElementById("delivery-date-year-input").value
    let month = document.getElementById("delivery-date-month-input").value
    let day = document.getElementById("delivery-date-day-input").value
    let warehouse = document.getElementById("warehouse-input").value
    let destination = document.getElementById("destination-input").value

    let date = year + "-" + month + "-" + day

    console.log(date, warehouse, destination)
    if (year != "" && month != "" && day != "" && warehouse != "" && destination != "") {

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
        alert("Please fill all the fields before creating a new product")
    }
}