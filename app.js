let tg = window.Telegram.WebApp

tg.expand()

const addGoodsBtn = document.querySelector('.product-public-btn')

// block users
const blockUserBox = document.querySelector('.for-block-users')

fetch('block-users.json')
    .then((res) => res.json())
    .then((data) => {
        data.forEach((el) => {
            let tgUserName = `${tg.initDataUnsafe.user.username}`
            if (tgUserName == el.blockUser) {
                blockUserBox.style.display = "flex"
                document.querySelector('body').style.overflow = "hidden"
            } else {
                blockUserBox.style.display = "none"
                document.querySelector('body').style.overflow = "auto"
            }
        })
    })

function sendDataToFunc(data) {
    console.log('Отправка данных в Web App: ', data)
    tg.sendData(data)
}

addGoodsBtn.addEventListener('click', () => {
    console.log('hello world')
    sendDataToFunc('Added products')
})

const homeProducts = document.querySelector('.homeproducts');
const siteLoader = document.querySelector('.loader-wrapper')

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let product


fetch("https://raw.githubusercontent.com/javoxhr/data/main/data.json")
    .then((res) => res.json())
    .then((data) => {
        let htmlContent = '';
        product = data

        const shuffledData = shuffle(data);

        shuffledData.forEach((item) => {
            let imagesHTML = '';
            let src = "";

            item.images.forEach((im) => {
                console.log(im.id);
                src = im.id;
                console.log(src)
                return src;
            });

            const blockUser = document.querySelector('.for-block-users')

            if (item.blockUser == true) {
                blockUser.style.display = 'none'
            }

            htmlContent += `
                <div class="item-wrp">
                    <img class="item-img" src="https://raw.githubusercontent.com/javoxhr/data/main/images/image_${src ? src : 'AgACAgIAAxkBAAIGqWby6Q9W77bO3lOddm5fuXxYNSJyAAI16DEbLqqRSxPGZp2mWjhMAQADAgADeQADNgQ'}.jpg" alt="Image for ${item.title}">
                    <div class="item-text-wrapper">
                        <h2 class="item-title">${item.title}</h2>
                        <span class="item-price">${item.price} UZS</span>
                        <span class="item-location">${item.location ? item.location : 'Локация не указана'}</span>
                        <span class="time">${item.created_at}</span>
                        <div class="images">${imagesHTML}</div>
                        <div class="item-btns-wrp">
                            <a href="https://t.me/${item.username}" class="check-btn">Написать</a>
                            <a href="#" class="call-btn">Позвонить</a>
                        </div>
                        <button class="like">
                            <svg enable-background="new 0 0 512 512" height="512px" viewBox="0 0 512 512" width="512px" xmlns="http://www.w3.org/2000/svg">
                                <path d="M255.939,426.109c-22.801-22.117-45.181-42.135-66.937-61.592c-38.941-34.828-72.571-64.906-96.841-96.521C66.808,234.97,55,203.863,55,170.1c0-50.437,41.033-91.47,91.47-91.47c22.838,0,39.416,5.114,53.75,16.582c13.638,10.91,25.857,28.048,39.62,55.569l16.102,32.198l16.097-32.201c13.757-27.519,25.974-44.657,39.611-55.567c14.334-11.468,30.909-16.582,53.749-16.582c50.508,0,91.6,41.033,91.6,91.47c0,33.741-11.808,64.831-37.16,97.842c-24.27,31.601-57.893,61.658-96.824,96.465C301.213,383.898,278.785,403.949,255.939,426.109z" fill="#fff"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
        });

        homeProducts.innerHTML = htmlContent;
        const infoModalOverlay = document.querySelector('.info-madal-overlay')
        const infoModal = document.querySelector('.info-modal')
        const itemTitle = document.querySelectorAll('.item-title')
        const modalBody = document.querySelector('.info-modal-body')
        const body = document.querySelector('body')


        function infoModalVisible() {
            infoModal.classList.add("active-modal")
            infoModalOverlay.classList.add("active-overlay")
            body.style.overflow = 'hidden'
            document.querySelector('.info-modal').scrollTop = 0;
        }

        function infoModalDisible() {
            infoModal.classList.remove("active-modal")
            infoModalOverlay.classList.remove("active-overlay")
            body.style.overflow = 'auto'
        }

        infoModalOverlay.addEventListener('click', () => {
            infoModalDisible()
        })

        itemTitle.forEach((el, i) => {
            el.addEventListener('click', () => {
                console.log(i)
                infoModalVisible()
                let getForIfUserName = ""
                product.forEach((item, itemIndex) => {
                    if (i == itemIndex) {
                        let src = ''
                        item.images.forEach((img) => {
                            img = `https://raw.githubusercontent.com/javoxhr/data/main/images/image_${img.id}.jpg`
                            src = img
                            console.log(src)
                            return src
                        })
                        getForIfUserName = item.username ? item.username : "Anonim 🚫"
                        console.log(item)
                        modalBody.innerHTML = `
                        <div class="item-detail">
                        <img class="detail-img" src="${src}" alt="${item.title}">
                          <div class="detail-text-wrapper">
                            <h2 class="item-title detail-tit">${item.title}</h2>
                            <h3>${item.price} UZS</h3>
                            <span>${item.location}</span>
                            <h3 class="detail-desc">Описание: </h3>
                            <p>
                              ${item.description}
                            </p>
                            <span>Категорие: ${item.category}</span>
                            <span class="user-username"><h2>Продавец: </h2><span class="detail-users-profil"> ${item.username ? item.username : 'Admin'}</span></span>
                            <div class="item-mes-btn-wrp">
                              <a class="detail-message-btn" href="https://t.me/${item.username}">Написать</a>
                              <a class="detail-message-btn" href="https://t.me/${item.username}">Позвонить</a>
                            </div>
                            <button class="lets-to-profil">Перейти к профил</button>
                            <button id="detail-back">Назад</button>
                          </div>
                        </div>
                        `

                        const detailClose = document.querySelector('#detail-back')
                        detailClose.addEventListener('click', () => {
                            infoModalDisible()
                        })
                        const profiltBtn = document.querySelector('.lets-to-profil')
                        const usersInfoWrapper = document.querySelector('.users-profil-info')
                        const usersInfoOverlay = document.querySelector('.users-profil-overlay')
                        const usersInfoModal = document.querySelector('.users-profil')
                        const backBtn = document.querySelector('.back-to-home-btn')

                        usersInfoOverlay.addEventListener('click', () => {
                            usersInfoOverlay.style.display = "none"
                            usersInfoModal.style.display = "none"
                            document.querySelector('body').style.overflow = 'auto'
                        })

                        backBtn.addEventListener('click', () => {
                            usersInfoOverlay.style.display = "none"
                            usersInfoModal.style.display = "none"
                            document.querySelector('body').style.overflow = 'auto'
                        })

                        profiltBtn.addEventListener('click', () => {
                            infoModalDisible()
                            usersInfoOverlay.style.display = "block"
                            usersInfoModal.style.display = "block"
                            document.querySelector('body').style.overflow = 'hidden'
                            fetch('https://raw.githubusercontent.com/javoxhr/data/main/data.json')
                                .then((res) => res.json())
                                .then((data) => {
                                    usersInfoWrapper.innerHTML = ""
                                    data.forEach((el) => {
                                        let src
                                        el.images.forEach((img) => {
                                            let image = `https://raw.githubusercontent.com/javoxhr/data/main/images/image_${img.id}.jpg`
                                            src = image
                                            return src
                                        })
                                        if (el.username == getForIfUserName) {
                                            console.log(el)
                                            usersInfoWrapper.innerHTML += `
                                        <div class="my-product">
                                        <img class="my-product-img" src="${src}">
                                        <h2>${el.title}</h2>
                                        <span>${el.price} UZS</span>
                                        <span>${el.location}</span>
                                        <button class="my-product-btn">Посмотреть</button>
                                        </div>
                                        `
                                        }
                                    })
                                })
                            console.log(getForIfUserName)
                            console.log(item.username)

                            const usersName = document.querySelector('#user-id')
                            usersName.textContent = getForIfUserName
                        })
                    }
                })
            })
        })

    })
    .catch((err) => {
        console.error('Ошибка загрузки данных:', err);
        siteLoader.style.display = "flex"
    });

const MyProducts = document.querySelector('.my-products')
const userProductsWrp = document.querySelector('.profil-products')

// userNme.textContent = tgUserName

fetch('https://raw.githubusercontent.com/javoxhr/data/main/data.json')
    .then((res) => res.json())
    .then((data) => {
        let tgUserName = `${tg.initDataUnsafe.user.username}`
        data.forEach((el) => {
            if (tgUserName == el.username) {
                let src = ''
                el.images.forEach((im) => {
                    let img = `https://raw.githubusercontent.com/javoxhr/data/main/images/image_${im.id}.jpg`
                    src = img
                    return src
                })
                userProductsWrp.innerHTML += `
            <div class="my-product">
               <img class="my-product-img" src="${src}">
               <h2>${el.title}</h2>
               <span>${el.price} UZS</span>
               <span>${el.location}</span>
               <button class="my-product-btn">Посмотреть</button>
            </div>
            `
            }
        })
    })

const search = document.querySelector('#search-input');
const listSearch = document.querySelector('.search-wrap')

window.addEventListener("scroll", ()=> {
    if(window.scrollY > 125) {
        listSearch.style.position = "fixed"
        listSearch.style.width = "100%"
        listSearch.style.left = "0"
        listSearch.style.top = "-10px"
    } else {
        listSearch.style.width = "100%"
        listSearch.style.left = "0"
        listSearch.style.position = "relative"
        listSearch.style.top = "0px"
    }
})

search.addEventListener('input', () => {
    fetch("https://raw.githubusercontent.com/javoxhr/data/main/data.json")
        .then((res) => res.json())
        .then((data) => {
            const searchTerm = search.value.toLowerCase();
            const searchList = document.querySelector("#list-search");

            searchList.innerHTML = '';

            searchList.style.display = "flex"

            if(searchTerm == '') {
                searchList.style.display = "none"
                return
            }

            const filteredData = data.filter(el => el.title.toLowerCase().includes(searchTerm));

            if (filteredData.length > 0) {
                const listItems = filteredData.map(el => `<li>${el.title}</li>`).join('');
                searchList.innerHTML = listItems;
                searchList.style.display = "flex"
            } else {
                searchList.innerHTML = '<li>Ничего не найдено</li>';
            }
        })
        .catch(error => console.error('Ошибка при получении данных:', error));
});


const userModalBtn = document.querySelector('.user-profil')
const userModalOverlay = document.querySelector('.profil-modal-overlay')
const userModal = document.querySelector('.profil-modal')

function userRemoveModal() {
    userModal.classList.remove('active-user-modal')
    userModalOverlay.classList.remove('active-user-modal')
    document.querySelector('body').style.overflow = "auto"
}

userModalBtn.addEventListener('click', () => {
    userModal.classList.add('active-user-modal')
    userModalOverlay.classList.add('active-user-modal')
    document.querySelector('body').style.overflow = "hidden"
})

userModalOverlay.addEventListener('click', () => userRemoveModal())

const myProductsBtn = document.querySelector('.my-products-btn')
const myProducts = document.querySelector('.my-products')
const myProductsOverlay = document.querySelector('.my-products-overlay')
const closeMyProductsBtn = document.querySelector('.close-my-products-btn')

myProductsBtn.addEventListener('click', () => {
    myProducts.classList.add('active-my-products')
    myProductsOverlay.classList.add('active-my-products')
    userRemoveModal()
})

function closeMyProductsFunc() {
    myProducts.classList.remove('active-my-products')
    myProductsOverlay.classList.remove('active-my-products')
}

closeMyProductsBtn.addEventListener('click', () => closeMyProductsFunc())
myProductsOverlay.addEventListener('click', () => closeMyProductsFunc())

let userName = document.querySelector('#tg-user-name')

userName.textContent = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`