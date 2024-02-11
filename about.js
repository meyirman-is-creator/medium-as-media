let backBtn = document.getElementById('back');
let articleContent = document.getElementById('articleContent');
function formatDateString(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}
function getContentItem(data) {
    return `<div class="article__author">
                <div class="article__author-left">
                    <img class="author__img" src="img/user.jpg" alt="">
                    <div class="author__inner">
                        <div class="author__inner-name">${data.author===null ? 'Authors Name' : data.author}</div>
                        <div class="upload__inner-date">${formatDateString(data.publishedAt)}</div>
                    </div>
                </div>
            </div>
            <div class="article__title">${data.title}</div>
            <div class="article__description">${data.description}</div>
            <img class="article__img" src="${data.urlToImage!==null ? data.urlToImage:'img/bg.webp'}" alt="">
            <div class="article__name">${data.source.name}</div>
            <div class="article__text">${data.content}</div>`
}
document.addEventListener('DOMContentLoaded', (event) => {
    const element = JSON.parse(localStorage.getItem('active'));
    articleContent.innerHTML = getContentItem(element);
});
backBtn.addEventListener('click', ()=>{
    localStorage.setItem('active', '');

    window.open('index.html', '_self');
});