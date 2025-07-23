// Variables globales
const d = document;
let clienteInput = d.querySelector(".cliente");
let productInput = d.querySelector(".producto");
let precioInput = d.querySelector(".precio");
let imagenInput = d.querySelector(".imagen");
let observacionInput = d.querySelector(".observacion");
let btnGuardar = d.querySelector(".btn-guardar");
let tabla = d.querySelector(".table tbody");
let buscadorInput = d.querySelector(".buscador"); 

const listadoPedidos = "Pedidos";

// Evento del botón Guardar
btnGuardar.addEventListener("click", () => {
    let datos = validarFormulario();
    if (datos != null) {
        guardarDatos(datos);
        mostrarDatos(); // recarga la tabla
    }
});

// Validar campos formulario
function validarFormulario() {
    if (
        clienteInput.value == "" ||
        productInput.value == "" ||
        precioInput.value == "" ||
        imagenInput.value == ""
    ) {
        alert("Todos los campos del formulario son obligatorios");
        return null;
    } else {
        let datosForm = {
            cliente: clienteInput.value,
            producto: productInput.value,
            precio: precioInput.value,
            imagen: imagenInput.value,
            observacion: observacionInput.value
        };

        console.log(datosForm);

        // Limpiar formulario
        clienteInput.value = "";
        productInput.value = "";
        precioInput.value = "";
        imagenInput.value = "";
        observacionInput.value = "";

        return datosForm;
    }
}

// Guardar datos en localStorage
function guardarDatos(datos) {
    let pedidosPrevios = localStorage.getItem(listadoPedidos);
    let pedidos = [];
    if (pedidosPrevios && pedidosPrevios !== "undefined") {
        pedidos = JSON.parse(pedidosPrevios);
    }
    pedidos.push(datos);
    localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
    alert("Datos guardados con éxito");
}

// Mostrar datos guardados (con filtro opcional)
function mostrarDatos(filtro = "") {
    let pedidosPrevios = localStorage.getItem(listadoPedidos);
    let pedidos = [];
    if (pedidosPrevios && pedidosPrevios !== "undefined") {
        pedidos = JSON.parse(pedidosPrevios);
    }

    borrarTabla();

    let pedidosFiltrados = pedidos.filter((p) => {
        let texto = filtro.toLowerCase();
        return (
            p.cliente.toLowerCase().includes(texto) ||
            p.producto.toLowerCase().includes(texto)
        );
    });

    pedidosFiltrados.forEach((p, i) => {
        let fila = d.createElement("tr");
        fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${p.cliente}</td>
            <td>${p.producto}</td>
            <td>${p.precio}</td>
            <td><img src="${p.imagen}" width="50%"></td>
            <td>${p.observacion}</td>
            <td>
                <span onclick="actualizarPedido(${i})" class="btn-editar btn btn-warning">😁</span>
                <span onclick="eliminarPedido(${i})" class="btn-eliminar btn btn-danger">😒</span>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

// Quitar datos de la tabla
function borrarTabla() {
    let filas = d.querySelectorAll(".table tbody tr");
    filas.forEach((f) => {
        f.remove();
    });
}

// Eliminar pedido
function eliminarPedido(pos) {
    let pedidosPrevios = localStorage.getItem(listadoPedidos);
    let pedidos = [];
    if (pedidosPrevios && pedidosPrevios !== "undefined") {
        pedidos = JSON.parse(pedidosPrevios);
    }

    let confirmar = confirm(
        "¿Deseas eliminar el pedido del cliente " + pedidos[pos].cliente + "?"
    );
    if (confirmar) {
        pedidos.splice(pos, 1);
        alert("Pedido eliminado con éxito");
        localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
        mostrarDatos(buscadorInput.value); // refresca la tabla manteniendo filtro
    }
}

// Actualizar pedido
function actualizarPedido(pos) {
    let pedidosPrevios = localStorage.getItem(listadoPedidos);
    let pedidos = [];
    if (pedidosPrevios && pedidosPrevios !== "undefined") {
        pedidos = JSON.parse(pedidosPrevios);
    }

    clienteInput.value = pedidos[pos].cliente;
    productInput.value = pedidos[pos].producto;
    precioInput.value = pedidos[pos].precio;
    imagenInput.value = pedidos[pos].imagen;
    observacionInput.value = pedidos[pos].observacion;

    let btnActualizar = d.querySelector(".btn-actualizar");
    btnActualizar.classList.toggle("d-none");
    btnGuardar.classList.toggle("d-none");

    function actualizar() {
        pedidos[pos].cliente = clienteInput.value;
        pedidos[pos].producto = productInput.value;
        pedidos[pos].precio = precioInput.value;
        pedidos[pos].imagen = imagenInput.value;
        pedidos[pos].observacion = observacionInput.value;

        localStorage.setItem(listadoPedidos, JSON.stringify(pedidos));
        alert("El dato fue actualizado con éxito");

        clienteInput.value = "";
        productInput.value = "";
        precioInput.value = "";
        imagenInput.value = "";
        observacionInput.value = "";

        btnActualizar.classList.toggle("d-none");
        btnGuardar.classList.toggle("d-none");

        btnActualizar.removeEventListener("click", actualizar);

        mostrarDatos(buscadorInput.value);
    }

    btnActualizar.addEventListener("click", actualizar);
}

// Evento buscador en tiempo real
buscadorInput.addEventListener("input", () => {
    let texto = buscadorInput.value;
    mostrarDatos(texto);
});

// Mostrar datos al cargar la página
d.addEventListener("DOMContentLoaded", function () {
    mostrarDatos();
});
