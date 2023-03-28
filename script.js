
$(document).ready(function(){
    var grid = $("#grid");

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

        if (!gridToggle) {
            $('.cell').css('border', 'none');
        }
        
    });

    var colorMode = "";

    function changeColor(e){
        if (e.type === 'mouseover' && !mouseDown){
            return
        }
        if (colorMode === 'erase'){
            e.target.style.backgroundColor = 'white';
        }
        else if (colorMode === 'random'){
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
        
            e.target.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        }
        else{
            e.target.style.backgroundColor = 'black';
        }
        
    }

    $('#erase').click(function(){
        colorMode = 'erase';
        $('.btn').removeClass('btn-secondary');
        $(this).addClass('btn-secondary');
    });

    $('#black').click(function(){
        colorMode = '';
        $('.btn').removeClass('btn-secondary');
        $(this).addClass('btn-secondary');
    });

    $('#random').click(function(){
        colorMode = 'random';
        $('.btn').removeClass('btn-secondary');
        $(this).addClass('btn-secondary');
    });



    var gridToggle = true;

    $("#grid-toggle").change(function(){
        if (this.checked){
            gridToggle = true;
            $('.cell').css('border', '1px #444 solid');
        }
        else {
            gridToggle = false;
            $('.cell').css('border', 'none');
        }

        console.log("toggle: " + gridToggle);
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
        
        if (!gridToggle) {
            $('.cell').css('border', 'none');
        }
    });
});
