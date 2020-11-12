//Mot clé Function suivi du nom et arguments de la fonction
function moyenne(v1,v2,v3,v4)
{
  //Pas de typage des variables entier/réel
  var moyenne=0;
  //Pas de typage pour les chaînes
  var str1="la somme est ";
  var str2=">100";
  var somme=v1+v2+v3+v4;
  //Structure IF classique
  if(somme>100)
  {
    //Concaténation de chaînes avec l'opérateur +
    console.log(str1+str2);
    //Modification à la volée du type de variable
    moyenne=false;
  }
  else
  {
    moyenne=somme/4;
  }
  //Retour de valeur
  return(moyenne);
}
var v1=1;var v2=20;var v3=30;var v4=40;
console.log("moyenne="+moyenne(v1,v2,v3,v4));
document.getElementById("valeurs").innerHTML="Valeurs="+v1+","+v2+","+v3+","+v4;
document.getElementById("moyenne").innerHTML ="Moyenne="+moyenne(v1,v2,v3,v4);
