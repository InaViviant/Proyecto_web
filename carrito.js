// Sistema de carrito de compras - Versión corregida
let carrito = [];
let totalCarrito = 0;

function agregarAlCarrito(nombre, precio, elemento) {
    // Buscar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad += 1;
        productoExistente.subtotal = productoExistente.cantidad * productoExistente.precio;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1,
            subtotal: precio
        });
    }
    
    // Animación visual del producto
    elemento.classList.add('producto-agregado');
    setTimeout(() => {
        elemento.classList.remove('producto-agregado');
    }, 300);
    
    // Animación del contador
    const carritoCounter = document.getElementById('carritoCounter');
    if (carritoCounter) {
        carritoCounter.classList.add('updated');
        setTimeout(() => {
            carritoCounter.classList.remove('updated');
        }, 400);
    }
    
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoItems = document.getElementById('carritoItems');
    const carritoEmpty = document.getElementById('carritoEmpty');
    const carritoTotal = document.getElementById('carritoTotal');
    const carritoActions = document.getElementById('carritoActions');
    const carritoCounter = document.getElementById('carritoCounter');
    const totalAmount = document.getElementById('totalAmount');
    
    // Verificar que los elementos existen
    if (!carritoItems || !carritoCounter || !totalAmount) {
        console.error('Elementos del carrito no encontrados');
        return;
    }
    
    // Calcular total y cantidad de items
    totalCarrito = carrito.reduce((total, item) => total + item.subtotal, 0);
    const cantidadItems = carrito.reduce((total, item) => total + item.cantidad, 0);
    
    // Actualizar contador
    carritoCounter.textContent = cantidadItems;
    
    if (carrito.length === 0) {
        // Carrito vacío
        if (carritoEmpty) carritoEmpty.style.display = 'block';
        if (carritoTotal) carritoTotal.style.display = 'none';
        if (carritoActions) carritoActions.style.display = 'none';
        carritoItems.innerHTML = '';
    } else {
        // Carrito con items
        if (carritoEmpty) carritoEmpty.style.display = 'none';
        if (carritoTotal) carritoTotal.style.display = 'block';
        if (carritoActions) carritoActions.style.display = 'flex';
        
        // Actualizar total
        totalAmount.textContent = totalCarrito.toLocaleString();
        
        // Generar HTML de items
        carritoItems.innerHTML = carrito.map((item, index) => `
            <div class="carrito-item">
                <div class="item-info">
                    <div class="item-name">${item.nombre}</div>
                    <div class="item-price">$${item.precio.toLocaleString()}</div>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn" onclick="cambiarCantidad('${item.nombre}', -1)" title="Disminuir cantidad">-</button>
                    <span class="quantity-number">${item.cantidad}</span>
                    <button class="quantity-btn" onclick="cambiarCantidad('${item.nombre}', 1)" title="Aumentar cantidad">+</button>
                </div>
            </div>
        `).join('');
        
        // Hacer scroll hacia abajo para ver el nuevo item
        carritoItems.scrollTop = carritoItems.scrollHeight;
    }
}

function cambiarCantidad(nombre, cambio) {
    const producto = carrito.find(item => item.nombre === nombre);
    
    if (producto) {
        producto.cantidad += cambio;
        
        if (producto.cantidad <= 0) {
            // Eliminar producto si la cantidad es 0 o menor
            carrito = carrito.filter(item => item.nombre !== nombre);
        } else {
            // Actualizar subtotal
            producto.subtotal = producto.cantidad * producto.precio;
        }
        
        // Animación del contador
        const carritoCounter = document.getElementById('carritoCounter');
        if (carritoCounter) {
            carritoCounter.classList.add('updated');
            setTimeout(() => {
                carritoCounter.classList.remove('updated');
            }, 400);
        }
        
        actualizarCarrito();
    }
}

function limpiarCarrito() {
    if (carrito.length === 0) {
        alert('El carrito ya está vacío');
        return;
    }
    
    // Confirmación antes de limpiar
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
        carrito = [];
        
        // Animación del contador
        const carritoCounter = document.getElementById('carritoCounter');
        if (carritoCounter) {
            carritoCounter.classList.add('updated');
            setTimeout(() => {
                carritoCounter.classList.remove('updated');
            }, 400);
        }
        
        actualizarCarrito();
    }
}

function comprarCarrito() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Generar mensaje de compra
    let mensaje = '¡Compra realizada con éxito!\n\nResumen de tu compra:\n';
    mensaje += '=' + '='.repeat(40) + '\n';
    
    carrito.forEach(item => {
        mensaje += `• ${item.nombre}\n`;
        mensaje += `  Cantidad: ${item.cantidad}\n`;
        mensaje += `  Precio unitario: $${item.precio.toLocaleString()}\n`;
        mensaje += `  Subtotal: $${item.subtotal.toLocaleString()}\n`;
        mensaje += '-'.repeat(40) + '\n';
    });
    
    mensaje += `\nTOTAL FINAL: $${totalCarrito.toLocaleString()}\n`;
    mensaje += '=' + '='.repeat(40) + '\n';
    mensaje += '\n¡Gracias por tu compra!';
    
    alert(mensaje);
    limpiarCarrito();
}

// Función para inicializar el carrito al cargar la página
function inicializarCarrito() {
    actualizarCarrito();
}

// Función para obtener información del carrito (útil para debug)
function obtenerInfoCarrito() {
    return {
        items: carrito.length,
        totalItems: carrito.reduce((total, item) => total + item.cantidad, 0),
        total: totalCarrito,
        productos: carrito
    };
}

// Función para agregar múltiples unidades de un producto
function agregarMultiplesUnidades(nombre, precio, cantidad, elemento) {
    const productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad += cantidad;
        productoExistente.subtotal = productoExistente.cantidad * productoExistente.precio;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            subtotal: precio * cantidad
        });
    }
    
    // Animación visual
    if (elemento) {
        elemento.classList.add('producto-agregado');
        setTimeout(() => {
            elemento.classList.remove('producto-agregado');
        }, 300);
    }
    
    // Animación del contador
    const carritoCounter = document.getElementById('carritoCounter');
    if (carritoCounter) {
        carritoCounter.classList.add('updated');
        setTimeout(() => {
            carritoCounter.classList.remove('updated');
        }, 400);
    }
    
    actualizarCarrito();
}

// Inicializar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrito();
});

// Funciones adicionales para manejo de errores
window.addEventListener('error', function(e) {
    console.error('Error en el carrito:', e.error);
});

// Función para exportar el carrito (para futuras mejoras)
function exportarCarrito() {
    if (carrito.length === 0) {
        alert('No hay productos en el carrito para exportar');
        return;
    }
    
    const carritoData = {
        fecha: new Date().toISOString(),
        items: carrito,
        total: totalCarrito
    };
    
    console.log('Datos del carrito:', carritoData);
    return carritoData;
}