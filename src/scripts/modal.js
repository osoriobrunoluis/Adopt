export const createRegisterModal = ()=>{
    const body = document.querySelector('body');

    body.insertAdjacentHTML('beforeend', `
    <div open class="modal__wrapper">
        <div class="modal__container">
            <div class="modal__header">
                <img class="modal__close" src="./src/assets/img/Vector-close.png" alt="fechar formulario">
            </div>
            <h2 class="modal__title">Cadastrar</h2>
            <form class="modal__form">
                <input name="name" class="modal__input" placeholder="Nome">
                <input name="email" class="modal__input" placeholder="E-mail">
                <input name="password" class="modal__input" placeholder="Senha">
                <input name="avatar_url" class="modal__input" placeholder="Avatar?">
                <button class="modal__button">Cadastrar</button>
            </form>
            <p class="modal__footer">Já tem cadastro? <a id="goToLogin">Clique aqui</a> para logar.</p>
            <div class="modal__footer--base"></div>
        </div>
    </div> `);
    
}

export const createLoginModal = ()=>{
    const body = document.querySelector('body');

    body.insertAdjacentHTML('beforeend', `
    <div class="modal__wrapper">
        <div class="modal__container">
            <div class="modal__header">
                <img class="modal__close" src="./src/assets/img/Vector-close.png" alt="fechar formulario">
            </div>
            <h2 class="modal__title">Login</h2>
            <form class="modal__form">
                <input name="email" class="modal__input" placeholder="E-mail">
                <input name="password" class="modal__input" placeholder="Senha" type="password"">
                <button class="modal__button">Entrar</button>
            </form>
            <p class="modal__footer">Não tem cadastro? <a id="goToRegister">Clique aqui</a> para se cadastrar.</p>
            <div class="modal__footer--base"></div>
        </div>
    </div> `);
}