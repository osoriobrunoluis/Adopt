export function toast(color, text){
    const body = document.querySelector('body');
    const toastContainer = document.createElement('div');
    const message = document.createElement('p');

    toastContainer.classList.add(color);
    message.innerText = text;

    toastContainer.append(message);
    body.append(toastContainer);

    setTimeout(()=>{
        toastContainer.classList.toggle('fade-away');
    },2000);
    setTimeout(()=>{
        toastContainer.remove();
    },2500);
}