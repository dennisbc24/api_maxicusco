const express = require('express');
const fileUpload = require('express-fileupload')
const {uploadFile, getFile} = require('../helpers/aws')
//estos 2 son para subir a aws
const {upload} = require('../controllers/upload.controller');
const {verifyFile} = require('../middlewares/verifyFile')

const router = express.Router();
//modulo para eliminar archivos de backend
const { unlink } = require('fs-extra')
const path = require('path');

const schemaHandler = require('../middlewares/schema.handler');

const {createProductSchema, getProductSchema, updateProductSchema} = require('../schemas/product.schema')

const Product = require('../modelMongo/product');
//con esto estamos trayendo la logica del servicio
const ProductService = require('../services/product.service');
const service = new ProductService();

//faker
/* router.get('/', async(req, res) => {
    const products = await service.find();
    res.json(products);
})
 */

//mongo


router.get('/', async(req, res) => {
  try {
    const arrayProductDB = await Product.find()
    res.json(arrayProductDB)
  } catch (err) {
    console.log(err);
  }
})

router.post('/files', schemaHandler(createProductSchema, 'datos'),
async (req,res)=> {

  try {
    const imagen = req.files.file
  const datos = JSON.parse(req.body.datos)
  console.log(imagen);
  await uploadFile(imagen);
  const arrayProductDB = Product.create(datos)
  
  //res.json(arrayProductDB);
  
  //console.log(imagen);
  res.json({message: 'archivo subido'})
  } 
    catch(e){
      next(e)
  }
  
})

router.get('/files/:fileName', async (req,res)=> {
  const result = await getFile(req.params.fileName)
  res.json(result.$metadata)
  
  
  res.json({message: 'archivo recibido'})
})

router.get('/:id', schemaHandler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id)
    res.json(product);

  } catch (err) {
    next(err)
  }
}
);

router.get('/filter', (req,res) => {
    res.send('yo soy un filter');
  });

  //faker
/*   router.post('/', schemaHandler(createProductSchema, 'body'), async (req, res, next) => {
    try {
      //const arrayProductDB = await service.create(req.body);
      const arrayProductDB = service.create(req.body)
      res.json(arrayProductDB);
  
    } catch(e){
      next(e)
    }}) */

    //mongoBD
router.post('/', schemaHandler(createProductSchema, 'body'), 
            async (req, res, next) => {
  try {
    //const arrayProductDB = await service.create(req.body);
    console.log(req.body);
    const arrayProductDB = Product.create(req.body)
    res.json(arrayProductDB);

  } catch(e){
    next(e)
  }})

router.post('/upload', (req,res)=> {
  console.log(req.files)
  res.json({message: 'archivo subido'})
}
  //verifyFile,upload 
  //(req, res) => {
  //console.log(req.file);
  //res.render('index');}
)


router.patch('/:id',
schemaHandler(getProductSchema, 'params'),
schemaHandler(updateProductSchema, 'body'),
async (req, res) => {
  try {
      const { id } =req.params;
      const body = req.body;
      const product = await Product.findByIdAndUpdate(id, body);
      res.json({
        message: `producto con el ID: ${id} se actualizo con éxito`
      })
  }catch(error) {
      res.status(400).json({
      message: error.message
    })
  }

  })

  //faker
  /* router.delete('/:id',schemaHandler(getProductSchema, 'params'), async (req, res, next) => {
    try {
      const { id } = req.params;
      const encontrar = await service.findOne(id);
      console.log(encontrar.imageUrl);
      const product = await service.delete(id);
      const publicPath = __dirname.replace('routers', 'dennis');;
      const direccion = `${publicPath}${encontrar.imageUrl}`;
      console.log(direccion);
      unlink(path.resolve(direccion))
      res.json(id)
    } catch(e){
      next(e)
    }
  }); */

  //mongoDB
router.delete('/:id',schemaHandler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const encontrar = await Product.findById(id);
    const product = await Product.findByIdAndDelete(id);
    const publicPath = __dirname.replace('routers', 'dennis');;
    const direccion = `${publicPath}${encontrar.imageUrl}`;
    console.log(direccion);
    unlink(path.resolve(direccion))
    res.json(id)
  } catch(e){
    next(e)
  }
});



module.exports = router;
