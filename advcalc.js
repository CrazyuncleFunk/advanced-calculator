const BINARYBTN = document.getElementById("calc-binary");
const HEXBTN = document.getElementById("calc-hexadecimal");
const ROMANBTN = document.getElementById("calc-roman");
const DECIMALBTN = document.getElementById("calc-decimal");
const CLEARBTN = document.getElementById("calc-clear");
const BACKSPACEBTN = document.getElementById("calc-backspace");
const DISPLAYELEMENT = document.getElementById("calc-display-val");
const CALCNUMBTN = document.getElementsByClassName("calc-btn-num");
const CALCOPERATORBTN = document.getElementsByClassName("calc-btn-operator");

//The displayVal is the value of the calculator screen
let displayVal = "0";
//The pendingVal is a way of saving the display value while displaying another value
let pendingVal;
//The evalStringArray is an array which holds the sum before calculation
let evalStringArray = [];
//test is a way of determining if the display is roman numerals or another number type
let test = 0;
//test is a way of determining if the display is binary or another number type
let binaryTest = 0;
//test is a way of determining if the display is hexidecimal or another number type
let hexTest = 0;
//This is a way of testing if the decimal point is in use
let decimalTest =0;

//This for loop adds event listners to all the number buttons
for(let i = 0;i<CALCNUMBTN.length;i++){
  CALCNUMBTN[i].addEventListener("click",function(clickObj){
   test = 0;
    hexTest = 0;
    let btnText = clickObj.target.innerText;
    if(displayVal === '0'){
        displayVal = '';
    }
    displayVal += btnText;
    DISPLAYELEMENT.innerText = displayVal;
                                  } , false);
};
//This function of the event listener below takes the operator button thats been pressed.
let performOperation = (clickObj) => {
  test = 0;
  hexTest = 0;
   let operator = clickObj.target.innerText;
  //This switch then takes the display value and the selected operator and passes them to an array. 
  switch (operator){
    case "+" :
      pendingVal=displayVal;
      displayVal ="0";
      DISPLAYELEMENT.innerText = pendingVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push("+");
      break;
    case "-" :
      pendingVal=displayVal;
      displayVal ="0";
      DISPLAYELEMENT.innerText = pendingVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push("-");
      break;
    case "x":
      pendingVal=displayVal;
      displayVal ="0";
      DISPLAYELEMENT.innerText = pendingVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push("*");
      break;
    case "÷" :
      pendingVal=displayVal;
      displayVal ="0";
      DISPLAYELEMENT.innerText = pendingVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push("/");
      break;
//When equals is selected the last value is pushed to the array, The solved equation is displayed and the array is cleared.
    case "=":
      evalStringArray.push(displayVal);
      var evaluation = eval(evalStringArray.join(" "));
       displayVal = evaluation + "";
      DISPLAYELEMENT.innerText = displayVal;
      evalStringArray = [];
      break;
  }
};
//This for loop adds event listeners to the operation buttons
for(let i = 0;i<CALCOPERATORBTN.length;i++){
 CALCOPERATORBTN[i].addEventListener("click",performOperation, false);
};
//This listens for the clear button which resets everything back to default
CLEARBTN.addEventListener("click", function(clickObj){
 
  test = 0;
  binaryTest = 0;
  decimalTest =0;
  hexTest = 0;
  displayVal = "0";
  pendingVal = undefined;
  evalStringArray = [];
  DISPLAYELEMENT.innerHTML = displayVal;
},false);
//This listens for the backspace button which removes the last digit or if theres only one digit changes it to 0
BACKSPACEBTN.addEventListener("click", function(clickObj){
  test = 0;
  binaryTest = 0;
  hexTest = 0;
  let disNum = displayVal.length - 1;
  if(displayVal[disNum] === "."){
    decimalTest = 0;
  }
  let lengthOfDisplayVal = displayVal.length;
  displayVal = displayVal.slice(0,lengthOfDisplayVal - 1);

  DISPLAYELEMENT.innerHTML = displayVal;
     if(displayVal === '' ){
        DISPLAYELEMENT.innerHTML = '0';
    }
});
//This listens for the decimal point which only allows of one instance at a time
DECIMALBTN.addEventListener("click",function(clickObj){
    if(!displayVal.includes(".")){
      decimalTest++
   if(displayVal ==='0' || displayVal ===""){
     DISPLAYELEMENT.innerHTML = '0' + "."
   }
    displayVal += "."

    DISPLAYELEMENT.innerText = displayVal;
}
                            } , false);
//This Function converts numbers into their roman numeral equivalent

let convertToRoman = function(num) {

//these arrays have equivalent values at the same indexs I.E 1000 and M are both worth 1000 and are both at position[0]

  let numValue = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
  let romanValue = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];

  let romanized = "";
  
//this loop takes the number and takes away the highest number lower then it and adds the equivalent roman numeral

  for (let index = 0; index < numValue.length; index++) {
    while (numValue[index] <= num) {
      romanized += romanValue[index];
      num -= numValue[index];
    }
  }


  DISPLAYELEMENT.innerHTML= romanized
}
//This Function converts numbers into their hexadecimal equivalent

const HEXCONVERT = function(){
let hexArr =[]

//This varible take the displayVal and turns it into decimal

let displayBinary = parseInt(displayVal).toString(2);

//This varible calculates if the binary is divisible by 4

let num = displayBinary.length % 4;
 if(num === 0){
   num = 4;
 }
 
 //this part calculate the amount of 0s needed to pad the binary into a useable figure
 
let lengthBin = displayBinary.length + (4 - num); 
while(displayBinary.length < lengthBin){
    displayBinary = displayBinary.padStart(lengthBin,"0")
}

//This splits the binary code into chunks of 4

let binaryArr = displayBinary.match(/.{1,4}/g)
//these arrays work the same way as the arrays in the roman numral converter
let decimal = ["0000","0001","0010","0011","0100","0101","0110","0111","1000","1001","1010","1011","1100","1101","1110","1111"]
let hexadecimal = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]

//This converts the binary chunks into their hex values and stores them in a array
for(let j = 0;j< binaryArr.length ; j++){
    for(let i = 0; i< decimal.length; i++){
    
     if(binaryArr[j].toString() === decimal[i]){
            hexArr.push(hexadecimal[i])
        }
        
}

}
//This joins together the hex array and displays them   
DISPLAYELEMENT.innerHTML=hexArr.join("");

}
//This Function calculates if the decimal point has been used then either denies the convertion into their binary equivalent or completes it
let convertToBinary = function(num) {
  if(decimalTest !== 0){
    DISPLAYELEMENT.innerHTML= "No Decimals"
  }else {
    console.log(num.toString(2))
    DISPLAYELEMENT.innerHTML= num.toString(2);
  }
}
//This Function calculates if the decimal point has been used then either denies the hexadecimal convertion or calls it
let convertToHex = function() {
  if(decimalTest !== 0){
    DISPLAYELEMENT.innerHTML= "No Decimals"
  }else {
    HEXCONVERT();
  }
}
//This listener when activated tests to see if the display is roman numerals or numbers and changes them to the correct one
ROMANBTN.addEventListener("click",function(clickObj){
 if(test === 0){
    test++;
   binaryTest = 0;
   hexTest = 0;
  convertToRoman(parseInt(displayVal));
  }else if(test !== 0){
    test = 0;
    binaryTest = 0;
    hexTest = 0;
    DISPLAYELEMENT.innerHTML = displayVal;
  }
  //If the display value is 0 it will nor be converted
  if(displayVal == 0){
    DISPLAYELEMENT.innerHTML = "0";
  }
                          } , false);
//This listener when activated tests to see if the display is binary or numbers and changes them to the correct one
BINARYBTN.addEventListener("click",function(clickObj){
 if(binaryTest === 0){
    binaryTest++;
   test = 0;
   hexTest = 0;
   console.log("test");
  convertToBinary(parseInt(displayVal));
  }else if(binaryTest !== 0){
    binaryTest = 0;
    test = 0;
    hexTest = 0;
    DISPLAYELEMENT.innerHTML = displayVal;
  }
  //If the display value is 0 it will nor be converted
  if(displayVal == 0){
    DISPLAYELEMENT.innerHTML = "0";
  }
                          } , false);
//This listener when activated tests to see if the display is hexadecimal or numbers and changes them to the correct one
HEXBTN.addEventListener("click",function(clickObj){
 if(hexTest === 0){
    hexTest++;
   test = 0;
   binaryTest = 0;
  convertToHex(parseInt(displayVal));
  }else if(hexTest !== 0){
    hexTest = 0;
    test = 0;
    binaryTest = 0;
    DISPLAYELEMENT.innerHTML = displayVal;
  }
  //If the display value is 0 it will nor be converted
  if(displayVal == 0){
    DISPLAYELEMENT.innerHTML = "0";
  }
                          } , false);
