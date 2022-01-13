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
        draw = SVG().addTo('#create').size(1000,1000)
        //draw = SVG().addTo('#canvas').size('100%','100%')
        counter += 1;
    }
    counter += 1;
    sizeVar = sz
    var kc = event.keyCode;
    if (kc == 13) {
        console.log("POS ON ENTER:", pos);
        if(chars) {
            var rect = draw.rect(sizeVar, sizeVar).attr({ fill: 'teal' }).x(moveX).y((pos-(sz/2)))
            if (counter %3 == 0) {
                rect.fill({ color: 'red' })
            }
        } else {
            var rect = draw.rect(sizeVar, sizeVar).attr({ fill: 'transparent' }).x(moveX).y((pos))
        }
        rect.on('click', click)
        /* if (counter%2 == 1) {
            moveX += sizeVar;
        } else {
            moveX -= sizeVar;
        } */
        //moveY += sizeVar;
        index += 1
        while(draw.get(index)) {
            draw.get(index).dy(sizeVar)
            index += 1
        }
    }

}

function rmv_svg(index, pos, sz, curr, next) { 
    //counter += 1
    sizeVar = sz
    console.log("PASSED POS:", pos);
    tempIndex = index
    for(let i=0; i<(curr-next); i++) {
        console.log("INDEX", index);
        console.log("TEMP", tempIndex);
        draw.get(tempIndex).remove()
        if (tempIndex > 0) {
            tempIndex -= 1
        }
        //pos -= sizeVar
    }
    
    /*if (counter%2 == 1) {
        moveX += sizeVar;
    } else {
        moveX -= sizeVar;
    } */
    //moveY -= sizeVar 
    while(draw.get(tempIndex)) {
        for(let i=0; i<curr-next; i++) {
            draw.get(tempIndex).dy(-sizeVar)
        }
        tempIndex += 1
    }
}