function validarFormulario() {
    var nombre = document.getElementById("nombre").value;
    var edad = document.getElementById("edad").value;
    var direccion = document.getElementById("direccion").value;
    var email = document.getElementById("email").value;

    if (nombre == "") {
        alert("Agregar un Nombre valido");
        return false;
    }

    if (edad == "") {
        alert("Agregar una Edad valida");
        return false;
    } else if (edad < 10) {
        alert("La Edad no debe ser un numero igual o menor a 10");
        return false;
    }


    if (direccion == "") {
        alert("Agregar una Direccion valida");
        return false;
    }

    if (email == "") {
        alert("Agregar un Email valido");
        return false;
    } else if (!email.includes('@')) {
        alert("El Email no es valido");
        return false;
    }

    return true;
}

function verDatos() {
    var listaPersonas;
    if (localStorage.getItem("listaPersonas") == null) {
        listaPersonas = [];
    } else {
        listaPersonas = JSON.parse(localStorage.getItem("listaPersonas"));
    }

    var html = "";

    listaPersonas.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.nombre + "</td>";
        html += "<td>" + element.edad + "</td>";
        html += "<td>" + element.direccion + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button onclick="eliminarDatos(' +
            index +
            ')" class="btn btn-danger">Eliminar</button><button onclick="actualizarDatos(' +
            index +
            ')" class="btn btn-warning m-2">Editar</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;

}

document.onload = verDatos();

function agregarDatos() {
    if (validarFormulario() == true) {
        var nombre = document.getElementById("nombre").value;
        var edad = document.getElementById("edad").value;
        var direccion = document.getElementById("direccion").value;
        var email = document.getElementById("email").value;

        var listaPersonas;
        if (localStorage.getItem("listaPersonas") == null) {
            listaPersonas = [];
        } else {
            listaPersonas = JSON.parse(localStorage.getItem("listaPersonas"));
        }

        listaPersonas.push({
            nombre : nombre,
            edad : edad,
            direccion : direccion,
            email : email
        });

        localStorage.setItem("listaPersonas", JSON.stringify(listaPersonas));
        verDatos();
        document.getElementById("nombre").value = "";
        document.getElementById("edad").value = "";
        document.getElementById("direccion").value = "";
        document.getElementById("email").value = "";
    }
}

function eliminarDatos(index) {
    var listaPersonas;
    if (localStorage.getItem("listaPersonas") == null) {
        listaPersonas = [];
    } else {
        listaPersonas = JSON.parse(localStorage.getItem("listaPersonas"));
    }
    
    listaPersonas.splice(index, 1);
    localStorage.setItem("listaPersonas", JSON.stringify(listaPersonas));
    verDatos();
}

function actualizarDatos(index) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Actualizar").style.display = "block";

    var listaPersonas;
    if (localStorage.getItem("listaPersonas") == null) {
        listaPersonas = [];
    } else {
        listaPersonas = JSON.parse(localStorage.getItem("listaPersonas"));
    }

    document.getElementById("nombre").value = listaPersonas[index].nombre;
    document.getElementById("edad").value = listaPersonas[index].edad;
    document.getElementById("direccion").value = listaPersonas[index].direccion;
    document.getElementById("email").value = listaPersonas[index].email;

    document.querySelector('#Actualizar').onclick = function(){
        if (validarFormulario() == true) {
            listaPersonas[index].nombre = document.getElementById('nombre').value
            listaPersonas[index].edad = document.getElementById('edad').value
            listaPersonas[index].direccion = document.getElementById('direccion').value
            listaPersonas[index].email = document.getElementById('email').value

            localStorage.setItem('listaPersonas', JSON.stringify(listaPersonas))

            verDatos()

            document.getElementById("nombre").value = "";
            document.getElementById("edad").value = "";
            document.getElementById("direccion").value = "";
            document.getElementById("email").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Actualizar").style.display = "none";
        }
    }
}