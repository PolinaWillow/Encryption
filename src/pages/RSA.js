import React, {useState} from 'react'
import 'bootstrap'
import "../css/EnDe.css"
import {HeaderRsa} from "../components/HeaderRsa";

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

        let code=0
        let masStr = string.split('')
        for (let i=0; i<masStr.length; i++){
            //console.log(masStr[i])
            code+= Alph.indexOf(masStr[i]);
        }

        return code
    }

    function ButEncription(){
        let p=Number(formEn.p)
        let q=Number(formEn.q)
        let m= p*q
        let n = (p-1)*(q-1)
        let e = Find_e(n) //3 //e взаимнопростое с m и n 1<e<n (отдельный алгоритм)
        let d = Find_d(n, e)//27//(1/e)%n

        let string = formEn.endeString.toUpperCase()

        //Преобразование открытой строки в число
        let codeX = FindCode_String(string)

        //Вычисление шифротекста
        let res = Math.pow(codeX, e)%n
        setResultStr(res)

        console.log(p, q, m, n, e, d, codeX)
    }

    function ButDescription(){
        let p=Number(formDe.p)
        let q=Number(formDe.q)
        let m= p*q
        let n = (p-1)*(q-1)
        let e = Find_e(n) //3 //e взаимнопростое с m и n 1<e<n (отдельный алгоритм)
        let d = Find_d(n, e)//27//(1/e)%n

        let code = Number(formDe.endeString)

        //Преобразование с использованием закрытого ключа
        let codeX = Math.pow(code, d)%n
        console.log(code, codeX)
        let res = codeX

        setResultStr(res)

        console.log(p, q, m, n, e, d, code, codeX, res)


    }

    return(
        <div>
            <HeaderRsa/>
            <div className="EnDeBody">
                <div id = "enString">
                    <label className="form-label">Введите строку для шифровки/расшифровки</label>
                    <input type="text" className="form-control" name = "endeString" id="endeInpStr" onChange={changeHandler}/>
                </div>
                <div id = "enP">
                    <label className="form-label">Введите p</label>
                    <input type="text" className="form-control" name = "p" id="enP" onChange={changeHandler}/>
                </div>
                <div id = "enQ">
                    <label className="form-label">Введите q</label>
                    <input type="text" className="form-control" name = "q" id="enQ" onChange={changeHandler}/>
                </div>

                <div className="EnDeButton">
                    <button type="button" className ="btn btn-light" onClick={ButEncription}>Зашифровать</button>
                </div>
                <div className="EnDeButton">
                    <button type="button" className ="btn btn-light" onClick={ButDescription}>Расшифровать</button>
                </div>
                <div id = "enRes">
                    <label className="form-label">Результат шифровки/расшифровки</label>
                    <input type="text" className="form-control" name = "enRes" value={resultStr}/>
                </div>

            </div>
        </div>
    )
}