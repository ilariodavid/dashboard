/*

    Resize Items with Drag and Drop

*/

var element;
var resizers = document.querySelectorAll('.resizable-handle');
var currentResizer;

for ( var i = 0 ; i < resizers.length ; i++){
    
    currentResizer = resizers[i];    
    currentResizer.addEventListener('mousedown', function(event){
        event.preventDefault();

        currentResizer = event.target;
        element = currentResizer.parentNode;

        var computed = getComputedStyle(element, null);

        var originalWidth = parseFloat(computed.getPropertyValue('width').replace('px', ''));        
        var originalHeight = parseFloat(computed.getPropertyValue('height').replace('px', ''));

        var originalX = element.getBoundingClientRect().left;
        var originalY = element.getBoundingClientRect().top;
        
        var originalMouseX = event.pageX;
        var originalMouseY = event.pageY;

        element.original = {
            width: originalWidth, 
            height: originalHeight,
            x: originalX, 
            y: originalY,
            mouseX: originalMouseX, 
            mouseY: originalMouseY
        };

        window.addEventListener('mousemove', mouseMoveResize);
        window.addEventListener('mouseup', mouseUpStopResize);        
    });

    function mouseMoveResize(event) {
        var originalWidth = element.original.width;
        var originalHeight = element.original.height;

        var originalMouseX = element.original.mouseX;
        var originalMouseY = element.original.mouseY;

        var width = originalWidth + (event.pageX - originalMouseX);
        var height = originalHeight + (event.pageY - originalMouseY);

        element.style.width = width + 'px';
        element.style.height = height + 'px';

        resizePlaceholder(element);
    }

    function mouseUpStopResize(event) {       
        window.removeEventListener('mousemove', mouseMoveResize); 
        window.removeEventListener('mouseup', mouseUpStopResize);

        if (element.placeholder) {
            moveItemSnapPosition(element);

            element.placeholder.remove();
            element.placeholder = null;
        }


    }
}
