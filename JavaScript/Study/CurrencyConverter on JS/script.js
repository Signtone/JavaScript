var dateDisplay = document.querySelector('h4');
var d = new Date();
dateDisplay.textContent = (
	d.getFullYear()+ "." + 
	("00" + (d.getMonth() + 1)).slice(-2)+ "." + 
	("00" + d.getDate()).slice(-2) 
	);

var filterInt = function (value) {
	if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value) && value >= 0 && value < 999999999999999999)
		return Number(value);
	else  return value = 0;
}


var index;
var amount=document.getElementById("first").value;
var currency=document.getElementById('currency-select-two').value;
var requestCurrency=document.getElementById('currency-select-one').value;


let arr = [];
function validate(evt)
{  
	if(evt.keyCode!=8)
	{
		var theEvent = evt || window.event;
		var key = theEvent.keyCode || theEvent.which;
		key = String.fromCharCode(key);

		var regex = /\d|\./;

		if (document.getElementById("first").value > 9999999999) {
			theEvent.returnValue = false;
			if (theEvent.preventDefault){
				theEvent.preventDefault();
			}
			arr = [];
		}

		var reg = /\d+(\.\d\d)/;
		if (regex.test(key)){
			if(reg.test(document.getElementById("first").value)){
				theEvent.returnValue = false;
				if (theEvent.preventDefault){
					theEvent.preventDefault();
				}
			}
		}

		var lemitZero = document.getElementById("first").value.split("");
		if(lemitZero[0] == 0 && lemitZero[1] == 0){
			theEvent.returnValue = false;
			if (theEvent.preventDefault){
				theEvent.preventDefault();
			}
		}
        /*
		if(lemitZero[0] == 0){

			if(key !== 46)
			{
				lemitZero.shift();
				let deleteFirstZero = lemitZero.join("").replace(',','')
				console.log(deleteFirstZero);
				document.getElementById("first").value = +deleteFirstZero;
			}
		}
       
        */
		if (!regex.test(key)){

			theEvent.returnValue = false;
			if (theEvent.preventDefault){
				theEvent.preventDefault();
			}
		} 

    }
}
var email = document.getElementById("fisrt");

email.addEventListener("input", function (event) {
  if (email.reportValidity()) {
     email.setCustomValidity("");
  } else {
    email.setCustomValidity("I expect an e-mail, darling!");
  }
});

function limit(element)
{
    var max_chars = 16;

    if(element.value.length > max_chars) {
        element.value = element.value.substr(0, max_chars);
    }
}
function getInputValue(){
	amount=filterInt(document.getElementById("first").value);
	return amount;
}

function setInputValue(inputId){
	amount=document.getElementById(inputId).value;
	if(inputId=='first'){
		setSelectValue('currency-select-one','currency-select-two');
	}
	else{
		setSelectValue('currency-select-two','currency-select-one');
	}
}

var output;

function setSelectValue(inputId,outputId){
	requestCurrency=document.getElementById(inputId).value;
	currency=document.getElementById(outputId).value;
	if(inputId=='currency-select-one'){
		amount=document.getElementById("first").value;
	}
	else{
		amount=document.getElementById("second").value;
	}
}

function getRequestCurrency(){
	return requestCurrency;
}

function getCurrency(){
	return currency;
}

function handleChenge(outputId){
	amount=getInputValue();
	currency=getCurrency();
	requestCurrency=getRequestCurrency();
	convertMoney(amount,outputId);
}

function setOutputValue(value,outputId){
	document.getElementById(outputId).value=value;
}

function convertMoney(amount,outputId){
		//alert('requestCurrency='+requestCurrency+'; currency='+currency+'; amount'+amount)
	var inputIndex=	getRate(requestCurrency);
	var outputIndex=getRate(currency);

	if(requestCurrency==='BYN'){
		if(currency==='BYN'){
			var value=(1*amount).toFixed(2);
			setOutputValue(value,outputId);
		}
		else{
			getValue(outputIndex).then(function (requestRes){
				var value=(amount/requestRes).toFixed(2);
				setOutputValue(value,outputId);
			})
		}
	}
	else if(currency==='BYN'){
			getValue(inputIndex).then(function (requestRes){
				var value=(amount*requestRes).toFixed(2);
				setOutputValue(value,outputId);
			})

		}
		else{

			getValue(inputIndex).then(function (res){
				getValue(outputIndex).then(function (requestRes){
					var value=(res/requestRes*amount).toFixed(2);
					setOutputValue(value,outputId);
				})
			})
		}

	}

	function getRate(currency){
		switch(currency) {
			case 'USD':  index=4;break;
			case 'EUR':    index=5;break;
			case 'RUB':    index=16;break;
			case 'UAH':    index=11;break;
			case 'PLN':    index=6;break;
			default:   index=4;break;
		} 
		return index;
	}


	function getValue(index) {
		result =  fetch('https://www.nbrb.by/API/ExRates/Rates?Periodicity=0')

		.then(res => res.json())
		.then(function(data) {
			res=scaleValue(data[index]);
			return res;
		})
		.catch(e => {
			return e;
		});
		return result;
	}


	function scaleValue(objValue) {
		return objValue.Cur_OfficialRate/objValue.Cur_Scale;
	}

	function clearInputs(){
		document.getElementById("first").value='';
		document.getElementById("second").value='';
	}
