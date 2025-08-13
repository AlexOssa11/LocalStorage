//varaibles globales
let iconCart = document.querySelector(".carrito");
let iconCount = document.querySelector(".contar-pro");
let btnProducts = document.querySelectorAll(".btn-product");
let con = 1;
//agregar evento a los botones
btnProducts.forEach((btn)=>{
    btn.addEventListener("click", ()=>{
        iconCount.textContent = con++;
    });
});

//funcion para obtener informacion del producto
let getInfoProduct = ()=>{
    
}