const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = './products.json';
    }


    async getProducts() {

        try {
            if (fs.existsSync(this.path)) {
                const productsJSON = await fs.promises.readFile(this.path, "utf-8");
                const productsJS = JSON.parse(productsJSON);
                // console.log(productsJS);
                return productsJS;
            } else return [];
        } catch (error) {
            console.log(error);
        };
    };


    async addProduct(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.log("Error al cargar producto: Falta informacion");
        };

        try {

            const products = await this.getProducts();

            let maxId = 0;
            products.map((product) => {
                if (product.id > maxId) maxId = product.id;
            })


            if (products.some((product) => product.code == code)) {
                return console.log("El Codigo ya esta siendo utilizado, ya debe haber un producto con el mismo codigo");
            };

            const product = {
                id: maxId + 1,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };

            products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(products));
            return console.log("Producto agreado con exito!");
        } catch (error) {
            console.log(error);
        }
    };



    async getProductById(productId) {
        const products = await this.getProducts();
        const productById = products.find((product) => product.id === productId);
        console.log(productById);
        return productById;
    }


    async deleteProduct(productId) {
        const products = await this.getProducts();
        const productById = products.find((product) => product.id === productId);
        const newProducts = products.filter((product) => product !== productById);
        console.log(newProducts);
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
    }

    async updateProduct(productId, productData) {
        const products = await this.getProducts();
        const productById = products.find((product) => product.id === productId);
        // modificar data
    }



}



const test = async () => {
    const productManager = new ProductManager();
    await productManager.addProduct("LG", "telefono", 1000, "img", 589, 500);
    await productManager.addProduct("samsung", "telefono", 1000, "img", 585, 100);
    await productManager.addProduct("iPhone", "telefono", 588, "img", 41, 55);
}

const test1 = async () => {
    const productManager = new ProductManager();
    await productManager.addProduct("Motorola", "telefono", 1000, "img", 389, 500);
}

const test2 = async () => {
    const productManager = new ProductManager();
    await productManager.getProductById(1)
}


const test3 = async () => {
    const productManager = new ProductManager();
    await productManager.deleteProduct(3)
}


test();