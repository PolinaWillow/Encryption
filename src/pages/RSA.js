import React, {useState} from 'react'
import 'bootstrap'
import "../css/EnDe.css"
import {HeaderRsa} from "../components/HeaderRsa";
import {Button} from "../components/Button";
import {InputData} from "../components/InputData";

export const RSA = () =>{
    const [formEn, setFormEn] = useState({
        endeString: '', p:'', q:''
    })
    const [formDe, setFormDe] = useState({
        endeString: '', p:'', q:''
    })

    const [resultStr, setResultStr] = useState('')

    const changeHandler = event => {
        setFormEn({ ...formEn, [event.target.name]: event.target.value })
        setFormDe({ ...formDe, [event.target.name]: event.target.value })
    }

    function Find_e(n){
        let e=0;
        for (let i=2; i<n; i++){
            e=i;
            if((n%2===0)&(e%2===0)){
                continue;
            }
            let count=0;
            for(let j=1; j<=e; j++){
                if ((n%j===0)&(e%j===0)){
                    count++;
                    if(count>1){ break; }
                }
            }
            if(count===1){
                return e;
            }
        }
    }
    function Find_d(n,e){
        let d=1;
        while(((d*e)%n)!=1){
            d++;
        }
        return d;
    }

    function FindCode_String(string){
        //console.log(string)
        const Alph = ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й',
            'К','Л','М','Н','О','П','Р','С','Т','У','Ф',
            'Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я']

        let code=''
        let masStr = string.split('')
        for (let i=0; i<masStr.length; i++){
            //console.log(masStr[i])
            code+= Alph.indexOf(masStr[i])+' ';
        }

        return code
    }

    function FindLetter(code){
        const Alph = ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й',
            'К','Л','М','Н','О','П','Р','С','Т','У','Ф',
            'Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я']
        return Alph[code]
    }

    function ButEncription(){
        let p=Number(formEn.p)
        let q=Number(formEn.q)
        let m= p*q
        let n = (p-1)*(q-1)
        let e = Find_e(n) //3 //e взаимнопростое с m и n 1<e<n (отдельный алгоритм)
        let d = Find_d(n, e)//27//(1/e)%n

        let string = formEn.endeString.toUpperCase()

        //Преобразование открытой строки в коды
        let codeX = FindCode_String(string)
        let MasCode = codeX.split(' ')

        //Вычисление шифротекста
        let res = ''
        for (let i=0; i< (MasCode.length-1);i++){
            res = res + ((Math.pow(Number(MasCode[i]), e))%m).toString()+" "
        }
        setResultStr(res)
        console.log("Шифруемое число", codeX)
        console.log("Результат", res)
        console.log(p, q, m, n, e, d, codeX)
    }

    function ButDescription(){
        let p=Number(formDe.p) //5
        let q=Number(formDe.q) //4
        let m= p*q
        let n = (p-1)*(q-1)
        let e = Find_e(n) //3 //e взаимнопростое с m и n 1<e<n (отдельный алгоритм)
        let d = Find_d(n, e)//27//(1/e)%n

        let MasCode = formDe.endeString.split(' ')
        console.log("Расшифруемое число: ", MasCode)

        //Преобразование с использованием закрытого ключа
        let res = ''
        let codeX=0;
        for (let i=0; i<(MasCode.length-1);i++){
            codeX = (Math.pow(Number(MasCode[i]), d))%m
            console.log(Number(MasCode[i]),Math.pow(Number(MasCode[i]), d) ,codeX)
            res = res+ FindLetter(codeX)+" "
        }


        console.log("Результат", res)
        setResultStr(res)

        console.log(p, q, m, n, e, d, res)


    }

    return(
        <div>
            <HeaderRsa/>
            <div className="EnDeBody">
                <InputData labelText="Введите строку для шифровки/расшифровки" nameInput="endeString"
                           idInput="endeInpStr" onChangeFunction={changeHandler}/>
                <InputData labelText="Введите p" nameInput="p"
                           idInput="enP" onChangeFunction={changeHandler}/>
                <InputData labelText="Введите q" nameInput="q"
                           idInput="enQ" onChangeFunction={changeHandler}/>

                <Button nameBtn = "Зашифровать" onClickFunction = {ButEncription}/>
                <Button nameBtn = "Расшифровать" onClickFunction = {ButDescription}/>

                <div id = "enRes">
                    <label className="form-label">Результат шифровки/расшифровки</label>
                    <input type="text" className="form-control" name = "enRes" value={resultStr}/>
                </div>

            </div>
        </div>
    )
}