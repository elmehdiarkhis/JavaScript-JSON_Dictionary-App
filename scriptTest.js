var wrapper = document.querySelector(".wrapper");
var searchInput = wrapper.querySelector("input");
let infoText = wrapper.querySelector(".info-text");



searchInput.addEventListener("keyup", e =>{
    if (e.key == "Enter" && e.target.value){

        //delai d'attente
        infoText.style.color = "#000";
        infoText.innerHTML=`Serching the meaning of <span>${e.target.value}</span>`;

        fetchApi(e.target.value);
    }
});





function fetchApi(word){
    //API routine
    let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    fetch(url).then(  response => response.json()  ).then(result => {
        extractData(result,word)
    })

}





var audio;

function extractData(result,word){


    if (result.title){
        infoText.innerHTML = `Can't find the meaning of <span>${word}</span>. Please, try to search for another word.`;
        
    }else{  
        //activer le wrapper pour la transitio css(height 0 > 500)
        wrapper.classList.add("active");
        console.log(result);
        

        
        //remplir l'HTMl avec les valeur du result : console.log(result) pour comprendre
        
        document.querySelector(".word p").innerText = result[0].word; 
        document.querySelector(".word span").innerText = `latin : ${result[0].phonetics[0].text}`;
        document.querySelector(".meaning span").innerText = (result[0].meanings[0].definitions[0]).definition;

        if ( (result[0].meanings[0].definitions[0]).example == undefined){
            document.querySelector(".examples span").style.color="orange"
            document.querySelector(".examples span").innerText = "404 : i can not find examples"
        }else{
            document.querySelector(".examples span").style.color="grey"
            document.querySelector(".examples span").innerText = (result[0].meanings[0].definitions[0]).example;
        }

        document.querySelector(".synonyms span").innerText = result[0].meanings[0].definitions[0].synonyms[0];

        
        audio = new Audio(result[0].phonetics[0].audio);
  

    }
}




var close = wrapper.querySelector(".search span");

close.addEventListener("click", ()=>{
    
    searchInput.value = "";
    searchInput.focus();

    //pour rendre Petit
    wrapper.classList.remove("active");


    infoText.style.color = "#9A9A9A";
    infoText.innerHTML = "Type any existing word and press enter to get meaning, example, synonyms, etc.";
});





var soundIcon = wrapper.querySelector(".word i");

soundIcon.addEventListener("click", ()=>{

    // changement de couleur qui signal le lancement de l'audio
    soundIcon.style.color = "red";

    audio.play();

    //rendre la couleur a la normal apres avoir ecouter le mot
    setTimeout(() =>{
        soundIcon.style.color = "grey";
    }, 1400);

});




