const producto = [
    {nombre:"smirnoff", precio: 1.439 },
    {nombre:"sky", precio: 1.437 },
    {nombre:"absolut", precio: 5.399 },
    {nombre:"sernova", precio: 1.455 },
    {nombre:"new style", precio: 839 },

];
let carrito =[] 

let seleccion = prompt("bienvenido a la mejor tienda de bebida desea comprar si o no" )

while (seleccion != "si" && seleccion != "no" ){
    alert("por favor ingresar si o no")
    seleccion = prompt("hola desea comprar algo si o no")
}
if(seleccion == "si"){
    alert("a continuacion nuestra lista de productos")
    let listaDeProductos = producto.map((producto) => producto.nombre + " " + producto.precio + " " + "Pesos");
    alert(listaDeProductos.join(" , "))
}  
else 
if(seleccion === "no"){
    alert("gracias por pasarte por la mejor tienda, hasta pronto!!!")
}
while(seleccion != "no"){
    let producto = prompt("agrega una bebida al carrito")
    let precio = 0
    if(producto == "smirnoff" ||producto == "sky" ||producto == "absolut" ||producto == "sernova" ||producto == "new style" )
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
case "new style":
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





