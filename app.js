const ui = new WebUI();
const canvas=document.getElementById("drawCanvas");
const ctx=canvas.getContext("2d");
const predictBtn=document.getElementById("predictBtn");
const clearBtn=document.getElementById("clearBtn");
const statusText=document.getElementById("status");

//--------------------------------------------------
// Canvas setup
//--------------------------------------------------
ctx.fillStyle="black"; 
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.strokeStyle="white";
ctx.lineWidth=10;
ctx.lineCap="round";

//--------------------------------------------------
// Drawing
//--------------------------------------------------
let drawing=false;
canvas.addEventListener("mousedown",(e)=>{
    drawing=true;
    ctx.beginPath(); 
    ctx.moveTo(e.offsetX,e.offsetY); 
});

canvas.addEventListener("mousemove",(e)=>{
    if(!drawing)
    {
      return;
    }
    ctx.lineTo(e.offsetX,e.offsetY); 
    ctx.stroke(); 
});

canvas.addEventListener("mouseup",()=>{
    drawing=false;
});

canvas.addEventListener("mouseleave",()=>{
    drawing=false; 
});

//--------------------------------------------------
// Connection events
//--------------------------------------------------
ui.on_connect(()=>{
    statusText.textContent="Connected";
    predictBtn.disabled=false;

});

ui.on_disconnect(()=>{
    statusText.textContent="Disconnected";
    predictBtn.disabled=true;

});

//--------------------------------------------------
// Receive prediction result
//--------------------------------------------------
ui.on_message("display_status",(data)=>{
    statusText.textContent=data.message;
});

//--------------------------------------------------
// Clear canvas
//--------------------------------------------------
clearBtn.addEventListener("click",()=>{
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle="white";
    statusText.textContent="Canvas cleared.";
});

//--------------------------------------------------
// Predict
//--------------------------------------------------
predictBtn.addEventListener("click",()=>{
    const image=canvas.toDataURL("image/png");
    ui.send_message("predict_digit",{image: image});
    statusText.textContent="Predicting...";
});
