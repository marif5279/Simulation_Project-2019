let currentX = 0;
let currentY = 0;

let luminosity = 1;

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
        w: 360,
        h: 360
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

let calculateBrightness = function (distance, _luminosity) {
    return _luminosity / (4 * Math.PI * Math.pow(distance, 2));
}

let spaceSketch = function (s) {
   
    s.setup = function () {
        // Fits canvas to window height
        let myCanv = s.createCanvas(s.windowWidth, s.windowHeight);
        myCanv.parent('root');

        starBody.pos = {
            x: s.windowWidth * 0.5,
            y: s.windowHeight * 0.5
        }
   }

   s.draw = function () {
        s.background(0);

        let distanceBetweenBodies = (starBody.pos.x - (planetBody.pos.x + ((starBody.size.w / 2) + (planetBody.size.w / 2)) ));

        let starBodyBrightness = calculateBrightness(distanceBetweenBodies, luminosity * ( Math.pow(10, 9) ));

        // Draws the "glow" from the
        // main celestial body indicating luminosity
        s.fill(
            starBody.color.r, 
            starBody.color.g, 
            starBody.color.b,
            60
        );

        s.ellipse(
            starBody.pos.x, 
            starBody.pos.y, 
            starBodyBrightness, 
            starBodyBrightness
        );
        
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
        s.text("Apparent Brighness", 40, 40);

        s.textSize(32);
        s.text(starBodyBrightness, 40, 80);

        s.textSize(20);
        s.text("Distance", 40, 120);

        s.textSize(32);
        s.text(distanceBetweenBodies, 40, 160);

   }

   s.windowResized = function () {
       s.resizeCanvas(s.windowWidth, s.windowHeight);
   }
}

let luminosityBox = document.getElementById('luminosity').addEventListener('change', function (e) {
    luminosity = parseInt(e.target.value);
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
});




