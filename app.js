const homeProducts = document.querySelector('.homeproducts')

fetch("https://raw.githubusercontent.com/javoxhr/data/main/data.json")
.then((res)=> res.json())
.then((data)=> {
    console.log(data)
    data.forEach((item)=> {
        homeProducts.innerHTML += `
        <div class="item">
         <h2>${item.title}</h2>
         <p>${item.description}</p>
         <span>${item.price}$</span>
         <span>${item.location ? item.location : 'Локация не указано'}</span>
         <span class="time">${item.created_at}</span>
         <button class="check-btn">Посмотреть</button>
        </div>
        `
    })
})
