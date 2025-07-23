//Variables globales
const d = document;
let clienteInput = d.querySelector(".cliente");
let productInput = d.querySelector(".producto");
let precioInput = d.querySelector(".precio");
let imagenInput = d.querySelector(".imagen");
let observacionInput = d.querySelector(".observacion");
let btnGuardar = d.querySelector(".btn-guardar");


btnGuardar.addEventListener("click", ()=> {
    //alert(clienteInput.value);
    let datos = validarFormulario();
    guardarDatos(datos);
})

//Validar campos formulario
function validarFormulario(){
    let datosForm;
    if(clienteInput.value == "" || productInput.value == "" || precioInput.value == "" || imagenInput.value == ""){
        alert("Todos los campos del formulario son obligatorios");
    }else{
        datosForm = {
            cliente : clienteInput.value,
            producto : productInput.value,
            precio :  precioInput.value,
            imagen: imagenInput.value,
            observacion : observacionInput.value
        }
    }
    console.log(datosForm);
    clienteInput.value = "";
    productInput.value = "";
    precioInput.value = "";
    imagenInput.value = "";
    observacionInput.value = "";

    return datosForm;
}

//Funcion guardar datos en LS
const listadoPedidos = "Pedidos";
function guardarDatos( datos ){
    let pedidos = [];
    //extraer datos guardados previamente en ls
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    //validar datos guardados previamente en ls
    if( pedidosPrevios != null ){
        pedidos = pedidosPrevios;
    }
    //agregar pedido nuevo al array
    pedidos.push(datos);
    //guardar 

    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
    alert("Datos guardados con exito");
}