let talkBtn = $('.btn-talk');
let teachBtn = $('.btn-teach');
let inputTxt = $('.input-text');
let inputTeach = $('.input-teach');

//datas.json 받아오기
fetch('./datas.json')
    .then((response) => response.text())
    .then((result) => {
        datas = JSON.parse(result);
        console.log(datas);
    });


//클릭 이벤트
talkBtn.on('click', talking);
inputTxt.keydown(function(key) {
    if(key.keyCode=='13') {
        talking();
    }
});
teachBtn.on('click',  datasHandler);
inputTeach.keydown(function(key) {
    if(key.keyCode=='13') {
        datasHandler();
    }
});

//input 리셋
function reset() {
    inputTxt.val('');
    inputTeach.val('');
}


//명령어를 알아듣지 못했을 때
function teaching(msg) {
    $('.bubble > h3').text(`"${msg}"는 모르는 말이에요. 어떻게 대답해야하나요?`);
    
    talkBtn.addClass('none');
    teachBtn.removeClass('none');
    inputTxt.addClass('none');
    inputTeach.removeClass('none');
}

//datas에 명령어 추가
function newOrders(myMsgs, replyMsgs) {
    let newOrder = {
        q: myMsgs,
        a: replyMsgs
    }

    datas.push(newOrder); 
}

//액션 추가
function newAct(myMsgs) {
    let act;
    if(myMsgs) {
        return act;
    }
}

//명령어 가르치기
function datasHandler() {
    const myMsg = inputTxt.val();
    const replyMsg = inputTeach.val();
    
    newOrders(myMsg, replyMsg);
    
    $('.bubble > h3').text('말을 배웠어요.');
    
    teachBtn.addClass('none');
    talkBtn.removeClass('none');
    inputTxt.removeClass('none');
    inputTeach.addClass('none');
    
    reset();
    
    console.log('실행됨');
}

//default
function talking() {
    let myMsg = inputTxt.val();
    let replyMsg = datas.filter((data) => data.q == myMsg);

    if(replyMsg[0]) {
        //타이핑 애니메이션
        var typewriter = new Typewriter('.bubble > h3', {
            loop: false
        });
        typewriter.typeString(replyMsg[0].a)
        .pauseFor(150)
        .start();

        console.log('대답 완료');
    }

    if(myMsg=='사라져') {
        $('.img-gif').addClass('hidden');
    } else if(myMsg=='나타나') {
        $('.img-gif').removeClass('hidden');
    } else if(myMsg.includes('혜미')) {
        window.open("https://github.com/heaming", "네이버새창", "width=800, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=yes" );  
    }
    
    replyMsg[0] ? inputTxt.val('') : teaching(myMsg);
}

