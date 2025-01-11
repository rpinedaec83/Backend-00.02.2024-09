window.addEventListener('load', init, false);

function init(){
    wsConnect();
}

function wsConnect(){
    websocket= new WebSocket("ws://localhost:8089");

    websocket.onopen= function(evt){
        onOpen(evt);
    }
    websocket.onclose = function(evt){
        onClose(evt);
    }
    websocket.onmessage= function(evt){
        onMessage(evt);
    }
    websocket.onerror = function(evt){
        onError(evt);
    }
}

function onError(evt){
    console.error("ERROR: "+ evt.data);
}

function onClose(evt){
    document.getElementById("enviar").disabled = true;
    setTimeout(function(){
        wsConnect();
    }, 2000);
}

function onOpen(evt){
    document.getElementById("enviar").disabled = false;
    doSend("Hola");
}

function onMessage(evt){

    objMessage = JSON.parse(evt.data);
    let strContent = '';
    switch (objMessage.type) {
        case "clima":
            strContent = JSON2HTMLList(objMessage.content).innerHTML;
            break;
    
        default:
            strContent = `${objMessage.content}`;
            break;
    }

    let strData = `
    <div class="d-flex justify-content-start mb-4">
    <div class="img_cont_msg">
        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" class="rounded-circle user_img_msg">
    </div>
    <div class="msg_cotainer">
         ${strContent}
        <span class="msg_time">${moment().format('LT')}</span>
    </div>
</div>
    `;
    var area=document.getElementById("contenedorMensajes")
    area.innerHTML+=strData;
}

function doSend(message){
    console.log(`Enviando ${message} al servidor`);
    websocket.send(message);
}

function enviarTexto(event){
    event.preventDefault();
    let campo = event.target.texto;
    doSend(campo.value);
}