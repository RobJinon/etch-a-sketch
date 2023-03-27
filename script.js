

var grid = $("#grid");

var rows = 0;
var cols = 0;

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeColor(e){
    if (e.type === 'mouseover' && !mouseDown){
        return
    }
    e.target.classList.add('bg-slate-600');
}

function setupGrid(size){
    grid.addClass('grid-cols-'+size);
    grid.addClass('grid-rows-'+size);

    for(var i = 0; i < size*size; i++){
        const gridElement = document.createElement('div');
        gridElement.classList.add('cell', 'border', 'border-slate-800');

        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        $('#grid').append(gridElement);
    }
}

setupGrid(6);

$('#clear').click(function(){
    $('.cell').removeClass('bg-slate-600');
});
