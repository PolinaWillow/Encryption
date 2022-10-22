import React from 'react'

export const  FindLetter = (code)=>{
    const Alph = [' ','.',',',';',':','!','?',
        'А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й',
        'К','Л','М','Н','О','П','Р','С','Т','У','Ф',
        'Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я',
        'а','б','в','г','д','е','ё','ж','з','и','й',
        'к','л','м','н','о','п','р','с','т','у','ф',
        'х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я']
    console.log(Alph.length)
    if ((code>=Alph.length)||(code<0))
    {
        alert("Ошибка определения значения кода");
        return -1;
    }else {
        //console.log(Alph[code])
        return Alph[code]
    }
}

export const FindCode_String = (string)=>{
    //console.log(string)
    const Alph = [' ','.',',',';',':','!','?',
        'А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й',
        'К','Л','М','Н','О','П','Р','С','Т','У','Ф',
        'Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я',
        'а','б','в','г','д','е','ё','ж','з','и','й',
        'к','л','м','н','о','п','р','с','т','у','ф',
        'х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я']

    let code=''
    let masStr = string.split('')
    for (let i=0; i<masStr.length; i++){
        //console.log(masStr[i])
        if(Alph.indexOf(masStr[i])!=-1) {
            code += Alph.indexOf(masStr[i]) + ' ';
        }else{
            alert(`Символ ${masStr[i]} запрещен для кодирования`)
            return -1
        }
    }

    return code
}

export const IsPrimeNumber = (Num) =>{
    /* global BigInt */
    console.log(`${Num} - простое число?`)
    for (let i=BigInt(2); i< sqrtNum(Num); i=i+1n){
        if (Num % i == 0n) {
            //console.log(i)
            return false
        }
    }
    return true
}

function sqrtNum(value) {
    if (value < 0n) {
        throw 'square root of negative numbers is not supported'
    }

    if (value < 2n) {
        return value;
    }

    function newtonIteration(n, x0) {
        const x1 = ((n / x0) + x0) >> 1n;
        if (x0 === x1 || x0 === (x1 - 1n)) {
            return x0;
        }
        return newtonIteration(n, x1);
    }

    return newtonIteration(value, 1n);
}
