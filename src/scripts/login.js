import {readAllPets, createAdoption} from './requests.js'


function logout() {
    const logoutBtn = document.querySelector('.header__buttons--blue');
  
    logoutBtn.addEventListener('click', () => {
      localStorage.clear()
      window.location.replace("/")
    })
  };

function redirecionarPerfil(){
    const perfilBtn = document.querySelector('.header__buttons--white');

    perfilBtn.addEventListener('click',() =>{
    window.location.replace("perfil.html")
    })
}

const renderPets = async ()=>{
    const renderList = document.querySelector('.cards_container')
    const allPets = await readAllPets()
    const petsForAdoption = allPets.filter((pet)=>{
        return pet.available_for_adoption == true
    })
    console.log(petsForAdoption);
    petsForAdoption.forEach((pet)=>{
            const petCard = document.createElement("li")
            const card_Img = document.createElement("img")
            const card_Nome = document.createElement("h2")
            const card_Especie = document.createElement("p")
            const card_Btn_adotar = document.createElement("button")

            petCard.classList.add("pet__card")
            card_Img.classList.add("pet__card--img")
            card_Img.src = pet.avatar_url
            card_Nome.classList.add("pet__card--name")
            card_Nome.innerText = pet.name
            card_Especie.classList.add("pet__card--specie")
            card_Especie.innerText = pet.species
            card_Btn_adotar.classList.add("pet__card--btn")
            card_Btn_adotar.id = pet.id
            card_Btn_adotar.innerText = 'Me adota?'

            card_Btn_adotar.addEventListener('click', (event)=>
            event.target.innerText = 'Adotado'
            )

            renderList.append(petCard)
            petCard.append(card_Img,card_Nome,card_Especie,card_Btn_adotar)

    })
    toAdopt();

}

async function toAdopt(){
  const adoptButtons = document.querySelectorAll('.pet__card--btn');
  let data = {};
  adoptButtons.forEach((button)=>{
    button.addEventListener('click', async(event)=>{
      event.preventDefault();
      data.pet_id = event.target.id;
      createAdoption(data);
    })
  })
}

renderPets()
logout()
redirecionarPerfil()
