//this is the biggest mess i have ever been responsible for, excluding anything my mum tells you
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getDatabase, ref, set, query, onValue, orderByChild, limitToFirst, limitToLast, endBefore, startAfter } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB6lWdy9Xx7LTwgQCMY6V7cwTdlUDE5NOA",
    authDomain: "gameupjam.firebaseapp.com",
    databaseURL: "https://gameupjam-default-rtdb.firebaseio.com",
    projectId: "gameupjam",
    storageBucket: "gameupjam.firebasestorage.app",
    messagingSenderId: "956331264348",
    appId: "1:956331264348:web:9869ee360978e74a825999"
};

const defaultProject = initializeApp(firebaseConfig);
const defaultAuth = getAuth(defaultProject);
const defaultData = getDatabase(defaultProject);

const shareData = {
    title: "Infodemic",
    text: "Share Infodemic to a Friend!",
    url: "https://learningmike.itch.io/infodemic",
};
  
document.getElementById("share").addEventListener("mousedown", async () => {
    try {
        await navigator.share(shareData);
    } catch (err) {
        console.log(err);
    }
});
document.getElementById("sharend").addEventListener("mousedown", async () => {
    try {
        await navigator.share(shareData);
    } catch (err) {
        console.log(err);
    }
});

document.getElementById("replay").addEventListener("mousedown", (event) => {
    window.location.reload();
});

const avatars = [
    "👨🏾",
    "👩🏾",
    "👦🏾",
    "👧🏾",
    "👨🏿",
    "👩🏿",
    "👦🏿",
    "👧🏿",
    "👨🏽",
    "👩🏽",
    "👦🏽",
    "👧🏽",
];
let avatarindex = 0;

document.getElementById("changeavatar").addEventListener("mousedown", (event) => {
    if ((avatarindex+1) > 11){
        avatarindex = 0;
        document.getElementById("passport").innerText = avatars[avatarindex];
    } else{
        avatarindex = avatarindex + 1;
        document.getElementById("passport").innerText = avatars[avatarindex];
    }
});

const countries = [
    "🇳🇬",
    "🇰🇪",
    "🇬🇭",
    "🏴‍☠️"
]
let countryindex = 0;

document.getElementById("changecountry").addEventListener("mousedown", (event) => {
    if ((countryindex+1) > 3){
        countryindex = 0;
        document.getElementById("country").innerText = countries[countryindex];
    } else{
        countryindex = countryindex + 1;
        document.getElementById("country").innerText = countries[countryindex];
    }
});

const role = [
    "Information Scientist",
    "Information Strategist",
    "Information Specialist"
];

signInAnonymously(defaultAuth).then(() => {
    // Signed in..
}).catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
});
onAuthStateChanged(defaultAuth, (user) => {
    if (user) {
        if (user.displayName != null){
            document.getElementById("name").value= user.displayName;
            if (user.photoURL != null){
                let avantry = user.photoURL.split("_");
                document.getElementById("passport").innerText = avatars[parseInt(avantry[0])];
                document.getElementById("country").innerText = countries[parseInt(avantry[1])];
                avatarindex = parseInt(avantry[0]);
                countryindex = parseInt(avantry[1]);
            }
        }
    } else {
        // Signed out..
    }
});

let rank = 6;
let tpquery = query(ref(defaultData, "/"), orderByChild('points'), limitToLast(6));
onValue(tpquery, (snapshot) => {
    document.getElementById("toplayers").innerHTML = "";
    snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        let ldbp = document.createElement("div");
        ldbp.setAttribute("class", "ldbplayer");
        let ldbprank = document.createElement("span");
        ldbprank.innerText = rank + " | ";
        ldbp.append(ldbprank);
        rank = rank - 1;
        let ldbpavt = document.createElement("span");
        ldbpavt.setAttribute("class", "ldbdhead");
        ldbpavt.innerText = avatars[childData.avatar];
        ldbp.append(ldbpavt);
        let ldbpname = document.createElement("span");
        ldbpname.setAttribute("class", "ldbdname");
        ldbpname.innerText = childData.name;
        ldbp.append(ldbpname);
        let ldbpscore = document.createElement("span");
        ldbpscore.setAttribute("class", "ldbdscore");
        ldbpscore.innerText = childData.points + " ₧";
        ldbp.append(ldbpscore);
        let ldbpcn = document.createElement("span");
        ldbpcn.setAttribute("class", "ldbdflag");
        ldbpcn.innerText = countries[childData.country];
        ldbp.append(ldbpcn);
        document.getElementById("toplayers").prepend(ldbp);
    }, {
        onlyOnce: true
    });
}, (err) => {
    // error callback is not called
});

document.getElementById("player").addEventListener("submit", (event) => {
    event.preventDefault();

    //oh i'm going mad
    // we're doing it LIIIIIIIVE!
    // the sound of MUSICK
    var soundevice = new (window.AudioContext || window.webkitAudioContext || window.audioContext);
    var amplitude = 0.01;
    var duration = 3800;
    var instrument = "piano";
    var playnote = (note, octave, callback) => {

        /**
            * noteoctave C0 = 16.35160, A4 = 440 [Equal Temperament]
            * Frequency = 16.35160*(1.05946309436**((note-1)+(12*octave)))
            * note is from 1 representing C to 12 representing B
            * octave is from 0-8
            * MIDI = (note-1) + (12*(octave+1)) #one day i'll have a keyboard
        */

        switch (note) {
            case "c":
                    var pitch = (32.703*(2**(octave-1)));
                    //future me this is just some shortcut to save performance, we don't calculate the x1.059 difference between pitches
                break;
            case "d":
                    var pitch = (36.708*(2**(octave-1)));
                break;
            case "e":
                    var pitch =  (41.203*(2**(octave-1)));
                break;
            case "f":
                    var pitch =  (43.654*(2**(octave-1)));
                break;
            case "g":
                    var pitch =  (48.999*(2**(octave-1)));
                break;
            case "a":
                    var pitch =  (55.000*(2**(octave-1)));
                break;
            case "b":
                    var pitch =  (61.735*(2**(octave-1)));
                break;
                    
            default:
                    var pitch = 0;
                break;
        }

        //more instruments? hell yeah

        var oscillator = soundevice.createOscillator();
        var gainNode = soundevice.createGain();

        gainNode.connect(soundevice.destination);
        gainNode.gain.value = amplitude;
        gainNode.gain.cancelScheduledValues(soundevice.currentTime);
        gainNode.gain.setValueAtTime(0.0001, soundevice.currentTime);
        if (instrument == "piano") {
            //i know it still doesn't sound like a piano, i just can't find someone who recorded the envelope accurately
            //also the sheet music was composed in pianotest so this is about the song not the code running it
            gainNode.gain.exponentialRampToValueAtTime(amplitude, soundevice.currentTime + 0.1); //attack
            gainNode.gain.exponentialRampToValueAtTime(amplitude-(amplitude/2), soundevice.currentTime + 0.1 + 0.1); //decay
            gainNode.gain.exponentialRampToValueAtTime(0.0001, soundevice.currentTime + 0.1 + 0.15 + 1.8); //release
        }
        oscillator.connect(gainNode);
        oscillator.type = "sine";
        oscillator.frequency.value = pitch;

        if (callback){
            oscillator.onended = callback;
        }
                    
        oscillator.start(soundevice.currentTime);
        oscillator.stop(soundevice.currentTime + ((duration || 500) / 1000));
    };

    const piece = "----d4------d4--d4----e4-----d4------d4--d4----f4----d4------d4--d4----g4----d4------d4--d4----f4----d4------d4--d4----e4----d4------d4--d4----e4-----d4------d4--d4----f4----d4------d4--d4----g4----d4------d4--d4----f4----d4------d4--d4----e4----d4------d4--d4----e4-----d4------d4--d4----f4----d4------d4--d4----g4----d4------d4--d4----f4----d4------d4--d4----e4----d4------d4--d4----e4-----d4------d4--d4----f4----d4------d4--d4----g4----d4------d4--d4----f4----d4------d4--d4----e4----d4------d4--d4----e4-----d4------d4--d4----f4----d4------d4--d4----g4----d4------d4--d4----f4----d4------d4--d4----e4----d4------d4--d4----e4-----d4------d4--d4----f4----d4------d4--d4----g4----d4------d4--d4----f4----d4------d4--d4----e4----d4------d4--d4----e4-----d4------d4--d4----f4----d4------d4--d4----g4----d4------d4--d4----f4----d4------d4--d4----e4----d4------d4--d4----e4-----d4------d4--d4----f4----d4------d4--d4----g4----d4------d4--d4----f4----d4------d4--d4----e4----d4------d4--d4----e4-----d4------d4--d4----f4----d4------d4--d4----g4----d4------d4--d4----f4----d4------d4--d4----e4----d4------d4--d4----e4-----d4------d4--d4----f4----d4------d4--d4----g4----d4------d4--d4----f4----d4------d4--d4----e4----d4------d4--d4----e4-----d4------d4--d4----f4----d4------d4--d4----g4----d4------d4--d4----f4----d4------d4--d4----e4----d4------d4--d4----e4-----d4------d4--d4----f4----d4------d4--d4----g4----d4------d4--d4----f4----d4------d4--d4----e4";
    var count = 0;
    var end = piece.length - 1;
    var reader = 0;

    var isnote = (letter) => {
        switch (letter) {
            case "c":
                return true;
                break;

            case "d":
                return true;
                break;

            case "e":
                return true;
                break;
                                
            case "f":
                return true;
                break;
                                
            case "g":
                return true;
                break;
                                
            case "a":
                return true;
                break;
                                
            case "b":
                return true;
                break;
                            
            default:
                return false;
                break;
        }
    }

    setInterval(() =>{
        if (end >= 2){

            reader = count % end;
            //console.log("count:" + count + " reader:"+reader);
        
            if (isnote(piece[reader])) {
        
                //check for Chords, 4 keys maximum
                if (isnote(piece[reader+2]) && isnote(piece[reader+4]) && isnote(piece[reader+6])) {
        
                    //4 keys
                    playnote(piece[reader], parseInt(piece[reader+1]));
                    playnote(piece[reader+2], parseInt(piece[reader+3]));
                    playnote(piece[reader+4], parseInt(piece[reader+5]));
                    playnote(piece[reader+6], parseInt(piece[reader+7]));
                    count += 8;
        
                } else if (isnote(piece[reader+2]) && isnote(piece[reader+4])){
        
                    //3 keys
                    playnote(piece[reader], parseInt(piece[reader+1]));
                    playnote(piece[reader+2], parseInt(piece[reader+3]));
                    playnote(piece[reader+4], parseInt(piece[reader+5]));
                    count += 6;
        
                } else if (isnote(piece[reader+2])){
        
                    //2 keys
                    playnote(piece[reader], parseInt(piece[reader+1]));
                    playnote(piece[reader+2], parseInt(piece[reader+3]));
                    count += 4;
        
                } else {
        
                    //1 key
                    playnote(piece[reader], parseInt(piece[reader+1]));
                    count += 2;
                                                
                }
            } else if (piece[reader] == "-"){
                count +=1;
            } else if (parseInt(piece[reader]) >= 1 && parseInt(piece[reader]) <= 7){
                count += 1;
            } else {
                console.log("ERROR: Cannot understand your music ;-)");
            }
        }
    }, 100);

    //console.log(JSON.stringify(event.currentTarget.elements));
    const name = document.getElementById("name").value;
    document.getElementById("received").innerText = "Hi " + name.split(" ")[0]+". Welcome to Fact Inc! I am thrilled to have you join our mission to save lives. You read that right! Here you will see how dangerous misinf... ahem, Lies can be. Now let's get to work, press play...";
    
    /**
        This is temporary since i there's no time to create a messaging system, which is essentially the narrative system of this game.
        We'll have to make do with an introduction and instructions on how to play the game by text suggestion.

    **/
    let instr = 0;
    let mybe = 0;


    if (defaultAuth.currentUser.isAnonymous){
        updateProfile(defaultAuth.currentUser, {
            displayName: name,
            photoURL: avatarindex+"_"+countryindex
        });
    }

    document.getElementById("intro").style.display = "none";
    document.getElementById("game").style.display = "flex";

    let pause = true;
    let days = 1;
    let hours = 0;
    let minutes = 0;
    let points = 0;
    let funding = 950;
    let time = 0;
    let seenTrends = [];
    let currentTrends = [];
    
    document.getElementById("play").addEventListener("mousedown", (event) => {
        if (instr == 0){
            document.getElementById("received").innerHTML = "Time's ticking. Here's how you do it, click on the trending topics to your right and try to determine if they're factual or harmful. Use <b>FactCheque™</b>, to stop a trend. Act fast and efficiently, harmful trends could cause a lot of damage if they go unchecked.";
            instr = 1;
        }
        playnote ("d", 3);
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
        playnote ("d", 3);
        pause = true;
        document.getElementById("play").innerText = "▶️ Play";
        document.getElementById("factools").style.display = "none";
        document.getElementById("messages").style.display = "block";
        if (mybe == 0 && instr == 1){
            document.getElementById("received").innerText = "If only the person writing these words had enough time to complete this. I'd be writing you letters, i mean messages, giving you feedback and transfering some of my experience in this world of retrospection to you. But don't give up, you'll get there.";
            mybe = 1;
        } else if (mybe == 1 && instr == 1) {
            let die = Math.floor(1+Math.random()*8);
            switch (die) {
                case 1:
                    if (avatarindex%2 == 0) {
                        document.getElementById("received").innerText = "Oh, sorry Madam. I know i'm your CEO but can you take up some initiative. I can't believe this company can't do anything without me, haba "+ name.split(" ")[0]+".";
                    } else {
                        document.getElementById("received").innerText = "Oh, sorry Oga. I know i'm your CEO but can you take up some initiative. I can't believe this company can't do anything without me, haba "+ name.split(" ")[0]+".";
                    }
                    break;
                case 2:
                    document.getElementById("received").innerText = "Hi "+name.split(" ")[0]+", Working hard or hardly working. Hee hee";
                    break;
                case 3:
                    document.getElementById("received").innerText = "You know, i used to ride my bike to work when i started this company. I was skinny like you, then i started driving big cars, look at me now.";
                    break;
                case 4:
                    document.getElementById("received").innerText = "“Democracy is the government of the people, by the people, for the people.” And “Democracy is the worst form of Government except for all those other forms that have been tried from time to time.” - Winston Churchill";
                    break;
                case 5:
                    document.getElementById("received").innerText = "Oh good day " + name.split(" ")[0]+ ", you look confused. Have you met HR? you should be well oriented by now.";
                    break;
                case 6:
                    document.getElementById("received").innerText = "It's disturbing how much planning goes into some disinformation campaigns, are their goals and thirst for power that much? It's even more disturbing how funding for fact-checking dries up during the election period.";
                    break;
                case 7:
                    document.getElementById("received").innerText = "Don't Forget To Be Awesome";
                    break;
            
                default:
                    break;
            }
        }
    });

    document.getElementById("factgpt").addEventListener("mousedown", (event) => {
        playnote ("d", 3);
        if (pause){
            pause = false;
            document.getElementById("play").innerText = "⏸️ Pause";
            time = performance.timeOrigin + performance.now();
            window.requestAnimationFrame(tick);
        }
        let die = Math.floor(1+Math.random()*4);
        if (die<2){
            let tid = document.getElementById("tactions").getAttribute("class").substring(2);
            if (trendpool[tid]["Factual"] == 0){
                document.getElementById("tresult").innerText = "FactGPT: The '" + trendpool[tid]["Name"] + "' Trend is Not Factual.";
            } else if (trendpool[tid]["Factual"] == 1){
                document.getElementById("tresult").innerText = "FactGPT: The '" + trendpool[tid]["Name"] + "' Trend is Factual.";
            } else {
                document.getElementById("tresult").innerText = "FactGPT: As an AI Language Model, I cannot determine if this trend is factual or harmful.";
            }
        } else {
            let tid = document.getElementById("tactions").getAttribute("class").substring(2);
            let dieai = Math.floor(1+Math.random()*3);
            if (dieai == 1){
                document.getElementById("tresult").innerText = "FactGPT: The '" + trendpool[tid]["Name"] + "' Trend is Factual.";
            } else if (dieai == 2) {
                document.getElementById("tresult").innerText = "FactGPT: The '" + trendpool[tid]["Name"] + "' Trend is Not Factual.";
            } else {
                document.getElementById("tresult").innerText = "FactGPT: As an AI Language Model, I cannot ascertain if a trend is factual or harmful.";
            }
        }

        if ((funding - 1) > 0){
            funding = funding - 1;
            document.getElementById("notif").innerText = "🏦 " + funding + "k ✉️ 0";
        } else {
            funding = 0;
            document.getElementById("notif").innerText = "🏦 " + funding + "k ✉️ 0";
            endgame();
        }
    });

    document.getElementById("factcheck").addEventListener("mousedown", (event) => {
        playnote ("d", 3);
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
            document.getElementById("tresult").innerText = "Trends like '" + trendpool[tid]["Name"] + "' do not imply anything that could be fact or fiction, yet.";
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
            hours = 1 + (6-(24-hours));
            minutes = 0;
            days = days + 1;
            document.getElementById("days").innerText = " " + days + " ";
        }

        if (trendpool[tid]["R0"] > 0 && trendpool[tid]["Harm"] > 6){
            //message recommending fact chequeing
        }

        if ((funding - 10) > 0){
            funding = funding - 10;
            document.getElementById("notif").innerText = "🏦 " + funding + "k ✉️ 0";
        } else {
            funding = 0;
            document.getElementById("notif").innerText = "🏦 " + funding + "k ✉️ 0";
            endgame();
        }
    });

    document.getElementById("factcheque").addEventListener("mousedown", (event) => {
        playnote ("d", 3);
        if (pause){
            pause = false;
            document.getElementById("play").innerText = "⏸️ Pause";
            time = performance.timeOrigin + performance.now();
            window.requestAnimationFrame(tick);
        }
        let tid = document.getElementById("tactions").getAttribute("class").substring(2);
        let eng = trendpool[tid]["Engagement"];
        let adcost = 1 * eng;
        
        if ((funding - Math.floor(adcost)) > 0){
            funding = funding - Math.floor(adcost);
            document.getElementById("notif").innerText = "🏦 " + funding + "k ✉️ 0";
        } else {
            funding = 0;
            document.getElementById("notif").innerText = "🏦 " + funding + "k ✉️ 0";
            endgame();
        }

        if (trendpool[tid]["R0"] > 0){
            trendpool[tid]["R0"] = 0 - trendpool[tid]["R0"];
        }
        document.getElementById("factools").style.display = "none";
        document.getElementById("messages").style.display = "block";
    });

    const trendtutorial = () => {
        document.getElementById("trendlist").innerHTML = "";
        for (let i=0; i<6; i++){
            let trend = {
                "id" : i,
                "en" : trendpool[i]["Engagement"]
            };
            currentTrends.push(trend);
        }

        currentTrends.sort( (p1, p2) => {
            if (p1["en"] < p2["en"]) return 1;
            if (p1["en"] > p2["en"]) return -1;
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
                playnote ("d", 3);
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

        document.getElementById("trendlist").innerHTML = "";

        for (let i=0; i<currentTrends.length; i++){
            let trendid = currentTrends[i]["id"];
            trendpool[trendid]["Engagement"] = Math.floor(trendpool[trendid]["Engagement"] + (trendpool[trendid]["R0"]*trendpool[trendid]["Engagement"]*0.03));
            currentTrends[i]["en"] = trendpool[trendid]["Engagement"];
        }

        currentTrends.sort((a, b) => {
            return b["en"] - a["en"];
        });

        currentTrends.forEach((item) => {
            let trendid = item["id"];
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
                playnote ("d", 3);
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
        });
    }

    const trendhalfday = () => {

        let removed = currentTrends.pop();

        currentTrends.forEach((item) => {

            let trendid = item["id"];
            let dday = (Math.ceil((trendid+1)/6)+1);

            if ((days == dday)&&(trendpool[trendid]["R0"] > 0)) {
                trendpool[trendid]["R0"] = 0 - trendpool[trendid]["R0"];
            }
            if (trendpool[trendid]["Damage"] > trendpool[trendid]["Harm"]){
                trendpool[trendid]["Harm"] = trendpool[trendid]["Harm"] + 1;
            }
        });
        
        
        if (trendpool[removed["id"]]["Harm"] > 1){
            if ((trendpool[removed["id"]]["Damage"] - trendpool[removed["id"]]["Harm"]) > 0 ){
                seenTrends.push(removed);
                points = points + ((trendpool[removed["id"]]["Damage"] - trendpool[removed["id"]]["Harm"])*Math.abs(trendpool[removed["id"]]["R0"]));
            }

            if (trendpool[removed["id"]]["Harm"] > 6){
                endgame(trendpool[removed["id"]]);
            } else if (trendpool[removed["id"]]["Harm"] > 2) {
                if (trendpool[removed["id"]]["Harm"] == trendpool[removed["id"]]["Damage"]){
                    //message: you let it get this bad
                } else {
                    //message: just letting you know you could be bit faster
                }
            }

        }

        let newtrendid = 0;
        if (document.getElementById("ampm").innerText == " AM"){
            newtrendid = ((days)*6) + Math.floor(0+Math.random()*3);
        } else if (document.getElementById("ampm").innerText == " PM"){
            newtrendid = ((days)*6) + Math.floor(3+Math.random()*3);
        }

        let newtrend = {
            "id" : newtrendid,
            "en" : trendpool[newtrendid]["Engagement"]
        };
        currentTrends.push(newtrend);
    }

    const tick = (timelapse) => {
        time = performance.timeOrigin + timelapse;

        var oscillator2 = soundevice.createOscillator();
        var gain2 = soundevice.createGain();
        oscillator2.connect(gain2);
        gain2.connect(soundevice.destination);
        gain2.gain.value = 0.0004;
        oscillator2.type = "sine";
        oscillator2.frequency.value = 440;

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
                trendhours();
                //playnote("d", 4);
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
                        if ((hours-12) == 1){
                            trendhalfday();
                        }
                    }
                } else {
                    hours = 1;
                    minutes = 0;
                    days = days + 1;
                    playnote ("c", 4);
                    document.getElementById("days").innerText = " " + days + " ";
                    trendhalfday();
                }
                
                oscillator2.start();
                setTimeout(function () {
                    oscillator2.stop();
                }, 100);
            }
            window.requestAnimationFrame(tick);

        }
    };

    const endgame = (trendcaused = {"Damage":0}) => {

        if (trendcaused["Damage"] == 7 || trendcaused["Damage"] == 4){
            document.getElementById("feedback").innerText("1 person could " + trendcaused["Dsummary"]+ " if this wasn't a game.");
        } else if (trendcaused["Damage"] > 0) {
            document.getElementById("feedback").innerText = trendcaused["Name"] + ": "+Math.floor(2+Math.random()*1000) + " people could " + trendcaused["Dsummary"] + " if this wasn't a game.";
        } else if (points>=14) {
            document.getElementById("feedback").innerText = "Good job! you're somewhere between the best and the worst on the leaderboard.";
        } else {
            document.getElementById("feedback").innerText = "Fact Chequeing is expensive, when you wait until the Trend has already influenced everyone. We simply do not have that marketing budget.";
        }

        pause = true;

        document.getElementById("game").style.display = "none";
        document.getElementById("end").style.display = "block";

        let apoints = 0;
        const bpoints = setInterval(() => {
            if (apoints <= points){
                if (apoints == points){
                    document.getElementById("score").innerText = apoints+" points!";
                } else {
                    document.getElementById("score").innerText = apoints+" points";
                }
                apoints = apoints + 1;
            } else {
                clearInterval(bpoints);
            }
        }, 50);

        set(ref(defaultData, defaultAuth.currentUser.uid), {
            name: name,
            country: countryindex,
            avatar : avatarindex,
            points: points
        }, (error) => {
            if (error) {
                // The write failed...
                console.log(error);
            }
        });
        
        
        let tpquery = query(ref(defaultData, "/"), startAfter(points), orderByChild('points'), limitToLast(3));
        onValue(tpquery, (snapshot) => {
            let ranktop = 1;
            document.getElementById("topthree").innerHTML = "";
            snapshot.forEach((childSnapshot) => {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();

                let bldbp = document.createElement("div");
                bldbp.setAttribute("class", "bldbplayer");
                let bldbprank = document.createElement("span");
                bldbprank.setAttribute("class", "bldbdprank");
                bldbprank.innerText = "+"+ranktop + " | ";
                bldbp.append(bldbprank);
                ranktop = ranktop + 1;
                let bldbpavt = document.createElement("span");
                bldbpavt.setAttribute("class", "bldbdhead");
                bldbpavt.innerText = avatars[childData.avatar];
                bldbp.append(bldbpavt);
                let bldbpname = document.createElement("span");
                bldbpname.setAttribute("class", "bldbdname");
                bldbpname.innerText = childData.name;
                bldbp.append(bldbpname);
                let bldbpscore = document.createElement("span");
                bldbpscore.setAttribute("class", "bldbdscore");
                bldbpscore.innerText = childData.points + " ₧";
                bldbp.append(bldbpscore);
                let bldbpcn = document.createElement("span");
                bldbpcn.setAttribute("class", "bldbdflag");
                bldbpcn.innerText = countries[childData.country];
                bldbp.append(bldbpcn);
                document.getElementById("topthree").prepend(bldbp);
            }, {
                onlyOnce: true
            });
        }, (err) => {
            // error callback is not called
        });

        document.getElementById("thee").innerHTML = "";
        let bldbp = document.createElement("div");
        bldbp.setAttribute("class", "bldbplayer");
        let bldbprank = document.createElement("span");
        bldbprank.setAttribute("class", "bldbdprank");
        bldbprank.innerText = "— | ";
        bldbp.append(bldbprank);
        let bldbpavt = document.createElement("span");
        bldbpavt.setAttribute("class", "bldbdhead");
        bldbpavt.innerText = avatars[avatarindex];
        bldbp.append(bldbpavt);
        let bldbpname = document.createElement("span");
        bldbpname.setAttribute("class", "bldbdname");
        bldbpname.innerText = name;
        bldbp.append(bldbpname);
        let bldbpscore = document.createElement("span");
        bldbpscore.setAttribute("class", "bldbdscore");
        bldbpscore.innerText = points + " ₧";
        bldbp.append(bldbpscore);
        let bldbpcn = document.createElement("span");
        bldbpcn.setAttribute("class", "bldbdflag");
        bldbpcn.innerText = countries[countryindex];
        bldbp.append(bldbpcn);
        document.getElementById("thee").prepend(bldbp);
                
        
        let bpquery = query(ref(defaultData, "/"), orderByChild('points'), limitToFirst(3), endBefore(points));
        onValue(bpquery, (snapshot) => {
            let rankbottom = 3;
            document.getElementById("bottomthree").innerHTML = "";
            snapshot.forEach((childSnapshot) => {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();

                let bldbp = document.createElement("div");
                bldbp.setAttribute("class", "bldbplayer");
                let bldbprank = document.createElement("span");
                bldbprank.setAttribute("class", "bldbdprank");
                bldbprank.innerText = "-"+rankbottom + " | ";
                bldbp.append(bldbprank);
                rankbottom = rankbottom - 1;
                let bldbpavt = document.createElement("span");
                bldbpavt.setAttribute("class", "bldbdhead");
                bldbpavt.innerText = avatars[childData.avatar];
                bldbp.append(bldbpavt);
                let bldbpname = document.createElement("span");
                bldbpname.setAttribute("class", "bldbdname");
                bldbpname.innerText = childData.name;
                bldbp.append(bldbpname);
                let bldbpscore = document.createElement("span");
                bldbpscore.setAttribute("class", "bldbdscore");
                bldbpscore.innerText = childData.points + " ₧";
                bldbp.append(bldbpscore);
                let bldbpcn = document.createElement("span");
                bldbpcn.setAttribute("class", "bldbdflag");
                bldbpcn.innerText = countries[childData.country];
                bldbp.append(bldbpcn);
                document.getElementById("bottomthree").prepend(bldbp);
            }, {
                onlyOnce: true
            });
        }, (err) => {
            // error callback is not called
        });
    }

    let trendpool = [
        {
            "Name": "Salt Water",
            "Summary": "Pastor Temi says something bad is about to happen, members of his church and all Christians should wake up at night and drink salt water for protection.",
            "Country": "NG",
            "Engagement": 14,
            "R0": 8,
            "Factual": 0,
            "Harm": 4,
            "Damage": 8,
            "Dsummary": "have died from salt poisoning and dehydration"
        },
        {
            "Name": "Cold Palmer",
            "Summary": "Cole Palmer scores again and does his cold celebration and people are calling him `cold palmer` and claiming he's the best player to ever play in the English Premier League",
            "Country": "NG",
            "Engagement": 41,
            "R0": 1,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted their time and electricity arguing if cole palmer is the best premier league player"
        },
        {
            "Name": "Nyashinski is back",
            "Summary": "To whom it may concern, kenyan rapper and songwriter is back with a banging album.",
            "Country": "KE",
            "Engagement": 18,
            "R0": 2,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted their time and electricity sharing excitement and praise for his album"
        },
        {
            "Name": "#GGC",
            "Summary": "The Bank of Ghana recently launched the Ghana Gold Coin (GGC), a new investment option aimed at stabilizing the economy and reducing excess liquidity.",
            "Country": "GH",
            "Engagement": 32,
            "R0": 0,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted their time and electricity speculating its future value."
        },
        {
            "Name": "WAEC Result",
            "Summary": "The West African Examination Council results are being shared by students and others.",
            "Country": "NG",
            "Engagement": 15,
            "R0": 2,
            "Factual": 2,
            "Harm": 1,
            "Damage": 2,
            "Dsummary": "have been emotionally distressed comparing their WAEC results with those being posted."
        },
        {
            "Name": "Cucurella",
            "Summary": "clips of Chelsea player cucurella slipping to a dribble and nutmeg from Fulham player Alex Iwobi",
            "Country": "KE",
            "Engagement": 17,
            "R0": 4,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted their time and electricity attacking or defending cucurella."
        },
        {
            "Name": "Rema",
            "Summary": "Afrobeats artist Rema dissociates himself with afrobeats, calls his style afro rave.",
            "Country": "NG",
            "Engagement": 20,
            "R0": 1,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted their time and electricity attacking or defending rema."
        },
        {
            "Name": "Mama Esi's Jollof",
            "Summary": "A popular Nigerian chef's jollof rice recipe has ignited heated debates about which country has the best jollof rice.",
            "Country": "GH",
            "Engagement": 48,
            "R0": 3,
            "Factual": 3,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted time and electricity arguing about jollof superiority."
        },
        {
            "Name": "#SaveLakeVictoria",
            "Summary": "Activists warn that Lake Victoria is shrinking due to pollution and overuse, urging governments to act.",
            "Country": "KE",
            "Engagement": 71,
            "R0": 2,
            "Factual": 3,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have faced water scarcity and increased poverty due to lake depletion."
        },
        {
            "Name": "Obi Cubana",
            "Summary": "Rumors spread that Nigerian businessman Obi Cubana was arrested for alleged fraud.",
            "Country": "NG",
            "Engagement": 12,
            "R0": 5,
            "Factual": 2,
            "Harm": 1,
            "Damage": 2,
            "Dsummary": "have been emotionally distressed due to false allegations causing uncertainty and unrest."
        },
        {
            "Name": "Mlolongo UFO",
            "Summary": "Residents of mlolongo area of outer Nairobi share videos claiming a UFO was spotted hovering over the city.",
            "Country": "KE",
            "Engagement": 29,
            "R0": 6,
            "Factual": 2,
            "Harm": 1,
            "Damage": 3,
            "Dsummary": "have been emotionally distressed by fears of an alien invasion."
        },
        {
            "Name": "#NoMorePlastics",
            "Summary": "Ghanaians are sharing images of beaches filled with plastics, calling for a ban on plastic bags.",
            "Country": "GH",
            "Engagement": 33,
            "R0": 2,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted time and electricity debating solutions without practical implementation."
        },
        {
            "Name": "Nyama Choma",
            "Summary": "A new Nyama Choma restaurant in Nairobi claims to serve the best grilled meat in all of Kenya. Food bloggers and influencers amplify the hype with glowing reviews.",
            "Country": "KE",
            "Engagement": 87,
            "R0": 3,
            "Factual": 3,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted time and energy arguing over restaurant ratings and queuing for hours at the restaurant."
        },
        {
            "Name": "Ghanaian AgriTech",
            "Summary": "A group of Ghanaian teenagers invent a new app that can predict crop yields, gaining recognition. Farmers share their testimonials about its utility.",
            "Country": "GH",
            "Engagement": 7,
            "R0": 2,
            "Factual": 0,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted time and electricity praising the app without understanding its limitations or learning how to use it effectively."
        },
        {
            "Name": "MI",
            "Summary": "Rapper MI Abaga releases a surprise new Album after years of. Fans from across Nigeria listen enthusiastically.",
            "Country": "NG",
            "Engagement": 56,
            "R0": 1,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted time and electricity listening to this album."
        },
        {
            "Name": "France",
            "Summary": "Reports of plans to establish a French military base in Maiduguri calls Nigeria's sovereignty into question.",
            "Country": "NG",
            "Engagement": 19,
            "R0": 5,
            "Factual": 0,
            "Harm": 1,
            "Damage": 3,
            "Dsummary": "have lost trust in the political proccess, leading to increased voter apathy and rising support for a military coup."
        },
        {
            "Name": "#AlhaadRAF",
            "Summary": "A viral video claims a Kenyan political candidate's trip to the United Kingdom, comes with a deal for an RAF base.",
            "Country": "KE",
            "Engagement": 19,
            "R0": 5,
            "Factual": 0,
            "Harm": 1,
            "Damage": 3,
            "Dsummary": "have lost trust in the political proccess, leading to increased voter apathy and rising support for a military coup."
        },
        {
            "Name": "Elmina US Base",
            "Summary": "Land being confiscated by the Ghanaian government for military facilites in Elmina, sparks speculation that it will be a US Military Base.",
            "Country": "GH",
            "Engagement": 19,
            "R0": 5,
            "Factual": 0,
            "Harm": 1,
            "Damage": 3,
            "Dsummary": "have lost trust in the political proccess, leading to increased voter apathy and rising support for a military coup."
        },
        {
            "Name": "Election Cancelled",
            "Summary": "The incumbent Kaduna state governor is planning to cancel the elections this year due to logistical issues, people are angrily reacting.",
            "Country": "NG",
            "Engagement": 63,
            "R0": 4,
            "Factual": 0,
            "Harm": 2,
            "Damage": 7,
            "Dsummary": "died from police brutality during the resulting protests against the state governor, with several others injured."
        },
        {
            "Name": "Election Cancelled",
            "Summary": "The incumbent Kiambu county governor is planning to cancel the elections this year due to logistical issues, people are angrily reacting.",
            "Country": "KE",
            "Engagement": 63,
            "R0": 4,
            "Factual": 0,
            "Harm": 2,
            "Damage": 7,
            "Dsummary": "died from police brutality during the resulting protests against the county governor, with several others injured."
        },
        {
            "Name": "Election Cancelled",
            "Summary": "The incumbent Upper Western Region minister is planning to cancel the elections this year due to logistical issues, people are angrily reacting.",
            "Country": "GH",
            "Engagement": 63,
            "R0": 4,
            "Factual": 0,
            "Harm": 2,
            "Damage": 7,
            "Dsummary": "died from police brutality during the resulting protests against the regional minister, with several others injured."
        },
        {
            "Name": "#HustlerMovement",
            "Summary": "Supporters of a Kenyan political candidate promote his campaign using the hashtag, claiming he will revolutionize the economy for ordinary Kenyans.",
            "Country": "KE",
            "Engagement": 30,
            "R0": 6,
            "Factual": 3,
            "Harm": 1,
            "Damage": 2,
            "Dsummary": "have been emotionally invested in debates over whether the promises will materialize."
        },
        {
            "Name": "It's POssible",
            "Summary": "Supporters of a Nigerian political candidate promote his campaign using the hashtag, claiming he will revolutionize the economy for ordinary Nigerians.",
            "Country": "NG",
            "Engagement": 30,
            "R0": 6,
            "Factual": 3,
            "Harm": 1,
            "Damage": 2,
            "Dsummary": "have been emotionally invested in debates over whether the promises will materialize."
        },
        {
            "Name": "Apam Foforo",
            "Summary": "Supporters of a Ghanaian political candidate promote his campaign using the hashtag, claiming he will revolutionize the economy for ordinary Ghanaians.",
            "Country": "GH",
            "Engagement": 30,
            "R0": 6,
            "Factual": 3,
            "Harm": 1,
            "Damage": 2,
            "Dsummary": "have been emotionally invested in debates over whether the promises will materialize."
        },
        {
            "Name": "#JollofWars",
            "Summary": "The age-old debate between Nigerians and Ghanaians on which country makes the best Jollof rice resurfaces with memes and playful banter.",
            "Country": "NG",
            "Engagement": 55,
            "R0": 8,
            "Factual": 2,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have spent time and electricity on humorous arguments."
        },
        {
            "Name": "#JollofWars",
            "Summary": "The age-old debate between Nigerians and Ghanaians on which country makes the best Jollof rice resurfaces with memes and playful banter.",
            "Country": "GH",
            "Engagement": 55,
            "R0": 8,
            "Factual": 2,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have spent time and electricity on humorous arguments."
        },
        {
            "Name": "Ugali",
            "Summary": "A new online debate between Kenyans and Ugandans on which country makes the best ugali surfaces with memes and playful banter, a few tanzanians watch from the sidelines.",
            "Country": "KE",
            "Engagement": 55,
            "R0": 8,
            "Factual": 2,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have spent time and electricity on humorous arguments."
        },
        {
            "Name": "Super Chickens",
            "Summary": "The Super Eagles of nigeria have failed to qualify for the FIFA World Cup, Ghanaians are calling them super chickens.",
            "Country": "NG",
            "Engagement": 13,
            "R0": 3,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted time and electricity."
        },
        {
            "Name": "Kipchoge",
            "Summary": "People are sharing their thoughts on Kenyan long-distance runner Eliud Kipchoge's legacy and documentary.",
            "Country": "KE",
            "Engagement": 13,
            "R0": 3,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted time and electricity."
        },
        {
            "Name": "Black Stars",
            "Summary": "The Ghanaian national football team's performance during the FIFA World Cup qualifiers generates excitement among fans.",
            "Country": "GH",
            "Engagement": 13,
            "R0": 3,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted time and electricity."
        },
        {
            "Name": "DrYakubu",
            "Summary": "Reports suggest presidential candidate Ahmad's party has struck a deal with the INEC chairman to rig the upcoming election.",
            "Country": "NG",
            "Engagement": 20,
            "R0": 4,
            "Factual": 0,
            "Harm": 1,
            "Damage": 3,
            "Dsummary": "have lost faith in the electoral system, leading to low voting turnouts."
        },
        {
            "Name": "Election Rigging",
            "Summary": "Reports suggest presidential candidate Alhaad's party has struck a deal with the electoral commission to rig the upcoming election.",
            "Country": "KE",
            "Engagement": 20,
            "R0": 4,
            "Factual": 0,
            "Harm": 1,
            "Damage": 3,
            "Dsummary": "have lost faith in the electoral system, leading to low voting turnouts."
        },
        {
            "Name": "#WhyVote?",
            "Summary": "Reports suggest presidential candidate Agyei's party has struck a deal with the electoral commission to rig the upcoming election.",
            "Country": "GH",
            "Engagement": 20,
            "R0": 4,
            "Factual": 0,
            "Harm": 1,
            "Damage": 3,
            "Dsummary": "have lost faith in the electoral system, leading to low voting turnouts."
        },
        {
            "Name": "Ellu Pee",
            "Summary": "Man Exaggerates the syllables of his preferred party in a song, while ballots are being counted.",
            "Country": "NG",
            "Engagement": 5,
            "R0": 7,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted time laughing about old memes."
        },
        {
            "Name": "Githeri Man Comeback",
            "Summary": "The viral sensation 'Githeri Man' made a return to the spotlight during election season, reminding Kenyans of his iconic role in past elections.",
            "Country": "KE",
            "Engagement": 5,
            "R0": 7,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted time laughing reminiscing about old memes and lighthearted election moments."
        },
        {
            "Name": "Economic Maguire",
            "Summary": "Minority MP for Bolgatanga Central likened vice president Bawumia to English player Harry Maguire who has had a difficult time at his club, Manchester United.",
            "Country": "KE",
            "Engagement": 5,
            "R0": 7,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted time laughing at memes and lighthearted election moments."
        },
        {
            "Name": "Coastal Highway",
            "Summary": "The Presidency announces plan to build a coastal highway, concerns about private beach-side investments ar made.",
            "Country": "NG",
            "Engagement": 48,
            "R0": 2,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "emotional distress spread as fans speculated about the motives behind the stunt and its legal consequences."
        },
        {
            "Name": "Shatta Wale Arrest",
            "Summary": "Popular Ghanaian musician Shatta Wale was arrested after faking a gun attack, sparking debates about celebrity influence and accountability.",
            "Country": "GH",
            "Engagement": 48,
            "R0": 2,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "emotional distress spread as fans speculated about the motives behind the stunt and its legal consequences."
        },
        {
            "Name": "#UnityForKenya",
            "Summary": "Religious leaders urge Kenyans to reject divisive politics and focus on national unity during the elections.",
            "Country": "KE",
            "Engagement": 48,
            "R0": 2,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have spent time and electricity amplifying messages of unity and peace."
        },
        {
            "Name": "Open Borders",
            "Summary": "Claims that migrants from neighboring countries are influencing Nigeria's elections gain traction, sparking online outrage.",
            "Country": "NG",
            "Engagement": 70,
            "R0": 5,
            "Factual": 0,
            "Harm": 1,
            "Damage": 5,
            "Dsummary": "have died from violence due to the anger and misinformation led to heightened ethnic tensions and regional mistrust."
        },
        {
            "Name": "#CloseTheBorder",
            "Summary": "Claims that a surdden surge of migrants from neighboring countries are influencing Ghana's elections gain traction, sparking online outrage.",
            "Country": "NG",
            "Engagement": 70,
            "R0": 5,
            "Factual": 0,
            "Harm": 1,
            "Damage": 5,
            "Dsummary": "have died from violence due to the anger and misinformation led to heightened ethnic tensions and regional mistrust."
        },
        {
            "Name": "Border Security",
            "Summary": "Claims that neighboring countries are influencing Kenya's elections gain traction, sparking online outrage.",
            "Country": "KE",
            "Engagement": 70,
            "R0": 5,
            "Factual": 0,
            "Harm": 1,
            "Damage": 5,
            "Dsummary": "have died from violence due to the anger and misinformation led to heightened ethnic tensions and regional mistrust."
        },
        {
            "Name": "NairobiMarathon",
            "Summary": "The annual Nairobi marathon draws attention as athletes from across Africa participate, showcasing talent and sportsmanship.",
            "Country": "KE",
            "Engagement": 7,
            "R0": 2,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have wasted time and electricity following updates and celebrating winners."
        },
        {
            "Name": "#NaijaTechSummit",
            "Summary": "Nigeria's tech summit showcases innovative startups and attracts global investors, trending across the country.",
            "Country": "NG",
            "Engagement": 7,
            "R0": 2,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "have engaged in discussions about Nigeria's growing tech industry."
        },
        {
            "Name": "AccraFashionWeek",
            "Summary": "Ghana's fashion industry takes the spotlight as designers unveil new collections in a glamorous event.",
            "Country": "GH",
            "Engagement": 7,
            "R0": 2,
            "Factual": 1,
            "Harm": 1,
            "Damage": 1,
            "Dsummary": "time and electricity were used sharing and appreciating fashion designs."
        },
        {
            "Name": "Polio Vaccine",
            "Summary": "A viral video shows Bill Gates suggesting to reduce Africa's Population through vaccines.",
            "Country": "NG",
            "Engagement": 1,
            "R0": 9,
            "Factual": 0,
            "Harm": 1,
            "Damage": 7,
            "Dsummary": "children have died due to preventable diseases like measles and multiples more are paralized with polio."
        },
        {
            "Name": "Polio Vaccine",
            "Summary": "A viral video shows Bill Gates suggesting to reduce Africa's Population through vaccines.",
            "Country": "KE",
            "Engagement": 1,
            "R0": 9,
            "Factual": 0,
            "Harm": 1,
            "Damage": 7,
            "Dsummary": "children have died due to preventable diseases like measles and multiples more are paralized with polio."
        },
        {
            "Name": "Polio Vaccine",
            "Summary": "A viral video shows Bill Gates suggesting to reduce Africa's Population through vaccines.",
            "Country": "GH",
            "Engagement": 1,
            "R0": 9,
            "Factual": 0,
            "Harm": 1,
            "Damage": 7,
            "Dsummary": "children have died due to preventable diseases like measles and multiples more are paralized with polio."
        },
        {
            "Name": "The Yoruba Conspiracy",
            "Summary": "A viral narrative claims that the Yoruba ethnic group is plotting to dominate key government positions regardless of election outcomes.",
            "Engagement": 180,
            "R0": 4,
            "Factual": 0,
            "Harm": 1,
            "Damage": 9,
            "Dsummary": "have died to violent clashes between Yoruba and other ethnic groups in Lagos, multiple more injured, properties destroyed."
        },
        {
            "Name": "The Kikuyu Agenda",
            "Summary": "Posts accuse the Kikuyu ethnic group of planning to rig elections to ensure their continued control of the presidency.",
            "Engagement": 180,
            "R0": 4,
            "Factual": 0,
            "Harm": 1,
            "Damage": 9,
            "Dsummary": "have died due to post-election violence that broke out between Kikuyu and Luo communities, with homes torched, a few lucky to survive with injuries."
        },
        {
            "Name": "Ewe Secession Plot",
            "Summary": "A story goes viral accusing the Ewe ethnic group in the Volta Region of plotting to secede if their preferred candidate loses the election.",
            "Engagement": 180,
            "R0": 4,
            "Factual": 0,
            "Harm": 1,
            "Damage": 9,
            "Dsummary": "have died to tribal attacks, multiple more injured, properties destroyed."
        },
        {
          "Name": "",
          "Summary": "",
          "Country": "",
          "Engagement": 0,
          "R0": 0,
          "Factual": 0,
          "Harm": 0,
          "Damage": 0,
          "Dsummary": ""
        }
    ];
    trendtutorial();
});