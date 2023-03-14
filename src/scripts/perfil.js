import {informacaoUsuario,deletarUsuario,criarPet,atualizarPet,petsUsuario,atualizacaoUsuarioInfo} from './requests.js';
const token = localStorage.getItem('@kenziePets');
if(token == null && token == undefined){
    location.replace('../../index.html');
}
const usuario = await informacaoUsuario(token);
const pets = await petsUsuario(token);
const fotoPerfil = document.querySelector('.fotoPerfil');
const infoUsuario = document.querySelectorAll('p');
const ul = document.querySelector('ul');
const modal = document.querySelector('dialog');
const bt_atualizarInfoPessoal = document.querySelector('.bt_atualizarDados')
const bt_cadastrarPet = document.querySelector('.bt_cadastraPet');
const bt_select = document.querySelector('select');
const bt_closeModal = document.querySelector('dialog > img');
const bts_header = document.querySelectorAll('.header__buttons > button');
const bt_deletar = document.querySelector(".bt_deletar");

function carregarInformacaoUsuario(usuario){
    fotoPerfil.src = usuario.avatar_url;
    infoUsuario[1].innerHTML = `<span>Nome: </span>${usuario.name}`;
    infoUsuario[2].innerHTML = `<span>E-mail: </span>${usuario.email}`;
}
function carregarPet(pet){
    if(pet.available_for_adoption){
        pet.available_for_adoption = 'Sim';
    }else if(!pet.available_for_adoption){
        pet.available_for_adoption = 'Não';
    }

    let li = document.createElement('li');
    let img = document.createElement('img');
    let div = document.createElement('div');
    let nome = document.createElement('p');
    let especie = document.createElement('p');
    let adotavel = document.createElement('p');
    let botao = document.createElement('button');

    img.className = 'fotoPet';
    img.src = pet.avatar_url;
    nome.innerHTML = `<span>Nome: </span>${pet.name}`;
    especie.innerHTML = `<span>Espécie: </span>${pet.species}`;
    adotavel.innerHTML = `<span>Adotável: </span>${pet.available_for_adoption}`;
    botao.innerText = 'Atualizar';
    botao.className = 'header__buttons--blue bt_atualizarPet';
    
    botao.addEventListener('click',()=>{
        modal.removeChild(modal.firstElementChild);
        bt_closeModal.insertAdjacentHTML('beforebegin',`
        <div>
            <p class="modalTitulo">Atualizar pet</p>
            <input type="text" value="${pet.name}">
            <input type="text" value="${pet.bread}">
            <select>
                <option value="${pet.species}">Espécie</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Aves">Aves</option>
                <option value="Repteis">Repteis</option>
                <option value="Outros">Outros</option>
            </select>
            <input type="text" value="${pet.avatar_url}">
            <button class="bt_modal">Atualizar</button>
        </div>
        `);
        const btmodal = document.querySelector('.bt_modal');
        btmodal.addEventListener('click',()=>{
            const inputs = document.querySelectorAll('dialog > div > input');
            const select = document.querySelector('dialog > div > select');
            let arquivoJSON = {};
            arquivoJSON['name'] = inputs[0].value;
            arquivoJSON['bread'] = inputs[1].value;
            arquivoJSON['species'] = select.value;
            arquivoJSON['avatar_url'] = inputs[2].value;
            console.log(arquivoJSON)
            atualizarPet(token,pet.id,arquivoJSON);
        })
        modal.showModal();
    })

    div.append(nome,especie,adotavel,botao);
    li.append(img,div);
    ul.appendChild(li);
}
function renderInicial(){
    carregarInformacaoUsuario(usuario);
    adicionarEventos();
    if(pets.length > 0){
        ul.innerHTML='';
        pets.forEach(element =>{
            carregarPet(element);
        })
    }
}
function adicionarEventos(){
    bt_atualizarInfoPessoal.addEventListener('click',()=>{
        modal.removeChild(modal.firstElementChild);
        bt_closeModal.insertAdjacentHTML('beforebegin',`
        <div>
            <p class="modalTitulo">Atualizar perfil</p>
            <input type="text" value="${usuario.name}">
            <input type="text" value="${usuario.avatar_url}">
            <button class="bt_modal">Atualizar</button>
        </div>
        `);
        const btmodal = document.querySelector('.bt_modal');
        btmodal.addEventListener('click',()=>{
            const inputs = document.querySelectorAll('dialog > div > input');
            event.preventDefault();
            let arquivoJSON = {};
            arquivoJSON['avatar_url'] = inputs[1].value;
            arquivoJSON['name'] = inputs[0].value;
            atualizacaoUsuarioInfo(token,arquivoJSON);
        })
        modal.showModal();
    })
    bt_cadastrarPet.addEventListener('click',()=>{
        modal.removeChild(modal.firstElementChild);
        bt_closeModal.insertAdjacentHTML('beforebegin',`
        <div>
            <p class="modalTitulo">Cadastrar pet</p>
            <input type="text" placeholder="Nome">
            <input type="text" placeholder="Raça">
            <select>
                <option value="">Espécie</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Aves">Aves</option>
                <option value="Repteis">Repteis</option>
                <option value="Outros">Outros</option>
            </select>
            <input type="text" placeholder="Avatar">
            <button class="bt_modal">Cadastrar</button>
        </div>
        `);
        const btmodal = document.querySelector('.bt_modal');
        btmodal.addEventListener('click',()=>{
            const inputs = document.querySelectorAll('dialog > div > input');
            const select = document.querySelector('dialog > div > select');
            let arquivoJSON = {};
            arquivoJSON['name'] = inputs[0].value;
            arquivoJSON['bread'] = inputs[1].value;
            arquivoJSON['species'] = select.value;
            arquivoJSON['avatar_url'] = inputs[2].value;
            criarPet(token,arquivoJSON);
        })
        modal.showModal();
    })
    bt_select.addEventListener('change',async ()=>{
        const filtroPet = pets.filter(element => element.species == bt_select.value);
        ul.innerHTML = '';
        if(bt_select.value == 'Todos'){
            pets.forEach(element =>{
                carregarPet(element);
            })
        }else if(filtroPet.length > 0){
            filtroPet.forEach(element =>{
                carregarPet(element);
            })
        }else{
            ul.insertAdjacentHTML('beforeend',`
                <h2>Nenhum pet encontrado.</h2>
            `)
        }
    })
    bt_closeModal.addEventListener('click',()=>{
        modal.close();
    })
    bts_header[0].addEventListener('click',()=>{
        location.replace('../pages/login.html');
    })
    bts_header[1].addEventListener('click',()=>{
        localStorage.removeItem('@kenziePets');
        location.replace('../../index.html');
    })
    bt_deletar.addEventListener('click',()=>{
        modal.removeChild(modal.firstElementChild);
        bt_closeModal.insertAdjacentHTML('beforebegin',`
        <div>
            <p class="modalTitulo">Deseja mesmo deletar sua conta?</p>
            <button class="bt_modal">Não desejo deletar minha conta</button>
            <button class="bt_modal2">Quero deletar minha conta</button>
        </div>
        `);
        const btmodal = document.querySelector('.bt_modal');
        const btmodal2 = document.querySelector('.bt_modal2');
        btmodal.addEventListener('click',()=>{
            event.preventDefault();
            modal.close(); 
        })
        btmodal2.addEventListener('click',()=>{
            event.preventDefault();
            localStorage.removeItem('@kenziePets');
            deletarUsuario(token);
        })
        modal.showModal();
    })
}
 renderInicial();