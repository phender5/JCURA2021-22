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

function generate(event, index, pos, sz, chars) { 
    if (counter == 0) {
        //draw = SVG().addTo('#create').size(1000,1000)
        draw = SVG().addTo('#create').size('100%','100%')
        counter += 2;
    }
    sizeVar = sz
    var kc = event.keyCode;
    if (kc == 13) {
        console.log("POS ON ENTER:", pos);
        if(chars) {
            var rect = draw.rect(sizeVar, sizeVar).attr({ fill: 'teal' }).x(moveX).y((pos-(sizeVar/2)))
            counter += 1;
            if (counter %3 == 0) {
                rect.fill({ color: 'red' })
            }
        } else {
            var rect = draw.rect(sizeVar, sizeVar).attr({ fill: 'transparent' }).x(moveX).y((pos-(sizeVar/2)))
        }

        //rect.on('click', click)
        //index += 1
        while(draw.get(index)) {
            var nextOnes = draw.get(index)
            console.log("NEXT ONES POS: ", nextOnes.y());
            nextOnes.dy(sizeVar)
            nextOnes.fill({ color: "pink"})
            index += 1
        }
    }

}

function rmv_svg(lc, sz, chg, curr) { 
    sizeVar = sz
    console.log("PASSED MAX: ", lc);
    tempIndex = curr
    for(let i=0; i<(chg); i++) {
        console.log("CHANGE", chg);
        if (draw.get(tempIndex)) {
            draw.get(tempIndex).remove()
            tempIndex += 1
        }
        //pos -= sizeVar
    }
    while(draw.get(curr)) {
        
        console.log("XCHANGE", chg);
        draw.get(curr).dy((-sizeVar*(chg)))
        curr += 1
    } 
    // while(draw.get(tempIndex)) {
        
    //     console.log("XCHANGE", chg);
    //     draw.get(tempIndex).dy((-sizeVar*(chg)))
    //     tempIndex += 1
    // } 
}