/* ************************************
HTML Target Parent's Observe
The objective is to be able to visualize the structure of the html by visualizing the edges 
of the right-clicked element (contextual menu), it is marked with random colors.
If you right-click more than once, the border of the parent element will 
be shown
************************************ */

window.addEventListener("contextmenu", targetParentObserve, false);



/* ********************************************** */
/* VARIABLES - To save the elements we are going to mark */
/* ********************************************** */
var targetParentObserveElement = [null];



/* ******************* */
/* PRINCIPAL FUNCTION */
/* ******************* */
function targetParentObserve(e) {

	evento = e;
	evento.preventDefault();

	targetParentObserveWho(evento.target);

	/* If the Control key is pressed we will erase the marked edges */
	if (evento.ctrlKey == true) {
		targetParentObserveNone();
	} else {

		/* Mark the edge of the last element in the targetParentObserveElement array with a random color */
		targetParentObserveMarker();

		/* You will see a notification with the name of the marked element */
		targetParentObserveNotif();
	}
}



/* ******************************* */
/* To define which element will be marked */
/* ******************************* */
function targetParentObserveWho(target) {

	let who = target;/* We receive the element to add it to the array */

	if (targetParentObserveElement[0] == null) {
		/* when we havent marked any element */
		targetParentObserveElement[0] = who;
	} else {
		/* If there are more than one element in the array, push the parent of the last element */
		let tamArray = targetParentObserveElement.length;
		if (targetParentObserveElement[tamArray - 1] != document.body) {
			targetParentObserveElement.push(targetParentObserveElement[tamArray - 1].parentNode);
		}
	}
}



/* ******************************* */
/* Random color for the css outline style */
/* ****************************** */
function targetParentObserveRandomColor() {
	let color = "rgb(";
	color += Math.floor((Math.random() * 250) + 50) + ",";
	color += Math.floor((Math.random() * 250) + 50) + ",";
	color += Math.floor((Math.random() * 250) + 50) + ")";
	return color;
}



/* ******************************* */
/* Remove the edge and reset the array */
/* ******************************* */
function targetParentObserveNone() {
	for (let x in targetParentObserveElement) {
		targetParentObserveElement[x].style.outline = "none";
	}
	targetParentObserveElement=[null];
	document.getElementById("targetParentObserve").style.display="none";
}



/* *********************************** */
/* To mark the edge with an outline css style */
/* *********************************** */
function targetParentObserveMarker(){
	let tamArray = targetParentObserveElement.length;
	let color=targetParentObserveRandomColor();
	targetParentObserveElement[tamArray - 1].style.outline = "3px solid " + color;
	document.getElementById("targetParentObserve").style.color=color;
}



/* ******************* */
/* To show the notification */
/* ******************* */
function targetParentObserveNotif() {

	/* Who is the last element in the array */
	let tamArray = targetParentObserveElement.length;
	node = targetParentObserveElement[tamArray - 1].nodeName;
	
	/* Show the notification */
	let divT = document.getElementById("targetParentObserve");
	divT.style.display="block";
	
	/* Inner the element with the element name */
	divT.innerHTML = node;
}



/* ****************** */
/* Create the notification */
/* ****************** */
function notif(){
	/* Create the div Element to show the notification... and the element style */
	let div = document.createElement("div")
	div.id = "targetParentObserve";
	div.style.borderRadius = "10px"
	div.style.backgroundColor = "rgb(30,30,30)";
	div.style.position = "fixed";
	div.style.padding = "10px";
	div.style.bottom = "50%";
	div.style.right = "50%";
	div.style.display="none";
	div.style.fontSize="20px";
	div.style.opacity=".8";
	div.style.transform="translate(-50%,-50%,0)";
	div.style.zIndex="100";

	/* The notification will disappear with a click event */
	div.onclick=function(){this.style.display="none";}

	/* add the element to the body */
	document.body.appendChild(div);
}
notif();