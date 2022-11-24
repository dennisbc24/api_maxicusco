//const urlRaiz = "https://dry-plateau-16443.herokuapp.com";
const urlRaiz = "http://localhost:3000";

const url = `${urlRaiz}/api/v1/products`;
const urlUpload = `${urlRaiz}/api/v1/products/files`;

const btnUpload = document.querySelector('#upload');
const imageResult = document.querySelector('#image');
const linkDownload = document.querySelector('#link');

btnUpload.addEventListener('click',e=>{
    e.preventDefault();

    
    const file = document.querySelector('#file').files[0];

    console.log(file);
    const formData = new FormData();
    
    formData.append('file',file);
    console.log(formData);

    uploadFile(formData);
});

const uploadFile = (formData) => {

    fetch(urlUpload,{
        method:'POST',
        body:formData
    })
        /* .then(response => response.json())
        .then(data => {

            imageResult.src = data.Location;
            linkDownload.href = data.Location;
        }
        ) */
};

/* async function subirImagen() {
    const form = document.getElementById('uploadImage')
    const formData = new FormData(form);
  
    async function createProduct() {
  
      const nombre = document.getElementById('nameInput')
      const categoria = document.getElementById('categoryInput')
      const precio = document.getElementById('priceInput')
      //array
      const arrayCarac = [];
      const carac = document.getElementsByClassName('caracInput'),
      namesValue = [].map.call(carac, function(dataInput){
        arrayCarac.push(dataInput.value);
      })
      const imagen = document.getElementById('imageInput')
      //console.log(imagen);
  
  
      const objetoImage = formData.get('foto');
      //console.log(objetoImage);
      const urlArmada = `/images/${objetoImage.name}`
      //console.log(urlArmada);
  
      const productoNuevo = {
        name: nombre.value,
        category: categoria.value,
        price: precio.value,
        caracteristicas: arrayCarac,
        imageUrl: urlArmada
      }
  
      //console.log(productoNuevo);
  
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoNuevo)
    });
  
    const data = await res.json()
  
      console.log('save')
      traer();
      //console.log(res)
  
      if (res.status !== 200) {
        console.log("hubo un error: " + res.status + data.message);
      }
  }
    await createProduct();
  
    //con este bloque estamos subiendo la imagen al backend
    const res = await fetch(urlUpload, {
      method: 'POST',
      body: formData
    })
  
  
  } */



