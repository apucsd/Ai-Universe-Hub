// spinner functions
function spinnerShow(isShow){
    const spinner = document.getElementById('spinner');
    if(isShow){
       
        spinner.classList.remove('d-none');
    }
    else{
        spinner.classList.add('d-none');
    }
}
