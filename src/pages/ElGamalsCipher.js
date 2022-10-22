import React, {useState} from 'react'
import 'bootstrap'
import "../css/EnDe.css"
import {Header} from "../components/Header";
import {Button} from "../components/Button";
import {InputData} from "../components/InputData";
import {IsPrimeNumber, FindCode_String, FindLetter} from "../js/Functions";


export const ElGamalsCipher = () => {
    const [formEn, setFormEn] = useState({
        endeString: '', q:''
    })
    const [formDe, setFormDe] = useState({
        x:''
    })

    const [resultRcode, setResultRcode] = useState('')
    const [resultEcode, setResultEcode] = useState('')
    const [resultDecription, setResultDecription] = useState('')

    const changeHandler = event => {
        setFormEn({ ...formEn, [event.target.name]: event.target.value })
        setFormDe({ ...formDe, [event.target.name]: event.target.value })
    }

    function Find_g(q, p){
        /* global BigInt */
        for (let i = BigInt(2); i<p-1n;i=i+1n){
            let y = (BigInt(i)**q)%p
            if (y != 1n){
                return BigInt(i)
            }
        }
    }
    function Find_k(p){
        let MaxK = Number(p)-3-2+1
        let k=Math.floor(Math.random() * (MaxK) + 2)
        return BigInt(k);
    }

    function ButEncription(){
        setResultDecription('')
        /* global BigInt */
        //Получение строки для шифрования
        let string = String(formEn.endeString)
        if (string == '')
        {
            alert("Невозможно закодировать пустоту")
        }else{
            let codeX = FindCode_String(string)
            if (codeX != -1) {
                //Разбиение строки на массив
                let ArrCode = codeX.split(' ')

                //Определение ключей
                let q = BigInt(String(formEn.q)) //89 и выше
                let x=BigInt(String(formDe.x))
                console.log(x)
                let p=2n*q+1n
                if (IsPrimeNumber(p)==false){
                    alert ("Ключ p не является простым, выбирите другой ключ q")
                    return 0
                }

                let g=Find_g(q, p);
                let y = (g**x)%p

                let k = Find_k(p)
                let ArrR = []
                let ArrE = []
                for (let i = 0; i < ArrCode.length - 1; i++) {
                    let r = (g**k) % p
                    let e = (BigInt(ArrCode[i]) * (y**k)) % p
                    ArrR.push(r);
                    ArrE.push(e);
                }

                let resR = ArrR.join(' ')
                let resE = ArrE.join(' ')

                setResultRcode(resR)
                setResultEcode(resE)

                let ed = (BigInt(ArrE[0]) * (BigInt(ArrR[0])**(p - 1n - x))) % p

                console.log("q = ", q, " p = ", p, " g = ", g, " x = ", x, " y = ", y, " k = ", k, "ed = ", ed)

            }else {
                setResultRcode("Ошибка кодирования")
                setResultEcode("Ошибка кодирования")
            }
        }
    }

    function ButDescription(){
        /* global BigInt */
        let ArrR = String(resultRcode).split(' ')
        let ArrE = String(resultEcode).split(' ')

        let q = BigInt(String(formEn.q)) //17
        let x=BigInt(String(formDe.x))
        let p=2n*q+1n

        let resDe = ''
        for (let i=0; i<ArrR.length; i++){
            let Code = (BigInt(Number(ArrE[i])) * (BigInt(Number(ArrR[i]))**(p - 1n - x))) % p
            console.log(Code)
            if (FindLetter(Number(Code))!==1){
                resDe+=FindLetter(Number(Code))
            }
        }
        setResultDecription(resDe)

    }
    return(
        <div>
            <Header name={"Эль-Гамаля"}/>
            <div className="EnDeBody">
                <InputData labelText="Введите строку для шифровки" nameInput="endeString"
                           idInput="endeInpStr" onChangeFunction={changeHandler}/>
                <InputData labelText="Введите простое число q >= 89" nameInput="q"
                           idInput="enQ" onChangeFunction={changeHandler}/>
                <br/>
                <span>Введите простое число x, такое, что {2*Number(formEn.q)+1}>x>1 </span>
                <InputData nameInput="x"
                           idInput="enQ" onChangeFunction={changeHandler}/>

                <Button nameBtn = "Зашифровать" onClickFunction = {ButEncription}/>


                <div>
                    <div>
                        <label className="form-label">Результат шифровки</label>
                        <input type="text" className="form-control" name="enRes" value={resultRcode}/>
                    </div>
                    <div>
                        <input type="text" className="form-control" name="enRes" value={resultEcode}/>
                    </div>
                </div>
                <Button nameBtn = "Расшифровать" onClickFunction = {ButDescription}/>
                <div>
                    <label className="form-label">Результат расшифровки</label>
                    <input type="text" className="form-control" name="enRes" value={resultDecription}/>
                </div>

            </div>
        </div>
    )

}