let heartInterval, rainInterval, musicStarted = false;
let petalsClicked = 0;
const music = document.getElementById("bgMusic");

const finalLines = [
    "Remember these texts?",
    "This was our first conversation on Instagram😊😊🥰🥰❤️",
    "Back then, I never expected us to come this far",
    "But i was pleasantly proven otherwise",
    "15 MONTHS!!!! That's crazzyyy!!!",
    "I'm soo Happyy Brooo!!!!",
    "So, as u have already guessed NovaLabs isn't actually real...",
    "But the fact that you're here is. ❤️",
    "And thats exactly what's so crazzyy!!"
];

const bigLoveMessage = "I LLOVEE YOUU TO THEE UNIVERSEE AND BACK INFINITY TO THE POWER INFINITY TIMES❤️❤️❤️❤️🥰🥰 🌸";
const myPhotos = ["t1.jpeg", "t2.jpeg", "t3.jpeg", "t4.jpeg", "b1.jpeg", "b2.jpeg", "b3.jpeg", "b4.jpeg"];

// --- NAVIGATION LOGIC ---
function switchPage(from, to) {
    const fromPage = document.getElementById(from);
    const toPage = document.getElementById(to);
    
    if (fromPage) fromPage.classList.remove("active");
    if (toPage) toPage.classList.add("active");

    // Trigger page-specific logic
    if (to === "propose-page") {
        startProposeIntro();
    }
}

function goToBlackout() {
    switchPage("page0", "buffer");
    setTimeout(() => switchPage("buffer", "warning"), 2500);
}

function goToHearts() {
    switchPage("warning", "blackout");
    startMovingHeart();
}

// --- INTERACTIVE HEART (BLACKOUT PAGE) ---
function startMovingHeart() {
    const heart = document.getElementById("heart");
    const move = () => {
        heart.style.position = "absolute";
        heart.style.left = Math.random() * (window.innerWidth - 100) + "px";
        heart.style.top = Math.random() * (window.innerHeight - 100) + "px";
    };
    move();
    heartInterval = setInterval(move, 1500);
    
    heart.onclick = () => {
        clearInterval(heartInterval);
        heart.style.opacity = "0";
        if (!musicStarted) { 
            music.volume = 0.4; 
            music.play().catch(e => console.log("Audio play blocked by browser")); 
            musicStarted = true; 
        }
        startHeartRain();
        setTimeout(() => { 
            switchPage("blackout", "page1"); 
            stopHeartRain(); 
            startChat(); 
        }, 3000);
    };
}

// --- HEART RAIN ---
function startHeartRain() {
    const container = document.getElementById("heart-rain");
    rainInterval = setInterval(() => {
        const h = document.createElement("div");
        h.className = "falling-heart";
        h.innerText = "💗";
        h.style.left = Math.random() * 100 + "vw";
        h.style.animationDuration = Math.random() * 2 + 3 + "s";
        container.appendChild(h);
        setTimeout(() => h.remove(), 5000);
    }, 200);
}

function stopHeartRain() { clearInterval(rainInterval); }

// --- CHAT STORY ---
function startChat() {
    const chat = document.getElementById("chat");
    const msgs = [
        { side: "left", text: "😂 reacted to your story" },
        { side: "right", text: "I look so hot no?" },
        { side: "left", text: "Yeahh very 🫡🫡" },
        { side: "right", text: "How was NCC?" },
        { side: "left", text: "It was kinda nicee! They gave samosas 😋" },
        { side: "right", text: "Shit.. I should've come 😭" },
        { side: "left", text: "Yeah broo come off next time!" }
    ];
    msgs.forEach((m, i) => {
        setTimeout(() => {
            const b = document.createElement("div");
            b.className = `message ${m.side}`;
            b.innerText = m.text;
            chat.appendChild(b);
            setTimeout(() => b.classList.add("show"), 50);
            if (i === msgs.length - 1) setTimeout(showContinue, 1500);
        }, i * 1500);
    });
}

function showContinue() {
    const btn = document.createElement("div");
    btn.innerHTML = "💗<br><small>Continue</small>";
    btn.className = "big-heart"; 
    btn.style.position = "relative"; 
    btn.style.marginTop = "20px";
    document.getElementById("chat").appendChild(btn);
    btn.onclick = () => { switchPage("page1", "page2"); renderStory(); };
}

// --- STORY RENDER ---
function renderStory() {
    const container = document.getElementById("finalMessageContainer");
    finalLines.forEach((text, i) => {
        setTimeout(() => {
            const l = document.createElement("div");
            l.className = "final-line"; l.innerText = text;
            container.appendChild(l);
            setTimeout(() => l.classList.add("show"), 50);
            if (i === finalLines.length - 1) setTimeout(finalReveal, 4000);
        }, i * 2000);
    });
}

// --- POLAROID REVEAL ---
function finalReveal() {
    document.getElementById("finalMessageContainer").style.opacity = "0";
    setTimeout(() => {
        switchPage("page2", "page3");
        const frame = document.getElementById("photo-frame");
        const top = document.createElement("div"); top.className = "photo-row";
        const bot = document.createElement("div"); bot.className = "photo-row";
        frame.appendChild(top); frame.appendChild(bot);

        myPhotos.forEach((src, i) => {
            const img = document.createElement("img");
            img.src = src; img.className = "framed-photo";
            img.style.setProperty('--tilt', ["12deg", "-15deg", "18deg", "-12deg"][i % 4]);
            if (i < 4) top.appendChild(img); else bot.appendChild(img);
            setTimeout(() => img.classList.add("show"), i * 400);
        });

        const decl = document.getElementById("finalDeclaration");
        const msgWrapper = document.createElement("div");
        msgWrapper.className = "huge-love show"; 
        decl.appendChild(msgWrapper);

        const characters = Array.from(bigLoveMessage);
        characters.forEach((char, index) => {
            setTimeout(() => {
                const span = document.createElement("span");
                span.innerHTML = char === " " ? "&nbsp;" : char;
                span.style.opacity = "0";
                span.style.transition = "opacity 0.2s";
                msgWrapper.appendChild(span);
                setTimeout(() => span.style.opacity = "1", 10);

                if (index === characters.length - 1) {
    setTimeout(() => {
        const btn = document.createElement("button");
        btn.className = "primary"; 
        btn.innerText = "Open Your Rose ➔";
        
        // Ensure it's centered
        btn.style.margin = "20px auto";
        btn.style.display = "block";

        btn.onclick = () => { 
            switchPage("page3", "rose-day-page"); 
            createStars(); 
        };
        
        decl.appendChild(btn);
        startHeartRain();
    }, 1500);
}
            }, 3000 + (index * 70));
        });
    }, 1500);
}

// --- ROSE DAY LOGIC ---
function revealPetal(num, msg) {
    const p = document.getElementById(`hitbox${num}`);
    if(!p.classList.contains('clicked')) {
        p.classList.add('clicked');
        petalsClicked++;
    }
    const mBox = document.getElementById('petal-message');
    mBox.style.opacity = "0";
    setTimeout(() => { mBox.innerText = msg; mBox.style.opacity = "1"; }, 300);

    if (petalsClicked >= 3 && !document.getElementById('to-propose')) {
        const btn = document.createElement("button");
        btn.id = 'to-propose'; btn.className = "primary"; btn.innerText = "Next Day ➔";
        btn.style.marginTop = "20px";
        btn.onclick = () => switchPage("rose-day-page", "propose-page");
        document.querySelector("#rose-day-page .night-sky").appendChild(btn);
    }
}

// --- SMITHS REVEAL LOGIC ---
function startProposeIntro() {
    const dialogueBox = document.getElementById('smiths-dialogue');
    dialogueBox.innerHTML = ""; 
    
    const introLines = [
        { text: "I wanted to tell you something...", delay: 800 },
        { text: "I love the Smiths.", delay: 2800, class: "smiths-reveal" }
    ];

    introLines.forEach((line) => {
        setTimeout(() => {
            const p = document.createElement('p');
            p.innerText = line.text;
            p.className = `fade-in-text ${line.class || ""}`;
            dialogueBox.appendChild(p);
        }, line.delay);
    });

    setTimeout(() => {
        document.getElementById('smiths-input-area').style.opacity = "1";
    }, 4500);
}

function checkSmiths() {
    const val = document.getElementById('smiths-input').value.toLowerCase();
    
    if (val.includes("sorry")) {
        const dialogueBox = document.getElementById('smiths-dialogue');
        const inputArea = document.getElementById('smiths-input-area');
        
        inputArea.style.opacity = "0";
        setTimeout(() => inputArea.style.display = "none", 500);

        const remainingLines = [
            { text: "I said, I love the smiths", delay: 800 },
            { text: "~ To die by your side, is such a heavenly way to die ~", delay: 2800 },
            { text: "I don't just love their music.", delay: 4800 },
            { text: "I love everything about us.", delay: 6800, class: "smiths-reveal" }
        ];

        remainingLines.forEach((line) => {
            setTimeout(() => {
                const p = document.createElement('p');
                p.innerText = line.text;
                p.className = `fade-in-text ${line.class || ""}`;
                dialogueBox.appendChild(p);
            }, line.delay);
        });

        // Audio Fade sequence
        setTimeout(() => {
            let fadeOutInterval = setInterval(() => {
                if (music.volume > 0.05) {
                    music.volume -= 0.05;
                } else {
                    clearInterval(fadeOutInterval);
                    music.pause();
                    music.src = "smiths.mp3";
                    music.load();
                    music.volume = 0;
                    music.play().catch(e => console.log("New track blocked"));

                    let fadeInInterval = setInterval(() => {
                        if (music.volume < 0.4) {
                            music.volume += 0.05;
                        } else {
                            clearInterval(fadeInInterval);
                        }
                    }, 200);
                }
            }, 150);
        }, 5000);

        setTimeout(() => {
            switchPage("propose-page", "val-question-page");
            createPhotoWall();
        }, 11000);
        
    } else {
        document.getElementById('smiths-hint').innerText = "Hint: You're supposed to say 'sorry'... 🤨";
    }
}

// --- FINAL PAGES HELPERS ---
function createPhotoWall() {
    const bgContainer = document.getElementById('photo-wall-bg');
    bgContainer.innerHTML = ""; 
    for (let i = 0; i < 25; i++) {
        const img = document.createElement('img');
        img.src = myPhotos[i % myPhotos.length];
        img.className = 'bg-floating-photo';
        img.style.left = Math.random() * 90 + "vw";
        img.style.top = Math.random() * 90 + "vh";
        const randomRot = Math.random() * 30 - 15;
        img.style.setProperty('--rot', `${randomRot}deg`);
        img.style.animationDelay = Math.random() * 5 + "s";
        bgContainer.appendChild(img);
    }
}

function moveNoBtn() {
    const b = document.getElementById("no-btn");
    const box = document.querySelector(".proposal-box");
    
    // Limits the movement to the inside of the box
    const maxX = box.clientWidth - b.offsetWidth;
    const maxY = box.clientHeight - b.offsetHeight;

    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    b.style.position = "absolute";
    b.style.left = newX + "px";
    b.style.top = newY + "px";
}

function handleYes() {
    startHeartRain(); 
    switchPage("val-question-page", "smash-page");
}

function createStars() {
    const container = document.getElementById('stars-container');
    if (!container || container.children.length > 0) return;
    for (let i = 0; i < 80; i++) {
        const s = document.createElement('div');
        s.style.position = "absolute"; s.style.width = "2px"; s.style.height = "2px";
        s.style.background = "white"; s.style.top = Math.random() * 100 + "vh";
        s.style.left = Math.random() * 100 + "vw"; s.style.borderRadius = "50%";
        s.style.animation = `flicker ${Math.random() * 2 + 1}s infinite`;
        container.appendChild(s);
    }
}