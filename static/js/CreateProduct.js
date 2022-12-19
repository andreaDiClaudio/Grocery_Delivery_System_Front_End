//TASK 2 - Add a Product
console.log("Inside ProductCreate.js")
//Url
const postProductUrl = "http://localhost:8080/product"

//Elements from Html
const createProductButton = document.getElementById("create-product-button")

//EventListener
createProductButton.addEventListener('click', postProduct)

//function to post new Product
async function postProduct() {

    let name = document.getElementById("name-input").value
    let price = document.getElementById("price-input").value
    let weight = document.getElementById("weight-input").value

    if (name != '' && price != '' && weight != '') {

        const product = {
            "name": name,
            "price": price,
            "weight": weight
        }

        const fetchOptions = {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: ""
        }

        fetchOptions.body = JSON.stringify(product)

        const response = await fetch(postProductUrl, fetchOptions)

        if (!response.ok) {
            const errorMessage = await response.text()
            throw new Error(errorMessage)
        }
        location.reload()
    } else {
        alert("Please fill all the fields before creating a new product")
    }
}