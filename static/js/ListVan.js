window.onload= fillDropDownVan

//Url
const getVansUrl = "http://localhost:8080/vans"

//Element from html
const vanDropDown= document.querySelector("#van-drop-down-list")

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