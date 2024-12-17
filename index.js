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
    let funding = 950;
    let time = 0;
    let tickdelta = 0;
    let seenTrends = [];
    let currentTrends = [];
    
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

    document.getElementById("notif").addEventListener("mousedown", (event) => {
        pause = true;
        document.getElementById("play").innerText = "▶️ Play";
        document.getElementById("factools").style.display = "none";
        document.getElementById("messages").style.display = "block";
    });

    document.getElementById("factgpt").addEventListener("mousedown", (event) => {
        if (pause){
            pause = false;
            document.getElementById("play").innerText = "⏸️ Pause";
            time = performance.timeOrigin + performance.now();
            window.requestAnimationFrame(tick);
        }
        let die = Math.floor(1+Math.random()*2);
        if (die<2){
            let tid = document.getElementById("tactions").getAttribute("class").substring(2);
            if (trendpool[tid]["Factual"] == 0){
                document.getElementById("tresult").innerText = "FactGPT: The '" + trendpool[tid]["Name"] + "' Trend is Not Factual. But as an AI Language Model, I Cannot Predict Future Events Or Trends.";
            } else if (trendpool[tid]["Factual"] == 1){
                document.getElementById("tresult").innerText = "FactGPT: The '" + trendpool[tid]["Name"] + "' Trend is Factual. But as an AI Language Model, I Cannot Predict Future Events Or Trends.";
            } else {
                document.getElementById("tresult").innerText = "FactGPT: As an AI Language Model, I cannot determine if this trend is factual or harmful.";
            }
        } else {
            let tid = document.getElementById("tactions").getAttribute("class").substring(2);
            let dieai = Math.floor(1+Math.random()*3);
            if (dieai == 1){
                document.getElementById("tresult").innerText = "FactGPT: The '" + trendpool[tid]["Name"] + "' Trend is Factual. But as an AI Language Model, I Cannot Predict Future Events Or Trends.";
            } else if (dieai == 2) {
                document.getElementById("tresult").innerText = "FactGPT: The '" + trendpool[tid]["Name"] + "' Trend is Not Factual. But as an AI Language Model, I Cannot Predict Future Events Or Trends.";
            } else {
                document.getElementById("tresult").innerText = "FactGPT: As an AI Language Model, I cannot ascertain if a trend is factual or harmful.";
            }
        }
        funding = funding - 1;
        document.getElementById("notif").innerText = "🏦 " + funding + "k ✉️ 0";
    });

    document.getElementById("factcheck").addEventListener("mousedown", (event) => {
        if (pause){
            pause = false;
            document.getElementById("play").innerText = "⏸️ Pause";
            time = performance.timeOrigin + performance.now();
            window.requestAnimationFrame(tick);
        }
        let tid = document.getElementById("tactions").getAttribute("class").substring(2);
        if (trendpool[tid]["Factual"] == 0){
            if (trendpool[tid]["Damage"] > 1){
                let adj = "";
                if (trendpool[tid]["Damage"] < 4) {
                    adj = "somewhat";
                } else if (trendpool[tid]["Damage"] < 7) {
                    adj = "";
                } else if (trendpool[tid]["Damage"] < 9){
                    adj = "very";
                } else {
                    adj = "extremely";
                }
                document.getElementById("tresult").innerText = "This '" + trendpool[tid]["Name"] + "' Trend is Not Factual. And we think could be " + adj + " Harmful.";
            } else {
                document.getElementById("tresult").innerText = "This '" + trendpool[tid]["Name"] + "' Trend is Not Factual. But we see no reason to suggest that it would cause any Harm.";
            }
        } else if (trendpool[tid]["Factual"] == 1){
            document.getElementById("tresult").innerText = "The details of this '" + trendpool[tid]["Name"] + "' Trend are Confirmed to be Factual.";
        } else {
            document.getElementById("tresult").innerText = "Trends like '" + trendpool[tid]["Name"] + "' do not imply anything that could be fact or fiction";
        }
        if (hours < 18){
            hours = hours+6;
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
            hours = 0 + (6-(24-hours));
            minutes = 0;
            days = days + 1;
            document.getElementById("days").innerText = " " + days + " ";
        }

        funding = funding - 10;
        document.getElementById("notif").innerText = "🏦 " + funding + "k ✉️ 0";
    });

    document.getElementById("factcheque").addEventListener("mousedown", (event) => {
        if (pause){
            pause = false;
            document.getElementById("play").innerText = "⏸️ Pause";
            document.getElementById("factools").style.display = "none";
            document.getElementById("messages").style.display = "block";
            time = performance.timeOrigin + performance.now();
            window.requestAnimationFrame(tick);
        }
        let tid = document.getElementById("tactions").getAttribute("class").substring(2);
        let eng = trendpool[tid]["Engagement"];
        let adcost = 0.1 * eng;
        funding = funding - Math.floor(adcost);
        document.getElementById("notif").innerText = "🏦 " + funding + "k ✉️ 0";
        if (trendpool[tid]["R0"] > 0){
            trendpool[tid]["R0"] = 0 - trendpool[tid]["R0"];
        }
    });

    const trendtutorial = () => {
        document.getElementById("trendlist").innerHTML = "";
        for (let i=0; i<6; i++){
            const trend = {
                "id" : i,
                "en" : trendpool[i]["Engagement"]
            };
            currentTrends.push(trend);
        }

        currentTrends.sort( (p1, p2) => {
            if (p1["Engagement"] < p2["Engagement"]) return -1;
            if (p1["Engagement"] > p2["Engagement"]) return 1;
            return 0;
        });

        for (let i=0; i<currentTrends.length; i++){
            let trendid = currentTrends[i]["id"];
            let trenditem = document.createElement("div");
            trenditem.setAttribute("class", "trenditem");
			trenditem.setAttribute("id", "t_"+trendid);
            let trendname = document.createElement("div");
            trendname.setAttribute("class", "trendname");
            trendname.innerText = trendpool[trendid]["Name"];
            trenditem.append(trendname);
            let trendspeed = document.createElement("div");
            trendspeed.setAttribute("class", "trendspeed");
            trendspeed.innerText = trendpool[trendid]["R0"] + "⚡";
            trenditem.append(trendspeed);
            document.getElementById("trendlist").append(trenditem);
			document.getElementById("t_"+trendid).addEventListener("click", (e) => {
                let tid = e.currentTarget.id.substring(2);
                pause = true;
                document.getElementById("play").innerText = "▶️ Play";
                document.getElementById("factools").style.display = "block";
                document.getElementById("messages").style.display = "none";
                document.getElementById("tname").innerText = "Trending: " + trendpool[tid]["Name"];
                document.getElementById("tspeed").innerText = "R0: " + trendpool[tid]["R0"];
                document.getElementById("tsummary").innerText = trendpool[tid]["Summary"];
                document.getElementById("tactions").setAttribute("class", "t_"+tid);
                document.getElementById("tresult").innerText = "";
			});
        }
    }

    const trendhours = () => {

    }

    const trendqday = () => {

    }

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
    trendtutorial();
});