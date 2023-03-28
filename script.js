

var grid = $("#grid");

var rows = 0;
var cols = 0;

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

var slider = $("#slider");
var sliderValue = $("#slider_value");
sliderValue.text(slider.val() + "x" + slider .val());

slider.on("input", function() {
    sliderValue.text($(this).val() + "x" + $(this).val());
    grid.empty();
    setupGrid($(this).val());
});

var colorMode = "";

function changeColor(e){
    if (e.type === 'mouseover' && !mouseDown){
        return
    }
    if (colorMode === 'erase'){
        e.target.classList.remove('bg-slate-800');
        e.target.classList.add('bg-white');
    }
    else{
        e.target.classList.remove('bg-white');
        e.target.classList.add('bg-slate-800');
    }
    
}

$('#erase').click(function(){
    colorMode = 'erase';
});

$('#black').click(function(){
    colorMode = '';
});



function setupGrid(size){
    grid.addClass('grid-cols-'+size);
    grid.addClass('grid-rows-'+size);

    for(var i = 0; i < size*size; i++){
        const gridElement = document.createElement('div');
        gridElement.classList.add('cell');

        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        $('#grid').append(gridElement);
    }

    grid.css({
        "grid-template-columns": "repeat(" + size + ", 1fr)",
        "grid-template-rows": "repeat(" + size + ", 1fr)"
    });
}

setupGrid(16);

$('#clear').click(function(){
    grid.empty();
    setupGrid(slider.val());
});
