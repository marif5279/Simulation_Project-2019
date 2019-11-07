let currentX = 0;
let currentY = 0;

let luminosity = Math.pow(10, 100);

let starBody = {
    color: {
        // Colors range  from 0 - 255
        r: 120,
        g: 120,
        b: 0
    },
    pos: {
        x: 0,
        y: 0
    },
    size: {
        w: 300,
        h: 300
    }
}

let planetBody = {
    pos: {
        x: currentX,
        y: currentY
    },
    size: {
        w: 120,
        h: 120
    }
}

let zeroPointLuminosity = 3.0128 * 10e28;

let calculateAbsoluteBrightness = function (_luminosity) {
    return -2.5 * Math.log10(_luminosity/zeroPointLuminosity);
}

let calculateApparentBrightness = function (distance, _luminosity) {
    let absMag = calculateAbsoluteBrightness(_luminosity);

    return absMag - 5 + 5 * Math.log10(distance);
}

let spaceSketch = function (s) {
   
    s.setup = function () {
        // Fits canvas to window height
        let myCanv = s.createCanvas(s.windowWidth, s.windowHeight);
        myCanv.parent('root');

        starBody.pos = {
            x: s.windowWidth - 180,
            y: s.windowHeight * 0.5 // Vertical centering
        }
   }

   s.draw = function () {
        s.background(0);

        let distanceBetweenBodies = Math.abs(starBody.pos.x - planetBody.pos.x);

        let starBodyBrightness = calculateApparentBrightness(distanceBetweenBodies, luminosity).toFixed(4);

        // Updates mouse position value for
        // mouse tracking outside of `draw` function
        currentX = s.mouseX;
        currentY = s.mouseY;
        
        // Updates the `planetBody` position to follow
        // the mouse cursor
        planetBody.pos = {
            x: currentX,
            y: currentY
        };

        // Draws the "glow" from the
        // main celestial body indicating brightness
        // It's color is a dim yellow if the Apparent Magnitude
        // is positive, and red if it's negative
        if (starBodyBrightness >= 0)
            s.fill(
                starBody.color.r, 
                starBody.color.g, 
                starBody.color.b,
                90
            );
        else
            s.fill(
                255,
                72,
                0,
                90
            )

        s.ellipse(
            starBody.pos.x, 
            starBody.pos.y, 
            Math.abs(starBodyBrightness) * 5, 
            Math.abs(starBodyBrightness) * 5
        );

        // Draws the celestial body providing 
        // a light source (i.e. a star) that dynamically 
        // determines brightness and distance levels
        s.fill(starBody.color.r, starBody.color.g, starBody.color.b);

        s.ellipse(  
            starBody.pos.x, 
            starBody.pos.y,
            starBody.size.w,
            starBody.size.h
        );

        // Draws the moveable celestial body (i.e. planet)
        s.fill(
            48,
            48,
            250
        );

        s.ellipse(
            planetBody.pos.x, 
            planetBody.pos.y,
            planetBody.size.w, 
            planetBody.size.h
        );
        

        // Draws numerical data values as text
        s.fill(255)
        s.textSize(20);
        s.text("Apparent Magnitude/Brightness", 40, 40);

        s.textSize(32);
        s.text(starBodyBrightness, 40, 80);

        s.textSize(20);
        s.text("Absolute Magnitude/Brightness", 40, 120);

        s.textSize(32);
        s.text(calculateAbsoluteBrightness(luminosity).toFixed(4), 40, 160);

        s.textSize(20);
        s.text("Distance", 40, 200);

        s.textSize(32);
        s.text(distanceBetweenBodies, 40, 240);
        
        // Draws the Key
        s.fill(
            starBody.color.r, 
            starBody.color.g, 
            starBody.color.b
        );
        s.rect(40, 270, 70, 40);
        s.fill(255);
        s.textSize(20);
        s.text("Positive Apparent Magnitude", 120, 300);

        s.fill(
            255,
            72,
            0
        );
        s.rect(40, 320, 70, 40);
        s.fill(255);
        s.textSize(20);
        s.text("Negative Apparent Magnitude", 120, 350);

        s.textSize(32);
        s.text(distanceBetweenBodies, 40, 240);

   }

   s.windowResized = function () {
       s.resizeCanvas(s.windowWidth, s.windowHeight);
   }
}

// Update the luminosity with the text box value
let luminosityBox = document.getElementById('luminosity').addEventListener('change', function (e) {
    // If text box is empty, reset the value to 100
    if (e.target.value.length < 1)
        luminosity = Math.pow(10, 100);
    
    else if (parseFloat(e.target.value) > 308)
        luminosity = Math.pow(10, 308);
    
    else
        luminosity = Math.pow(10, parseFloat(e.target.value));
})

let startBtn = document.getElementById('start-btn').addEventListener('click', function (e) {
    e.target.style.display = "none";
    document.getElementById('restart-btn').style.display = "inline-block";
    var a = new p5(spaceSketch);
});

let restartBtn = document.getElementById('restart-btn').addEventListener('click', function (e) {
    document.getElementById('root').innerHTML = "";
    document.getElementById('start-btn').style.display = "inline-block";
    e.target.style.display = "none";
    
    document.getElementById('luminosity').value = 100;
    luminosity = 100;
});




