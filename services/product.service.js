const faker = require("faker");
const boom = require('@hapi/boom');
const db = require('mongoose');
const Product = require('../modelMongo/product');



//mongodb://platzi_admin:46258001@cursoplatzi-shard-00-00.yir1r.mongodb.net:27017,cursoplatzi-shard-00-01.yir1r.mongodb.net:27017,cursoplatzi-shard-00-02.yir1r.mongodb.net:27017/?ssl=true&replicaSet=atlas-whqai1-shard-0&authSource=admin&retryWrites=true&w=majority

class ProductService {
    constructor(){
        this.products = [];
        this.generate();

    }

    generate(){
        const limit = 13;
        for(let index = 0; index < limit; index++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                category: faker.address.city(),
                price: parseInt(faker.commerce.price(), 10),
                caracteristicas: ["hola", "como", "estan"],
                imageUrl: '/images/roperoazul.jpg',
                //este es un ejemplo para utlizar otro tipo status code en error
                inBlock: faker.datatype.boolean(),
            })
        }
    }

    create(data) {
        /* const myProduct = new Product(data);
        myProduct.save(); */

          const newProduct = {
              id: faker.datatype.uuid(),
              ...data
          }
          this.products.push(newProduct);
          return newProduct;



    }


    async find() {
        return this.products;

    }
        findOne(id) {
           const product = this.products.find(item => item.id == id);
        if(!product){
            throw boom.notFound('no hay producto');
            }
        /* if(product.inBlock){
            throw boom.conflict('producto bloqueado');
        } */
    return product;
    }


    update(id, changes) {
        const index = this.products.findIndex(item => item.id === id);
        if(index === -1){
            throw boom.notFound('producto no encontrado')
        }
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        };
        return this.products[index];
    }

    delete(id) {
        const index = this.products.findIndex(item => item.id == id);
        if (index === -1) {
            throw boom.notFound('articulo no encontrado')
        }
        this.products.splice(index, 1);
        return { id };
    }
}

module.exports = ProductService;
