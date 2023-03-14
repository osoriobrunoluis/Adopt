import {toast} from './toast.js';

export const token = localStorage.getItem('@kenziePets') || 'none';

const requestHeader = {
    "Content-Type":"application/json",
    "Authorization":"Bearer " + token
};

const urlBase = 'http://localhost:3333/';

export const login = async(data) =>{
    const dataJson = JSON.stringify(data);
    const toLogin = await fetch(`${urlBase}session/login`, {
        "method":"POST",
        "headers": requestHeader,
        "body": dataJson
    })

    const loginJson = await toLogin.json();


        if(toLogin.ok){
            toast('green', 'Seja bem vindo à Kenzie Pets! Redirecionando...');
            setTimeout(()=>{
                location.replace('./src/pages/login.html');
            },2000);
            localStorage.setItem('@kenziePets', loginJson.token);

        }else{
            toast('red', 'Por favor, verifique os dados informados.');
        }

    return toLogin;
}

export const createUser = async(data)=>{
    const dataJson = JSON.stringify(data);
    const modal = document.querySelector('.modal__wrapper');
    const toCreate = await fetch(urlBase + 'users', {
        "method":"POST",
        "headers": requestHeader,
        "body": dataJson
    })

    const toCreateJson = await toCreate.json();

    if(toCreate.ok){
        toast('green', 'Usuário cadastrado com sucesso!');
        setTimeout(()=>{
            modal.remove();
        },2000)
        
    
    }else if(toCreateJson.message == 'please inform a valid image link'){
        toast('red', 'Por favor, insira um link válido para o seu avatar.');
   
    }else if(toCreateJson.message == 'please inform a valid email format'){
        toast('red', 'Por favor, insira um endereço de e-mail válido.');
   
    }else if(toCreateJson.message == 'Email already in use'){
        toast('red', 'E-mail já cadastrado!');
   
    }else{
        toast('red', 'Por favor, confira seus dados.');
    }

    return toCreateJson;
};

export const readAllPets = async()=>{
    const pets = fetch(urlBase + 'pets')
    .then((res)=>res.json())
    
    return pets;
};

export async function createAdoption(petId){
    const dataJson = JSON.stringify(petId);
    const adoption = await fetch('http://localhost:3333/adoptions', {
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        "body": dataJson
    })
    const adoptionJson = await adoption.json();

    if(adoption.ok){
        toast('green', 'Adoção realizada com sucesso! Cuide com muito amor e carinho!');
        setTimeout(()=>{
            location.reload();
        },2000);
    }else{
        toast('red', 'Ops! Algo deu errado. Por favor, tente novamente');
    }
    return adoptionJson;

}

export async function informacaoUsuario(token){
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
     }
     const responseJSON = await fetch(urlBase + 'users/profile',options);
  
     let response = await responseJSON.json()
     return(response);
};
export async function petsUsuario(token){
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
     }
     const responseJSON = await fetch(urlBase +'pets/my_pets',options);
  
     let response = await responseJSON.json()
     return(response);
};
export async function atualizacaoUsuarioInfo(token,info){
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(info)
     }
    const responseJSON = await fetch(urlBase +'users/profile',options);
    const createJSON = await responseJSON.json();

    if(responseJSON.ok){
        toast('green', 'Usuário atualizado com sucesso!');
        setTimeout(()=>{
            location.reload();
        },2000)
    }else if(responseJSON.message == undefined){
        toast('red', 'Por favor, insira um link válido para o seu avatar.');
    }
    return createJSON;
};
export async function criarPet(token,info){
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(info)
     }
    const responseJSON = await fetch(urlBase +'pets',options)
    const createJSON = await responseJSON.json();
    if(responseJSON.ok){
        toast('green', 'Pet criado com sucesso!');
        setTimeout(()=>{
            location.reload();
        },2000)
    }else if(createJSON.message == `'species' field is required`){
        toast('red', 'Por favor, escolha uma Espécie.');
    }else if(createJSON.message == 'please inform a valid image link'){
        toast('red', 'Por favor, insira um link válido para o seu avatar.');
    }else if(createJSON.message == `'bread' field is required`){
        toast('red', 'Por favor, informe a Raça do animal.');
    }else if(createJSON.message == `'name' field is required`){
        toast('red', 'Por favor, informe o nome do animal.');
    }else{
        toast('red', 'Por favor, confira os dados.');
    }
    console.log(createJSON.message)

    return createJSON;
};
export async function atualizarPet(token,id,info){
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(info)
     }
    const responseJSON = await fetch(`http://localhost:3333/pets/${id}`,options)
    const createJSON = await responseJSON.json();
    if(responseJSON.ok){
        toast('green', 'Pet atualizado com sucesso!');
        setTimeout(()=>{
            location.reload();
        },2000)
    }else if(createJSON.message == `'species' field is required`){
        toast('red', 'Por favor, escolha uma Espécie.');
    }else if(createJSON.message == 'please inform a valid image link'){
        toast('red', 'Por favor, insira um link válido para o seu avatar.');
    }else if(createJSON.message == `'bread' field is required`){
        toast('red', 'Por favor, informe a Raça do animal.');
    }else if(createJSON.message == `'name' field is required`){
        toast('red', 'Por favor, informe o nome do animal.');
    }else{
        toast('red', 'Por favor, confira os dados.');
    }
    console.log(createJSON.message)

    return responseJSON;
};
export async function deletarUsuario(token){
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
     }
     const responseJSON = await fetch(urlBase +'users/profile',options);
     const createJSON = await responseJSON.json();
     if(responseJSON.ok){
         toast('green', 'Conta deletada com sucesso!');
         setTimeout(()=>{
            location.replace('../../index.html');
         },2000)
     }else{
         toast('red', 'Não foi possivel deletar a conta.');
     }
     return createJSON;
};