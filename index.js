let content = document.getElementById('content');

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
document.addEventListener('DOMContentLoaded', (event) => {

    fetch('https://newsapi.org/v2/top-headlines?country=us&category=sport&apiKey=20e4c41c4d904ff49f10485c8aafa3b2')
        .then((response) => response.json())
        .then(data => {
             
            data.articles.forEach(element => {
                let div = document.createElement('div');
                div.classList.add('content__item');
                div.innerHTML+=getContentItem(element);
                content.appendChild(div);
                div.addEventListener('click', () => {
                    localStorage.setItem('active', JSON.stringify(element));
                    window.open('about.html', '_self');
                })
            });
        });

});