let talkBtn = $('.btn-talk');
let teachBtn = $('.btn-teach');
let inputTxt = $('.input-text');
let inputTeach = $('.input-teach');

//이벤트
talkBtn.on('click', talking);
inputTxt.keydown(function(key) {
    if(key.keyCode=='13') {
        talking();
    }
});
teachBtn.on('click',  dataHandler);
inputTeach.keydown(function(key) {
    if(key.keyCode=='13') {
        dataHandler();
    }
});

//명령어
var data = {
    심심해: "나도 심심해",
    안녕: "안녕하세요",
    사라져: "...",
    나타나: "뿅"
}

//input 리셋
function reset() {
    inputTxt.val('');
    inputTeach.val('');
}

//data에 명령어 추가하는 함수
function newOrder(myMsgs, replyMsgs) {
    data[myMsgs] = replyMsgs;
}

//명령어를 알아듣지 못했을 때
function teaching(msg) {
    $('.bubble > h3').text(`"${msg}"는 모르는 말이에요. 어떻게 대답해야하나요?`);
    
    talkBtn.addClass('none');
    teachBtn.removeClass('none');
    inputTxt.addClass('none');
    inputTeach.removeClass('none');
}

//명령어 가르치기
function dataHandler() {
    const myMsg = inputTxt.val();
    const replyMsg = inputTeach.val();
    
    newOrder(myMsg, replyMsg);
    
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
    let replyMsg = data[myMsg];

    if(replyMsg) {
        //타이핑 애니메이션
        var typewriter = new Typewriter('.bubble > h3', {
            loop: false
        });

        typewriter.typeString(replyMsg)
            .pauseFor(150)
            .start();
    }

    if(myMsg=='사라져') {
        $('.img-gif').addClass('hidden');
    } else if(myMsg=='나타나') {
        $('.img-gif').removeClass('hidden');
    }
    
    data[myMsg] ? inputTxt.val('') : teaching(myMsg);
}

