const fs = require ("fs"); /* inicia file system */

let products = []; /* se crea la lista de productos vacìa */
let pathFile = "./data/products.json" /* escribimos la ruta de los productos para evitar escribirlo de forma manual cada vez */

const addProducts = async (title, description, price, thumbnail, code, stock) => { /* ahora las funciones son asicncronas */

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
    await fs.promises.writeFile (pathFile, JSON.stringify(products));
};

/* funcion que va a mostrar todos los productos */
const getProducts = async () => {

const productsJson = await fs.promises.readFile(pathFile, "utf8");
    products=JSON.parse(productsJson) || []; /* de no haber informacion, se asigna array vacio */
    return products;
/* test */
/* console.log(products[1]);
/* console.log(productsJson); */    
};
const getProductsById = async (id) => {
    await getProducts();
    
    const product = products.find(product => product.id === id); /* el ID debe coincidir con el que ponemos por parametro */
    if(!product) {
        console.log(`No se encontro el prodcuto con ID: ${id}`);
        return;
    }

    console.log(product);
    return product;
};

const updateProduct = async (id, dataProduct) => {
    await getProducts();
    const index =products.findIndex (product => product.id===id); /* busqueda del valor indice del producto */
    products[index]={
        ...products[index], /* copia de todo lo que existe */
        ...dataProduct /* pero sobre escribiendo las propiedades dataproduct */
    }
    await fs.promises.writeFile(pathFile, JSON.stringify(products)); /*sobresscribo archivo*/
}

const deleteProduct = async (id) => {
    await getProducts();
    products= products.filter(product => product.id!==id);  /*  filtra todos los productos exepto el id seleccionado */
    await fs.promises.writeFile(pathFile, JSON.stringify(products)); /*sobreescribo el archivo con array modificado*/
}

/* TEST */

/* función que agregara productos al listado */
/* addProducts ("Producto1", "primer producto", 10000, "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", "AB123", 100);
addProducts ("Producto2", "segundo producto", 25000, "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", "AB124");
addProducts ("Producto3", "tercer producto", 5000, "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", "AB125", 600);
addProducts ("Producto4", "cuarto producto", 6000, "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", "AB125", 50);
addProducts ("Producto5", "quinto producto", 12000, "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png", "AB127", 1240);
 */
/* getProductsById(1); */ /* llamada a la función getProductsById indicando cual ID queremos ver y si existe */ 
/* getProducts(); /* llamada a la función getProducts para ver la lista de productos de la variable products */ 

/* prueba moodificacion producto  */
/* updateProduct(2, {             
        title: "Producto modificado con update prueba",
        description: "modificación de producto",
        }); */

        deleteProduct(1); /*prueba de borrado del producto 1*/