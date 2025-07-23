//Variables globales
const d = document;
let clienteInput = d.querySelector(".cliente");
let productInput = d.querySelector(".producto");
let precioInput = d.querySelector(".precio");
let imagenInput = d.querySelector(".imagen");
let observacionInput = d.querySelector(".observacion");
let btnGuardar = d.querySelector(".btn-guardar");
let tabla = d.querySelector(".table tbody");


btnGuardar.addEventListener("click", ()=> {
    //alert(clienteInput.value);
    let datos = validarFormulario();
    if(datos != null){
        guardarDatos(datos);
    }
    guardarDatos(datos);
    borrarTabla();
    mostrarDatos();
})

//Validar campos formulario
function validarFormulario(){
    let datosForm;
    if(clienteInput.value == "" || productInput.value == "" || precioInput.value == "" || imagenInput.value == ""){
        alert("Todos los campos del formulario son obligatorios");
        return;
    }else{
        datosForm = {
            cliente : clienteInput.value,
            producto : productInput.value,
            precio :  precioInput.value,
            imagen: imagenInput.value,
            observacion : observacionInput.value
        }
    
    console.log(datosForm);
    clienteInput.value = "";
    productInput.value = "";
    precioInput.value = "";
    imagenInput.value = "";
    observacionInput.value = "";

    return datosForm;
    }
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

//funcion para extraer los datos guardados previamente
function mostrarDatos(){
    let pedidos = [];
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    //validar datos guardados previamente en ls
    if( pedidosPrevios != null ){
        pedidos = pedidosPrevios;
    }

    //console.log(pedidos);
    //mostrar los datos en la tabla
    pedidos.forEach((p) => {
        let fila = d.createElement("tr");
        fila.innerHTML = `
        <td> ${i+1} </td>
        <td> ${p.cliente} </td>
        <td> ${p.producto} </td>
        <td> ${p.precio} </td>
        <td> <img src="${p.imagen}" width = "50%></td>
        <td> ${p.observacion} </td>
        <td>
            <span onclick="actualizarPedido(${i})" class="btn-editar btn btn-warning"> 😁</span>
            <span onclick="eliminarPedido(${i})" class="btn-eliminar btn btn-danger"> 😒</span>
        </td>
        `;
        tabla.appendChild(fila);
    });
}

//quitar los datos de la tabla
function borrarTabla() {
    let filas = d.querySelectorAll(".table tbody tr");
    //console.log(filas)
    filas.forEach((f)=>{
        f.remove();
    })
}

//funcion eliminar pedido de la tabla
function eliminarPedido(pos) {
    let pedidos = [];
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    //validar datos guardados previamente en ls
    if( pedidosPrevios != null ){
        pedidos = pedidosPrevios;
    }
    //confirmar pedido a eliminar
    let confirmar = confirm("¿Deseas eliminar el pedido del cliente "+pedidos[pos].cliente +"?");
    if(confirmar){
        //alert("Lo eliminaste");
        pedidos.splice(pos,1);
        alert("Pedido eliminado con exito");
        // guardar los datos que quedaron en Ls
        localStorage.setItem(listadoPedidos, JSON.stringify(pedidos)); 
        borrarTabla();
        mostrarDatos();

    }
}

//actualizar pedido de ls
function actualizarPedido(pos){
    let pedidos = [];
    let pedidosPrevios = JSON.parse(localStorage.getItem(listadoPedidos));
    //validar datos guardados previamente en ls
    if( pedidosPrevios != null ){
        pedidos = pedidosPrevios;
    }
    //pasar los datos al formulario para editarlos
    clienteInput.value = pedidos[pos].cliente;
    productInput.value = pedidos[pos].producto;
    precioInput.value = pedidos[pos].precio;
    observacionInput.value = pedidos[pos].observacion;
    //activar boton de actualizar
    let btnActualizar = d.querySelector(".btn-actualizar");
    btnActualizar.classList.toggle("d-none");
    btnGuardar.classList.toggle("d-none");
    //agregar evento al boton actualizar
    btnActualizar.addEventListener("click", function(){
        pedidos[pos].cliente = clienteInput.value;
        pedidos[pos].producto = productoInput.value;
        pedidos[pos].precio = precioInput.value;
        pedidos[pos].observacion = observacionInput.value;
        //guardar los datos editados en ls
        localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
        alert("El dato fue actualizado con exito");

        clienteInput.value = "";
        productInput.value = "";
        precioInput.value = "";
        imagenInput.value = "";
        observacionInput.value = "";

        btnActualizar.classList.toggle("d-none");
        btnGuardar.classList.toggle("d-none");

        borrarTabla();
        mostrarDatos();
    });
}

//mostrar los datos de localStorage al recargar la pagina
d.addEventListener("DOMContentLoaded", function(){
    borrarTabla();
    mostrarDatos();
})