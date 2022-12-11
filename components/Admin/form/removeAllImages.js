export function removeAllImages(){
    let span = document.getElementById('imagesnames');
    span.innerHTML = "";
    document.getElementById("images").value = null
}