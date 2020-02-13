"use strict";

function DomElement(selector, width, height, bg, fontSize) {
    this.selector = selector;
    this.height = height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.create = function () {
    let newElem = document.createElement('div'),
        body = document.querySelector('body'),
        str = this.selector.charAt(0),
        nameClassID = this.selector.substring(1);

    if (str === '.') {
        newElem.className = nameClassID;
        newElem.innerHTML = "Hello!";
        body.appendChild(newElem);

    } else if (str === '#') {
        newElem.id = nameClassID;
        newElem.innerHTML = "Hello!";
        body.appendChild(newElem);
    }
};

DomElement.prototype.newStyle = function () {
  let elem = document.querySelector('div');
  if (elem) {
      elem.style.cssText = 'width: ' + this.width + ';' + 'height: ' + this.height + ';' +
          'background: ' + this.bg + ';' + 'font-size: ' + this.fontSize + ';'
  }
};


function newElem(selector, width, height, bg, fontSize) {
    DomElement.apply(this, arguments);
}

newElem.prototype = Object.create(DomElement.prototype);


let test = new newElem('.class', '100%', '50px', 'green', '30px');

test.create();
test.newStyle();