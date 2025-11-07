const imagenesCarrusel = [
    "./img/IB/IB1.jpg",
    "./img/Sandman/Sandman1.jpg",
    "./img/TFODR/TFODR1.jpg",
    "./img/TWH/TWH1.jpg"
]

const elementoImg = document.getElementById("imagen-carrousel");

let count = 0;
function carrousel1next() {
    count++;
    if(count >= imagenesCarrusel.length) {
        count = 0;
    }
    elementoImg.src = imagenesCarrusel[count];
}

function carrousel1prev() {
    count--;
    if(count < 0) {
        count = imagenesCarrusel.length -1;
    }
    elementoImg.src = imagenesCarrusel[count];
}