document.getElementById("player").addEventListener("submit", (event) => {
    event.preventDefault();

    //console.log(JSON.stringify(event.currentTarget.elements));
    const name = document.getElementById("name");
    document.getElementById("intro").style.display = "none";
    document.getElementById("game").style.display = "flex";

    let pause = true;
    let days = 1;
    let hours = 0;
    let minutes = 0;
    let points = 0;
    let time = 0;
    let tickdelta = 0;
    
    document.getElementById("play").addEventListener("mousedown", (event) => {
        if (pause){
            pause = false;
            document.getElementById("play").innerText = "⏸️ Pause";
            time = performance.timeOrigin + performance.now();
            window.requestAnimationFrame(tick);
        } else if (!pause) {
            pause = true;
            document.getElementById("play").innerText = "▶️ Play";
        }
    });

    const tick = (timelapse) => {
        tickdelta = (performance.timeOrigin + timelapse) - time;
        time = performance.timeOrigin + timelapse;

        if (!pause){

            if (minutes < 59){
                minutes = minutes+1;
                if (minutes < 10){
                    document.getElementById("minutes").innerText = "0"+minutes;
                } else {
                    document.getElementById("minutes").innerText = minutes;
                }
            } else {
                minutes = 0;
                if (hours < 24){
                    hours = hours+1;
                    if (hours < 13){
                        document.getElementById("hours").innerText = " " +hours;
                        if (hours == 12){
                            document.getElementById("ampm").innerText = " PM";
                        } else {
                            document.getElementById("ampm").innerText = " AM";
                        }
                    } else {
                        document.getElementById("hours").innerText = " " + (hours-12);
                        if ((hours-12) == 12){
                            document.getElementById("ampm").innerText = " AM";
                        } else {
                            document.getElementById("ampm").innerText = " PM";
                        }
                    }
                } else {
                    hours = 0;
                    minutes = 0;
                    days = days + 1;
                    document.getElementById("days").innerText = " " + days + " ";
                }
            }
            window.requestAnimationFrame(tick);

        }
    };

    let trendpool = [
        {
            "Name": "Salt Water",
            "Summary": "Pastor Joshua says something bad is about to happen, members of his church and all Christians should wake up at night and drink salt water for protection.",
            "Country": "NG",
            "Engagement": 154,
            "R0": 3,
            "Factual": 0,
            "Harm": 3,
            "Damage": 8,
            "Damage Summary": "people have died from salt poisoning and dehydration"
        },
        {
            "Name": "Cold Palmer",
            "Summary": "Cole Palmer scores again and does his cold celebration and people are calling him `cold palmer` and claiming he's the best player to ever play in the English Premier League",
            "Country": "NG",
            "Engagement": 12,
            "R0": 5,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Damage Summary": "people have wasted their time and electricity arguing if cole palmer is the best premier league player"
        },
        {
          "Name": "Nyashinski is back",
          "Summary": "To whom it may concern, kenyan rapper and songwriter is back with a banging album.",
          "Country": "KE",
          "Engagement": 21,
          "R0": 2,
          "Factual": 1,
          "Harm": 1,
          "Damage": 1,
          "Damage Summary": "people have wasted their time and electricity sharing excitement and praise for his album"
        },
        {
          "Name": "#GGC",
          "Summary": "The Bank of Ghana recently launched the Ghana Gold Coin (GGC), a new investment option aimed at stabilizing the economy and reducing excess liquidity.",
          "Country": "GH",
          "Engagement": 14,
          "R0": 0,
          "Factual": 1,
          "Harm": 1,
          "Damage": 1,
          "Damage Summary": "people have wasted their time and electricity speculating its future value"
        },
        {
          "Name": "WAEC Result",
          "Summary": "The West African Examination Council results are being shared by students and others.",
          "Country": "NG",
          "Engagement": 5,
          "R0": 1,
          "Factual": 2,
          "Harm": 1,
          "Damage": 2,
          "Damage Summary": "people have been emotionally distressed comparing their WAEC results with those being posted."
        },
        {
          "Name": "Cucurella",
          "Summary": "clips of Chelsea player cucurella slipping to a dribble and nutmeg from Fulham player Alex Iwobi",
          "Country": "KE",
          "Engagement": 5,
          "R0": 3,
          "Factual": 1,
          "Harm": 1,
          "Damage": 1,
          "Damage Summary": "people have wasted their time and electricity attacking or defending cucurella"
        },
        {
          "Name": "Rema",
          "Summary": "Afrobeats artist Rema dissociates himself with afrobeats, calls his style afro rave.",
          "Country": "NG",
          "Engagement": 1,
          "R0": 1,
          "Factual": 2,
          "Harm": 1,
          "Damage": 1,
          "Damage Summary": "people have wasted their time and electricity attacking or defending rema."
        },
        {
          "Name": "",
          "Summary": "",
          "Engagement": 1,
          "R0": 1,
          "Factual": 1,
          "Harm": 1,
          "Damage": 1,
          "Damage Summary": ""
        }
    ];
});