class bebida
{
    constructor(nombre,precio)  
    {
        this.nombre = nombre;
        this.precio = precio;
    } 
}
const smirnoff = new bebida("smirnoff",1.439);
const sky  =     new bebida("sky",1.437);
const absolut =  new bebida("absolut",5.399);
const sernova =  new bebida("sernova",1.455);
const  bols =    new bebida("bols",839); 


const arraybebidas = [smirnoff,sky,absolut,sernova,bols];
console.log(arraybebidas)



let carrito =[] 

let seleccion = prompt("bienvenido a la mejor tienda de bebida desea comprar si o no" )

while (seleccion != "si" && seleccion != "no" ){
    alert("por favor ingresar si o no")
    seleccion = prompt("hola desea comprar algo si o no")
}
if(seleccion == "si"){
    alert("a continuacion nuestra lista de productos")
    let listaDeProductos = arraybebidas.map((producto) => producto.nombre + " " + producto.precio + " " + "Pesos");
    alert(listaDeProductos.join(" , "))
}  
else 
if(seleccion === "no"){
    alert("gracias por pasarte por la mejor tienda, hasta pronto!!!")
}
while(seleccion != "no"){
    let producto = prompt("agrega una bebida al carrito (smirnoff-sky-absolut,sernova,bols)");
    let precio = 0;



    if(producto == "smirnoff" ||producto == "sky" ||producto == "absolut" ||producto == "sernova" ||producto == "bols" )
    {switch(producto){ 
case "smirnoff":
precio = 1.439;
break;
case "sky":
precio = 1.437;
break;
case "absolut":
precio = 5.399;
break;
case "sernova":
precio = 1.455 ;
break;
case "bols":
precio = 839;
break;
}
let unidades = parseInt(prompt("cuantas unidades quiere llevar"))
carrito.push({producto, unidades, precio})

} else 
{alert("producto no disponible")}
seleccion = prompt("¿desea agregar otro producto?")
while(seleccion === "no") 
{alert("gracias por la compra, vuelva pronto")

let carritoFinal = carrito.map ((carritoFinal) => "producto:" + carritoFinal.producto + " " + "unidades:" + carritoFinal.unidades + " " + "precio:" +  carritoFinal.unidades * carritoFinal.precio );
alert(carritoFinal.join(" - "))
break;


}

}





