const doc = document;
const textarea = doc.getElementById("text-area");
const imagen = doc.getElementById("imagen");
const resultTexto = doc.getElementById("msj-texto");
const resultTitle = doc.getElementById("msj-titulo");
const botonEncrip = doc.getElementById("btn-encriptar");
const botonDesen = doc.getElementById("btn-desencriptar");
const botonCopiar = doc.getElementById("copiar");

const lvs = [
  ["e", "enter"],
  ["i", "imes"],
  ["o", "ober"],
  ["u", "ufat"],
  ["a", "ai"],
];

function encriptarMsj(msj) {
  let msjEncript = "";
  for (let i = 0; i < msj.length; i++) {
    let ltr = msj[i];
    let encrip = ltr;
    for (let j = 0; j < lvs.length; j++) {
      if (ltr === lvs[j][0]) {
        encrip = lvs[j][1];
        break;
      }
    }
    msjEncript += encrip;
  }
  return msjEncript;
}

function desencriptarMsj(msj) {
  let msjDesencript = msj;
  for (let i = 0; i < lvs.length; i++) {
    let regex = new RegExp(lvs[i][1], "g");
    msjDesencript = msjDesencript.replace(regex, lvs[i][0]);
  }
  return msjDesencript;
}

textarea.addEventListener("input", () => {
  imagen.classList.add("hidden");  // Oculta la imagen cuando se está ingresando texto
  resultTitle.textContent = "Procesando...";
  resultTexto.textContent = "";
  botonCopiar.style.display = "none";  // Oculta el botón cuando se edita el texto
});

botonEncrip.addEventListener("click", (e) => {
  e.preventDefault();
  let msj = textarea.value.toLowerCase();
  let msjEncript = encriptarMsj(msj);
  resultTexto.textContent = msjEncript;
  botonCopiar.style.display = "block";  // Muestra el botón después de encriptar
  resultTitle.textContent = "El resultado es:";
});

botonDesen.addEventListener("click", (e) => {
  e.preventDefault();
  let msj = textarea.value.toLowerCase();
  let msjDesencript = desencriptarMsj(msj);
  resultTexto.textContent = msjDesencript;
  botonCopiar.style.display = "block";  // Muestra el botón después de desencriptar
  resultTitle.textContent = "El resultado es:";
});

botonCopiar.addEventListener("click", () => {
  let textoCopiado = resultTexto.textContent;
  navigator.clipboard.writeText(textoCopiado).then(() => {
    imagen.classList.add("hidden");  // Muestra la imagen después de copiar el texto
    resultTitle.textContent = "El texto se copió...";
  });
});
