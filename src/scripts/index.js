import {createRegisterModal, createLoginModal } from './modal.js';
import {createUser, login, token, readAllPets} from './requests.js';

const loggedUserRoute = ()=>{
    if(token !== 'none'){
        location.replace('./src/pages/login.html');
    }
};
loggedUserRoute();

const renderPets = async ()=>{
    const renderList = document.querySelector('.pet__list');
    const allPets = await readAllPets();
    const petsForAdoption = allPets.filter((pet)=>{
        return pet.available_for_adoption == true; 
    })
    petsForAdoption.forEach((pet)=>{
        renderList.insertAdjacentHTML('beforeend', `
        <li class="pet__card">
            <img class="pet__card--img" src="${pet.avatar_url}">
            <h2 class="pet__card--name">${pet.name}</h2>
            <span class="pet__card--specie">${pet.species}</span>
        </li> `);
    })
};
renderPets();

async function openModalRegister(){
    const registerButton = document.querySelector('#register');
    registerButton.addEventListener('click', async(event)=>{
        event.preventDefault();
        createRegisterModal();
        closeModal();
        changeModal();
        toRegister();
    })
};
openModalRegister();

async function openModalLogin(){
    const loginButton = document.querySelector('#login');
    loginButton.addEventListener('click', async()=>{
        createLoginModal();
        closeModal();
        changeModal();
        toLogin();
    })
};
openModalLogin();

function closeModal(){
    const closeButton = document.querySelector('.modal__header > img');
    const modal = document.querySelector('.modal__wrapper');
    closeButton.addEventListener('click', ()=>{
        modal.remove();
    })
};

function changeModal(){
    const changeButton = document.querySelector('.modal__footer > a');
    const modal = document.querySelector('.modal__wrapper');
    changeButton.addEventListener('click', (event)=>{
        event.preventDefault();
        const idButton = event.target.id;
        if(idButton == 'goToRegister'){
            modal.remove();
            createRegisterModal();
            closeModal();
            changeModal();
            toRegister();
        }else if(idButton == 'goToLogin'){
            modal.remove();
            createLoginModal();
            closeModal();
            changeModal();
            toLogin();
        }
    })
};

async function toRegister(){
    const registerInputs = document.querySelectorAll('.modal__form > input');
    const registerButton = document.querySelector('.modal__form > button');
    let dataRegister = {};

    registerButton.addEventListener('click', async(event)=>{
        event.preventDefault();
        registerInputs.forEach((input)=>{
            dataRegister[input.name] = input.value;

        })
        createUser(dataRegister);
    })
};

async function toLogin(){
    const loginInputs = document.querySelectorAll('.modal__form > input');
    const loginButton = document.querySelector('.modal__form > button');
    let dataLogin = {};

    loginButton.addEventListener('click', async(event)=>{
        event.preventDefault();
        loginInputs.forEach((input)=>{
            dataLogin[input.name] = input.value;

        })
        const loginResult = await login(dataLogin);

    })
};

