const homeProducts = document.querySelector('.homeproducts');

fetch("https://raw.githubusercontent.com/javoxhr/data/main/data.json")
    .then((res) => res.json())
    .then((data) => {
        let htmlContent = '';
        data.forEach((item) => {
            let imagesHTML = '';
            if (item.images && item.images.length > 0) {
                item.images.forEach(imageId => {
                    // Формируем правильный URL для изображения
                    const imageUrl = `https://raw.githubusercontent.com/javoxhr/data/main/images/image_${imageId}.jpg`;

                    console.log(`Image URL for ${item.title}: ${imageUrl}`); // Для отладки
                    // imagesHTML += `<img src="${imageUrl}" alt="Image for ${item.title}" style="max-width: 100px;">`;
                });
            } else {
                imagesHTML = '<p>Изображение не добавлено</p>';
            }

            let src = ""
            item.images.forEach((im) => {
                console.log(im.id)
                src = im.id
                return src
            })

            htmlContent += `
                <div class="item-wrp">
        <img class="item-img" src="https://raw.githubusercontent.com/javoxhr/data/main/images/image_${src ? src : 'AgACAgIAAxkBAAIGqWby6Q9W77bO3lOddm5fuXxYNSJyAAI16DEbLqqRSxPGZp2mWjhMAQADAgADeQADNgQ'}.jpg" alt="Image for ${item.title}">
        <div class="item-text-wrapper">
            <h2 class="item-title">${item.title}</h2>
            <span>${item.price} ${' '}UZS</span>
            <span class="item-location">${item.location ? item.location : 'Локация не указана'}</span>
            <span class="time">${item.created_at}</span>
            <div class="images">${imagesHTML}</div>
            <div class="item-btns-wrp">
             <button class="check-btn">Посмотреть</button>
             <a href="#" class="call-btn">Позвонить</a>
            </div>
            <button class="like">
            <!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'><svg enable-background="new 0 0 512 512" height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="_x31_66_x2C__Heart_x2C__Love_x2C__Like_x2C__Twitter"><g id="XMLID_5035_"><g id="XMLID_6741_"><g><g><g><path d="M255.939,426.109c-22.801-22.117-45.181-42.135-66.937-61.592        c-38.941-34.828-72.571-64.906-96.841-96.521C66.808,234.97,55,203.863,55,170.1c0-50.437,41.033-91.47,91.47-91.47        c22.838,0,39.416,5.114,53.75,16.582c13.638,10.91,25.857,28.048,39.62,55.569l16.102,32.198l16.097-32.201        c13.757-27.519,25.974-44.657,39.611-55.567c14.334-11.468,30.909-16.582,53.749-16.582c50.508,0,91.6,41.033,91.6,91.47        c0,33.741-11.808,64.831-37.16,97.842c-24.27,31.601-57.893,61.658-96.824,96.465        C301.213,383.898,278.785,403.949,255.939,426.109z" fill="#fff"/></g></g></g><g><g><path d="M255.94,461.37c-2.652,0-5.196-1.054-7.071-2.929c-26.654-26.654-53.027-50.242-78.533-73.055       c-38.323-34.275-74.521-66.65-100.385-100.342C40.648,246.874,27,210.35,27,170.1c0-65.876,53.594-119.47,119.47-119.47       c55.358,0,84.608,26.631,109.468,70.721C280.791,77.26,310.037,50.63,365.4,50.63c65.946,0,119.6,53.594,119.6,119.47       c0,40.229-13.648,76.739-42.954,114.897c-25.863,33.676-62.054,66.03-100.369,100.284       c-25.551,22.844-51.972,46.464-78.665,73.16C261.136,460.316,258.593,461.37,255.94,461.37z M146.47,70.63       C91.622,70.63,47,115.252,47,170.1c0,78.147,60.312,132.087,136.669,200.38c23.465,20.986,47.66,42.625,72.271,66.81       c24.653-24.226,48.896-45.899,72.407-66.919C404.695,302.115,465,248.203,465,170.1c0-54.848-44.681-99.47-99.6-99.47       c-46.532,0-71.896,19.322-100.517,76.572c-1.694,3.388-5.155,5.528-8.944,5.528c-3.788,0-7.251-2.14-8.945-5.527       C218.365,89.952,192.999,70.63,146.47,70.63z"/></g></g></g></g></g><g id="Layer_1_1_"/></svg>
            </button>
        </div>
    </div>
            `;
        });
        homeProducts.innerHTML = htmlContent;
    })
    .catch((err) => {
        console.error('Ошибка загрузки данных:', err);
    });

    console.log('hello world')
