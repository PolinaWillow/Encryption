//Шифрование по алгоритму Шифра цезаря
//enstring - Шифруемая строка
//enCode - Ключ сдвига
//codeAlph - Код выбранног алфавита
export const EncriptionCeasar = (enString, enCode, codeAlph) => {
    //Получение выбранного алфавита
    const Alph = ChoiceAlph(codeAlph)
    //Сдвиг алфавита
    let copyAlf = Alph.slice()
    for (let j=0; j<enCode; j++){
        let buf = copyAlf[0];
        copyAlf.shift();
        copyAlf.push(buf)
    }
    //Шифровка
    let resStr = new Array()
    for(let j=0; j<enString.length; j++){
        if(enString.charAt(j)===' '){
            resStr.push(' ')
        }else{
            resStr.push(copyAlf[Alph.indexOf(enString.charAt(j))])
        }
    }

    let res = resStr.join("")
    return res;
}

export const DecriptionCeasar = (deString, codeAlph)=>{

}


function ChoiceAlph(codeAlph){
    //Полный алфавит
    const Alph0 = ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й',
        'К','Л','М','Н','О','П','Р','С','Т','У','Ф',
        'Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я']
    //Алфавит без Ё
    const Alph1 = ['А','Б','В','Г','Д','Е','Ж','З','И','Й',
        'К','Л','М','Н','О','П','Р','С','Т','У','Ф',
        'Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я']
    //Алфавит без Й
    const Alph2 = ['А','Б','В','Г','Д','Е','Ё','Ж','З','И',
        'К','Л','М','Н','О','П','Р','С','Т','У','Ф',
        'Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я']
    //Алфавит без Ё и Й
    const Alph3 = ['А','Б','В','Г','Д','Е','Ж','З','И',
        'К','Л','М','Н','О','П','Р','С','Т','У','Ф',
        'Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я']

    switch (codeAlph){
        case 0:
            return Alph0;
        case 1:
            return Alph1;
        case 2:
            return Alph2;
        case 3:
            return Alph3;
    }
}