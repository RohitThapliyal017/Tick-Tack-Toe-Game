const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGameBtn=document.querySelector(".btn");


let currentplayer;
let gamegrid;
const winningPositions= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

//let's create the function to initilize the game
function initgame()
{
    currentplayer="X";
    gamegrid=["","","","","","","","",""];
    //ui par empty bhi karna padega boxes ko
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";

        //one more thing is missing,initialize box with css properties again
        box.classList=`box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player -${currentplayer}`;
}
initgame();




function swapTurn()
{
    if(currentplayer==="X")
    {
        currentplayer="0";
    }
    else
    {
        currentplayer="X";
    }
    //ui update
    gameInfo.innerText=`Current Player -${currentplayer}`;
}


function checkgameover()
{
   let answer="";
   winningPositions.forEach((position)=>{
    //all 3 boxes should be non-empty and exactly same in value
    if((gamegrid[position[0]]!=="" || gamegrid[position[1]]!=="" ||gamegrid[position[2]]!=="")
    && (gamegrid[position[0]]===gamegrid[position[1]])&&(gamegrid[position[1]]===gamegrid[position[2]]))
    {
        //check if winner is X
        if(gamegrid[position[0]]=="X")
        {
            answer="X";
        }
        else
        {
            answer="0";
        }

        //disable pointer events
        boxes.forEach((box)=>
        {
            box.style.pointerEvents="none";
        })

        //now we know X/0 is a winner
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");

        

    }
   });

   //it means we have the winner
   if(answer!=="")
   {
    gameInfo.innerText=`winner player -${answer}`;
    newGameBtn.classList.add("active");
   }

   //when there is no winner
   let fillcount=0;
   gamegrid.forEach((box)=>{
    if(box!=="")
    {
        fillcount++;
    }
   });

   //board is filled ,game is tie
   if(fillcount===9)
   {
    gameInfo.innerText=`Game Tied !`;
    newGameBtn.classList.add("active");
   }
}

function handleClick(index)
{
    if(gamegrid[index]==="")
    {
        boxes[index].innerText=currentplayer;
        gamegrid[index]=currentplayer;
        boxes[index].style.pointerEvents="none";
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya 
        checkgameover();
    }
}


boxes.forEach((box,index)=>
{
    box.addEventListener("click",()=>
    {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initgame);