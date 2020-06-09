let timerObj={
    minute:0,
    second:0,
    timerId:0
}

                                                //function used for alarm playing sound start

function soundAlarm(){
    let amount=3;                                               //variable which stores how many times the audio will repeat
    let audio= new Audio("Alarm.mp3");             //importing audio clip

    function playSound(){                                     //embeded fuction which can run for soundAlarm() function only.. fuction used to play audio clip
        audio.pause();
        audio.currentTime=0;
        audio.play();
    }

    for (let i = 0; i < amount; i++) {                           //to add time before every time we play audio
    setTimeout(playSound,1200*i);                              //this line adds time gap before paying audio clip again
    }
}

                                                //function used for alarm playing sound ends

                                                //function used to update values of h2

function updateValue(key,value){
    if (value<0) {
        value=0;
        console.log("positive numbers only");           //one should not put value less than 0
    }

    if (key=='second') {
        if (value<10) {
            value="0"+value;                           //to add 0's on decimal place if seconds are in single digit
        }
    }

    if (key=='second' && value>59) {
        value=59;                                      //if one update seconds more than 59 then to set value of seconds to 59
    }

    $("#"+key).html(value||0);                          //key(i.e. minutes/seconds) selector.html updater
    timerObj[key]=value;

    console.log("Min",timerObj.minute);
    console.log("Sec",timerObj.second);
}

                                                //updateValue() function ends

                                                //fuction written to detect changes if user update values

(function detectChanges(key){
    let input="#"+key+"-input";                            //selector

    $(input).change(function(){                          //to call updateValue() fuction to update html...if keyboard is used to update values
        updateValue(key,$(input).val());
    });

    $(input).keyup(function(){                          //to call updateValue() fuction to update html...if up-down keys is used to update values
        updateValue(key,$(input).val());
    });

    return arguments.callee;
})("minute")("second");

                                                //detect changes fuction end

                                                //button opartion start

function startTimer(){
    buttonManager(["start",false],["stop",true],["pause",true]);
    freezeInput();

    timerObj.timerId=setInterval(function(){
        timerObj.second--;
        if(timerObj.second<0)
        {
            if(timerObj.minute==0)
            {
                soundAlarm();;
                return stopTimer();
            }
            timerObj.second=59;
            timerObj.minute--;
        }
        updateValue("minute",timerObj.minute);
        updateValue("second",timerObj.second);
    },1000);
}

function stopTimer(){
    clearInterval(timerObj.timerId);
    buttonManager(["start",true],["pause",false],["stop",false]);
    unfreezeInput();
    updateValue("minute",$("#minute-input").val());
    updateValue("second",$("#second-input").val());
}

function pauseTimer(){
    buttonManager(["start",true],["pause",false],["stop",true]);
    clearInterval(timerObj.timerId);
}


function buttonManager(...buttonArray){                                  //accepts entire array passed by above 3 fuctions
    for(let i=0;i<buttonArray.length;i++){                               //for each button
        let button="#"+buttonArray[i][0]+"-button";                      //selector
        if (buttonArray[i][1]) {
            $(button).removeAttr("disabled");                           //it removes disabled attribute
        }
        else {
            $(button).attr("disabled","disabled");                      ////it adds disabled attribute... syntax is so
        }
    }
}

                                                                    //button opartion end

                                                                    //fuction to freeze inputes when timer starts

function freezeInput(){
    $("#minute-input").attr("disabled","disabled");
    $("#second-input").attr("disabled","disabled");
}
function unfreezeInput(){
    $("#minute-input").removeAttr("disabled");
    $("#second-input").removeAttr("disabled");
}
