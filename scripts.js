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
	if(validarFormularioSM("datosEntrega")){

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
	if(validarFormularioSM("formaPago")){
		modal_wrapper.classList.add("active");
	}

})

shadow.addEventListener("click", function(){
	modal_wrapper.classList.remove("active");
})


function validarFormularioSM(formularioId){
    var validado = true;
    elementos = document.querySelectorAll(`#${formularioId} select, #${formularioId} input`);
	for(i=0;i<elementos.length;i++){
        if((elementos[i].value == "" || elementos[i].value == null) && elementos[i].required == true && elementos[i].disabled != true){
            validado = false;
            elementos[i].focus();
			elementos[i].nextElementSibling.style.display = 'block';
            return false;
        }
		else if (elementos[i].nextElementSibling) {
			elementos[i].nextElementSibling.style.display = 'none';
		}
    }
    if(validado){
        return true;
    }

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
		fechaEntrega.disabled = true;
	}
}

function opcionPago(){
	let pagoEfectivo = document.getElementById("pagoEfectivo")
	let pagoTarjeta = document.getElementById("pagoTarjeta")

	let optPago = selectValue("tipoPago");

	if (optPago == 1) {
		pagoEfectivo.hidden = false;
		pagoTarjeta.hidden = true;
		getVuelto();
	}else{
		pagoEfectivo.hidden = true;
		pagoTarjeta.hidden = false;
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
			document.getElementById('vuelto').style.display = "none";
		}
	})

}