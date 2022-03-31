var draw = SVG()
var rect 
var counter = 0;
var svgArray = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"]
var svgArrIndex = 0
var svgObj = {}
var drawCount = 0
var drawSwitch = 3

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


function chooseSVG(pos) {
    console.log("IN CHOOSE RN", Object.keys(svgObj).length, pos);
    if (Object.keys(svgObj).length == 0) {
        //console.log("MAKEING FIRST OBJ");
        svgObj[svgArrIndex] = pos
        return svgArrIndex
        console.log(svgObj);
    } else {
        console.log("MADE one Obj");
        console.log(svgObj);
        var min = Math.min.apply(null, Object.values(svgObj));
        var max = Math.max.apply(null, Object.values(svgObj));
        console.log("MIN&MAX", min, max);
        //console.log("OBJ: ", svgObj);
        if (pos>max) {
            for(i=0; i<Object.values(svgObj).length; i+=1) {
                if(Object.values(svgObj)[i]==max) {
                    var ind = Object.keys(svgObj)[i]
                }
            }
            var resIndex = parseInt(31-((31-ind)/1.5))
            let exists = Object.keys(svgObj).includes(resIndex.toString());
            if(exists) {
                resIndex = (resIndex+1)
            }
            if(resIndex > 30) {
                resIndex = 30
            }
            svgObj[resIndex] = pos
            return resIndex
        } else if (pos<=min) {
            for(i=Object.values(svgObj).length-1; i>=0; i-=1) {
                if(Object.values(svgObj)[i]==min) {
                    var ind = Object.keys(svgObj)[i]
                }
            }
            var resIndex = parseInt(0+(ind)/2)
            let exists = Object.keys(svgObj).includes(resIndex.toString());
            if(exists) {
                resIndex = (resIndex-1)
            }
            if(resIndex < 0) {
                resIndex = 0
            }
            svgObj[resIndex] = pos
            return resIndex
        } else {
            sortedInds = Object.values(svgObj).sort((a,b)=>a-b)
            console.log("SORTED :)))", sortedInds);
            for (i = 0; i < sortedInds.length-1; i++) {
                if (pos >= sortedInds[i] && pos <= sortedInds[i + 1]) {

                    let lo = Object.keys(svgObj)[Object.values(svgObj).indexOf(sortedInds[i])]
                    let hi = Object.keys(svgObj)[Object.values(svgObj).indexOf(sortedInds[i+1])]
                    console.log("LO&HIIII", lo, hi);
                    var resIndex = parseInt((parseInt(hi)+parseInt(lo))/2)
                    console.log("TELL ME THE RES:", resIndex);
                    return resIndex;
                }
            }
            return 5
        }
    }
}


function generate(event, posIn, sz, chars) { 
    if (counter == 0) {
        draw = SVG().addTo('#create').size('100%','100%')
        counter += 2;
        
    }
    sizeVar = sz
    var kc = event.keyCode;
    pos = posIn-sizeVar/3
    if (kc == 13) {
        console.log("POS ON ENTER:", pos);
        draw.each(function(i, children) {
            if (this.cy()>=pos-20) {
                this.dy(sizeVar);
            } 
        });
        //Object.entries(svgObj).forEach(([key, val]) => (svgObj[key] = val+sizeVar));
        for(i=0; i<Object.values(svgObj).length; i+=1) {
            if(Object.values(svgObj)[i]>=pos) {
                Object.values(svgObj)[i] += sizeVar;
            }
        }   
        if(chars && (drawCount%drawSwitch==0)) {
            var chosenSVG = chooseSVG(pos);
            var image = draw.image(`/Users/paulhenderson/JCURA/code-mirror-test/JCURA2021-22/svg_repo/${svgArray[chosenSVG]}.svg`).size(20,20).cy((pos-sizeVar));
            //var image = draw.image(`/Users/paulhenderson/JCURA/code-mirror-test/JCURA2021-22/svg_repo/${svgArray[svgArrIndex]}.svg`).size(20,20).cy((pos-sizeVar));

            svgArrIndex = (svgArrIndex + 1) % 31
            counter += 1;
            drawCount += 1;
        } else if (chars && (drawCount%drawSwitch != 0)) {
            var rect = draw.rect(sizeVar, sizeVar).attr({ fill: 'transparent' }).x(moveX).cy((pos-sizeVar))
            drawCount += 1;
        } else {
            var rect = draw.rect(sizeVar, sizeVar).attr({ fill: 'transparent' }).x(moveX).cy((pos-sizeVar))
            
        }
        
    }
    oldpos = pos

}

function rmv_svg(pos, sz, chamt, curr) { 
    sizeVar = sz
    countDown = chamt
    tempIndex = curr
    draw.each(function(i, children) {
        console.log("CURR in loop:", curr, "=?=", this.cy());
        if (this.cy()>(tempIndex) && countDown>0) {
            for(i=0; i<Object.values(svgObj).length; i+=1) {
                if(Math.abs(Object.values(svgObj)[i]-this.cy())<10) {
                    const foundkey = Object.keys(svgObj).find(foundkey => svgObj[foundkey] === Object.values(svgObj)[i]);
                    console.log("CAN DELETE!!!!", foundkey)
                    delete svgObj[foundkey];
                }
            }  
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
    //Object.entries(svgObj).forEach(([key, val]) => (svgObj[key] = val-sizeVar)); 
    for(i=0; i<Object.values(svgObj).length; i+=1) {
        if(Object.values(svgObj)[i]>=pos) {
            Object.values(svgObj)[i] -= sizeVar;
        }
    }   
    console.log("OBJ REM:", svgObj); 
} 

function clearDoc() {
    draw.each(function(i, children) {
        this.remove();
    });
}
    
function moveOnScroll(currPos, prevPos) {
    moveSize = prevPos - currPos;
    draw.each(function(i, children) {
        this.dy(moveSize);
    });
    for(i=0; i<Object.values(svgObj).length; i+=1) {  
        Object.values(svgObj)[i] += moveSize;
    }
    console.log("moved obj: ", svgObj);   
}

// make highlighter transparent

// 0   POSTER AND PRESENTATION :) (Use actual writing/code for examples)
// 1   shift logic correspond to object storage
// 4   every vs every other switch (svg) (constant in the code, not interface, global var)
// 1.5 indirection key-value pairs for svg files
// 2   same svg means smaller and multiple svgs

// 3 Wrap up a version (aka notes/commentss/prepare for summer)

// Copy and paste functionality