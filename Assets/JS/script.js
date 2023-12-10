
//impostazioni generali

const urlApi = "https://striveschool-api.herokuapp.com/api/product/"
const phoneId = ""
const urlWithPhoneId = `https://striveschool-api.herokuapp.com/api/product/${phoneId}`

const options = {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NDZhODJjNmEwZDAwMTg0OTU5YjMiLCJpYXQiOjE3MDIxMTkwODAsImV4cCI6MTcwMzMyODY4MH0.TV6bmfTBaI7-yg8NAEz0G1tmzRaxXtg59UunePgc3nw",
        "Content-Type": "application/json",
        },
}



fetchShowPhonesArray(urlApi, options)

async function fetchShowPhonesArray(url, option) {
    const response = await fetch(url, option)
    const data = await response.json()
    console.log(data)
}

async function fetchPhone(url, option) {
    const response = await fetch(url, option)
    const data = await response.json()
}

function createPhone(name, description, brand, imageUrl, price) {
    return {
        "name": name,
        "description": description,
        "brand": brand,
        "imageUrl": imageUrl,
        "price": parseFloat(price),
    }
}

function postPhone(name, description, brand, imageUrl, price) {
    return {
        method: 'POST',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NDZhODJjNmEwZDAwMTg0OTU5YjMiLCJpYXQiOjE3MDIxMTkwODAsImV4cCI6MTcwMzMyODY4MH0.TV6bmfTBaI7-yg8NAEz0G1tmzRaxXtg59UunePgc3nw",
            "Content-Type": "application/json",
            },
        body: JSON.stringify(createPhone(name, description, brand, imageUrl, price))
    }
}

function putPhone(newName, newDescription, newBrand, newImageUrl, newPrice) {
    return {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NDZhODJjNmEwZDAwMTg0OTU5YjMiLCJpYXQiOjE3MDIxMTkwODAsImV4cCI6MTcwMzMyODY4MH0.TV6bmfTBaI7-yg8NAEz0G1tmzRaxXtg59UunePgc3nw",
            "Content-Type": "application/json",
            },
        body: JSON.stringify(createPhone(newName, newDescription, newBrand, newImageUrl, newPrice))
    }
}

function deletePhone() {
    return {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc0NDZhODJjNmEwZDAwMTg0OTU5YjMiLCJpYXQiOjE3MDIxMTkwODAsImV4cCI6MTcwMzMyODY4MH0.TV6bmfTBaI7-yg8NAEz0G1tmzRaxXtg59UunePgc3nw",
            "Content-Type": "application/json",
            },
    }
}

//newPhonePage

const xIcon = document.querySelector('#xIcon')
const xIconDiv = document.querySelector('#newPhonePage')
const newItem = document.querySelector('#newItem')
const phoneName = document.querySelector('#phoneName')
const phoneDesc = document.querySelector('#phoneDesc')
const phoneBrand = document.querySelector('#phoneBrand')
const phoneImgUrl = document.querySelector('#phoneImgUrl')
const phonePrice = document.querySelector('#phonePrice')
const btnReset = document.querySelector('#btnReset')
const btnCreate = document.querySelector('#btnCreate')
const container = document.querySelector('.container')


showPhoneCards(urlApi, options)

    newItem.addEventListener('click', () => {
        xIconDiv.style.display = 'block'
        phoneName.value = ''
        phoneDesc.value = ''
        phoneBrand.value = ''
        phoneImgUrl.value = ''
        phonePrice.value = ''
    })

    xIcon.addEventListener('click', () => {
        xIconDiv.style.display = 'none'
    })

    btnReset.addEventListener('click', (e) => {
        e.preventDefault()
    phoneName.value = ''
    phoneDesc.value = ''
    phoneBrand.value = ''
    phoneImgUrl.value = ''
    phonePrice.value = ''
    })

    btnCreate.addEventListener('click', (event) => {
        event.preventDefault()
        if (phoneName.value !== '' && phoneDesc.value !== '' && phoneBrand.value !== '' &&  phoneImgUrl.value !== '' && phonePrice.value !== '') {
            fetchPhone(urlApi, postPhone(phoneName.value, phoneDesc.value, phoneBrand.value, phoneImgUrl.value, phonePrice.value))
            let cards = ''
            cards += `
                            
                                    <div class="card bg-info text-light" style="width: 15rem;">
                                    <img src="${phoneImgUrl.value}" class="card-img" alt="">
                                    <div class="card-body">
                                      <h5 class="card-title">${phoneName.value}</h5>
                                      <a href="#" class="btn btn-primary">Edit</a>
                                      <a href="#" class="btn btn-primary buttonDetail">Details</a>
                                    </div>
                                </div>
                            `
            container.innerHTML += cards
            newPhonePage.style.display = 'none'
            showPhoneCards(urlApi,options)
        }
        else {
            alert('Fill all the boxes')
        }
    })
    
    async function showPhoneCards(url, option) {
        const response = await fetch(url, option)
        const data = await response.json()
    
        let cards = ''
        for (let i = 0; i < data.length; i++) {
            cards += createCard(data[i])
        }
        container.innerHTML = cards
        const btnsDetail = document.querySelectorAll('.buttonDetail')
        for (let i=0;i<btnsDetail.length; i++) {
            btnsDetail[i].addEventListener('click', () => {
                detailsPageImg.innerHTML = `<img src="${data[i].imageUrl}" alt="${data[i].name}">`
            detailsPagePhoneName.textContent = 'Name: ' + data[i].name
            detailsPagePhoneDesc.textContent = 'Description: ' + data[i].description
            detailsPagePhoneBrand.textContent = 'Brand: ' + data[i].brand
            detailsPagePhoneImgUrl.textContent = 'Image url: ' + data[i].imageUrl
            detailsPagePhonePrice.textContent = 'Price: ' + data[i].price + '€'
            detailsPage.style.display ='flex';
            })
        }
    }
    
    function createCard(phone) {
        return  `
        
                <div class="card bg-info text-light" style="width: 15rem;">
                <img src="${phone.imageUrl}" class="card-img" alt="">
                <div class="card-body">
                  <h5 class="card-title">${phone.name}</h5>
                  <a href="#" class="btn btn-primary">Edit</a>
                  <a href="#" class="btn btn-primary buttonDetail">Details</a>
                </div>
            </div>
        `
    }

    //detailsPage

    const detailsPage = document.querySelector('#detailsPage')
    const detailsPageImg = document.querySelector('.detailsPageImg')
    const detailsPagePhoneName = document.querySelector('.detailsPagePhoneName')
    const detailsPagePhoneDesc = document.querySelector('.detailsPagePhoneDesc')
    const detailsPagePhoneBrand = document.querySelector('.detailsPagePhoneBrand')
    const detailsPagePhoneImgUrl = document.querySelector('.detailsPagePhoneImgUrl')
    const detailsPagePhonePrice = document.querySelector('.detailsPagePhonePrice')
    const editBtn = document.querySelector('.editBtn')
    const xIcon2 = document.querySelector('#xIcon2')

    xIcon2.addEventListener('click', () => {
        detailsPage.style.display = 'none'
    })