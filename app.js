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

function generate(event) { 
    if (counter == 0) {
        draw = SVG().addTo('#create').size(1000,1000)
        //draw = SVG().addTo('#canvas').size('100%','100%')
        counter += 1;
    }
    counter += 1;
    var x = event.keyCode;
    if (x == 13) {
        var rect = draw.rect(sizeVar, sizeVar).attr({ fill: 'teal' }).x(moveX).y(moveY)
        rect.on('click', click)
        if (counter%2 == 1) {
            moveX += sizeVar;
        } else {
            moveX -= sizeVar;
        }
        moveY += sizeVar;
    }

}

function rmv_svg() { 
    counter += 1
    draw.last().remove()
    if (counter%2 == 1) {
        moveX += sizeVar;
    } else {
        moveX -= sizeVar;
    }
    moveY -= sizeVar
}