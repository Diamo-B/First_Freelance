export function addNewPicName (){
    let span = document.getElementById('imagesnames');
    let inputImages =  document.getElementById("images").files;
    for (let i = 0; i < inputImages.length; i++) 
    {
        if (i == inputImages.length-1) 
            span.innerHTML+=(inputImages[i].name);
        else                    
            span.innerHTML+=(inputImages[i].name)+'<br/>';
    }
    return inputImages;
}