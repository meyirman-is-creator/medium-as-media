let content = document.getElementById('content');
let sportBtn = document.getElementById('sport');
let businessBtn = document.getElementById('business');
let technologyBtn = document.getElementById('technology');
let musicBtn = document.getElementById('music');
function formatDateString(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}
function getContentItem(data) {
    return `
                <div class="content__item-info">
                    <div class="content__item-author">
                        <div class="author__photo"><img src="img/user.jpg" alt=""></div>
                        <div class="author__name">${data.author === null ? 'Authors name' : data.author}<span> in</span> Topics Name</div>
                        <div class="data__content">${data.publishedAt===null ? '': formatDateString(data.publishedAt)}</div>
                    </div>
                    <div class="content__item-title">${data.title}</div>
                    <div class="content__item-describtion">${data.description===null ? '': data.description}</div>
                    <div class="info__content">
                        <button type="button" class="teg">JavaScript</button>
                    </div>
                </div>
                <div class="content__item-img">
                    <img src=${data.urlToImage!==null ? data.urlToImage : "img/bg.webp"} alt="">
                </div>`
}
function switchCategory(category){
    fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=20e4c41c4d904ff49f10485c8aafa3b2`)
    .then((response) => response.json())
    .then(data => {
        content.innerHTML="";
        data.articles.forEach(element => {
            if('[Removed]'!==element.title){
                let div = document.createElement('div');
                div.classList.add('content__item');
                div.innerHTML+=getContentItem(element);
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
    switchCategory('sport')
});

sportBtn.addEventListener('click', ()=>{
    if(!sportBtn.classList.contains('category__button-active')){
        switchCategory('sport');
        sportBtn.classList.add('category__button-active');
        businessBtn.classList.remove('category__button-active');
        musicBtn.classList.remove('category__button-active');
        technologyBtn.classList.remove('category__button-active');
    }

});
businessBtn.addEventListener('click', ()=>{
    if(!businessBtn.classList.contains('category__button-active')){
        switchCategory('business');
        sportBtn.classList.remove('category__button-active');
        businessBtn.classList.add('category__button-active');
        musicBtn.classList.remove('category__button-active');
        technologyBtn.classList.remove('category__button-active');
    }

});
musicBtn.addEventListener('click', ()=>{
    if(!musicBtn.classList.contains('category__button-active')){
        switchCategory('music');
        sportBtn.classList.remove('category__button-active');
        businessBtn.classList.remove('category__button-active');
        musicBtn.classList.add('category__button-active');
        technologyBtn.classList.remove('category__button-active');
    }

});
technologyBtn.addEventListener('click', ()=>{
    if(!technologyBtn.classList.contains('category__button-active')){
        switchCategory('technology');
        sportBtn.classList.remove('category__button-active');
        businessBtn.classList.remove('category__button-active');
        musicBtn.classList.remove('category__button-active');
        technologyBtn.classList.add('category__button-active');
    }

});