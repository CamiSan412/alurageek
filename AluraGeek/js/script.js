const API_URL = 'http://localhost:3000/productos';

document.addEventListener('DOMContentLoaded', async () => {
    const form = document.getElementById('producto-form');
    const productosLista = document.getElementById('productos-lista');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value;
        const precio = document.getElementById('precio').value;
        const imagen = document.getElementById('imagen').value;

        const producto = {
            nombre,
            precio,
            imagen
        };

        await agregarProducto(producto);
        form.reset();
    });

    const fetchProductos = async () => {
        const response = await fetch(API_URL);
        const productos = await response.json();
        productos.forEach(producto => renderProducto(producto));
    };

    const agregarProducto = async (producto) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        const newProducto = await response.json();
        renderProducto(newProducto);
    };

    const eliminarProducto = async (id, card) => {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        productosLista.removeChild(card);
    };

    const renderProducto = (producto) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = producto.imagen;

        const info = document.createElement('div');
        info.classList.add('card-container--info');

        const nombre = document.createElement('p');
        nombre.textContent = producto.nombre;

        const valueContainer = document.createElement('div');
        valueContainer.classList.add('card-container--value');

        const precio = document.createElement('p');
        precio.textContent = `$${producto.precio}`;

        const trashIcon = document.createElement('img');
        trashIcon.classList.add('icono')
        trashIcon.src = './assets/delete.png';
        trashIcon.alt = 'Eliminar Producto';
        trashIcon.style.cursor = 'pointer';
        trashIcon.addEventListener('click', () => {
            eliminarProducto(producto.id, card);
        });

        valueContainer.appendChild(precio);
        valueContainer.appendChild(trashIcon);
        info.appendChild(nombre);
        info.appendChild(valueContainer);
        card.appendChild(img);
        card.appendChild(info);
        productosLista.appendChild(card);
    };

    await fetchProductos();
});
