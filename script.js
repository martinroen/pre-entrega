function mensaje(){
    alert ("bienvenido para registrase,complete los siguientes datos");
}
function mensaje2(){
    alert ("se a registrado con exito. ahora ya puede iniciar sesion");
}
mensaje();
let usuario = prompt("Nombre de usuario");
let clave = parseInt (prompt("clave numerica"));
mensaje2();
let UsuarioAutorizado;
let intento = 0;
for (let i = 0; i < 3; i++) 


{
UsuarioAutorizado = prompt("ingrese su usuario"); 

if (UsuarioAutorizado === usuario)

{}
else
{alert("usuaro incorrecto,intentelo de nuevo");}

if (UsuarioAutorizado === usuario) 


{
intento = parseInt(prompt("ingrese su clave numerica"));

if(clave === intento)

{alert("sesion iniciada"); break;}

else
{ alert("clave incorreta,intentelo de nuevo");} 

{intento = parseInt(prompt("ingrese su clave numerica"));   

if(clave === intento)

{ alert("sesion iniciada"); break;} }
}
} 

