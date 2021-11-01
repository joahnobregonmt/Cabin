



function buscar(){

    var e = document.getElementById("servicio");
    var text = e.options[e.selectedIndex].text;

    var z = document.getElementById("Tabla");
    z.style.display = 'block'


    if(text == "Cabaña"){

      
       MostrarCabin();  
    }

    if(text == "Cliente"){
   

        MostrarClientes();
    
    }

    if(text == "Mensaje"){

        MostrarMensajes();  
    }

    if(text == "Categoria"){

         MostrarCategorias();  
    }

    if(text == "Reservacion"){

        MostrarReservas();  
   }
   if(text == "Administrador"){

    TraerAdmin();  
   }

     
    
    



}


function EnviarCabin(){
    let datos = {
        brand:$("#brand").val(),
        rooms:$("#rooms").val(),
        category:{id:$("#category_id").val()},
        name:$("#name").val(),
        description:$("#messagetext").val(),
    };

    console.log(datos)
    let datosenviados = JSON.stringify(datos);
    $.ajax({
        url:'http://129.151.114.186:8080/api/Cabin/save',
        data:datosenviados,
        type:'POST',
        dataType:'JSON',
        contentType: 'application/json; charset=UTF-8',

        errr: function(xhr,status){
            alert('Ha sucedido un problema, '+xhr.status);
        },
        complete: function(xhr,status){
           /*alert('Peticion realizada '+xhr.status)*/
           if(xhr.status==555){

            alert("Error al guardar prube con otro ID o verifique que esta completa la informacion")

           }
           else{
            $("#brand").val("");
            $("#rooms").val("");
            $("#category_id").val("");
            $("#name").val("");
            $("#messagetext").val("");
    
            alert("Cabaña guardada");

           }

     
         
        },
        
        
    });

}

function EnviarReserva(){
    let datos = {
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        client:{idClient:$("#IdClient").val()},
        cabin:{id:$("#IdCabin").val()},
        status:$("#status").val(),
    };

    console.log(datos)
    let datosenviados = JSON.stringify(datos);
    $.ajax({
        url:'http://129.151.114.186:8080/api/Reservation/save',
        data:datosenviados,
        type:'POST',
        dataType:'JSON',
        contentType: 'application/json; charset=UTF-8',

        errr: function(xhr,status){
            alert('Ha sucedido un problema, '+xhr.status);
        },
        complete: function(xhr,status){
           /*alert('Peticion realizada '+xhr.status)*/
           if(xhr.status==555){

            alert("Error al guardar prube con otro ID o verifique que esta completa la informacion")

           }
           else{
            $("#startDate").val("");
            $("#devolutionDate").val("");
     
    
            alert("Reserva guardada");

           }

     
         
        },
        
        
    });

}

function EnviarClient(){
    let datos = {
        name:$("#name").val(),
        email:$("#email").val(),
        password:$("#password").val(),
        age:$("#age").val(),
    };
    let datosenviados = JSON.stringify(datos);
    $.ajax({
        url:'http://129.151.114.186:8080/api/Client/save',
        data:datosenviados,
        type:'POST',
        dataType:'JSON',
        contentType: 'application/json; charset=UTF-8',

        errr: function(xhr,status){
            alert('Ha sucedido un problema, '+xhr.status);
        },
        complete: function(xhr,status){
           /*alert('Peticion realizada '+xhr.status)*/
           if(xhr.status==555){

            alert("Error al guardar prube con otro ID o verifique que esta completa la informacion")

           }
           else{
            $("#password").val("");
            $("#name").val("");
            $("#email").val("");
            $("#age").val("");
            alert("Cliente guardado");

           }

     
         
        },
        
    });

}

function EnviarCategoria(){
    let datos = {
        name:$("#name").val(),
        description:$("#description").val(),
    };
    let datosenviados = JSON.stringify(datos);
    $.ajax({
        url:'http://129.151.114.186:8080/api/Category/save',
        data:datosenviados,
        type:'POST',
        dataType:'JSON',
        contentType: 'application/json; charset=UTF-8',

        errr: function(xhr,status){
            alert('Ha sucedido un problema, '+xhr.status);
        },
        complete: function(xhr,status){
           /*alert('Peticion realizada '+xhr.status)*/
           if(xhr.status==555){

            alert("Error al guardar prube con otro ID o verifique que esta completa la informacion")

           }
           else{
            $("#name").val("");
            $("#description").val("");
            alert("Categoria guardada");

           }

     
         
        },
        
    });

}

function EnviarMensaje(){
    let datos = {
        messageText:$("#messagetext").val(),
        client:{idClient:$("#IdClient").val()},
        cabin:{id:$("#IdCabin").val()},
    };
    let datosenviados = JSON.stringify(datos);
    $.ajax({
        url:'http://129.151.114.186:8080/api/Message/save',
        data:datosenviados,
        type:'POST',
        dataType:'JSON',
        contentType: 'application/json; charset=UTF-8',

        errr: function(xhr,status){
            alert('Ha sucedido un problema, '+xhr.status);
        },
        complete: function(xhr,status){
           /*alert('Peticion realizada '+xhr.status)*/
           if(xhr.status==555){

            alert("Error al guardar prube con otro ID o verifique que esta completa la informacion")

           }
           else{
            $("#messagetext").val("");
            alert("Mensaje guardado");

           }

     
         
        },
        
    });

}

function pintarReservas(items){

    document.getElementById("Tabla").innerHTML ="";
    let mytable='<table>';
    console.log(items)
    mytable+='<thead><tr><th>ID</th><th>NAME</th><th>CABIN</th><th>Fecha Inicio</th><th>Fecha Final</th><th>ESTADO</th><th>ACCIONES</th></tr></thead>';
    for(i=0;i<items.length;i++){
        
        mytable+='<tr>';
        mytable+='<td>'+items[i].idReservation+'</td>';
        mytable+='<td>'+items[i].client.name+'</td>';
        mytable+='<td>'+items[i].cabin.name+'</td>';
        mytable+='<td>'+items[i].startDate.substr(0,10)+'</td>';
        mytable+='<td>'+items[i].devolutionDate.substr(0,10)+'</td>';
        mytable+='<td>'+items[i].status+'</td>';
        mytable+="<td><button onclick='BorrarReservation("+items[i].idReservation+")'>Borrar</button>";
        mytable+="<td><button onclick='EditarReservation("+items[i].idReservation+")'>Editar</button>";
        mytable+='</tr>';
    }
    
    mytable+='</table>';
    $("#Tabla").append(mytable);


}

function MostrarReservas(){
    $.ajax({
        url:'http://129.151.114.186:8080/api/Reservation/all',  
        type:'GET',
        dataType:'JSON',
        contentType: 'application/json; charset=UTF-8',
        success: function(respuesta){
            console.log(respuesta);
            pintarReservas(respuesta);        
        }
    });
}

function BorrarReservation(idReservation){
    let Mydata = {
        id:idReservation
    };
    let dato = JSON.stringify(Mydata);
    $.ajax({
        url:'http://129.151.114.186:8080/api/Reservation/'+idReservation,  
        data:dato,
        type:'DELETE',
        contentType: 'application/json; charset=UTF-8',
        dataType:'JSON',
        success: function(respuesta){
            alert('Reserva Borrada')
            var z = document.getElementById("Tabla");
            z.style.display = 'none'      
        }

    });
}


function MostrarCabin(){
    $.ajax({
        url:'http://129.151.114.186:8080/api/Cabin/all',  
        type:'GET',
        dataType:'JSON',
        contentType: 'application/json; charset=UTF-8',
        success: function(respuesta){
            console.log(respuesta);
            pintarCabin(respuesta);        
        }
    });
}

function pintarClientes(items){

    document.getElementById("Tabla").innerHTML ="";
    let mytable='<table>';
    console.log(items)
    mytable+='<thead><tr><th>ID</th><th>NAME</th><th>EMAIL</th><th>AGE</th><th>ACCIONES</th></tr></thead>';
    for(i=0;i<items.length;i++){
        
        mytable+='<tr>';
        mytable+='<td>'+items[i].idClient+'</td>';
        mytable+='<td>'+items[i].name+'</td>';
        mytable+='<td>'+items[i].email+'</td>';
        mytable+='<td>'+items[i].age+'</td>';
        mytable+="<td><button onclick='BorrarCliente("+items[i].idClient+")'>Borrar</button>";
        mytable+="<td><button onclick='EditarClient("+items[i].idClient+")'>Editar</button>";
        mytable+='</tr>';
    }
    
    mytable+='</table>';
    $("#Tabla").append(mytable);


}

function MostrarClientes(){
    $.ajax({
        url:'http://129.151.114.186:8080/api/Client/all',  
        type:'GET',
        dataType:'JSON',
        contentType: 'application/json; charset=UTF-8',
        success: function(respuesta){
            console.log(respuesta);
            pintarClientes(respuesta);
                    
        }
    });
}

function MostrarCategorias(){
    $.ajax({
        url:'http://129.151.114.186:8080/api/Category/all',  
        type:'GET',
        dataType:'JSON',
        contentType: 'application/json; charset=UTF-8',
        success: function(respuesta){
            console.log(respuesta);
            pintarCategorias(respuesta);
            
                    
        }
    });
}

function pintarCategorias(items){

    document.getElementById("Tabla").innerHTML ="";
  
    let mytable='<table>';
    mytable+='<thead><tr><th>ID</th><th>NOMBRE</th><th>DESCRIPCION</th><th>ACCIONES</th></tr></thead>';
    for(i=0;i<items.length;i++){
        
        mytable+='<tr>';
        mytable+='<td>'+items[i].id+'</td>';
        mytable+='<td>'+items[i].name+'</td>';
        mytable+='<td>'+items[i].description+'</td>';
        mytable+="<td><button onclick='BorrarCategoria("+items[i].id+")'>Borrar</button>";
        mytable+="<td><button onclick='EditarCategoria("+items[i].id+")'>Editar</button>";
        mytable+='</tr>';
    }
    
    mytable+='</table>';
    $("#Tabla").append(mytable);

    var z = document.getElementById("Tabla");
    z.style.display = 'block'


}



function pintarMensajes(items){

    document.getElementById("Tabla").innerHTML ="";

    let mytable='<table>';
    mytable+='<thead><tr><th>ID</th><th>USUARIO</th><th>CABAÑA</th><th>MENSAJE</th><th>ACCIONES</th></tr></thead>';
    for(i=0;i<items.length;i++){
        
        mytable+='<tr>';
        mytable+='<td>'+items[i].idMessage+'</td>';
        mytable+='<td>'+items[i].client.name+'</td>';
        mytable+='<td>'+items[i].cabin.name+'</td>';
        mytable+='<td>'+items[i].messageText+'</td>';
        mytable+="<td><button onclick='BorrarMensaje("+items[i].idMessage+")'>Borrar</button>";
        mytable+="<td><button onclick='EditarMensaje("+items[i].idMessage+")'>Editar</button>";
        mytable+='</tr>';
    }
    
    mytable+='</table>';
    $("#Tabla").append(mytable);
    var z = document.getElementById("Tabla");
    z.style.display = 'block'


}

function MostrarMensajes(){
    $.ajax({
        url:'http://129.151.114.186:8080/api/Message/all',  
        type:'GET',
        dataType:'JSON',
        contentType: 'application/json; charset=UTF-8',
        success: function(respuesta){
            console.log(respuesta);
            pintarMensajes(respuesta);        
        }
    });
}

function BorrarCabin(idCabin){
    let Mydata = {
        id:idCabin
    };
    let dato = JSON.stringify(Mydata);
    $.ajax({
        url:'http://129.151.114.186:8080/api/Cabin/'+idCabin,  
        data:dato,
        type:'DELETE',
        contentType: 'application/json; charset=UTF-8',
        dataType:'JSON',
        success: function(respuesta){
            alert('Cabina Borrada')
            var z = document.getElementById("Tabla");
            z.style.display = 'none'      
        }

    });
}

function BorrarCategoria(idCategoria){
    let Mydata = {
        id:idCategoria
    };
    let dato = JSON.stringify(Mydata);
    $.ajax({
        url:'http://129.151.114.186:8080/api/Category/'+idCategoria,  
        data:dato,
        type:'DELETE',
        contentType: 'application/json; charset=UTF-8',
        dataType:'JSON',
        success: function(respuesta){
            alert('Categoria Borrada')
            var z = document.getElementById("Tabla");
            z.style.display = 'none'
           
        }

    });
}

function BorrarCliente(idClient){

    console.log(idClient)
    let Mydata = {
        id:idClient
    };
    let dato = JSON.stringify(Mydata);
    $.ajax({
        url:'http://129.151.114.186:8080/api/Client/'+idClient,  
        data:dato,
        type:'DELETE',
        contentType: 'application/json; charset=UTF-8',
        dataType:'JSON',
        success: function(respuesta){
            alert('Cliente Borrado')

            var z = document.getElementById("Tabla");
    z.style.display = 'none'
       
        }

    });
}

function TraerCabin(idCabin){

}

function BorrarMensaje(idMessage){
    let Mydata = {
        id:idMessage
    };
    let dato = JSON.stringify(Mydata);
    $.ajax({
        url:'http://129.151.114.186:8080/api/Message/'+idMessage,  
        data:dato,
        type:'DELETE',
        contentType: 'application/json; charset=UTF-8',
        dataType:'JSON',
        success: function(respuesta){
            alert('Mensaje borrado') 
            var z = document.getElementById("Tabla");
            z.style.display = 'none'      
        }

    });
}

function pintarCabin(items){


    document.getElementById("Tabla").innerHTML ="";
    
    let mytable='<table>';
    mytable+='<thead><tr><th>ID</th><th>BRAND</th><th>ROOMS</th><th>CATEGORIA</th><th>NAME</th><th>DESCRIPCION</th><th>ACCIONES</th></tr></thead>';
    for(i=0;i<items.length;i++){
        
        mytable+='<tr>';
        mytable+='<td>'+items[i].id+'</td>';
        mytable+='<td>'+items[i].brand+'</td>';
        mytable+='<td>'+items[i].rooms+'</td>';
        mytable+='<td>'+items[i].category.name+'</td>';
        mytable+='<td>'+items[i].name+'</td>';
        mytable+='<td>'+items[i].description+'</td>';
        mytable+="<td><button onclick='BorrarCabin("+items[i].id+")'>Borrar</button></td>";
        mytable+="<td><button onclick='EditarCabin("+items[i].id+")'>Editar</button></td>";
        mytable+='</tr>';
    }
    
    mytable+='</table>';
    $("#Tabla").append(mytable);


}



function MostrarFormCabin(){
    var y = document.getElementById("ConsultaForm");
    y.style.display = 'none';
    var x = document.getElementById("EditCabin");
    x.style.display = 'block';

}

function MostrarFormClient(){
    var y = document.getElementById("ConsultaForm");
    y.style.display = 'none';
    var x = document.getElementById("EditClient");
    x.style.display = 'block';


}

function MostrarFormMensaje(){
    var y = document.getElementById("ConsultaForm");
    y.style.display = 'none';
    var x = document.getElementById("EditMensj");
    x.style.display = 'block';
 

}

function MostrarFormCategoria(){
    var y = document.getElementById("ConsultaForm");
    y.style.display = 'none';
    var x = document.getElementById("EditCateg");
    x.style.display = 'block';
 

}

function MostrarFormReserva(){
    var y = document.getElementById("ConsultaForm");
    y.style.display = 'none';
    var x = document.getElementById("EditReserv");
    x.style.display = 'block';
 

}

function EditarReservation(idReservation){
    
    MostrarFormReserva();

    document.getElementById("id5").value = idReservation;

    console.log(idReservation)

    let Mydata = {
        id:idReservation
    };
    let dato = JSON.stringify(Mydata);
    $.ajax({
        url:'http://129.151.114.186:8080/api/Reservation/'+idReservation,  
        type:'GET',
        dataType:'JSON',
        success: function(respuesta){
            console.log(respuesta)
            document.getElementById("IdClient").value = respuesta.client.idClient;
            document.getElementById("IdCabin").value = respuesta.cabin.id;
            document.getElementById("startDate").value = respuesta.startDate.substr(0,10);
            document.getElementById("devolutionDate").value = respuesta.devolutionDate.substr(0,10);
            
        }

    });

    let identidad = document.getElementById("id5");
    identidad.disabled = true;
    

}


function EditarCabin(ident){
    
    MostrarFormCabin();

    document.getElementById("id1").value = ident;

    console.log(ident)

    let Mydata = {
        id:ident
    };
    let dato = JSON.stringify(Mydata);
    $.ajax({
        url:'http://129.151.114.186:8080/api/Cabin/'+ident,  
        type:'GET',
        dataType:'JSON',
        success: function(respuesta){
        
            document.getElementById("brand1").value = respuesta.brand;
            document.getElementById("rooms1").value = respuesta.rooms;
            document.getElementById("category_id").value = respuesta.category.id;
            document.getElementById("name1").value = respuesta.name;
            document.getElementById("descripcion1").value = respuesta.description;
        }

    });

    let identidad = document.getElementById("id1");
    identidad.disabled = true;
    

}

function EditarClient(ident){
    
    MostrarFormClient();

    document.getElementById("id2").value = ident;
    var w = document.getElementById("password")
    w.style.display = 'none'

    console.log(ident)

    $.ajax({
        url:'http://129.151.114.186:8080/api/Client/'+ident,  
        type:'GET',
        dataType:'JSON',
        success: function(respuesta){
        
            document.getElementById("name2").value = respuesta.name;
            document.getElementById("email2").value = respuesta.email;
            document.getElementById("age2").value = respuesta.age;
            document.getElementById("password").value = respuesta.password
        }

    });

    let identidad = document.getElementById("id2");
    identidad.disabled = true;
    

}


function EditarMensaje(ident){

    MostrarFormMensaje();

    document.getElementById("id3").value = ident;

    console.log(ident)

    $.ajax({
        url:'http://129.151.114.186:8080/api/Message/'+ident,  
        type:'GET',
        dataType:'JSON',
        success: function(respuesta){
        
            document.getElementById("messagetext").value = respuesta.messageText;
            document.getElementById("IdClient").value = respuesta.client.idClient;
            document.getElementById("IdCabin").value = respuesta.cabin.id;
  
            
        }

    });

    let identidad = document.getElementById("id3");
    identidad.disabled = true;
    


}

function EditarCategoria(ident){

    MostrarFormCategoria();

    document.getElementById("id4").value = ident;

    console.log(ident)

    $.ajax({
        url:'http://129.151.114.186:8080/api/Category/'+ident,  
        type:'GET',
        dataType:'JSON',
        success: function(respuesta){
        
            document.getElementById("name3").value = respuesta.name;
            document.getElementById("description").value = respuesta.description;
  
            
        }

    });

    let identidad = document.getElementById("id4");
    identidad.disabled = true;
    


}

function GuardarCabin(){
    let datos = {
        id:document.getElementById("id1").value,
        brand:document.getElementById("brand1").value,
        rooms:document.getElementById("rooms1").value,
        category:{id:document.getElementById("category_id").value},
        name:document.getElementById("name1").value,
        description:document.getElementById("descripcion1").value,
    };


    let datosenviados = JSON.stringify(datos);
    $.ajax({
        url:'http://129.151.114.186:8080/api/Cabin/update',
        data:datosenviados,
        type:'PUT',
        contentType: 'application/json',
        dataType:'JSON',

        errr: function(xhr,status){
            alert('Ha sucedido un problema, '+xhr.status);
        },
        complete: function(xhr,status){
           /*alert('Peticion realizada '+xhr.status)*/
           if(xhr.status==555){

            alert("Error al guardar prube con otro ID o verifique que esta completa la informacion")

           }
           else{
    
            alert("Cabaña Editada");
            var x = document.getElementById("EditCabin");
            x.style.display = 'none';

            var y = document.getElementById("ConsultaForm");
            y.style.display = 'block';

            var z = document.getElementById("Tabla");
            z.style.display = 'none'

           }
             
        },
        
    });

}


function GuardarClient(){

    let datos = {
        idClient:document.getElementById("id2").value,
        email:document.getElementById("email2").value,
        name:document.getElementById("name2").value,
        age:document.getElementById("age2").value,
        password:document.getElementById("password").value,
    };


    let datosenviados = JSON.stringify(datos);
    $.ajax({
        url:'http://129.151.114.186:8080/api/Client/update',
        data:datosenviados,
        type:'PUT',
        contentType: 'application/json',
        dataType:'JSON',

        errr: function(xhr,status){
           /* alert('Ha sucedido un problema, '+xhr.status);*/
        },
        complete: function(xhr,status){
           /*alert('Peticion realizada '+xhr.status)*/

        

           if(xhr.status==555){

            alert("Error al guardar prube con otro ID o verifique que esta completa la informacion")

           }
           else{
      
            alert("Cliente editado");
            var x = document.getElementById("EditClient");
            x.style.display = 'none';

            var y = document.getElementById("ConsultaForm");
            y.style.display = 'block';

            var z = document.getElementById("Tabla");
            z.style.display = 'none'

           }
             
        },
        
    });

}


function GuardarMensaje(){

    let datos = {
        idMessage:document.getElementById("id3").value,
        messageText:document.getElementById("messagetext").value,
        cabin:{id:document.getElementById("IdCabin").value},
        client:{idClient:document.getElementById("IdClient").value},
    };


    let datosenviados = JSON.stringify(datos);
    $.ajax({
        url:'http://129.151.114.186:8080/api/Message/update',
        data:datosenviados,
        type:'PUT',
        contentType: 'application/json',
        dataType:'JSON',

        errr: function(xhr,status){
            alert('Ha sucedido un problema, '+xhr.status);
        },
        complete: function(xhr,status){
           /*alert('Peticion realizada '+xhr.status)*/

           if(xhr.status==555){

            alert("Error al guardar prube con otro ID o verifique que esta completa la informacion")

           }
           else{
            alert("Mensaje editado");
            var x = document.getElementById("EditMensj");
            x.style.display = 'none';

            var y = document.getElementById("ConsultaForm");
            y.style.display = 'block';

            var z = document.getElementById("Tabla");
            z.style.display = 'none'

           }
             
        },
        
    });

}

function GuardarCategoria(){

    let datos = {
        id:document.getElementById("id4").value,
        name:document.getElementById("name3").value,
        description:document.getElementById("description").value
    };


    let datosenviados = JSON.stringify(datos);
    $.ajax({
        url:'http://129.151.114.186:8080/api/Category/update',
        data:datosenviados,
        type:'PUT',
        contentType: 'application/json',
        dataType:'JSON',

        errr: function(xhr,status){
            alert('Ha sucedido un problema, '+xhr.status);
        },
        complete: function(xhr,status){
           /*alert('Peticion realizada '+xhr.status)*/

           if(xhr.status==555){

            alert("Error al guardar prube con otro ID o verifique que esta completa la informacion")

           }
           else{
           /* $("#id1").val("");
            $("#brand1").val("");
            $("#rooms1").val("");
            $("#category_id1").val("");
            $("#name1").val("");*/
    
            alert("Categoria editada");
            var x = document.getElementById("EditCateg");
            x.style.display = 'none';

            var y = document.getElementById("ConsultaForm");
            y.style.display = 'block';

            var z = document.getElementById("Tabla");
            z.style.display = 'none'
        

           }
             
        },
        
    });

}

function GuardarReserva(){

    let datos = {
        idReservation:document.getElementById("id5").value,
        cabin:{id:document.getElementById("IdCabin2").value},
        client:{idClient:document.getElementById("IdClient2").value},
        startDate:document.getElementById("startDate").value,
        devolutionDate:document.getElementById("devolutionDate").value,
        status:$("#status").val(),
    };

    


    let datosenviados = JSON.stringify(datos);
    console.log(datosenviados)
    $.ajax({
        url:'http://129.151.114.186:8080/api/Reservation/update',
        data:datosenviados,
        type:'PUT',
        contentType: 'application/json',
        dataType:'JSON',

        errr: function(xhr,status){
            alert('Ha sucedido un problema, '+xhr.status);
        },
        complete: function(xhr,status){
           /*alert('Peticion realizada '+xhr.status)*/

           if(xhr.status==555){

            alert("Error al guardar prube con otro ID o verifique que esta completa la informacion")

           }
           else{
      
            alert("Reserva editada");
            var x = document.getElementById("EditReserv");
            x.style.display = 'none';

            var y = document.getElementById("ConsultaForm");
            y.style.display = 'block';

            var z = document.getElementById("Tabla");
            z.style.display = 'none'
        

           }
             
        },
        
    });

}


function pintarCategorias(items){

    document.getElementById("Tabla").innerHTML ="";
  
    let mytable='<table>';
    mytable+='<thead><tr><th>ID</th><th>NOMBRE</th><th>DESCRIPCION</th><th>ACCIONES</th></tr></thead>';
    for(i=0;i<items.length;i++){
        
        mytable+='<tr>';
        mytable+='<td>'+items[i].id+'</td>';
        mytable+='<td>'+items[i].name+'</td>';
        mytable+='<td>'+items[i].description+'</td>';
        mytable+="<td><button onclick='BorrarCategoria("+items[i].id+")'>Borrar</button>";
        mytable+="<td><button onclick='EditarCategoria("+items[i].id+")'>Editar</button>";
        mytable+='</tr>';
    }
    
    mytable+='</table>';
    $("#Tabla").append(mytable);

    var z = document.getElementById("Tabla");
    z.style.display = 'block'


}

function TraerCategorias(){
    $.ajax({
        url:'http://129.151.114.186:8080/api/Category/all',  
        type:'GET',
        dataType:'JSON',
        contentType: 'application/json; charset=UTF-8',
        success: function(respuesta){
            console.log(respuesta);

            for(i=0;i<respuesta.length;i++){
                document.getElementById("category_id").innerHTML+= "<option value='"+respuesta[i].id+"'>"+respuesta[i].name+"</option>";
            }
  
                    
        }
    });
}

function TraerCabinClient(){
    $.ajax({
        url:'http://129.151.114.186:8080/api/Client/all',  
        type:'GET',
        dataType:'JSON',
        contentType: 'application/json; charset=UTF-8',
        success: function(respuesta){
            console.log(respuesta);

            for(i=0;i<respuesta.length;i++){
                document.getElementById("IdClient").innerHTML+= "<option value='"+respuesta[i].idClient+"'>"+respuesta[i].name+"</option>";
            }
  
                    
        }
    });
    $.ajax({
        url:'http://129.151.114.186:8080/api/Cabin/all',  
        type:'GET',
        dataType:'JSON',
        contentType: 'application/json; charset=UTF-8',
        success: function(respuesta){
            console.log(respuesta);

            for(i=0;i<respuesta.length;i++){
                document.getElementById("IdCabin").innerHTML+= "<option value='"+respuesta[i].id+"'>"+respuesta[i].name+"</option>";
            }
  
                    
        }
    });

}    

function TraerCabinClient2(){
    $.ajax({
        url:'http://129.151.114.186:8080/api/Client/all',  
        type:'GET',
        dataType:'JSON',
        contentType: 'application/json; charset=UTF-8',
        success: function(respuesta){
            console.log(respuesta);

            for(i=0;i<respuesta.length;i++){
                document.getElementById("IdClient2").innerHTML+= "<option value='"+respuesta[i].idClient+"'>"+respuesta[i].name+"</option>";
            }
  
                    
        }
    });
    $.ajax({
        url:'http://129.151.114.186:8080/api/Cabin/all',  
        type:'GET',
        dataType:'JSON',
        contentType: 'application/json; charset=UTF-8',
        success: function(respuesta){
            console.log(respuesta);

            for(i=0;i<respuesta.length;i++){
                document.getElementById("IdCabin2").innerHTML+= "<option value='"+respuesta[i].id+"'>"+respuesta[i].name+"</option>";
            }
  
                    
        }
    });

}   

function EnviarAdmin(){
    alert("Usuario administrador agregado")
    var nombre = document.getElementById("name6").value
    var correo = document.getElementById("email6").value
    var pass = document.getElementById("password6").value
    var array2 = [nombre,correo,pass]
    localStorage.setItem("index",array2)

    $("#name6").val("");
    $("#email6").val("");
    $("#password6").val("");

}

function TraerAdmin(){
    document.getElementById("Tabla").innerHTML ="";

    var id = 1

    var identifier = localStorage.getItem("index")
    var array = identifier.split(',')
  
    let mytable='<table>';
    mytable+='<thead><tr><th>ID</th><th>NOMBRE</th><th>EMAIL</th><th>ACCIONES</th></tr></thead>';
        mytable+='<tr>';
        mytable+='<td>'+id+'</td>';
        mytable+='<td>'+array[0]+'</td>';
        mytable+='<td>'+array[1]+'</td>';
        mytable+="<td><button onclick='BorrarAdmin("+id+")'>Borrar</button>";
        mytable+="<td><button onclick='EditarAdmin("+id+")'>Editar</button>";
        mytable+='</tr>';
    mytable+='</table>';
    $("#Tabla").append(mytable);

    var z = document.getElementById("Tabla");
    z.style.display = 'block'

}

function BorrarAdmin(id){
    console.log(id)
    localStorage.removeItem("index")
    alert("Usuario administrador borrado")
    var z = document.getElementById("Tabla");
    z.style.display = 'none'


}

function EditarAdmin(id){
    console.log(id)
    var y = document.getElementById("ConsultaForm");
    y.style.display = 'none';
    var x = document.getElementById("EditAdmin");
    x.style.display = 'block';
    var identifier = localStorage.getItem("index")
    var array = identifier.split(',')

    document.getElementById("id6").value = 1
    let identidad = document.getElementById("id6");
    identidad.disabled = true;

    document.getElementById("name6").value = array[0]
    document.getElementById("email5").value = array[1]

}

function GuardarAdmin(){

    var identifier = localStorage.getItem("index")
    var array4 = identifier.split(',')
    var id = 1
    var a = document.getElementById("name6").value
    var b = document.getElementById("email5").value
    var c = array4[2]
    let array3 = [a,b,c]
    localStorage.setItem("index",array3)

    alert("Administrador editado")
    var x = document.getElementById("EditAdmin");
    x.style.display = 'none';

    var y = document.getElementById("ConsultaForm");
    y.style.display = 'block';

    var z = document.getElementById("Tabla");
    z.style.display = 'none'
}

function ReporteStatus(){


    var z = document.getElementById("ReportStatus");
    z.style.display = 'none'

    var z = document.getElementById("ReportCliente");
    z.style.display = 'none'

    var z = document.getElementById("ReportFecha");
    z.style.display = 'none'


    $.ajax({
        url:'http://129.151.114.186:8080/api/Reservation/report-status',  
        type:'GET',
        dataType:'JSON',
        success: function(respuesta){
        
      console.log(respuesta)

      var x = document.getElementById("cancela")
      var y = document.getElementById("completa")
      console.log(respuesta.cancelled)
      console.log(respuesta.completed)
  
      x.innerHTML = respuesta.cancelled
      y.innerHTML = respuesta.completed
  
            
        }

    });

    var z = document.getElementById("ReportStatus");
    z.style.display = 'block'




}

function ReporteClientes(){


    var z = document.getElementById("ReportStatus");
    z.style.display = 'none'

    var z = document.getElementById("ReportCliente");
    z.style.display = 'none'

    var z = document.getElementById("ReportFecha");
    z.style.display = 'none'


    $.ajax({
        url:'http://129.151.114.186:8080/api/Reservation/report-clients',  
        type:'GET',
        dataType:'JSON',
        success: function(respuesta){
        
      console.log(respuesta)

      pintarClientesReporte(respuesta)
     
  
            
        }

    });

    var z = document.getElementById("ReportCliente");
    z.style.display = 'block'




}

function pintarClientesReporte(items){

    document.getElementById("DatosClientes").innerHTML ="";

    let mytabla = "<table>";
    mytabla+="<tr>";
    for(i=0;i<items.length;i++){
    mytabla+="<th>Total</th>";
    mytabla+="<td>"+items[i].total+"</td>";
    mytabla+="<td>"+items[i].client.name+"</td>";
    mytabla+="<td>"+items[i].client.email+"</td>";
    mytabla+="<td>"+items[i].client.age+"</td>";
    mytabla+="</tr>";
  
}
mytabla+= "</table>";
$("#DatosClientes").append(mytabla)



}

function pintarFechasReporte(items){

    document.getElementById("DatosFechas").innerHTML ="";

    let mytabla = "<table>";
    mytabla+='<thead><tr><th>INICIA</th><th>TERMINA</th><th>STATUS</th></tr></thead>';
    for(i=0;i<items.length;i++){
    mytabla+="<td>"+items[i].devolutionDate.substr(0,10)+"</td>";
    mytabla+="<td>"+items[i].startDate.substr(0,10)+"</td>";
    mytabla+="<td>"+items[i].status+"</td>";
    mytabla+="</tr>";
  
}
   mytabla+= "</table>";
   $("#DatosFechas").append(mytabla)



}

function ReporteFechas(){

    var z = document.getElementById("ReportStatus");
    z.style.display = 'none'

    var z = document.getElementById("ReportCliente");
    z.style.display = 'none'

    var z = document.getElementById("ReportFecha");
    z.style.display = 'none'

    var finic = document.getElementById("startDate").value.substr(0,10);
    var final = document.getElementById("devolutionDate").value.substr(0,10);



    $.ajax({
        url:'http://129.151.114.186:8080/api/Reservation/report-dates/'+finic+'/'+final,  
        type:'GET',
        dataType:'JSON',
        success: function(respuesta){
        
      console.log(respuesta)

      pintarFechasReporte(respuesta);
  
            
        }

    });

    var z = document.getElementById("ReportFecha");
    z.style.display = 'block'




}
