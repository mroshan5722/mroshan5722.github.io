$(document).ready(function(){
    //create 16 divs using nested loops (pieces)
    var pieces = createPieces(true);
    $(".puzzle_container").html(pieces);
    
     //when start button is clicked, shuffle pieces to piece container
    $(".start").click(function(){
        var pieces = $(".puzzle_container div");
        pieces.each(function(){
            var leftPosition = Math.floor(Math.random()*290) + "px";
            var topPosition = Math.floor(Math.random()*290) + "px";
            $(this).addClass("draggable").css({
                position:"absolute",
                left:leftPosition,
                top:topPosition
            })
            $(".piece_container").append($(this));
        });
        //create grid in puzzle container (empty pieces)
        var empty = createPieces(false)
        //hide start buttona nd show reset button
        $(".puzzle_container").html(empty);
        $(this).hide();
        $(".reset").show();
        implementLogic();
    }); 

    //when reset button is clicked
    $(".reset").click(function(){
        var newPieces = createPieces(true);
        $(".puzzle_container").html(newPieces);
        $(this).hide();
        $(".start").show();
        $(".piece_container").empty();
    });

    //function to create pieces and grid
    function createPieces(withImage){
        var rows = 4, cols = 4;
        var pieces = "";
            //top,left = position of peice
            //order = order of peices in grid 
        for (var i=0, top=0, order = 0; i<rows; i++, top-=100){
            for (var j=0, left=0; j<cols; j++, left-=100,order++){
                if (withImage){
                    pieces += "<div style='background-position:" + left + "px " + top + "px;' class = 'piece' data-order=" + order + "></div>";
                }
                else{
                    pieces += "<div style ='background-image:none;' class = 'piece droppable'></div>";
                }
            }
        } return pieces;
    }

    //checking if puzzle solved
    function puzzleSolved(){
        if($(".puzzle_container .droppedPiece").length !=16){
            return false;
        }
        //item = each dropped puzzle piece
        //order = order of each piece
        for(var k=0; k<16; k++){
            var item = $(".puzzle_container .droppedPiece:eq(" + k +")");
            var order = item.data("order")
            //if pieces not in order
            if(k!=order){
                var fail = new Audio('Sounds/Fail.mp3');
                fail.play();
                gameOver();
                updateScore();
                return false;
            }
        }
        var celeb = new Audio('Sounds/Celebration.mp3');
        celeb.play();
        gameWon();
        updateScore();
        var num = document.getElementById("score").innerHTML;
        // console.log(num);
        document.getElementById("scoreHolder").value = num;
        // console.log(scoreHolder.value);
        return true;
    }

    //creating draggable and droppable elements
    function implementLogic(){
        $(".draggable").draggable({
            revert:"invalid",
            start:function(){
                if($(this).hasClass("droppedPiece" )){
                    $(this).removeClass("droppedPiece")
                    $(this).parent().removeClass("piecePresent")
                }
            }
        });
        $(".droppable").droppable({
            hoverClass:"ui-state-highlight", //research and fix later ----> highlighst cells when piece hovers over it
            //no overlapping of pieces
            accept:function(){
                return !$(this).hasClass("piecePresent")
            },
            //autodrop pieces into place when dragged over grid
            drop:function(event,ui){
                var draggableElement = ui.draggable;
                var droppedOn = $(this);
                droppedOn.addClass("piecePresent");
                $(draggableElement).addClass("droppedPiece").css({
                    top:0,
                    left:0,
                    position:"relative"
                }).appendTo(droppedOn);
                var drop = new Audio('Sounds/Drop.mp3');
                drop.play();
                puzzleSolved();
            }
        });
    }

    //function to update score at the end of the game
    function updateScore(){
        var newTime = document.getElementById("time").innerHTML;
        var newscore = parseInt(newTime) * 3;
        document.getElementById("score").innerHTML = newscore;
    }        
});

