var draw = SVG()
var rect 
var counter = 0;
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
            var rect = draw.rect(sizeVar, sizeVar).attr({ fill: setBg() }).x(moveX).y((pos-(sizeVar/2)))
            counter += 1;
        } else {
            var rect = draw.rect(sizeVar, sizeVar).attr({ fill: 'transparent' }).x(moveX).y((pos-(sizeVar/2)))
        }

        //rect.on('click', click)
        //index += 1
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
    tempIndex = curr + sizeVar
    draw.each(function(i, children) {
        //console.log("CURR in loop:", curr);
        if ((this.cy()==tempIndex || curr==12) && countDown>0) {
            this.remove();
            tempIndex += sizeVar
            countDown -= 1
        } 
    });
    console.log("SHOW ME RMV POS: ", pos);
    // for(let i=0; i<(chamt); i++) {
    //     console.log("CHANGE", chamt);
    //     if (draw.get(tempIndex)) {
    //         draw.get(tempIndex).remove()
    //         tempIndex += 1
    //     }
  
    // }
    draw.each(function(i, children) {
        if (this.cy()>(pos+sizeVar)) {
            this.dy(-sizeVar*(chamt));
        } 
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
