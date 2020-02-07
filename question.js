
/*
    The goal of this exercise is to take a polygon defined by the points 'points', use the mouse
    events to draw a line that will split the polygon and then draw the two split polygons.
    In the start, you'll have the initial polygon (start.png)
    While dragging the mouse, the polygon should be shown along with the line you're drawing (mouseMove.png)
    After letting go of the mouse, the polygon will be split into two along that line (mouseUp.png)

    The code provided here can be used as a starting point using plain-old-Javascript, but it's fine
    to provide a solution using react/angular/vue/etc if you prefer.
*/

// Formula to find the intersection points. Take four points  p1,p1,p2,p4 for intersection line
function lineIntersect(p1,p2,p3,p4){
    var A1 = p2.y-p1.y, // line goes from p1 to p2
        B1 = p1.x-p2.x,
        C1= A1*p1.x + B1*p1.y,
        A2 = p4.y-p3.y, // line goes from p3 to p4
        B2 = p3.x-p4.x;
        C2= A2*p3.x + B2*p3.y,
        denominator = A1*B2-A2*B1;
       
       // for Parallel line
       if(denominator == 0){
           return null;
       };
       // intersection  points of line
       var intersectX = (B2 * C1 - B1 * C2) /denominator,   
           intersectY = (A1 * C2 - A2 * C1) /denominator,
        /* determine if the intersection is within the polygon. If the distance bettween p1, p2,p3,p4 in the x  and y axis
           and the distance between the first point and intersection points on the x and y axis  is less than 0 and greater than one.
           the intersection points is outside the polygon */
           rx1 = (intersectX - p1.x) / (p2.x - p1.x),
           ry1 = (intersectY - p1.y) / (p2.y - p1.y),
           rx2 = (intersectX - p3.x) / (p4.x - p3.x),
           ry2 = (intersectY - p3.y) / (p4.y - p3.y);
        // if the intersection line lies betwen 0 and 1. It is within the polygon
       if(((rx1 >= 0 && rx1 <= 1) || (ry1 >= 0 && ry1 <= 1)) &&
       ((rx2 >= 0 && rx2 <= 1) || (ry2 >= 0 && ry2 <= 1)) ){
           return {
           x: intersectX,
           y: intersectY
          };
       }else{
           return null;
       };              
};

// virtual ray from anywhere outside the polygon to the polygon's point 
function drawLine(){
   for (var i = 0; i < rays.length; i++){
       var p2=rays[0],
           p3=rays[1]            
        }  
     // draw the line from p2 to p3   
   var content = document.getElementById('content');
   var svgElement = document.createElementNS("http://www.w3.org/2000/svg", 'svg'); 
   var IntersectLine = document.createElementNS('http://www.w3.org/2000/svg','line');
   
   IntersectLine.setAttribute('x1', p2.x);
   IntersectLine.setAttribute('y1', p2.y);
   IntersectLine.setAttribute('x2', p3.x);
   IntersectLine.setAttribute('y2' ,p3.y);
   IntersectLine.setAttribute("stroke", "red")   
   
    svgElement.setAttribute('height', "500"); 
    svgElement.setAttribute('width', "500");
    svgElement.setAttribute('style', 'position: absolute;');
    svgElement.setAttribute('fill', 'red');
    svgElement.appendChild(IntersectLine);
    content.appendChild(svgElement);    

};

function onMouseDown(event) {
    // remove the mouseMove 
    var removeMouseMove = document.removeEventListener('mousemove', onMouseMove)
        return removeMouseMove;
}

function onMouseMove(event) {
    // add the mouseMove 
    var addMouseMove = drawLine(event.clientX, event.clientX)
         return addMouseMove;
}

function onMouseUp(event) {
    const poly1 = [];
    const poly2 = [];
   //Generate the two sets of points for the split polygons
    const intersection1 = {};
    const intersection2 = {} ;
    //An algorithm for finding interceptions of two lines can be found in https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
    // loop over all the polygon points  and test each individual points of polygon  against the ray
    for (var i = 0; i < points.length; i++) {
        var p1 = points[i],
            p2 = points[(i+1)%points.length]
        for (var j = 0; j < rays.length; j++){
             var  p3=rays[0],
                  p4=rays[1]
        }
        
        var intersection = lineIntersect(p1,p2,p3,p4)
    // if there is intersection within the polygon, split polygons
    if(intersection ){
        if (intersection.x < intersection.y ){
            intersection1.x = intersection.x
            intersection1.y = intersection.y 
            console.log(intersection1)
            poly1.push( intersection1,points[0],points[1],points[2],intersection2)
         }
        else if (intersection.x > intersection.y ){
            intersection2.x = intersection.x
            intersection2.y = intersection.y 
            console.log(intersection2)
            poly2.push( intersection2,points[3],points[4],points[5],points[6],intersection1)
         }  
            
    }
}
       
    clearPoly();
    addPoly(poly1, 'blue');
    addPoly(poly2, 'green');
}

/*
	Code below this line shouldn't need to be changed
*/

//Draws a polygon from the given points and sets a stroke with the specified color
function addPoly(points, color = 'black') {
    if(points.length < 2) {
        console.error("Not enough points");
        return;
    }
    
    const content = document.getElementById('content');
    
    var svgElement = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    var svgPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    let path = 'M' + points[0].x + ' ' + points[0].y
    
    for(const point of points) {
        path += ' L' + point.x + ' ' + point.y;
    }
    path += " Z";
    svgPath.setAttribute('d', path);
    svgPath.setAttribute('stroke', color);
    
    svgElement.setAttribute('height', "500"); 
    svgElement.setAttribute('width', "500");
    svgElement.setAttribute('style', 'position: absolute;');
    svgElement.setAttribute('fill', 'transparent');
    
    svgElement.appendChild(svgPath);
    content.appendChild(svgElement);
}

//Clears the all the drawn polygons
function clearPoly() {
    const content = document.getElementById('content');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
}

//Sets the mouse events needed for the exercise
function setup() {
    this.clearPoly();
    this.addPoly(points);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
}
//Generate  virtual ray from anywhere outside the polygon points 
const rays= [
    { x : 50, y: 300 },
    { x : 400, y: 50 }   
]
const points = [
    { x : 100, y: 100 },
    { x : 200, y: 50 },
    { x : 300, y: 50 },
    { x : 400, y: 200 },
    { x : 350, y: 250 },
    { x : 200, y: 300 },
    { x : 150, y: 300 },
]

window.onload = () => setup()




























