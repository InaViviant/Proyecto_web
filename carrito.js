// Sistema de carrito de compras
let totalCarrito = 0;

// Funciones de persistencia
function guardarCarrito() {
    try {
        localStorage.setItem('gamehub_carrito', JSON.stringify(carrito));
        localStorage.setItem('gamehub_total', totalCarrito.toString());
    } catch (error) {
        console.error('Error al guardar carrito:', error);
    }
}

function cargarCarrito() {
    try {
        const carritoGuardado = localStorage.getItem('gamehub_carrito');
        const totalGuardado = localStorage.getItem('gamehub_total');
        
        if (carritoGuardado) {
            carrito = JSON.parse(carritoGuardado);
            totalCarrito = parseFloat(totalGuardado) || 0;
            console.log('Carrito cargado:', carrito.length, 'items');
        }
    } catch (error) {
        console.error('Error al cargar carrito:', error);
        carrito = [];
        totalCarrito = 0;
    }
}

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
    
    guardarCarrito(); 
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
        
        guardarCarrito(); 
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
        
        // Limpiar localStorage
        localStorage.removeItem('gamehub_carrito');
        localStorage.removeItem('gamehub_total');
        
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
    
    // Limpiar carrito después de la compra
    carrito = [];
    localStorage.removeItem('gamehub_carrito');
    localStorage.removeItem('gamehub_total');
    actualizarCarrito();
}

// Función para inicializar el carrito al cargar la página
function inicializarCarrito() {
    cargarCarrito();
    actualizarCarrito();
}

// Función para obtener información del carrito 
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
    
    guardarCarrito(); // Guardar después de agregar múltiples
    actualizarCarrito();
}

// Función para exportar el carrito 
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

// Función para importar carrito desde datos externos
function importarCarrito(carritoData) {
    try {
        if (carritoData && carritoData.items && Array.isArray(carritoData.items)) {
            carrito = carritoData.items;
            totalCarrito = carritoData.total || 0;
            guardarCarrito();
            actualizarCarrito();
            console.log('Carrito importado exitosamente');
        }
    } catch (error) {
        console.error('Error al importar carrito:', error);
    }
}

// Función para verificar si hay productos en el carrito
function tieneProductos() {
    return carrito.length > 0;
}

// Función para obtener cantidad total de productos
function getCantidadTotal() {
    return carrito.reduce((total, item) => total + item.cantidad, 0);
}

// Inicializar el carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrito();
    
    // Mostrar mensaje de bienvenida si hay productos en el carrito
    if (carrito.length > 0) {
        console.log(`Carrito restaurado con ${carrito.length} productos diferentes`);
    }
});

// Funciones adicionales para manejo de errores
window.addEventListener('error', function(e) {
    console.error('Error en el carrito:', e.error);
});

// Limpiar carrito automáticamente si está corrupto
window.addEventListener('beforeunload', function() {
    // Verificar integridad del carrito antes de cerrar
    try {
        JSON.stringify(carrito);
    } catch (error) {
        localStorage.removeItem('gamehub_carrito');
        localStorage.removeItem('gamehub_total');
    }
});

// Función para sincronizar entre pestañas
window.addEventListener('storage', function(e) {
    if (e.key === 'gamehub_carrito' || e.key === 'gamehub_total') {
        cargarCarrito();
        actualizarCarrito();
    }
});