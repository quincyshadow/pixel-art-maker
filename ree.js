//Global scope
//none
let selectedColor;
let colorButtonCount = 0;

const newLocal = `
#FFFFFF
#FFFFCC
#FFFF99
#FFFF66
#FFFF33asd
#FFFF00
#FFCCFF
#FFCCCC
#FFCC99
#FFCC66
#FFCC33
#FFCC00
#FF99FF
#FF99CC
#FF9999
#FF9966
#FF9933
#FF9900
#FF66FF
#FF66CC
#FF6699
#FF6666
#FF6633
#FF6600
#FF33FF
#FF33CC
#FF3399
#FF3366
#FF3333
#FF3300
#FF00FF
#FF00CC
#FF0099
#FF0066
#FF0033
#FF0000
#CCFFFF
#CCFFCC
#CCFF99
#CCFF66
#CCFF33
#CCFF00
#CCCCFF
#CCCCCC
#CCCC99
#CCCC66
#CCCC33
#CCCC00
#CC99FF
#CC99CC
#CC9999
#CC9966
#CC9933
#CC9900
#CC66FF
#CC66CC
#CC6699
#CC6666
#CC6633
#CC6600
#CC33FF
#CC33CC
#CC3399
#CC3366
#CC3333
#CC3300
#CC00FF
#CC00CC
#CC0099
#CC0066
#CC0033
#CC0000
#99FFFF
#99FFCC
#99FF99
#99FF66
#99FF33
#99FF00
#99CCFF
#99CCCC
#99CC99
#99CC66
#99CC33
#99CC00
#9999FF
#9999CC
#999999
#999966
#999933
#999900
#9966FF
#9966CC
#996699
#996666
#996633
#996600
#9933FF
#9933CC
#993399
#993366
#993333
#993300
#9900FF
#9900CC
#990099
#990066
#990033
#990000
#66FFFF
#66FFCC
#66FF99
#66FF66
#66FF33
#66FF00
#66CCFF
#66CCCC
#66CC99
#66CC66
#66CC33
#66CC00
#6699FF
#6699CC
#669999
#669966
#669933
#669900
#6666FF
#6666CC
#666699
#666666
#666633
#666600
#6633FF
#6633CC
#663399
#663366
#663333
#663300
#6600FF
#6600CC
#660099
#660066
#660033
#660000
#33FFFF
#33FFCC
#33FF99
#33FF66
#33FF33
#33FF00
#33CCFF
#33CCCC
#33CC99
#33CC66
#33CC33
#33CC00
#3399FF
#3399CC
#339999
#339966
#339933
#339900
#3366FF
#3366CC
#336699
#336666
#336633
#336600
#3333FF
#3333CC
#333399
#333366
#333333
#333300
#3300FF
#3300CC
#330099
#330066
#330033
#330000
#00FFFF
#00FFCC
#00FF99
#00FF66
#00FF33
#00FF00
#00CCFF
#00CCCC
#00CC99
#00CC66
#00CC33
#00CC00
#0099FF
#0099CC
#009999
#009966
#009933
#009900
#0066FF
#0066CC
#006699
#006666
#006633
#006600
#0033FF
#0033CC
#003399
#003366
#003333
#003300
#0000FF
#0000CC
#000099
#000066
#000033
#000000
`.trim().split('\n');
//[Array]colorlist
let colorlist = newLocal;

document.addEventListener('DOMContentLoaded', pageLoaded)

function pageLoaded() {
    /////////Begin here

    let divpalette = document.querySelector('div.palette');
    let divgrid = document.querySelector('div.grid');
    
    let style = document.createElement("style");
    document.head.appendChild(style); // must append before you can access sheet property
    var styleSheet = style.sheet;
//classes and functions
//Store selectedColor
function selectColor(id)
{
    selectedColor = id;

    let currentColorButton = document.querySelector(`[class='selected']`);
    currentColorButton.style.background=id;
    currentColorButton.innerHTML=id;
    
    //return current value
    console.log(selectedColor);
}

function gridColor(id,undo)
{
    if(undo)
    {
        styleSheet.removeRule(styleSheet.rules.length-1);
        console.log(styleSheet.rules[styleSheet.rules.length-1]);
        return;
    }
    else if(selectedColor == null)
    {
        return;
    }
    //else...
    rule = `
    #${id}
    {
        background-color: ${selectedColor};
    }
    `.trim();
    //Insert rule into styleSheet at end.
    styleSheet.insertRule(rule, styleSheet.rules.length);
    console.log(styleSheet.rules[styleSheet.rules.length-1]);
    //return current value
    //console.log(id);
}
//gridColor(null,'undo')
document.querySelector(`[class='undo']`).addEventListener('click',e=>gridColor(null,'undo'),false)

class PaletteBox
{
    constructor(id,insertpoint)
    {
    this.id = id;
    this.text = `<div id='${id}' class='palbox u-pull-left'></div>`
    this.insertpoint = insertpoint;
    }
    create()
    {
        this.insertpoint.insertAdjacentHTML('beforeend', this.text);
        document.querySelector(`[id='${this.id}']`).addEventListener('click',e=>selectColor(this.id),false)
    }
}

class GridBox
{
    constructor(id,insertpoint)
    {
    this.id =id;
    this.text = `<div id='${id}' class='gridbox u-pull-left'></div>`
    this.insertpoint = insertpoint;
    }
    create()
    {
        this.insertpoint.insertAdjacentHTML('beforeend', this.text);
        document.querySelector(`[id='${this.id}']`).addEventListener('click',e=>gridColor(this.id),false)
    }
}

let newGrid = function(num,divgrid)
{
    //math: div.gridbox width (2.5)
    // 100 / the width = (40)
    // num %40 = remainder. remove the remainder from num and create.

    let equalperrow = num - num%40;
    
    let id;
    for(let i=0; i < equalperrow; i++)
    {
        let id = `s${i}`;
        let box = new GridBox(id,divgrid);
        box.create();
    }
}
//After document loads..

newGrid(356,divgrid);

colorlist.map(e => {
    //STEP 1. INSERT CSS rule into styleSheet
    let rule = `
    [id='${e}']
    {
        background-color: ${e};
    }
    `.trim();
    //Insert rule into styleSheet at end.
    styleSheet.insertRule(rule, styleSheet.rules.length);

    //STEP 1a. INSERT CSS rule into styleSheet to re-use for grid
    let regexp1 = RegExp('(?!#)([A-z0-9]*)$','');
    let striphashes = e.match(regexp1)[0];
    rule = `
    [class='${striphashes}']
    {
        background-color: ${e};
    }
    `.trim();
    //Insert rule into styleSheet at end.
    styleSheet.insertRule(rule, styleSheet.rules.length);

    //STEP 2. Insert div into the page.
    let box = new PaletteBox(e,divpalette);
    box.create();
});

//Setup complete. Now into color selection



}//End pageloaded.