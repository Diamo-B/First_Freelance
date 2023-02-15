export function getPicNames (){
    let inputImages= document.getElementById("images").files;
    let inputImagesNames = [];
    [...inputImages].forEach(file=>{
        inputImagesNames.push( file.name );
    });
    return inputImagesNames;
}