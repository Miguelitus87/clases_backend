const fs = require('fs')

class Contenedor {
    constructor(archivo){
        this.archivo = archivo
        this.productos = []      
    }

    save = async (producto) => { 
        try{
            const id = this.productos.length > 0 ? producto.id = this.productos.length + 1 : producto.id = 1       
            this.productos.push(producto)
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(this.productos)) 
            console.log('Producto Insertado')           
            return id
        }
        catch{
            return console.log('Entro al CATCH')

        } 
    }

}

const producto = new Contenedor('./productos.txt')

producto.save({nombre: 'Martillo', precio:'500'})
producto.save({nombre: 'Llave', precio:'300'})
producto.save({nombre: 'Pinza', precio:'100'})

const express = require('express')
const app= express()


app.get('/',(req,res) =>{
    res.send(`<h1>PAGINA FUNCIONANDO EN EL PUERTO ${PORT}</h1>`)
})

app.get('/productos',(req,res) =>{
    const array = fs.readFileSync('./productos.txt','utf-8')
    res.send(`Los productos: ${array}`)
})

app.get('/productoRandom',(req,res) =>{
    const array = JSON.parse(fs.readFileSync('./productos.txt','utf-8'))
    min = Math.ceil(1);
    max = Math.floor(array.length);
    let idAleatorio =Math.floor(Math.random() * (max - min + 1) + min);
    let productorandom = JSON.stringify((array.filter(e=> e.id == 1)))
    res.send(`El producto aleatorio es: ${productorandom}`)
})

const PORT = process.env.PORT || 8080
app.listen(PORT,(req,res)=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})


//Para ver detalles del error en caso que ocurriera uno.
//server.on('error',error => console.log(`Error: ${error}`))
