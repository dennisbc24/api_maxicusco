const express = require('express');
//libreria para subir archivos
const fileUpload = require('express-fileupload')
const multer = require('multer');
const cors = require('cors');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

const {logError,errorHandler, errorBoomHandler} = require('./middlewares/error.handler')
//donde va a encontrar los archivos estaticos
app.use(fileUpload({
    //esto es para que los archivos se guarden en una carpeta temporal del proyecto
    useTempFiles: true,
    tempFileDir: './uploads',
    debug:true
}));
app.use(express.static('dennis'));
//aqui se ejecuta todos los routers

//app.set('views', path.join(__dirname, './views'));
const routerApi = require('./routers');

//este middleware sirve para que la respuesta del post sea con la data mas
app.use(express.json());

const whitelist = ['http://127.0.0.1:5555','http://127.0.0.1:5501','http://127.0.0.1:5500', 'http://maxicusco.net', 'http://127.0.0.1', 'https://dry-plateau-16443.herokuapp.com'];
const options = {
    origin: (origin, callback) => {
        if(whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('no permitido'));
        }
    }
}

app.use(cors());

//app.use(cors(options));

//esto es para que la imagen subida quede con su nombre de origen
const storage = multer.diskStorage({
    destination: 'dennis/images',
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const publicPath = __dirname;
const direccion = `${publicPath}/dennis/images`
console.log(direccion);
/* app.use(multer({
    storage: storage,
    dest: './dennis/images',
    fileSize: 50000000 // 50MB
}).single('foto')); */

routerApi(app);

app.use(logError);
app.use(errorBoomHandler);
app.use(errorHandler);

const mongoose = require('mongoose');

const user = 'dennis_prueba';
const password = 'xEYFUZVdPUqXvBMG';
const dbname = 'prouctos';
const uri = `mongodb+srv://${user}:${password}@cursoplatzi.yir1r.mongodb.net/${dbname}?retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
mongoose.connect(uri,{
    useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> console.log('Base de datos conectada'))
    .catch(e => console.log(e))

//con esto escuchamos el puerto 3005
app.listen(port, () => {
    console.log('Mi port ' + port);
});




