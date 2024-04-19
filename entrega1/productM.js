let products = [];

const addProducts = (title, description, price, thumbnail, code, stock) => {

/* newProduct: objeto que nos permite agregar productos */

const newProduct = {
    id: products.length + 1, /* el valor de la propiedad ID se autoincrementa en 1 cada vez*/
    title, 
    description, 
    price,
    thumbnail,
    code, 
    stock
}

/* validacion */ if (title === undefined || description === undefined || price=== undefined || thumbnail === undefined ||  code === undefined || stock === undefined) {
    console.log("Todos los campos deben ser completados");
    return; /* evita que se ejecute el push si hay uno o más campos vacíos */
}

const productExists = products.find (product => product.code === code);
/* validacion */ if (productExists) {
    console.error(`El producto ${title} con el código ${code} ya existe`);
    return; /* evita que se ejecute el push si el codigo se repite  */
}

/* agrega el producto al array */
        products.push (newProduct);
}

/* funcion que va a mostrar todos los productos */
const getProducts = () => {
    console.log (products);
    return products;
}

const getProductsById = (id) => {
    const product = products.find(product => product.id === id);
    if(!product) {
        console.log(`No se encontro el prodcuto con ID: ${id}`);
        return;
    }

    console.log(product);
    return product;
};


/* TEST */

/* función que agregara productos al listado */
addProducts ("Producto1", "primer producto", 10000, "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", "AB123", 100);
addProducts ("Producto2", "segundo producto", 25000, "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", "AB124");
addProducts ("Producto3", "tercer producto", 5000, "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", "AB125", 600);
addProducts ("Producto4", "cuarto producto", 6000, "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", "AB125", 50);
addProducts ("Producto5", "quinto producto", 12000, "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", "AB127", 1240);

getProductsById(8); /* llamada a la función getProductsById indicando cual ID queremos ver y si existe */ 
getProducts(); /* llamada a la función getProducts para ver la lista de productos de la variable products */ 
