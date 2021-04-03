function insertButton(fullbutton){
    if (!fullbutton){
        return;
    }
    var clone = fullbutton.cloneNode(true);
    if (clone.hasAttribute('data-title')) {
        clone.setAttribute('data-title', "PinPを有効化する");
    }

    if (clone.hasAttribute('aria-label')) {
        clone.setAttribute('aria-label', "PinPを有効化する");
    }
    
    clone.querySelector('svg, img').parentNode.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"/></svg>';
    clone.setAttribute("id","PinP-Button");
    clone.addEventListener('click', () => {
        document.location = 'javascript:var video=document.querySelector("video");video.removeAttribute("disablepictureinpicture");if(document.exitPictureInPicture!=null){document.exitPictureInPicture=null;};video.requestPictureInPicture();';
    });
    document.querySelector("video").removeAttribute("disablepictureinpicture");
    fullbutton.parentNode.insertBefore(clone, fullbutton.nextSibling);
}

function insertPhoneButton(commentButton){
    if (!commentButton || document.querySelector("#PinP-button")){
        return;
    }
    
    var clone = commentButton.cloneNode(true);
    clone.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z"/></svg><style>#PinP-button{fill: #ffffff}</style>';
    clone.setAttribute("id","PinP-button");
    if (document.location.href.indexOf("live") > -1){
        clone.removeAttribute("class");
    }
    clone.addEventListener('click', () => {
        document.location = 'javascript:var video=document.querySelector("video");video.removeAttribute("disablepictureinpicture");if(document.exitPictureInPicture!=null){document.exitPictureInPicture=null;};video.requestPictureInPicture();';
    });
    document.querySelector("video").removeAttribute("disablepictureinpicture");
    commentButton.parentNode.insertBefore(clone, commentButton);
}
function phone_live(){
    var i = 0;
    let live_check = setInterval(function() {
        i++;
        var commentButton = document.querySelector("[class^=___video-comment-display-control___]");
        if (commentButton != null){
            insertPhoneButton(commentButton);
            clearInterval(live_check);
        }
        if (i>1){
            console.log("TimeOut");
            clearInterval(live_check);
        }
    },500);
}
console.log("Hello World");
let check = setInterval(function() {
    var fullScreenButton = document.querySelector('.ControllerContainer .EnableFullScreenButton, [class^=___addon-controller___] [class^=___fullscreen-button___]');
    var commentButton = document.querySelector(".watch-PlayerUpperControllerDock_CommentToggle");
    var phone_live_tap = document.querySelector("[class^=___player-tap-area___]");
    if (fullScreenButton != null || commentButton != null || phone_live_tap != null){
        if (fullScreenButton != null){
            console.log("PC");
            insertButton(fullScreenButton);
        }else if (commentButton != null){
            console.log("Phone Video");
            insertPhoneButton(commentButton);
        }else{
            console.log("Phone Live");
            phone_live_tap.addEventListener("click",phone_live);
        }
        clearInterval(check);
    }
},500);
