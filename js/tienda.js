document.addEventListener("DOMContentLoaded", () => {
  const botonesAgregar = document.querySelectorAll(".boton-agregar");
  const contadorCarrito = document.getElementById("cantidad-carrito");

  // Obtener el carrito desde localStorage o iniciar vacío
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Función para actualizar el número del carrito
  function actualizarContador() {
    let totalCantidad = carrito.reduce((sum, prod) => sum + prod.cantidad, 0);
    if (contadorCarrito) {
      contadorCarrito.textContent = totalCantidad;
    }
  }

  // Guardar carrito en localStorage
  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
  }

  // Agregar producto al carrito
  botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
      const nombre = boton.dataset.nombre;
      const precio = parseFloat(boton.dataset.precio);
      const imagen = boton.dataset.imagen;

      const productoExistente = carrito.find(item => item.nombre === nombre);

      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        carrito.push({
          nombre,
          precio,
          imagen,
          cantidad: 1
        });
      }

      guardarCarrito();
    });
  });

  // Inicializar el contador al cargar
  actualizarContador();
});