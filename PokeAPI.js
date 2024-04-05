const input = document.getElementById("recherche"); //Active le bouton en appuyant sur entrer
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("rechercheButton").click();
  }
});

ApiUrl = `https://tyradex.tech/api/v1/pokemon/1`
ApiUrlfull = `https://tyradex.tech/api/v1/pokemon`

PokeTable()
GetPokemon()
  

//Dark Mode
const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("DarkmodeDark")
  document.getElementById("rechercheButton").classList.toggle("DarkmodeButton")
  document.getElementById("NamePokemonDiv").classList.toggle("DarkmodeGoldBorder")
  document.getElementById("NamePokemonDiv").classList.toggle("DarkmodeFontWhite")
  document.getElementById("listDown").classList.toggle("DarkmodeGold")
  document.getElementById("listUp").classList.toggle("DarkmodeGold")
  document.getElementById("listRight").classList.toggle("DarkmodeGold")
  document.getElementById("listLeft").classList.toggle("DarkmodeGold")
  document.getElementById("pokemonlist").classList.toggle("DarkmodeGold")
  document.getElementById("outerCircle").classList.toggle("DarkmodeGold")
  document.getElementById("center").classList.toggle("DarkmodeGold")
  document.getElementById("innerCircle").classList.toggle("DarkmodeDark")
  document.getElementById("statPres").classList.toggle("DarkmodeFontWhite")
  document.getElementById("statMin").classList.toggle("DarkmodeFontWhite")
  document.getElementById("statMax").classList.toggle("DarkmodeFontWhite")
  document.getElementById("statPV").classList.toggle("DarkmodeFontWhite")
  document.getElementById("statAtt").classList.toggle("DarkmodeFontWhite")
  document.getElementById("statDef").classList.toggle("DarkmodeFontWhite")
  document.getElementById("statAttS").classList.toggle("DarkmodeFontWhite")
  document.getElementById("statDefS").classList.toggle("DarkmodeFontWhite")
  document.getElementById("statVit").classList.toggle("DarkmodeFontWhite")
  document.getElementById("left").classList.toggle("DarkmodeDark")
  document.getElementById("dataTable").classList.toggle("DarkmodeFontWhite")
  document.getElementById("tablePoid").classList.toggle("DarkmodeGrey")
  document.getElementById("tableType").classList.toggle("DarkmodeGrey")
  document.getElementById("tableTaille").classList.toggle("DarkmodeGrey")
  document.getElementById("tableTalent").classList.toggle("DarkmodeGrey")
  document.getElementById("catTable").classList.toggle("DarkmodeGrey")
  document.getElementById("catTable").classList.toggle("DarkmodeFontWhite")
  document.getElementById("progress1").classList.toggle("DarkmodeGrey")
  document.getElementById("progress2").classList.toggle("DarkmodeGrey")
  document.getElementById("progress3").classList.toggle("DarkmodeGrey")
  document.getElementById("progress4").classList.toggle("DarkmodeGrey")
  document.getElementById("progress5").classList.toggle("DarkmodeGrey")
  document.getElementById("progress6").classList.toggle("DarkmodeGrey")
  document.getElementById("recherche").classList.toggle("DarkmodeDarkRecherche")
  document.getElementById("recherche").classList.toggle("DarkmodePlaceholder")
  document.getElementById("recherche").classList.toggle("DarkmodeBordeRecherche")
  document.getElementById("checkboxLabel").classList.toggle("DarkmodeCheckBox")

  for (i = 1; i <= lastElement; i++) {
    document.getElementById(`triangle${i}`).classList.toggle("DarkmodeDarkList")
    document.getElementById(`pokedexBoxName${i}`).classList.toggle("DarkmodeFontWhite")
  }
})


function SearchBar() { 
    pokemonName = document.getElementById("recherche").value.toLowerCase();
    ApiUrl = `https://tyradex.tech/api/v1/pokemon/${pokemonName}`
    document.getElementById("recherche").value = ''
}

function ChangeSprite() {
  if (imgElement.src == pokemonSprite) {
    imgElement.src = pokemonSpriteShiny
  }  
  else if (imgElement.src == pokemonSpriteShiny) {
    imgElement.src = pokemonSprite
  }
}

function GetPokemon() {
fetch(ApiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Ressource Introuvable');
    }
    return response.json();
  })

  .then(data => {
    Pokedata = data
    
    //API Anglais Requête
    PokeID=Pokedata.pokedex_id
    ApiAng=`https://pokeapi.co/api/v2/pokemon/${PokeID}`

    //Cri 
    PokeCri = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${PokeID}.ogg`);
    PokeCri.volume = 0.2
    PokeCri.play();

    // Affichage Sprite
    pokemonSprite = Pokedata.sprites.regular
    pokemonSpriteShiny = Pokedata.sprites.shiny
    imgElement = document.getElementById("pokemonSprite");
    imgElement.src = pokemonSprite
    imgElement.style.display = "block";

    //Affichage Tableau Catégorie
    pokemonCat = Pokedata.category
    catTable = document.getElementById("catTable"),
    catRow = catTable.getElementsByTagName('tr')[0],
    catData = catRow.getElementsByTagName('td')[0];
    catData.innerHTML = pokemonCat;
    
    //Affichage Tableau Donnée
    dataTable = document.getElementById("dataTable");
    
    pokemonTaille = Pokedata.height
    tailleRow = dataTable.getElementsByTagName('tr')[1],
    tailleData = tailleRow.getElementsByTagName('td')[1];
    tailleData.innerHTML = pokemonTaille;

    pokemonPoid = Pokedata.weight
    poidRow = dataTable.getElementsByTagName('tr')[2],
    poidData = poidRow.getElementsByTagName('td')[1];
    poidData.innerHTML = pokemonPoid;

    pokemonTalent = Pokedata["talents"][0]["name"]
    talentRow = dataTable.getElementsByTagName('tr')[3],
    talentData = talentRow.getElementsByTagName('td')[1];
    talentData.innerHTML = pokemonTalent;

    //Nom
    NamePokemonDiv=document.getElementById("NamePokemonDiv");
    NamePokemon = Pokedata["name"]["fr"]
    NamePokemonDiv.innerHTML = NamePokemon


    //Statistique 
    PokestatPV=Pokedata.stats.hp
    statPvPRC = PokestatPV*100/255
    statPV=document.getElementById("statPV");
    statPV.innerHTML=`${PokestatPV}`
    document.getElementsByClassName("progress-bar")[0].style.width = `${statPvPRC}%`;  
    if (PokestatPV < 29 && PokestatPV >= 1 ){
      document.getElementsByClassName("progress-bar")[0].style.backgroundColor = "red" ;  
    }else if (PokestatPV < 59 && PokestatPV >= 30 ){
      document.getElementsByClassName("progress-bar")[0].style.backgroundColor = "orange" ;  
    }else if (PokestatPV < 89 && PokestatPV >= 60 ){
      document.getElementsByClassName("progress-bar")[0].style.backgroundColor = "yellow" ;  
    }else if (PokestatPV < 119 && PokestatPV >= 90 ){
      document.getElementsByClassName("progress-bar")[0].style.backgroundColor = "green" ;  
    }else if (PokestatPV < 149 && PokestatPV >= 120 ){
      document.getElementsByClassName("progress-bar")[0].style.backgroundColor = "darkgreen" ;  
    }else if (PokestatPV < 255 && PokestatPV >= 150 ){
      document.getElementsByClassName("progress-bar")[0].style.backgroundColor = "blue" ;  }

    PokestatAtt=Pokedata.stats.atk
    statAttPRC = PokestatAtt*100/255
    statAtt=document.getElementById("statAtt");
    statAtt.innerHTML=`${PokestatAtt}`
    document.getElementsByClassName("progress-bar")[1].style.width = `${statAttPRC}%`;
    if (PokestatAtt < 29 && PokestatAtt >= 1 ){
      document.getElementsByClassName("progress-bar")[1].style.backgroundColor = "red" ;  
    }else if (PokestatAtt < 59 && PokestatAtt >= 30 ){
      document.getElementsByClassName("progress-bar")[1].style.backgroundColor = "orange" ;  
    }else if (PokestatAtt < 89 && PokestatAtt >= 60 ){
      document.getElementsByClassName("progress-bar")[1].style.backgroundColor = "yellow" ;  
    }else if (PokestatAtt < 119 && PokestatAtt >= 90 ){
      document.getElementsByClassName("progress-bar")[1].style.backgroundColor = "green" ;  
    }else if (PokestatAtt < 149 && PokestatAtt >= 120 ){
      document.getElementsByClassName("progress-bar")[1].style.backgroundColor = "darkgreen" ;  
    }else if (PokestatAtt < 255 && PokestatAtt >= 150 ){
      document.getElementsByClassName("progress-bar")[1].style.backgroundColor = "blue" ; 
     }

    PokestatDef=Pokedata.stats.def
    statDefPRC = PokestatDef*100/255
    statDef=document.getElementById("statDef");
    statDef.innerHTML=`${PokestatDef}`
    document.getElementsByClassName("progress-bar")[2].style.width = `${statDefPRC}%`;
    if (PokestatDef < 29 && PokestatDef >= 1 ){
      document.getElementsByClassName("progress-bar")[2].style.backgroundColor = "red" ;  
    }else if (PokestatDef < 59 && PokestatDef >= 30 ){
      document.getElementsByClassName("progress-bar")[2].style.backgroundColor = "orange" ;  
    }else if (PokestatDef < 89 && PokestatDef >= 60 ){
      document.getElementsByClassName("progress-bar")[2].style.backgroundColor = "yellow" ;  
    }else if (PokestatDef < 119 && PokestatDef >= 90 ){
      document.getElementsByClassName("progress-bar")[2].style.backgroundColor = "green" ;  
    }else if (PokestatDef < 149 && PokestatDef >= 120 ){
      document.getElementsByClassName("progress-bar")[2].style.backgroundColor = "darkgreen" ;  
    }else if (PokestatDef < 255 && PokestatDef >= 150 ){
      document.getElementsByClassName("progress-bar")[2].style.backgroundColor = "blue" ; 
     }

    PokestatAttS=Pokedata.stats.spe_atk
    statAttSPRC = PokestatAttS*100/255
    statAttS=document.getElementById("statAttS");
    statAttS.innerHTML=`${PokestatAttS}`
    document.getElementsByClassName("progress-bar")[3].style.width = `${statAttSPRC}%`;
    if (PokestatAttS < 29 && PokestatAttS >= 1 ){
      document.getElementsByClassName("progress-bar")[3].style.backgroundColor = "red" ;  
    }else if (PokestatAttS < 59 && PokestatAttS >= 30 ){
      document.getElementsByClassName("progress-bar")[3].style.backgroundColor = "orange" ;  
    }else if (PokestatAttS < 89 && PokestatAttS >= 60 ){
      document.getElementsByClassName("progress-bar")[3].style.backgroundColor = "yellow" ;  
    }else if (PokestatAttS < 119 && PokestatAttS >= 90 ){
      document.getElementsByClassName("progress-bar")[3].style.backgroundColor = "green" ;  
    }else if (PokestatAttS < 149 && PokestatAttS >= 120 ){
      document.getElementsByClassName("progress-bar")[3].style.backgroundColor = "darkgreen" ;  
    }else if (PokestatAttS < 255 && PokestatAttS >= 150 ){
      document.getElementsByClassName("progress-bar")[3].style.backgroundColor = "blue" ;  
    }

    PokestatDefS=Pokedata.stats.spe_def
    statDefSPRC = PokestatDefS*100/255
    statDefS=document.getElementById("statDefS");
    statDefS.innerHTML=`${PokestatDefS}`
    document.getElementsByClassName("progress-bar")[4].style.width = `${statDefSPRC}%`;
    if (PokestatDefS < 29 && PokestatDefS >= 1 ){
      document.getElementsByClassName("progress-bar")[4].style.backgroundColor = "red" ;  
    }else if (PokestatDefS < 59 && PokestatDefS >= 30 ){
      document.getElementsByClassName("progress-bar")[4].style.backgroundColor = "orange" ;  
    }else if (PokestatDefS < 89 && PokestatDefS >= 60 ){
      document.getElementsByClassName("progress-bar")[4].style.backgroundColor = "yellow" ;  
    }else if (PokestatDefS < 119 && PokestatDefS >= 90 ){
      document.getElementsByClassName("progress-bar")[4].style.backgroundColor = "green" ;  
    }else if (PokestatDefS < 149 && PokestatDefS >= 120 ){
      document.getElementsByClassName("progress-bar")[4].style.backgroundColor = "darkgreen" ;  
    }else if (PokestatDefS < 255 && PokestatDefS >= 150 ){
      document.getElementsByClassName("progress-bar")[4].style.backgroundColor = "blue" ;  
    }

    PokestatVit=Pokedata.stats.vit
    statVitPRC = PokestatVit*100/255
    statVit=document.getElementById("statVit");
    statVit.innerHTML=`${PokestatVit}`
    document.getElementsByClassName("progress-bar")[5].style.width = `${statVitPRC}%`;
    if (PokestatVit < 29 && PokestatVit >= 1 ){
      document.getElementsByClassName("progress-bar")[5].style.backgroundColor = "red" ;  
    }else if (PokestatVit < 59 && PokestatVit >= 30 ){
      document.getElementsByClassName("progress-bar")[5].style.backgroundColor = "orange" ;  
    }else if (PokestatVit < 89 && PokestatVit >= 60 ){
      document.getElementsByClassName("progress-bar")[5].style.backgroundColor = "yellow" ;  
    }else if (PokestatVit < 119 && PokestatVit >= 90 ){
      document.getElementsByClassName("progress-bar")[5].style.backgroundColor = "green" ;  
    }else if (PokestatVit < 149 && PokestatVit >= 120 ){
      document.getElementsByClassName("progress-bar")[5].style.backgroundColor = "darkgreen" ;  
    }else if (PokestatVit < 255 && PokestatVit >= 150 ){
      document.getElementsByClassName("progress-bar")[5].style.backgroundColor = "blue" ;  
    }

//Fetch PokeApi pour type
fetch(ApiAng)
  .then(response => {
    if (!response.ok) {
        throw new Error('Ressource Introuvable Anglais');
    }
    return response.json();
  })
   
  .then(data => {
    PokedataAng = data
    //Type Tableau Pokemon  
    types = data.types.map(type => type.type.name);
    types = JSON.stringify(types)
    type1IMG = document.getElementById("typeTable1");
    type2IMG = document.getElementById("typeTable2");
    divType1 = document.getElementById("divType1");
    divType2 = document.getElementById("divType2");
    nomType1 = document.getElementById("nameType2");
    nomType2 = document.getElementById("nameType1");
    type1Name = Pokedata["types"][0]["name"]
    type2Name = ""

    //Types Image Lien
    spriteCombat="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/combat.png"
    spriteVol="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/vol.png"
    spriteRoche="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/roche.png"
    spriteSol="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/sol.png"
    spriteEau="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/eau.png"
    spriteAcier="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/acier.png"
    spriteSpectre="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/spectre.png"
    spritePsy="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/psy.png"
    spriteNormal="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/normal.png"
    spriteGlace="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/glace.png"
    spriteInsecte="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/insecte.png"
    spriteFee ="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/fee.png"
    spritePoison="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/poison.png"
    spriteTenebre="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/tenebres.png"
    spriteElectrik="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/electrik.png"
    spritePlante="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/plante.png"
    spriteFeu="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/feu.png"
    spriteDragon="https://raw.githubusercontent.com/Yarkis01/TyraDex/images/types/dragon.png"


    //Type 1
    if (type1Name === "Combat"){
      nomType1.innerHTML=type1Name
      type1Name=spriteCombat
      divType1.style.backgroundColor = "#FF8000";
    } 
    else if (type1Name === "Vol"){
      nomType1.innerHTML=type1Name
      type1Name=spriteVol
      divType1.style.backgroundColor = "#81B9EF";
    } 
    else if (type1Name === "Roche"){
      nomType1.innerHTML=type1Name
      type1Name=spriteRoche
      divType1.style.backgroundColor = "#AFA981";
    } 
    else if (type1Name === "Sol"){
      nomType1.innerHTML=type1Name
      type1Name=spriteSol
      divType1.style.backgroundColor = "#915121";
    } 
    else if (type1Name === "Eau"){
      nomType1.innerHTML=type1Name
      type1Name=spriteEau
      divType1.style.backgroundColor = "#2980EF";
    } 
    else if (type1Name === "Acier"){
      nomType1.innerHTML=type1Name
      type1Name=spriteAcier
      divType1.style.backgroundColor = "#60A1B8";
    } 
    else if (type1Name === "Spectre"){
      nomType1.innerHTML=type1Name
      type1Name=spriteSpectre
      divType1.style.backgroundColor = "#704170";
    } 
    else if (type1Name === "Psy"){
      nomType1.innerHTML=type1Name
      type1Name=spritePsy
      divType1.style.backgroundColor = "#EF4179";
    } 
    else if (type1Name === "Normal"){
      nomType1.innerHTML=type1Name
      type1Name=spriteNormal
      divType1.style.backgroundColor = "#9FA19F";
    } 
    else if (type1Name === "Glace"){
      nomType1.innerHTML=type1Name
      type1Name=spriteGlace
      divType1.style.backgroundColor = "#3FD8FF";
    } 
    else if (type1Name === "Insecte"){
      nomType1.innerHTML=type1Name
      type1Name=spriteInsecte
      divType1.style.backgroundColor = "#91A119";
    } 
    else if (type1Name === "Fée"){
      nomType1.innerHTML=type1Name
      type1Name=spriteFee
      divType1.style.backgroundColor = "#EF71EF";
    } 
    else if (type1Name === "Poison"){
      nomType1.innerHTML=type1Name
      type1Name=spritePoison
      divType1.style.backgroundColor = "#9141CB";
    } 
    else if (type1Name === "Ténèbres"){
      nomType1.innerHTML=type1Name
      type1Name=spriteTenebre
      divType1.style.backgroundColor = "#50413F";
    } 
    else if (type1Name === "Électrik"){
      nomType1.innerHTML=type1Name
      type1Name=spriteElectrik
      divType1.style.backgroundColor = "#FAC000";
    } 
    else if (type1Name === "Plante"){
      nomType1.innerHTML = type1Name
      type1Name=spritePlante
      divType1.style.backgroundColor = "#3FA129";
    } 
    else if (type1Name === "Feu"){
      nomType1.innerHTML=type1Name
      type1Name=spriteFeu
      divType1.style.backgroundColor = "#E62829";
    } 
    else if (type1Name === "Dragon"){
      nomType1.innerHTML=type1Name
      type1Name=spriteDragon
      divType1.style.backgroundColor = "#5061E1";
    }

    //Type 2
    if (types.includes(",")){   
      type2Name = Pokedata["types"][1]["name"]
      
      //Type 2
      if (type2Name === "Combat"){
        nomType2.innerHTML=type2Name
        type2Name=spriteCombat
        divType2.style.backgroundColor = "#FF8000";
      } 
      else if (type2Name === "Vol"){
        nomType2.innerHTML=type2Name
        type2Name=spriteVol
        divType2.style.backgroundColor = "#81B9EF";

      } 
      else if (type2Name === "Roche"){
        nomType2.innerHTML=type2Name
        type2Name=spriteRoche
        divType2.style.backgroundColor = "#AFA981";

      } 
      else if (type2Name === "Sol"){
        nomType2.innerHTML=type2Name
        type2Name=spriteSol
        divType2.style.backgroundColor = "#915121";

      } 
      else if (type2Name === "Eau"){
        nomType2.innerHTML=type2Name
        type2Name=spriteEau
        divType2.style.backgroundColor = "#2980EF";

      } 
      else if (type2Name === "Acier"){
        nomType2.innerHTML=type2Name
        type2Name=spriteAcier
        divType2.style.backgroundColor = "#60A1B8";

      } 
      else if (type2Name === "Spectre"){
        nomType2.innerHTML=type2Name
        type2Name=spriteSpectre
        divType2.style.backgroundColor = "#704170";

      } 
      else if (type2Name === "Psy"){
        nomType2.innerHTML=type2Name
        type2Name=spritePsy
        divType2.style.backgroundColor = "#EF4179";

      } 
      else if (type2Name === "Normal"){
        nomType2.innerHTML=type2Name
        type2Name=spriteNormal
        divType2.style.backgroundColor = "#9FA19F";

      } 
      else if (type2Name === "Glace"){
        nomType2.innerHTML=type2Name
        type2Name=spriteGlace
        divType2.style.backgroundColor = "#3FD8FF";

      } 
      else if (type2Name === "Insecte"){
        nomType2.innerHTML=type2Name
        type2Name=spriteInsecte
        divType2.style.backgroundColor = "#91A119";

      } 
      else if (type2Name === "Fée"){
        nomType2.innerHTML=type2Name
        type2Name=spriteFee
        divType2.style.backgroundColor = "#EF71EF";

      } 
      else if (type2Name === "Poison"){
        nomType2.innerHTML=type2Name
        type2Name=spritePoison
        divType2.style.backgroundColor = "#9141CB";
      } 
      else if (type2Name === "Ténèbres"){
        nomType2.innerHTML=type2Name
        type2Name=spriteTenebre
        divType2.style.backgroundColor = "#50413F";

      } 
      else if (type2Name === "Électrik"){
        nomType2.innerHTML=type2Name
        type2Name=spriteElectrik
        divType2.style.backgroundColor = "#FAC000";

      } 
      else if (type2Name === "Plante"){
        nomType2.innerHTML=type2Name
        type2Name=spritePlante
        divType2.style.backgroundColor = "#3FA129";
      } 
      else if (type2Name === "Feu"){
        nomType2.innerHTML=type2Name
        type2Name=spriteFeu
        divType2.style.backgroundColor = "#E62829";
      } 
      else if (type2Name === "Dragon"){
        nomType2.innerHTML=type2Name
        type2Name=spriteDragon
        divType2.style.backgroundColor = "#5061E1";

      } 
    }
    if (types.includes(",")){   
      type2IMG.style.display = "block"
      divType2.style.display = "block"
      type1IMG.src=type1Name
      type2IMG.src=type2Name

      

    } else {
      type2IMG.style.display = "none"
      divType2.style.display = "none"
      type1IMG.src=type1Name
    }

  })
  .catch(error => {
    console.error('Erreur Api Anglais:', error);
  });


currentPoke=document.getElementById(`${PokeID}`)
currentPoke.scrollIntoView({behavior: "smooth" ,block: 'center'})

//Select pokemon
for (i = 1; i <= lastElement; i++) { 
  document.getElementById(`triangle${i}`).classList.remove("ListeTriangleSelector")
  document.getElementById(`triangle${i}`).classList.remove("ListeSelector")
  document.getElementById(`blackBox${i}`).classList.remove("ListeSelector")

  if (document.getElementById(`triangle${i}`).classList.contains("DarkmodeDarkList")) {
    document.getElementById(`triangle${i}`).classList.remove("DarkmodeListeTriangleSelector")
  } else {
    document.getElementById(`triangle${i}`).classList.remove("ListeTriangleSelector")
  }
}

document.getElementById(`triangle${PokeID}`).classList.add("ListeTriangleSelector")
document.getElementById(`triangle${PokeID}`).classList.add("ListeSelector")
document.getElementById(`blackBox${PokeID}`).classList.add("ListeSelector")

if (document.getElementById(`triangle${PokeID}`).classList.contains("DarkmodeDarkList")) {
  document.getElementById(`triangle${PokeID}`).classList.add("DarkmodeListeTriangleSelector")
} else {
  document.getElementById(`triangle${PokeID}`).classList.add("ListeTriangleSelector")
}

})
  .catch(error => {
    console.error('Erreur:', error);
  });
  
}

function PokeTable() {
  fetch(ApiUrlfull)
  .then(response => {
    if (!response.ok) {
      throw new Error('Ressource Introuvable');
    }
    return response.json();
  })

  .then(fulldata => {
    pokefulldata = fulldata

    //Compte nombre element
    lastElement = fulldata
    lastElement  = Object.keys(lastElement).length;
    lastElement = lastElement -1 
    parent = document.getElementById("pokemonlist");

    //boucle création element
    
    ResetState = 0


    for (i = 1; i <= lastElement; i++) {

      pokedexBox = document.createElement("div");
      pokedexBox.className = "pokedexBox";
      pokedexBox.setAttribute("id", `${i}`);

      //Affiche le pokemon cliqué
      pokedexBox.onclick = function(){
        ApiUrlID=this.getAttribute("id")

        //Scroll
        this.scrollIntoView({behavior: "smooth" , block: 'center'})

        //Select pokemon
        for (i = 1; i <= lastElement; i++) { 
          document.getElementById(`triangle${i}`).classList.remove("ListeTriangleSelector")
          document.getElementById(`triangle${i}`).classList.remove("ListeSelector")
          document.getElementById(`blackBox${i}`).classList.remove("ListeSelector")

          if (document.getElementById(`triangle${i}`).classList.contains("DarkmodeDarkList")) {
            document.getElementById(`triangle${i}`).classList.remove("DarkmodeListeTriangleSelector")
          } else {
            document.getElementById(`triangle${i}`).classList.remove("ListeTriangleSelector")
          }
        }   

        document.getElementById(`triangle${ApiUrlID}`).classList.add("ListeTriangleSelector")
        document.getElementById(`triangle${ApiUrlID}`).classList.add("ListeSelector")
        document.getElementById(`blackBox${ApiUrlID}`).classList.add("ListeSelector")

        if (document.getElementById(`triangle${ApiUrlID}`).classList.contains("DarkmodeDarkList")) {
          document.getElementById(`triangle${ApiUrlID}`).classList.add("DarkmodeListeTriangleSelector")
        } else {
          document.getElementById(`triangle${ApiUrlID}`).classList.add("ListeTriangleSelector")
        }


        ApiUrl = `https://tyradex.tech/api/v1/pokemon/${ApiUrlID}`
        GetPokemon()
      }
      
      pokedexBoxTriangle = document.createElement("div");
      pokedexBoxTriangle.className = "triangle-code";
      pokedexBoxTriangle.setAttribute("id", `triangle${i}`);

      pokedexBoxBlack = document.createElement("div");
      pokedexBoxBlack.className = "pokedexBoxBlack";
      pokedexBoxBlack.setAttribute("id", `blackBox${i}`);

      pokedexBoxNumber = document.createElement("p");
      pokedexBoxNumber.className = "pokedexBoxNumber";

      pokedexBoxCatch = document.createElement("img");
      pokedexBoxCatch.className = "pokedexBoxCatch";
      pokedexBoxCatch.src="pokeballCatch.svg"

      pokedexBoxSprite = document.createElement("img");
      pokedexBoxSprite.className = "pokedexBoxSprite";
      pokedexBoxSprite.src=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`
      pokedexBoxSprite.id = `sprite${i}`

      pokedexBoxName = document.createElement("p");
      pokedexBoxName.className = "pokedexBoxName";
      pokedexBoxName.setAttribute("id", `pokedexBoxName${i}`);

      parent.appendChild(pokedexBox);
      pokedexBox.appendChild(pokedexBoxBlack);
      pokedexBox.appendChild(pokedexBoxTriangle);
      pokedexBox.appendChild(pokedexBoxNumber);
      pokedexBox.appendChild(pokedexBoxCatch);
      pokedexBox.appendChild(pokedexBoxSprite);
      pokedexBox.appendChild(pokedexBoxName);

      pokedexBoxNameText=pokefulldata[i]["name"]["fr"]
      pokedexBoxName.innerHTML= pokedexBoxNameText

      pokedexBoxNumber.innerHTML= `N°${i}`
      
    }

    document.getElementById("sprite304").src="EasterEgg1.png"
    document.getElementById("sprite305").src="EasterEgg2.png"

  })


  .catch(error => {
    console.error('Erreur:', error);
  });
}
