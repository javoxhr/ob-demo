let tg = window.Telegram.WebApp

tg.expand()


const homeProducts = document.querySelector('.homeproducts');

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

            htmlContent += `
                <div class="item-wrp">
                    <img class="item-img" src="https://raw.githubusercontent.com/javoxhr/data/main/images/image_${src ? src : 'AgACAgIAAxkBAAIGqWby6Q9W77bO3lOddm5fuXxYNSJyAAI16DEbLqqRSxPGZp2mWjhMAQADAgADeQADNgQ'}.jpg" alt="Image for ${item.title}">
                    <div class="item-text-wrapper">
                        <h2 class="item-title">${item.title}</h2>
                        <span>${item.price} UZS</span>
                        <span class="item-location">${item.location ? item.location : 'Локация не указана'}</span>
                        <span class="time">${item.created_at}</span>
                        <div class="images">${imagesHTML}</div>
                        <div class="item-btns-wrp">
                            <button class="check-btn">Посмотреть</button>
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
                product.forEach((item, itemIndex) => {
                    if (i == itemIndex) {
                        let src = ''
                        item.images.forEach((img) => {
                            img = `https://raw.githubusercontent.com/javoxhr/data/main/images/image_${img.id}.jpg`
                            src = img
                            console.log(src)
                            return src
                        })
                        console.log(item)
                        modalBody.innerHTML = `
                        <div class="item-detail">
                        <img class="detail-img" src="${src}" alt="${item.title}">
                          <div class="detail-text-wrapper">
                            <h2 class="item-title">${item.title}</h2>
                            <h3>${item.price} UZS</h3>
                            <span>${item.location}</span>
                            <p>
                              ${item.description}
                            </p>
                            <span>Категорие: ${item.category}</span>
                            <span>${item.created_at}</span>
                            <div class="item-mes-btn-wrp">
                            <a class="detail-message-btn" href="https://t.me/${item.username}">Написать</a>
                            </div>
                          </div>
                        </div>
                        `
                    }
                })
            })
        })

    })
    .catch((err) => {
        console.error('Ошибка загрузки данных:', err);
    });

let tgUserName = `${tg.initDataUnsafe.user.username}`

const MyProducts = document.querySelector('.my-products')
const userNme = document.querySelector('.txt')

// userNme.textContent = tgUserName

fetch('https://raw.githubusercontent.com/javoxhr/data/main/data.json')
.then((res)=> res.json())
.then((data)=> {
    data.forEach((el)=> {
        if(tgUserName == el.username) {
            userNme.textContent = "Мы это сделали"
        }
    })
})

const userModalBtn = document.querySelector('.user-profil')
const userModalOverlay = document.querySelector('.profil-modal-overlay')
const userModal = document.querySelector('.profil-modal')

function userRemoveModal() {
    userModal.classList.remove('active-user-modal')
    userModalOverlay.classList.remove('active-user-modal')
}

userModalBtn.addEventListener('click', () => {
    userModal.classList.add('active-user-modal')
    userModalOverlay.classList.add('active-user-modal')
})

userModalOverlay.addEventListener('click', () => userRemoveModal())

let userName = document.querySelector('#tg-user-name')

userName.textContent = `${tg.initDataUnsafe.user.first_name} ${tg.initDataUnsafe.user.last_name}`