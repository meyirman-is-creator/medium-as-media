let content = document.getElementById('content');
let sportBtn = document.getElementById('sport');
let businessBtn = document.getElementById('business');
let technologyBtn = document.getElementById('technology');
let musicBtn = document.getElementById('music');
let favorite = document.getElementById('favorite');
let toFavorite = document.getElementById('toFavorite');
let favorites = [];
function formatDateString(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}
function getContentItem(data, category) {
    return `
                <div class="content__item-info">
                    <div class="content__item-author">
                        <div class="author__photo"><img src="img/user.jpg" alt=""></div>
                        <div class="author__name">${data.author === null ? 'Authors name' : data.author}<span> in</span> Topics Name</div>
                        <div class="data__content">${data.publishedAt === null ? '' : formatDateString(data.publishedAt)}</div>
                    </div>
                    <div class="content__item-title">${data.title}</div>
                    <div class="content__item-describtion">${data.description === null ? '' : data.description}</div>
                    <div class="info__content">
                        <button type="button" class="teg">${category}</button>
                    </div>
                </div>
                <div class="content__item-img">
                    <img src=${data.urlToImage !== null ? data.urlToImage : "img/bg.webp"} alt="">
                </div>`
}
async function switchCategory(category) {
    await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=20e4c41c4d904ff49f10485c8aafa3b2`)
        .then((response) => response.json())
        .then(data => {
            content.innerHTML = "";
            data.articles.forEach(element => {
                if ('[Removed]' !== element.title) {
                    let div = document.createElement('div');
                    div.classList.add('content__item');
                    div.innerHTML += getContentItem(element, category);
                    let fav = document.createElement('button');
                    fav.classList.add('favorite');
                    fav.innerHTML += '<i class="fi fi-rs-heart"></i>';

                    if (favorites !== null) {
                        for (let i = 0; i < favorites.length; i++) {
                            if (favorites[i].title === element.title) {
                                fav.innerHTML = '';
                                fav.classList.add('favorite__active');
                                fav.innerHTML += '<i class="fi fi-ss-heart"></i>';
                            }
                        }
                    }

                    fav.addEventListener('click', (event) => {
                        event.stopPropagation();
                        if (fav.classList.contains('favorite__active')) {
                            for (let i = 0; i < favorites.length; i++) {
                                if (favorites[i].title === element.title) {
                                    favorites = favorites.filter(item => item.title !== favorites[i].title);
                                }
                            }
                            localStorage.setItem('favorites', JSON.stringify(favorites));
                            fav.classList.remove('favorite__active');
                            fav.innerHTML = '';
                            fav.innerHTML = '<i class="fi fi-rs-heart"></i>';
                        } else {

                            if (favorites !== null) favorites.push(element);
                            else favorites = [element];
                            localStorage.setItem('favorites', JSON.stringify(favorites));

                            fav.classList.add('favorite__active');

                            fav.innerHTML = '<i class="fi fi-ss-heart"></i>';
                        }

                    });
                    div.appendChild(fav);
                    content.appendChild(div);

                    div.addEventListener('click', () => {
                        localStorage.setItem('active', JSON.stringify(element));
                        window.open('about.html', '_self');
                    })
                }

            });
        });
};
document.addEventListener('DOMContentLoaded', (event) => {
    favorites = JSON.parse(localStorage.getItem('favorites'));
    switchCategory('sport')
});
toFavorite.addEventListener('click', () => {
    if (!toFavorite.classList.contains('category__button-active')) {
        content.innerHTML = "";
        sportBtn.classList.remove('category__button-active');
        businessBtn.classList.remove('category__button-active');
        musicBtn.classList.remove('category__button-active');
        technologyBtn.classList.remove('category__button-active');
        toFavorite.classList.add('category__button-active');
        if (favorites !== null && favorites.length > 0) {
            favorites.forEach(element=>{
                let div = document.createElement('div');
                div.classList.add('content__item');
                div.innerHTML += getContentItem(element);
                let fav = document.createElement('button');
                fav.classList.add('favorite');
                fav.classList.add('favorite__active');
                fav.innerHTML = '<i class="fi fi-ss-heart"></i>';
                fav.addEventListener('click', (event) => {
                    event.stopPropagation();
                    if (fav.classList.contains('favorite__active')) {
                        const index = favorites.findIndex(obj => obj.title === element.title);

                        if (index !== -1) {
                            favorites.splice(index, 1);
                        }
                        localStorage.setItem('favorites', JSON.stringify(favorites));
                        fav.classList.remove('favorite__active');
                        fav.innerHTML = '';
                        fav.innerHTML = '<i class="fi fi-rs-heart"></i>';
                    } else {

                        if (favorites !== null) {
                            favorites.push(element);
                        }
                        else favorites = [element];
                        localStorage.setItem('favorites', JSON.stringify(favorites));
                     

                        fav.classList.add('favorite__active');

                        fav.innerHTML = '<i class="fi fi-ss-heart"></i>';
                    }
                });

                div.appendChild(fav);
                content.appendChild(div);
                div.addEventListener('click', () => {
                    localStorage.setItem('active', JSON.stringify(element));
                    window.open('about.html', '_self');
                })  
            });

        } else {
            content.innerHTML = "Favorite is empty";
        }
    }
});
sportBtn.addEventListener('click', () => {
    if (!sportBtn.classList.contains('category__button-active')) {
        switchCategory('sport');
        sportBtn.classList.add('category__button-active');
        businessBtn.classList.remove('category__button-active');
        musicBtn.classList.remove('category__button-active');
        technologyBtn.classList.remove('category__button-active');
        toFavorite.classList.remove('category__button-active');
    }

});
businessBtn.addEventListener('click', () => {
    if (!businessBtn.classList.contains('category__button-active')) {
        switchCategory('business');
        sportBtn.classList.remove('category__button-active');
        businessBtn.classList.add('category__button-active');
        musicBtn.classList.remove('category__button-active');
        technologyBtn.classList.remove('category__button-active');
        toFavorite.classList.remove('category__button-active');
    }

});
musicBtn.addEventListener('click', () => {
    if (!musicBtn.classList.contains('category__button-active')) {
        switchCategory('music');
        sportBtn.classList.remove('category__button-active');
        businessBtn.classList.remove('category__button-active');
        musicBtn.classList.add('category__button-active');
        technologyBtn.classList.remove('category__button-active');
        toFavorite.classList.remove('category__button-active');
    }

});
technologyBtn.addEventListener('click', () => {
    if (!technologyBtn.classList.contains('category__button-active')) {
        switchCategory('technology');
        sportBtn.classList.remove('category__button-active');
        businessBtn.classList.remove('category__button-active');
        musicBtn.classList.remove('category__button-active');
        technologyBtn.classList.add('category__button-active');
        toFavorite.classList.remove('category__button-active');
    }

});