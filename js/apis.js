async function getConexion() {
    const response = await fetch(`https://ipinfo.io/json?token=${config.TOKEN_UBICACION}`);
    const data = await response.json();
    return { ip: data.ip, country: data.region };
}

async function getUser() {
    const response = await fetch('https://randomuser.me/api/?results=1');
    const data = await response.json();
    let nombre = data.results[0].name.first;
    let apellido = data.results[0].name.last;
    let email = data.results[0].email;
    let foto = data.results[0].picture.large;
    let telefono = data.results[0].phone;
    return { nombre, apellido, email, foto, telefono };
}

async function fillModal() {
    const userData = await getUser();
    const conexionData = await getConexion();

    document.getElementById('saludo').innerText = `Bienvenido ${userData.nombre} ${userData.apellido}`;
    document.getElementById('correo').innerText = userData.email;
    document.getElementById('telefono').innerText = userData.telefono;
    document.getElementById('foto-img').src = userData.foto;
    document.getElementById('foto-src').srcset = userData.foto;
    document.getElementById('ip').innerText = conexionData.ip;
    document.getElementById('pais').innerText = conexionData.country;
}

document.addEventListener('DOMContentLoaded', function () {
    const botonModal = document.getElementById('user-button');
    botonModal.addEventListener('click', fillModal);
});
