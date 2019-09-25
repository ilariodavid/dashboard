/* 

    Drag and Drop Items 

*/

var currentItem;
var gridItems = document.querySelectorAll('.grid-item .grid-item-header');

for ( var i = 0 ; i < gridItems.length; i++){

    currentItem = gridItems[i];   

    currentItem.addEventListener('mousedown', function(event){
        
        event.preventDefault();
        var title = event.target;
        
        var achou = false;
        ['grid-item-header', 'panel-title', 'grid-item-header-title'].forEach(function(cls) {
            if(title.classList.contains(cls)) {
                achou = true;
            }
        });

        if (!achou) {
            return;
        }

        currentItem = title;
        while(!currentItem.classList.contains('grid-item')){
            currentItem = currentItem.parentNode;      
        }

        if (!currentItem) {
            return;
        }

        console.log(currentItem);     

        var shiftX = event.clientX - currentItem.getBoundingClientRect().left;
        var shiftY = event.clientY - currentItem.getBoundingClientRect().top;

        currentItem.shift = {
            x: shiftX, 
            y: shiftY
        };

        //moveAt(event.pageX, event.pageY);

        // move the current item on mousemove
        document.addEventListener('mousemove', onMouseMove);

        // drop the current item, remove unneeded handlers
        currentItem.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            currentItem.onmouseup = null;

            if (currentItem.placeholder) {
                moveItemSnapPosition(currentItem);

                currentItem.placeholder.remove();
                currentItem.placeholder = null;
            }            

        };
    }, false);

    currentItem.ondragstart = function() {
        return false;
    };
}

// moves the currentItem at (pageX, pageY) coordinates
// taking initial shifts into account
function moveAt(pageX, pageY) {

    var snap = 25;

    var left = pageX - currentItem.shift.x;
    var top = pageY - currentItem.shift.y;

   // left = ( left / snap ).toFixed() * snap;
   // top = ( top / snap ).toFixed() * snap;

    currentItem.style.left = left + 'px';
    currentItem.style.top = top + 'px';
}       

function onMouseMove(event) {        

    var view = document.querySelector('.view');

    var y = event.pageY + view.scrollTop;
    var x = event.pageX + view.scrollLeft;

    moveAt(x, y);

    movePlaceholder(currentItem);   

    currentItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });

}


