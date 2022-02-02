var draw = SVG()
var rect 
var counter = 0;
var svgArray = ["airplane-svgrepo-com","rainbow-svgrepo-com","boat-svgrepo-com","fish-svgrepo-com"]
var svgArrIndex = 0

moveX = 0
moveY = 0
sizeVar = 20

var click = function() {
    if (this.fill() == 'teal') {
        this.fill({ color: '#f06' })
    } else {
        this.fill({ color: 'teal' })
    }
    
  }
  
  const setBg = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
   return "#" + randomColor;
  }

// change svg to something more distinct
function generate(event, posIn, sz, chars) { 
    if (counter == 0) {
        //draw = SVG().addTo('#create').size(1000,1000)
        draw = SVG().addTo('#create').size('100%','100%')
        counter += 2;
        
    }
    sizeVar = sz
    var kc = event.keyCode;
    pos = posIn-sizeVar
    if (kc == 13) {
        console.log("POS ON ENTER:", pos);
        if(chars) {
            //var rect = draw.rect(sizeVar, sizeVar).attr({ fill: setBg() }).x(moveX).y((pos-(sizeVar/2)))
            var image = draw.image(`/Users/paulhenderson/JCURA/code-mirror-test/JCURA2021-22/svg_repo/${svgArray[svgArrIndex]}.svg`).size(20,20).y((pos-sizeVar));
            svgArrIndex = (svgArrIndex + 1) % 4
            counter += 1;
        } else {
            var rect = draw.rect(sizeVar, sizeVar).attr({ fill: 'transparent' }).x(moveX).y((pos-(sizeVar/2)))
            //var rect = draw.image(`/Users/paulhenderson/JCURA/code-mirror-test/JCURA2021-22/svg_repo/${boat}.svg`).attr({ fill: 'transparent' }).size(20,20).x(moveX).y((pos-(sizeVar)));
        }
        draw.each(function(i, children) {
            if (this.cy()>pos) {
                this.dy(sizeVar);
            } 
        });
    }

}

function rmv_svg(pos, sz, chamt, curr) { 
    sizeVar = sz
    countDown = chamt
    tempIndex = curr
    draw.each(function(i, children) {
        //console.log("CURR in loop:", curr);
        if ((this.y()==tempIndex) && countDown>0) {
            this.remove();
            tempIndex += sizeVar
            countDown -= 1
        } 
    });
    draw.each(function(i, children) {
        if (this.cy()>(pos+sizeVar)) {
            this.dy(-sizeVar*(chamt));
        } 
    });
} 

function clearDoc() {
    draw.each(function(i, children) {
        this.remove();
    });
}
    
    //scroll info top: 
    // amount = current - prev
    // svg.js each()
    // this.dy(amount)
function moveOnScroll(currPos, prevPos) {
    moveSize = prevPos - currPos;
    draw.each(function(i, children) {
        this.dy(moveSize);
    });
}

// make highlighter transparent
// edge cases (scroll instance, last element)
// make editor the full window
// BONUS: library of svg's drawn in a cycle
