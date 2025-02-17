import { PonerLetras } from "../utils/utils.js";

function ShapeController(c1, c2, c3, outputType, shapeType, ratio){

  switch (shapeType) {
    case "diamond":
      return MakeDiamond(c1, c2, outputType, ratio);
      break;
    case "square":
      return MakeSquare(c1, c2, outputType, ratio);
      break;
    case "rhombus":
      return MakeRhombus(c1, c2, outputType, ratio);
      break;
    case "cross":
        return MakeCross(c1, c2, outputType, ratio);
        break;  
    case "envelope":
      return MakeEnvelope(c1, c2, c3, outputType, ratio);
      break;
    case "polygon":
      return MakePolygon(c1, c2, c3, outputType, ratio);
      break;            
    default:
      return "Shape not implemented"
      break;
  }
}
function MakeDiamond(c1, c2, outputType, ratio) {
/*
...............................^............................... <- 31 + 1 + 31  i = 0
............................./+++\............................. <- 29 + 3 + 29  i = 1 -Izquierda(rows-i+1, c1) ; -Centro = i +2  ; -Derecha(rows-i+1, c1)
............................/+++++\............................ <- 28 + 5 + 28  i = 2
.........................../+++++++\........................... <- 27 + 7 + 27  i = 3
........................../+++++++++\..........................
........................./+++++++++++\.........................
......................../+++++++++++++\........................
......................./+++++++++++++++\.......................
....................../+++++++++++++++++\......................
...................../+++++++++++++++++++\.....................
..................../+++++++++++++++++++++\....................
.................../+++++++++++++++++++++++\...................
................../+++++++++++++++++++++++++\..................
................./+++++++++++++++++++++++++++\.................
................/+++++++++++++++++++++++++++++\................
.............../+++++++++++++++++++++++++++++++\...............
............../+++++++++++++++++++++++++++++++++\..............
............./+++++++++++++++++++++++++++++++++++\.............
............/+++++++++++++++++++++++++++++++++++++\............
.........../+++++++++++++++++++++++++++++++++++++++\...........
........../+++++++++++++++++++++++++++++++++++++++++\..........
........./+++++++++++++++++++++++++++++++++++++++++++\.........
......../+++++++++++++++++++++++++++++++++++++++++++++\........
......./+++++++++++++++++++++++++++++++++++++++++++++++\.......
....../+++++++++++++++++++++++++++++++++++++++++++++++++\......
...../+++++++++++++++++++++++++++++++++++++++++++++++++++\.....
..../+++++++++++++++++++++++++++++++++++++++++++++++++++++\....
.../+++++++++++++++++++++++++++++++++++++++++++++++++++++++\...
../+++++++++++++++++++++++++++++++++++++++++++++++++++++++++\..
./+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\.
/+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++\
\+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++/
.\+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++/.
..\+++++++++++++++++++++++++++++++++++++++++++++++++++++++++/..
...\+++++++++++++++++++++++++++++++++++++++++++++++++++++++/...
....\+++++++++++++++++++++++++++++++++++++++++++++++++++++/....
.....\+++++++++++++++++++++++++++++++++++++++++++++++++++/.....
......\+++++++++++++++++++++++++++++++++++++++++++++++++/......
.......\+++++++++++++++++++++++++++++++++++++++++++++++/.......
........\+++++++++++++++++++++++++++++++++++++++++++++/........
.........\+++++++++++++++++++++++++++++++++++++++++++/.........
..........\+++++++++++++++++++++++++++++++++++++++++/..........
...........\+++++++++++++++++++++++++++++++++++++++/...........
............\+++++++++++++++++++++++++++++++++++++/............
.............\+++++++++++++++++++++++++++++++++++/.............
..............\+++++++++++++++++++++++++++++++++/..............
...............\+++++++++++++++++++++++++++++++/...............
................\+++++++++++++++++++++++++++++/................
.................\+++++++++++++++++++++++++++/.................
..................\+++++++++++++++++++++++++/..................
...................\+++++++++++++++++++++++/...................
....................\+++++++++++++++++++++/....................
.....................\+++++++++++++++++++/.....................
......................\+++++++++++++++++/......................
.......................\+++++++++++++++/.......................
........................\+++++++++++++/........................
.........................\+++++++++++/.........................
..........................\+++++++++/..........................
...........................\+++++++/...........................
............................\+++++/............................
.............................\+++/.............................
...............................v...............................
*/

   var rows = 30 * ratio;
   var Shape = "";
   var lineFeed = "\n";
 

   if (outputType == "web") {
     lineFeed = "<br>";
   } else {
     lineFeed = "\n";
   }

   // TODO: hablar con luiz
   //  var headerDiamond = Izquierda(rows-i+1, c1) + "^" + Derecha(rows-i+1, c1) + lineFeed; (for the refactory)
   var tamanoDelCentro = 1;
   
   for (var i = 0; i <= rows; i++) {
     if( i == 0 ){
       Shape += Izquierda(rows-i+1, c1) + "^" + Derecha(rows-i+1, c1) + lineFeed;
     } else {
       tamanoDelCentro += 2;
       Shape += Izquierda(rows-i, c1) + "/" + Centro((tamanoDelCentro), c2) + "\\" + Derecha(rows-i, c1) + lineFeed;
     }
     if (outputType != "web") process.stdout.write("\n");
   }

   for (var i = rows; i >= 0; i--) {
     if( i == 0 ){
       Shape += Izquierda(rows-i+1, c1) + "v" + Derecha(rows-i+1, c1) + lineFeed;
     } else {
      Shape += Izquierda(rows-i, c1) + "\\" + Centro((tamanoDelCentro), c2) + "/" + Derecha(rows-i, c1) + lineFeed;
      tamanoDelCentro -= 2;
     }
     if (outputType != "web") process.stdout.write("\n");
   }
   return Shape;

   
};
function MakeSquare(c1, c2, outputType, ratio) {
  
/*

........................ (24) columnas
........................
........................
[3] limite arriba = columnas / 4
.....(5)++++++++++++++(14)..... apertura = limite + 1
.....|............(12)|.....
.....|............|.....
.....|............|.....
.....|............|.....
.....++++++++++++++..... cierre = limite abajo - 1
[6] limite abajo = rows - limite arriba 
........................
........................
........................
[12] rows = columnas / 2

*/

  var columnas =Math.round (24 * ratio) ;                   // # de columnas del area del trabajo
  var rows = Math.round(columnas * 0.25);       // # de vueltas de una mitad  
  var tamanoDelCentro = Math.round(columnas * 0.50);    // # de columnas dentro del shape
  var lateral = Math.round(columnas * 0.25);   // # de columnas afuera del shape

  var Shape = "";                                        // contenido del shape
  var lineFeed = "\n";

  const cuerpoFinal =  (lateral * 2 + tamanoDelCentro);

  if (columnas < cuerpoFinal) {
    columnas = cuerpoFinal;
  } else if (columnas > cuerpoFinal){
    tamanoDelCentro += (columnas - cuerpoFinal) 
  }

  var headerFooter = Centro(columnas + 2, c1 ) +  lineFeed ;
  var aperturaCierre = Izquierda(lateral, c1)  + Centro(tamanoDelCentro +2, "-") +  Derecha(lateral, c1) + lineFeed;
  var cuerpo = Izquierda(lateral, c1) + "|" + Centro(tamanoDelCentro, c2) + "|" + Derecha(lateral, c1) + lineFeed;
  

  if (outputType == "web") {
    lineFeed = "<br>";
  } else {
    lineFeed = "\n";
  }

   var limite = Math.round ((rows*2) * 0.3);
   var limiteDeAbajo = rows*2 - limite;

  Shape = "ratio: " + ratio  +  ", columnas: " + columnas  + ", rows: " + (rows * 2)  + ", lateral: " +  lateral  + ", tamanoDelCentro: "  +  tamanoDelCentro +  ", limite: " + limite  + lineFeed;

  // First Half
  for (var i=0; i<rows*2; i++) {
    
    switch (true){
     
      // Header de arriba
      case ( i < limite - 1):
        Shape += headerFooter;
        break;

      // limite de arriba
      // Apertura del Cuadrado
      case (i == limite -1):
        Shape += aperturaCierre;
        break;
        
      // Cierre del Cuadrado
      case (i == limiteDeAbajo):
        Shape += aperturaCierre;
        break;

      // limite de abajo
      case ( i > limiteDeAbajo):
        Shape += headerFooter;
        break;

      // Cuerpo del Cuadrado 
      default:
        Shape += cuerpo;
    }
     GetLineFeed(outputType);
   }

    //  Second Half
    //  for (var i=0; i<=rows; i++) {

    //   switch (true) {

    //     // Apertura del Cuadrado
    //     case (i == (limite + 1)):
    //       Shape += aperturaCierre;
    //       break;

    //      // Header
    //     case ( i >= limite + 1 ):
    //       Shape += headerFooter;
    //      break;
        
    //     // Cuerpo del Cuadrado 
    //     default:
    //       Shape += cuerpo;
    //    }
    //    GetLineFeed(outputType);
    // }
   return Shape;
}
function MakeRhombus (c1, c2, outputType, ratio){

  /*
........................ (24 columnas)
........................ <-header
........................
limiteArriba (3) = columns / 4
.....+-----------------+ <-apertura = limite + 1
..../+++++++++++++++++/.
.../+++++++++++++++++/.. <-cuerpo (4 rows) de (17)
../+++++++++++++++++/...
./+++++++++++++++++/....
+-----------------+..... <-cierre = limiteAbajo -1
limiteAbajo = row- limiteArriba
........................ 
........................ <-footer
........................
(12 rows) 

*/

  var columnas =Math.round (24 * ratio) ;                         // # de columnas del area del trabajo
  var rows = Math.round(columnas * 0.25);                         // # de vueltas de una mitad  
  var tamanoDelCentro = Math.round(columnas * 0.70);              // # de columnas dentro del shape
  var lateral = Math.round(columnas * 0.20);                      // # de columnas afuera del shape

  var Shape = "";                                                 // contenido del shape
  var lineFeed = "\n";

  // const cuerpoFinal =  (lateral * 2 + tamanoDelCentro);

  // if (columnas < cuerpoFinal) {
  //   columnas = cuerpoFinal;
  // } else if (columnas > cuerpoFinal){
  //   tamanoDelCentro += (columnas - cuerpoFinal) 
  // }
  var offSet = 0;
  var headerFooter = Centro(columnas, c1 ) +  lineFeed ;
  var aperturaCierre = "";
  var lateralIzquierda =  Math.round (columnas - (tamanoDelCentro + 2));
  var cuerpo = "";
  

  if (outputType == "web") {
    lineFeed = "<br>";
  } else {
    lineFeed = "\n";
  }

   var limite = Math.round ((rows*2) * 0.3);
   var limiteDeAbajo = rows*2 - limite;

  Shape = "ratio: " + ratio  +  ", columnas: " + columnas  + ", rows: " + (rows * 2)  + ", lateral: " +  lateral  + ", tamanoDelCentro: "  +  tamanoDelCentro +  ", limite: " + limite  + lineFeed;

  // First Half
  for (var i=0; i<rows*2; i++) {
    
    switch (true){
     
      // Header de arriba
      case ( i < limite - 1):
        Shape += headerFooter;
        break;

      // limite de arriba
      // Apertura del Cuadrado
      case (i == limite - 1):
       aperturaCierre = Izquierda(lateralIzquierda - offSet, c1) + "/" + Centro(tamanoDelCentro, "-" ) + "/"  + Derecha (offSet, c1) + lineFeed;
       Shape += aperturaCierre;
       offSet += 1;
        break;
        
      // Cierre del Cuadrado
      case (i == limiteDeAbajo):
        aperturaCierre = Izquierda(lateralIzquierda - offSet, c1) + "/" + Centro(tamanoDelCentro, "-" ) + "/"  + Derecha (offSet, c1) + lineFeed;
        Shape += aperturaCierre;
        offSet += 1;
        break;

      // limite de abajo
      case ( i > limiteDeAbajo):
        Shape += headerFooter;
        break;

      // Cuerpo del Cuadrado 
      default:
        cuerpo = Izquierda(lateralIzquierda - offSet, c1) + "/" + Centro(tamanoDelCentro, c2) + "/"  + Derecha (offSet, c1) + lineFeed;
        Shape += cuerpo;
        offSet+= 1;
     }
     GetLineFeed(outputType);
   }
  return Shape;
}
function MakeRhombusV1 (c1, c2, outputType){

    var columns = Math.round (24)
    var rangee =Math.round (columns * 0.25)
    var centerSize =Math.round  (columns * 0.50)
    var latéral = Math.round (columns * 0.25)

    var Shape = ""
    var lineFeed = "\n";

    if (outputType == "web") {
        lineFeed = "<br>";
      } else {
        lineFeed = "\n";
    }

    // var limiteArriba = Math.round ((rangee*2) * 0.3);
    // var limiteAbajo = rangee*2 - limiteArriba;

    // for (var i = 0; i < rangee; i++) {
    //   if( i < (limiteArriba -1)) {
    //     Shape += Centro(columns, c1) + lineFeed;
    //   } else{
    //     if (i <= (limiteArriba-1)) {
    //       Shape += Izquierda((latéral*2)-i, c1) + "+"  + Centro((centerSize + i), "-") + "+" + lineFeed;
    //     } else{
    //       Shape += Izquierda((latéral*2)-i, c1) + "/" + Centro (centerSize, c2) + "/" + Derecha (latéral-i, c1) + lineFeed;
    //     }  
          
    //   }
    //  if (outputType != "web") process.stdout.write("\n");
    // }

    // for (var i = rangee; i > 0; i--) {
    //   if( i == limiteAbajo ) {
    //     Shape += Centro(columns, c1) + lineFeed;
    //   } else{
    //     if (i > limiteAbajo){
    //       Shape += Izquierda((latéral*2)-i, c1) +  "+"  + Centro(centerSize + i, "-") + "+" + Derecha ((latéral*2), c1) + lineFeed;
    //     } else{
    //       Shape +=  Izquierda((latéral*2) -i, c1) + "/" + Centro (centerSize, c2) + "/" + Derecha (latéral-i, c1) + lineFeed;
    //     }  
          
    //   }
    // }
    
    GetLineFeed(outputType);

  return Shape;

};
function MakeCross (c1, c2, outputType, ratio){
/*
                          columnas
......................... [25.] 
......................... limiteHeader = [rows * 0.2];                                   [20 % rows] -> 2/14
..........+++++.......... [10.] [5+] [10.] limiteAperturaCierre = limiteHeader + 1
..........+...+.......... [10.] [1+] [3.] [1+] [10.] 
..........+...+.......... 
....+++++++...+++++++.... [4.] [7+] [3.] [7+] [4.] limiteAlaArriba = [rows * 0.42];      [42 % rows] -> 6/14
....+...............+.... [4.] [1+] [15.] [1+] [4.]
....+...............+....
....+++++++...+++++++.... limiteAlaAbajo = rows - limiteAlaArriba
..........+...+.......... 
..........+...+.......... 
..........+++++.......... limiteAperturaCierre = limiteFooter - 1
......................... limiteFooter = rows - limiteHeader
.........................
[14] rows = columnas / 2

*/

  var columnas =Math.round (25 * ratio) ;                  
  var rows = Math.round (columnas * 0.56);  

  var limiteHeader = Math.round (rows * 0.20);
  var limiteAlaArriba = Math.round (rows * 0.42);
  var limiteAlaAbajo = rows - limiteAlaArriba;
  var limiteFooter = rows - limiteHeader;

  var vExtremos = Math.round (columnas * 0.2);    
  var lado1 = Math.round (columnas * 0.4);
  var lado2 = Math.round (columnas * 0.16);
  var border =  Math.round (columnas * 0.28);
  var centro1 = Math.round (columnas * 0.12);
  var centro2 = Math.round (columnas * 0.6);

  var Shape = "";         // contenido del shape
  var lineFeed = "\n";

  if (outputType == "web") {
    lineFeed = "<br>";
  } else {
    lineFeed = "\n";
  }

  var headerFooter         = Centro(columnas, c2) + lineFeed;
  var aperturaCierre       = Izquierda(lado1, c2) + Centro(vExtremos, "-" ) + Derecha(lado1, c2)  + lineFeed;
  var cuerpoVertical       = Izquierda(lado1, c2) + "|" + Centro(centro1, c2) + "|" + Derecha(lado1, c2) + lineFeed;
  var ala                  = Izquierda(lado2, c2) +  Centro(border, "-") + Centro(centro1, c2) + Centro(border, "-") + Derecha(lado2, c2) + lineFeed;
  var cuerpoHorizontal     = Izquierda(lado2, c2) + "|" + Centro(centro2, c2) + "|" + Derecha(lado2, c2) + lineFeed;

  for (let i = 0; i < rows; i++) {
    switch (true) {
      case (i < limiteHeader):
        Shape +=  i + headerFooter
        break;
      case (i == limiteHeader):
        Shape += i + aperturaCierre
      break;
      case (i > limiteHeader && i < limiteAlaArriba):
        Shape += i + cuerpoVertical
      break; 
      case (i == limiteAlaArriba):
        Shape += i + ala
      break;
      case (i > limiteAlaArriba && i <= limiteAlaAbajo):
        Shape += i + cuerpoHorizontal
      break;
      case (i < limiteFooter - 1):
        Shape += i + ala
        break;
      case (i > limiteAlaAbajo && i <= limiteFooter):
        Shape += i + cuerpoVertical
        break; 
      case (i == limiteFooter + 1):
        Shape += i + aperturaCierre  
        break;
      case (i > limiteFooter ):
        Shape += i + headerFooter   
        break; 
      default:
        Shape += i + "Yo soy una estrella" + lineFeed;
        break;
    }
  }
 return Shape;
 
}
function MakeCrossV1 (c1, c2, outputType, ratio){
  /*

......................... [25] columnas
......................... [2] limiteArriba = columnas * 0.08
..........+++++.......... Izquierda [10-> lado1 = columnas * 0.40]; Border [5-> top = columnas * 0,20]; Derecha [lado1]   apertura = limiteArriba + 1
..........+...+.......... Izquierda [10]; Border[1->sides = columnas * 0.04]; Centro1 [3->columnas * 0.12]; Border[1 sides]; Derecha [10] -> Cuerpo1
..........+...+..........  
....+++++++...+++++++.... Izquierda [4-> lado2 = columnas *0.16]; Border[7-> middle = columnas * 0.28]; Centro1 [3]; Border[7 middle]; Derecha [lado2] -> Cuerpo2
....+...............+.... Izquierda [lado2]; Border[sides]; Centro2 [15-> columnas * 0.6]; Border[sides]; Derecha [lado2] -> Cuerpo3
....+...............+....
....+++++++...+++++++.... 
..........+...+.......... 
..........+...+.......... 
..........+++++..........
.........................
.........................
[14] rows = columnas / 2

*/
  
  
  var columnas =Math.round (25 * ratio) ;                 
  var rows = Math.round (columnas * 0.28); 
  var lado1 = Math.round (columnas * 0.40); 
  var lado2 = Math.round (columnas * 0.16); 
  var borderTop = Math.round (columnas * 0.20);
  var borderMiddle = Math.round (columnas * 0.28);
  var borderSides = Math.round (columnas * 0.04);    
  var tamanoDelCentro1 = Math.round (columnas * 0.12);  
  var tamanoDelCentro2 = Math.round (columnas * 0.6);  
  
    

  var Shape = "";                                        // contenido del shape
  var lineFeed = "\n";

  // const cuerpoFinal =  (lateral * 2 + tamanoDelCentro);

  // if (columnas < cuerpoFinal) {
  //   columnas = cuerpoFinal;
  // } else if (columnas > cuerpoFinal){
  //   tamanoDelCentro += (columnas - cuerpoFinal) 
  // }

  var headerFooter = Centro(columnas, c1 ) +  lineFeed ;
  var aperturaCierre = Izquierda(lado1, c1)  + Border((borderTop), c2) +  Derecha(lado1, c1) + lineFeed;
  var cuerpo1 = Izquierda(lado1, c1) + Border(borderSides, c2) + Centro(tamanoDelCentro1, c1) + Border(borderSides, c2) + Derecha(lado1, c1) + lineFeed; //tal vez crear un otro border
  var cuerpo2 = Izquierda(lado2, c1) + Border(borderMiddle, c2) + Centro(tamanoDelCentro1, c1) + Border(borderMiddle, c2) + Derecha(lado2, c1) + lineFeed;
  var cuerpo3 = Izquierda(lado2, c1) + Border(borderSides, c2) + Centro(tamanoDelCentro2, c1) +  Border(borderSides, c2) + Derecha(lado2, c1) + lineFeed;

  if (outputType == "web") {
    lineFeed = "<br>";
  } else {
    lineFeed = "\n";
  }

   var limite = Math.round ((rows*2) * 0.2);
   var limiteDeAbajo = rows*2 - limite;

  // Shape = "ratio: " + ratio  +  ", columnas: " + columnas  + ", rows: " + (rows * 2)  + ", lateral: " +  lateral  + ", tamanoDelCentro: "  +  tamanoDelCentro +  ", limite: " + limite  + lineFeed;

  // First Half
  for (var i=0; i<rows*2; i++) {
    
    switch (true){
     
      // Header de arriba
      case ( i < limite - 1):
        Shape += headerFooter;
        break;

      // limite de arriba
      // Apertura del Cuadrado
      case (i == limite -1):
        Shape += aperturaCierre;
        break;

      // limite de arriba2
      case ( i > limite - 2):  //ask how we calculate limitey
        Shape += cuerpo1;
        break;    
        
      // Cierre del Cuadrado
      case (i == limiteDeAbajo):
        // Shape += aperturaCierre;
        break;

      // limite de abajo
      case ( i > limiteDeAbajo):
        // Shape += headerFooter;
        break;

      // Cuerpo del Cuadrado 
      default:
        // Shape += cuerpo;
    }
     GetLineFeed(outputType);
   }

    //  Second Half
    //  for (var i=0; i<=rows; i++) {

    //   switch (true) {

    //     // Apertura del Cuadrado
    //     case (i == (limite + 1)):
    //       Shape += aperturaCierre;
    //       break;

    //      // Header
    //     case ( i >= limite + 1 ):
    //       Shape += headerFooter;
    //      break;
        
    //     // Cuerpo del Cuadrado 
    //     default:
    //       Shape += cuerpo;
    //    }
    //    GetLineFeed(outputType);
    // }
   return Shape;
 
}
function MakeEnvelope (c1, c2, c3, outputType, ratio){
  /*
   columnas[26] 
                           c1=".", c2= "+", c3= "o"/  outputType = terminal
 
01 ..........................    [26.]
02 .......................... limiteArriba = rows * 0.12
03 ..|+\+++++++++++++++++++..  [2.] [1|] [1+] [\] [19+] [2.] 
04 ..|++\OOOOOOOOOOOOOOOOO+..  [2.] [1|] [+ -> 1] [\] [O -> -1] [2.]
05 ..|+++\OOOOOOOOOOOOOOOO+..
06 ..|++++\OOOOOOOOOOOOOOO+..
07 ..|+++++\OOOOOOOOOOOOOO+..
08 ..|++++++\OOOOOOOOOOOOO+.. limiteMedio = rows * 0.5
09 ..|++++++/OOOOOOOOOOOOO+..
10 ..|+++++/OOOOOOOOOOOOOO+..
11 ..|++++/OOOOOOOOOOOOOOO+..
12 ..|+++/OOOOOOOOOOOOOOOO+..
13 ..|++/OOOOOOOOOOOOOOOOO+..
14 ..|+/+++++++++++++++++++.. limiteAbajo = rows - limiteArriba
15 ..........................
16 ..........................

tamanoDelCuerpo = columnas * 0.84
headerFooter = Centro(columnas, c1) ->
aperturaCierre = "..|" + Izquierda (i-1, c2) + "\\" + Derecha(tamanoDelCuerpo - (i+1), c2) + "+.." 
cuerpo = "..|" + Izquierda (i-1, c2) + "\\" + Derecha(tamanoDelCuerpo - (i+1), c3) + "+.." 

rows = 16
*/

var columnas = Math.round (26 * ratio) ;                   // # de columnas del area del trabajo
var rows = Math.round(columnas * 0.61);                   // # de vueltas de una mitad  
var tamanoDelCuerpo = Math.round(columnas * 0.84);        // # de columnas dentro del shap

var Shape = "";                                           // contenido del shape
var lineFeed = "\n";

if (outputType == "web") {
  lineFeed = "<br>";
} else {
  lineFeed = "\n";
}

var limiteArriba = Math.round (rows * 0.12);
var limiteMedio = Math.round (rows * 0.5);
var limiteAbajo = rows - limiteArriba;
var lados = limiteArriba;

var extrema = 1;  //el border derecha del envelope

var headerFooter = "";
var headerFooterDown = "";
var aperturaCierre = "";
var aperturaCierreDown = "";  //Izquierda(lados, c1) + "|" + Centro (i-1, c2) + "\\" + Centro(tamanoDelCuerpo - (i+1) - 1, c2) + Centro(extrema, c2) + Derecha(lados, c1) + lineFeed;
var cuerpo = "";
var cuerpoDown = "";

for (let i = 0; i < rows; i++) {
  switch (true) {
    case (i < limiteArriba ):
      //.......................... 
      headerFooter     += Centro(columnas, c1) + lineFeed;
      headerFooterDown += Centro(columnas, c1) + lineFeed;
      break;
    case (i == limiteArriba ):
      //..|+\+++++++++++++++++++..
      //..|+/+++++++++++++++++++..
      aperturaCierre       = Izquierda(lados, c1) + "|" + Centro (i-1, c2) + "\\" + Centro(tamanoDelCuerpo - (i+1) - 1, c2) + Centro(extrema, c2) + Derecha(lados, c1) + lineFeed;
      aperturaCierreDown   = Izquierda(lados, c1) + "|" + Centro (i-1, c2) + "/" + Centro(tamanoDelCuerpo - (i+1) - 1, c2) + Centro(extrema, c2) + Derecha(lados, c1) + lineFeed;
      break; 
    case (i > limiteArriba && i < limiteMedio):
      //..|++\OOOOOOOOOOOOOOOOO+..
      //..|++/OOOOOOOOOOOOOOOOO+..
      cuerpo               += Izquierda(lados, c1) + "|" + Centro (i-1, c2) + "\\" + Centro(tamanoDelCuerpo - (i+1) - 1, c3) + Centro(extrema, c2) + Derecha(lados, c1) + lineFeed;
      cuerpoDown           = Izquierda(lados, c1) + "|" + Centro (i-1, c2) + "/" + Centro(tamanoDelCuerpo - (i+1) - 1, c3) + Centro(extrema, c2) + Derecha(lados, c1) + lineFeed + cuerpoDown;
      break;    
  }
  GetLineFeed(outputType); 
}
  Shape = headerFooter + aperturaCierre + cuerpo + cuerpoDown + aperturaCierreDown + headerFooterDown;
  return Shape;
}
function MakePolygon (c1, c2, c3, outputType, ratio){

  /*
[24]

........................ 
........................ limiteArriba = rows * 0.16
.......----------....... [7.lado] [10-centro] [7.lado]
....../..........\...... [6.lado] [1/] [10-centro] [1\] [6.lado]
...../............\..... [5.lado] [1/] [12-centro] [1\] [5.lado] limiteMedioUp = rows * 0.41
....|..............|.... [4.lado] [1|] [14-centro] [1|] [4.lado] limiteMedio = rows * 0.5
....|..............|....   
.....\............/.....                                         limiteMedioDown = rows - limiteMedioUp
......\........../......  
.......----------.......  
........................ limiteAbajo = rows - limiteArriba 
........................ 
rows = 12
lado = 7
tamanoDelCuerpo = columnas * 0.33
headerFooter = Centro(columnas, c1) 
aperturaCierra = Izquierda(lado, c1) + Centro(tamanoDelCuerpo, "-") + Derecha(lado, c1)
cuerpo1 =  Izquierda(lado -i+2, c1) + "/" + Centro(tamanoDelCuerpo, "-") + "\" + Derecha(lado -i+2, c1)

*/

var columnas = Math.round (24 * ratio);                   // # de columnas del area del trabajo
var rows = Math.round(columnas * 0.5);                     // # de vueltas de una mitad  
var tamanoDelCuerpo = Math.round(columnas * 0.41);         // # de columnas dentro del shap
var lado =  Math.round(columnas * 0.29);
var ladoMedio = 0;

var Shape = "";                                            // contenido del shape
var lineFeed = "\n";

if (outputType == "web") {
  lineFeed = "<br>";
} else {
  lineFeed = "\n";
}

var limiteArriba = Math.round (rows * 0.16);
var limiteMedioUp = Math.round (rows * 0.41);
//var limiteMedio = Math.round (rows * 0.5);
var limiteMedioDown = rows - limiteMedioUp;
//var limiteAbajo = rows - limiteArriba;


var offSet = 1 ;

var headerFooter = "";
var headerFooterDown = "";
var aperturaCierre = "";
var aperturaCierreDown = "";
var cuerpoUp = ""; //Izquierda((lado - offSet), c1) + "/" + Centro((tamanoDelCuerpo), c2) + "\\" + Derecha((lado - offSet), c1) + lineFeed;
var cuerpoMedio = "";
var cuerpoDown = ""; //Izquierda((lado - offSet)-1, c1) + "\\" + Centro((tamanoDelCuerpo + offSet)+1, c2) + "/" + Derecha((lado - offSet)-1, c1) + lineFeed;

for (let i = 0; i<rows; i++){

  //offSet += 1;

  switch (true) {
    case (i < limiteArriba ):
      //.......................... 
      headerFooter      += Centro(columnas + offSet, c1) + lineFeed;
    //  headerFooterDown  += Centro(columnas, c1) + lineFeed;
      break;
    case (i == limiteArriba ):
      //.......----------.......
      aperturaCierre    = Izquierda(lado, c1) + Centro(tamanoDelCuerpo + offSet, "=") + Derecha(lado, c1) + lineFeed;
    // aperturaCierreDown = Izquierda(lado, c1) + Centro(tamanoDelCuerpo, "-") + Derecha(lado, c1) + lineFeed;
      break; 
    case (i > limiteArriba && i < limiteMedioUp):
      //....../..........\......
      //......\........../......

     cuerpoUp += Izquierda((lado - offSet), c1) + "/"   + Centro((tamanoDelCuerpo + (offSet*2)), c2) + "\\" + Derecha((lado - offSet), c1) + lineFeed;
     cuerpoDown = Izquierda((lado - offSet), c1) + "\\" + Centro((tamanoDelCuerpo + (offSet*2)), c2) + "/"  + Derecha((lado - offSet), c1) + lineFeed + cuerpoDown;
     offSet += 1;
     ladoMedio = lado - offSet;
      break;
     case (i > limiteMedioUp && i <= limiteMedioDown):
      //....|..............|....
      cuerpoMedio  += Izquierda(ladoMedio, c1) + "|" + Centro(tamanoDelCuerpo + (offSet*2), c2) + "|" + Derecha(ladoMedio, c1) + lineFeed;
       break;    
    }
  GetLineFeed(outputType); 
}
  Shape += headerFooter + aperturaCierre + cuerpoUp + cuerpoMedio + cuerpoDown + aperturaCierre + headerFooter;
  return Shape;
}
function GetLineFeed(outputType){
  if (outputType != "web")
  return process.stdout.write("\n"); 
}
function Izquierda(Tamano, CaracterDeseado){
   return PonerLetras(Tamano, CaracterDeseado);
}
function Centro(Tamano, CaracterDeseado){
    return PonerLetras(Tamano, CaracterDeseado);
}
function Derecha(Tamano, CaracterDeseado){
    return PonerLetras(Tamano, CaracterDeseado);
}
// function Border(Tamano, CaracterDeseado){
//    return PonerLetras(Tamano, CaracterDeseado);
// }
export { ShapeController};
