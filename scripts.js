var form_1 = document.querySelector(".form_1");
var form_2 = document.querySelector(".form_2");
var form_3 = document.querySelector(".form_3");


var form_1_btns = document.querySelector(".form_1_btns");
var form_2_btns = document.querySelector(".form_2_btns");
var form_3_btns = document.querySelector(".form_3_btns");


var form_1_next_btn = document.querySelector(".form_1_btns .btn_next");
var form_2_back_btn = document.querySelector(".form_2_btns .btn_back");
var form_2_next_btn = document.querySelector(".form_2_btns .btn_next");
var form_3_back_btn = document.querySelector(".form_3_btns .btn_back");

var form_2_progessbar = document.querySelector(".form_2_progessbar");
var form_3_progessbar = document.querySelector(".form_3_progessbar");

var btn_done = document.querySelector(".btn_done");
var modal_wrapper = document.querySelector(".modal_wrapper");
var shadow = document.querySelector(".shadow");

form_1_next_btn.addEventListener("click", function(){
	if(validarFormularioSM("detallePedido")){
		form_1.style.display = "none";
		form_2.style.display = "block";
	
		form_1_btns.style.display = "none";
		form_2_btns.style.display = "flex";
	
		form_2_progessbar.classList.add("active");
	}
});

form_2_back_btn.addEventListener("click", function(){

	form_1.style.display = "block";
	form_2.style.display = "none";

	form_1_btns.style.display = "flex";
	form_2_btns.style.display = "none";

	form_2_progessbar.classList.remove("active");
});

form_2_next_btn.addEventListener("click", function(){
	if(validarFormularioSM("datosEntrega") && isDateEntregaValid('tarjetaVencimiento')){

		form_2.style.display = "none";
		form_3.style.display = "block";

		form_3_btns.style.display = "flex";
		form_2_btns.style.display = "none";

		form_3_progessbar.classList.add("active");
		setMonto();
	}

});

form_3_back_btn.addEventListener("click", function(){

		form_2.style.display = "block";
		form_3.style.display = "none";

		form_3_btns.style.display = "none";
		form_2_btns.style.display = "flex";

		form_3_progessbar.classList.remove("active");

});

btn_done.addEventListener("click", function(){
	if(validarFormularioSM("formaPago") && validarMonto() && isDateTarjetaValid('tarjetaVencimiento')){
		modal_wrapper.classList.add("active");
	}

})

shadow.addEventListener("click", function(){
	modal_wrapper.classList.remove("active");
	location.reload();
})


function validarFormularioSM(formularioId){
    var validado = true;
    elementos = document.querySelectorAll(`#${formularioId} select, #${formularioId} input`);
	for(i=0;i<elementos.length;i++){
        if((elementos[i].value == "" || elementos[i].value == null) && elementos[i].required == true && elementos[i].disabled != true){
			validado = false;
            elementos[i].focus();
			elementos[i].nextElementSibling.style.display = 'block';
        }
		else if (elementos[i].nextElementSibling) {
			elementos[i].nextElementSibling.style.display = 'none';
		}
		if(elementos[i].disabled != true && elementos[i].pattern && elementos[i].nextElementSibling.nextElementSibling && elementos[i].nextElementSibling.nextElementSibling.style.display === 'block') {
			validado = false
		}
    }
    if(validado){
		validado = true;
    }
	return validado
}

function selectValue(selectId){
	let select = document.getElementById(selectId)
	return select.options[select.selectedIndex].value;
}

function opcionEntrega(){
	let fechaEntrega = document.getElementById("fechaEntrega")

	let optEntrega = selectValue("entrega");

	if (optEntrega == 2) {
		fechaEntrega.disabled = false;
	}else{
		document.getElementById('fechaMayor').style.display = 'none';
		fechaEntrega.disabled = true;
	}
}

function opcionPago(){
	let pagoEfectivo = document.getElementById("pagoEfectivo")
	let pagoTarjeta = document.getElementById("pagoTarjeta")
	let efectivoMonto = document.getElementById("efectivoMonto");
	let tarjetaNumero = document.getElementById("tarjetaNumero");
	let tarjetaNombre = document.getElementById("tarjetaNombre");
	let tarjetaVencimiento = document.getElementById("tarjetaVencimiento");
	let tarjetaCVC = document.getElementById("tarjetaCVC");

	let optPago = selectValue("tipoPago");

	if (optPago == 1) {
		pagoEfectivo.hidden = false;
		pagoTarjeta.hidden = true;

		tarjetaNumero.disabled = true;
		tarjetaNombre.disabled = true;
		tarjetaVencimiento.disabled = true;
		tarjetaCVC.disabled = true;

		efectivoMonto.disabled = false;
		getVuelto();
	}else{
		pagoEfectivo.hidden = true;
		pagoTarjeta.hidden = false;

		tarjetaNumero.disabled = false;
		tarjetaNombre.disabled = false;
		tarjetaVencimiento.disabled = false;
		tarjetaCVC.disabled = false;

		efectivoMonto.disabled = true;

	}
}

function setMonto() {
	document.getElementById('montoTotal').textContent = document.getElementById('montoTotal').textContent.replace('monto', selectValue('ciudadEntrega') * 100)
}

function getMonto() {
	return document.getElementById('montoTotal').textContent; 
}

function getVuelto() {
	document.getElementById('montoVuelto').textContent = getMonto() - document.getElementById('efectivoMonto').value;
	
	document.getElementById('efectivoMonto').addEventListener("keyup", function(){
		let montoVuelto = document.getElementById('efectivoMonto').value - getMonto();
		if(montoVuelto > 0) {
			document.getElementById('montoVuelto').textContent = montoVuelto;
			document.getElementById('vuelto').style.display = "block";
		}
		else {
			document.getElementById('montoMenor').style.display = "block";
			document.getElementById('vuelto').style.display = "none";
		}
		if(montoVuelto >= 0) {
			document.getElementById('montoMenor').style.display = "none";

		}
	})

}

function isDateEntregaValid(dateControlId) {
    dateElement = document.getElementById(dateControlId);
	const hoy = new Date(Date.now());
	const dateHoy = hoy.toISOString()
	if(!dateElement.disabled) {
		if(Date.parse(dateHoy) < Date.parse(dateElement.value)) {
			document.getElementById('fechaMayor').style.display = 'none';
			return true;
		}
		dateElement.focus();
		document.getElementById('fechaMayor').style.display = 'block';
		return false;
	}

	return true
}

function isDateTarjetaValid(dateControlId) {
	dateElement = document.getElementById(dateControlId);
	if(!dateElement.disabled) {
		const hoy = new Date(Date.now());
		// const dateHoy = '0' + hoy.getMonth() + '/' + hoy.getYear();
		const dateHoy = '0' + hoy.getMonth() + '/22';
		if(Date.parse('01/' + dateHoy) <= Date.parse('01/' + dateElement.value)) {
			document.getElementById('tarjetaVencida').style.display = 'none';
			return true
		}
		document.getElementById('tarjetaVencida').style.display = 'block';
		return false;
	}
	return true;
}

function validarImagen(event){
	event.nextElementSibling.style.display = 'none';
	var sizeByte = event.files[0].size;
	var siezekiloByte = parseInt(sizeByte / 1024); //size in KB
	if(siezekiloByte > 5120) {
		event.value = null;
		event.nextElementSibling.style.display = 'block';
	}
}

function validarFormControl(eventInput, regex = null ){
    var validado = true;
	if((eventInput.value == "" || eventInput.value == null) && eventInput.required == true && eventInput.disabled != true){
		validado = false;
		eventInput.nextElementSibling.style.display = 'block';
	}
	else if (eventInput.nextElementSibling) {
		eventInput.nextElementSibling.style.display = 'none';
	}
	if(regex != null) {
		validado = regex.test(eventInput.value)
		if(!validado) {
			eventInput.nextElementSibling.nextElementSibling.style.display = 'block'
		}
		else {
			eventInput.nextElementSibling.nextElementSibling.style.display = 'none'
		}
	}
    if(validado){
		validado = true;
    }
	return validado
}

function validarMonto() {
	if(!document.getElementById('efectivoMonto').disabled) {
		return document.getElementById('efectivoMonto').value < getMonto() ? false : true; 
	}
	return true
}