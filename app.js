"use strict"

const url = 'https://randomuser.me/api/';


let usersData = [];

 async function fetchUsers(count){
    const response = await fetch(`${url}?results=${count}`);
    const data = await response.json();
    return data.results;
 }

 async function createUserCards(count = 4){
    const container = document.querySelector('.grid-container');

    try{
        
        const users = await fetchUsers(count);
        usersData.push(...users);


        users.forEach(user =>{
            const imgUrl = user.picture.large;
            const fullname = `${user.name.first} ${user.name.last}`;
            const email = user.email;
            const dob = new Date(user.dob.date).toLocaleDateString();

            const card = document.createElement('article');
        card.className = 'card';
        card.innerHTML = `
        <i class='bx bxs-message-alt-x delete-icon'></i>
        <img src="${imgUrl}" alt ="user profil pic" class="picture">
               <p class="def"> My name is</p>
               <h2 class="content"> ${fullname}</h2> 

               <div class="icons-container">
                <i class='bx bxs-user'></i>
                <i class='bx bxs-envelope'></i>
                <i class='bx bxs-phone'></i>
                <i class='bx bxs-location-plus'></i>
                <i class='bx bxs-calendar-star'></i>
               </div>
        `
        container.appendChild(card);
        

        });
    } catch (error) {
        console.error('Erreur lors de la récupération des données', error)
     }
     
 }

function sortedByDob(){
    usersData.sort((a,b) => new Date(a.dob.date) - new Date(b.dob.date));
    const container = document.querySelector('.grid-container');
    container.innerHTML = '';
    usersData.forEach(user =>{
        const imgUrl = user.picture.large;
        const fullname = `${user.name.first} ${user.name.last}`;
        const email = user.email;
        const dob = new Date(user.dob.date).toLocaleDateString();

        const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
    <i class='bx bxs-message-alt-x delete-icon'></i>
    <img src="${imgUrl}" alt ="user profil pic" class="picture">
           <p class="def"> My name is</p>
           <h2 class="content"> ${fullname}</h2> 

           <div class="icons-container">
            <i class='bx bxs-user'></i>
            <i class='bx bxs-envelope'></i>
            <i class='bx bxs-phone'></i>
            <i class='bx bxs-location-plus'></i>
            <i class='bx bxs-calendar-star'></i>
           </div>
    `
    container.appendChild(card);
    });
    
}


document.addEventListener('DOMContentLoaded',() =>{createUserCards(4)});
document.addEventListener('click',(e) => {
    if(e.target.classList.contains('delete-icon')){
        const card = e.target.closest('.card');
        if(card){
            card.remove();
        }
    }
});







const button = document.querySelector('.add-users');
button.addEventListener('click',()=>{createUserCards(10)}); // fonction qui ajoute 10 utilisateurs; je le fais directement avec createUserCards en passant 10 comme argment car la fonction est similaire
//à la première, donc cela evite les erreurs avec l'api et la répétition du code. 
const sorted = document.querySelector('.sort');
sorted.addEventListener('click',sortedByDob);

