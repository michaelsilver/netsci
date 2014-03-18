verbConjugation =
    {
        'avoir': // these are the actual conjugations
        {
            'je'         : 'ai',
            'tu'         : 'as',
            'il/elle/on' : 'a',
            'nous'       : 'avons',
            'vous'       : 'avez',
            'ils/elles'  : 'ont',
        },
        '\352tre': // \352 = ê, so être
        {
            'je'         : 'suis',
            'tu'         : 'es',
            'il/elle/on' : 'est',
            'nous'       : 'sommes',
            'vous'       : '\352tes',
            'ils/elles'  : 'sont',
        },
        'er': // these are only the endings
        {
            'je'         : 'e',
            'tu'         : 'es',
            'il/elle/on' : 'e',
            'nous'       : 'ons',
            'vous'       : 'ez',
            'ils/elles'  : 'ent',
        },
        're':
        {
            'je'         : 's',
            'tu'         : 's',
            'il/elle/on' : '',
            'nous'       : 'ons',
            'vous'       : 'ez',
            'ils/elles'  : 'ent',
        },
    };

// verbConjugation = _.chain(verbConjugation).value();
// console.log(_.keys(verbConjugation).verb.value().keys().pronoun));
// console.log(_.keys(verbConjugation.value()));
// console.log(verbConjugation.avoir.tu); // this one is fine

// BUT: look at line 53 of client.js


// function verbConjugation(){
//     return verbConjugation;
// }