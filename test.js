// En bdd :
// les champs date prennent un _ avant : _createdAt
// les liaisons vers d autres collections prennent un _ : _user
// les boolean s ecrivent isQuelquechose : isBanished
// _user et _users objet ou tableaux




//si return dans un if signifie que le script sarrete donc en dessousje peux ajouter un autre if .


if ( true ) {
    console.log("1")
} else{
    console.log( "2")
}
    
// let response = res 
// ici dessus response et res sont liés donc si je modifie res, ca modifie response et vice versa
//attention il sagit QUE de cas precis dobjets complexes ou je sais de maniere empirique quil dispose de proprietes de liaison , par ex les objets mongos

// let response = {...res}  -> 
// au desus je ne transmet que le contenu non lié de res donc si je modifie res ca ne modifie pas repsonse et vice versa.
//attention cette ecriture nest valable quen ES6 donc ne peux pas lutiiliser pour linstant sur mon back

[
    {

    },
    {

    }
]

//ci dessus quand je veux acceder au contenu dun tableau : objet ou pas ( tableau ...) 
//je peux ecrire ...array ou array[0]
// le ...array prend tout le contenu du tableau


