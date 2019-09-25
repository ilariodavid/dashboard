
function createPlaceholder(el) {
    var placeholder = document.createElement('div');
    placeholder.classList.add('grid-item');
    placeholder.classList.add('grid-item-placeholder');    

    placeholder.el = el;
    el.placeholder = placeholder;
    
    movePlaceholder(el);
    placeholder.style.position = 'absolute';

    document.querySelector('.dashboard-container').append(placeholder);
}

function movePlaceholder(el){
    
    if (!el.placeholder) {
        createPlaceholder(el);
    }

    var placeholder = el.placeholder;

    placeholder.style.top = snapPosition(el.style.top);
    placeholder.style.left = snapPosition(el.style.left);

    placeholder.style.width = el.style.width;
    placeholder.style.height = el.style.height;
}

function resizePlaceholder(el) {

    if (!el.placeholder) {
        createPlaceholder(el);
    }

    var placeholder = el.placeholder;

    placeholder.style.top = el.style.top;
    placeholder.style.left = el.style.left;

    placeholder.style.width = snapPosition(el.style.width, 44);
    placeholder.style.height = snapPosition(el.style.height, 44);

}

function moveItemSnapPosition(el){
    var placeholder = el.placeholder;

    if(!placeholder) {
        return;
    }

    el.style.top = placeholder.style.top;
    el.style.left = placeholder.style.left;
    el.style.width = placeholder.style.width;
    el.style.height = placeholder.style.height;
}

function snapPosition(pos){
    var snap = 44;
    var snapPos = (parseFloat(pos) / snap).toFixed() * snap;
    return snapPos + 'px';
}
