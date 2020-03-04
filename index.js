var box = document.querySelectorAll(".box");
var g_status = document.querySelector(".status");
var arr = [];
var cross = [];
var knot = [];
var pop = new Audio("sounds/pop.mp3");
var cross = new Audio("sounds/cross.mp3");
var cross_win = false;
var knot_win = false;
var yourTurn = true;    
var end = false;
var cross_score = document.querySelector(".cross_score .p");
var knot_score = document.querySelector(".knot_score .p");
var head = document.querySelectorAll("h1")[0];
var cs = 0;
var ks = 0;

var theame = document.querySelectorAll(".theame");
var last = "";
var last1 = "";
    theame[0].addEventListener("click", function(){   
        if(last!="")
        head.classList.remove(last);
        if(last1!="")
        for(var i=0; i<9; i++)
            box[i].classList.remove(last1);
        head.classList.add("head0");
        for(var i=0; i<9; i++)
            box[i].classList.add("box0");
        last = "head0";
        last1 = "box0";
    });
    theame[1].addEventListener("click", function(){   
        if(last!="")
        head.classList.remove(last);
        if(last1!="")
        for(var i=0; i<9; i++)
            box[i].classList.remove(last1);
        head.classList.add("head1");
        for(var i=0; i<9; i++)
            box[i].classList.add("box1");
        last = "head1";
        last1 = "box1";
    });
    theame[2].addEventListener("click", function(){   
        if(last!="")
        head.classList.remove(last);
        if(last1!="")
        for(var i=0; i<9; i++)
            box[i].classList.remove(last1);
        head.classList.add("head2");
        for(var i=0; i<9; i++)
            box[i].classList.add("box2");
        last = "head2";
        last1 = "box2";
    });
    theame[3].addEventListener("click", function(){   
        if(last!="")
        head.classList.remove(last);
        if(last1!="")
        for(var i=0; i<9; i++)
            box[i].classList.remove(last1);
        head.classList.add("head3");
        for(var i=0; i<9; i++)
            box[i].classList.add("box3");
        last = "head3";
        last1 = "box3";
    });

cross_score.innerText = cs;
knot_score.innerText = ks;

for(var i=0; i<box.length; i++)
{
    click(i);
}
function randomMove() 
{
    g_status.innerText = "Thinking";
    setTimeout(function(){
        while(1)
        {
            if(arr.length==9)
            {
                break;
            }   
            random = Math.floor(Math.random()*9);
            if(!(arr.includes(random)))
            {
                arr.push(random);
                knot[random] = 'O';
                box[random].classList.add("press");
                box[random].innerText = "O";
                pop.play();
                g_status.innerText = "Your Turn";
                break;
            }
        }
        if( (knot[0] == 'O' && knot[1] == 'O' && knot[2] == 'O' )||
            (knot[3] == 'O' && knot[4] == 'O' && knot[5] == 'O' )||
            (knot[6] == 'O' && knot[7] == 'O' && knot[8] == 'O' )||
            (knot[0] == 'O' && knot[3] == 'O' && knot[6] == 'O' )||
            (knot[1] == 'O' && knot[4] == 'O' && knot[7] == 'O' )||
            (knot[2] == 'O' && knot[5] == 'O' && knot[8] == 'O' )||
            (knot[0] == 'O' && knot[4] == 'O' && knot[8] == 'O' )||
            (knot[6] == 'O' && knot[4] == 'O' && knot[2] == 'O' )
        )
        {
            knot_win = true;
            g_status.innerText = "You Lose";
            end=true;
            setTimeout(function(){
                OverState();
            }, 400);
        }
        yourTurn = true;
    }, 1000);
    
}

function click(i) 
{
    box[i].addEventListener("click", function clickPress(){
        if(cross_win || knot_win)
        {
            this.removeEventListener("click", clickPress);
        }
        else if(!(arr.includes(i)) && yourTurn)
        {
            cross[i] = 'X';
            this.classList.add("press");
            this.innerText = "X";
            arr.push(i);
            cross.play();
            console.log(arr);
            yourTurn = false;
            if( (cross[0] == 'X' && cross[1] == 'X' && cross[2] == 'X' )||
                (cross[3] == 'X' && cross[4] == 'X' && cross[5] == 'X' )||
                (cross[6] == 'X' && cross[7] == 'X' && cross[8] == 'X' )||
                (cross[0] == 'X' && cross[3] == 'X' && cross[6] == 'X' )||
                (cross[1] == 'X' && cross[4] == 'X' && cross[7] == 'X' )||
                (cross[2] == 'X' && cross[5] == 'X' && cross[8] == 'X' )||
                (cross[0] == 'X' && cross[4] == 'X' && cross[8] == 'X' )||
                (cross[6] == 'X' && cross[4] == 'X' && cross[2] == 'X' )
            )
            {
                cross_win = true;
                g_status.innerText = "You Win";
                end=true;
                setTimeout(function(){
                    OverState();
                }, 400);
            }
            else if(arr.length==9)
            {    
                g_status.innerText = "Draw";
                end=true;
                setTimeout(function(){
                    OverState();
                }, 400);
            }
            else
                randomMove();
        }
    });
}
function OverState()
{
    var stss = document.querySelector(".stss");
    var block = document.querySelector(".over");
    if(cross_win)
        stss.innerText = "You WIN";
    else
        stss.innerText = "You LOSE";
    block.style.display = "block";

    var button = document.querySelector(".button");
    button.addEventListener("click", function(){
        block.style.display = "none";
        rematch();
    })
}
function rematch()
{
    if(cross_win)
        cs++;
    else if(knot_win)
        ks++;
    cross_win = false;
    knot_win = false;
    yourTurn = true;
    arr = [];
    cross = [];
    knot = [];
    pop = new Audio("sounds/pop.mp3");
    cross = new Audio("sounds/cross.mp3");

    cross_score.innerText = cs;
    knot_score.innerText = ks;


    for(var i=0; i<box.length; i++)
    {
        box[i].classList.remove("press");
        box[i].innerText = "";
    }
    for(var i=0; i<box.length; i++)
    {
        click(i);
    }
}