let books = document.querySelectorAll('.books'),
    book = document.querySelectorAll('.book');

books[0].insertBefore(book[2], book[6]);
books[0].insertBefore(book[3], book[5]);
books[0].insertBefore(book[1], book[0]);


let bgIndex = document.querySelector('body');
bgIndex.setAttribute('style', 'background-image: url(image/you-dont-know-js.jpg)');


let bookTitle = document.querySelectorAll('h2 a');
bookTitle[2].textContent = '"Книга 3. this и Прототипы Объектов"';


let adv = document.querySelector('.adv');
adv.remove();


let ulTitle = document.querySelectorAll('ul');
let ulTitleChildTwo = ulTitle[1].children;
ulTitle[1].insertBefore(ulTitleChildTwo[6], ulTitleChildTwo[4]);
ulTitle[1].insertBefore(ulTitleChildTwo[8], ulTitleChildTwo[5]);
ulTitle[1].insertBefore(ulTitleChildTwo[2], ulTitleChildTwo[10]);

let ulTitleChildFive = ulTitle[4].children;
ulTitle[4].insertBefore(ulTitleChildFive[9], ulTitleChildFive[2]);
ulTitle[4].insertBefore(ulTitleChildFive[4], ulTitleChildFive[3]);
ulTitle[4].insertBefore(ulTitleChildFive[5], ulTitleChildFive[4]);
ulTitle[4].insertBefore(ulTitleChildFive[6], ulTitleChildFive[9]);


ulTitle[5].innerHTML += '<li>Глава 8: За пределами ES6</li>';
ulTitle[5].insertBefore(ulTitle[5].children[10], ulTitle[5].children[9]);