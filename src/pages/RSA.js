import React, {useState} from 'react'
import 'bootstrap'
import "../css/EnDe.css"
import {Header} from "../components/Header";
import {Button} from "../components/Button";
import {InputData} from "../components/InputData";
import { FindCode_String, FindLetter} from "../js/Functions";

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
    function Find_d(n,e) {
        let d = 1;
        while (((d * e) % n) != 1) {
            d++;
            return d;
        }
    }

        function ButEncription() {
            let p = Number(formEn.p)
            let q = Number(formEn.q)
            let m = p * q
            let n = (p - 1) * (q - 1)
            let e = Find_e(n) //3 //e взаимнопростое с m и n 1<e<n (отдельный алгоритм)
            let d = Find_d(n, e)//27//(1/e)%n

            let string = formEn.endeString.toUpperCase()

            //Преобразование открытой строки в коды
            let codeX = FindCode_String(string)
            let MasCode = codeX.split(' ')

            //Вычисление шифротекста
            let res = ''
            for (let i = 0; i < (MasCode.length - 1); i++) {
                res = res + ((Math.pow(Number(MasCode[i]), e)) % m).toString() + " "
            }
            setResultStr(res)
            console.log("Шифруемое число", codeX)
            console.log("Результат", res)
            console.log(p, q, m, n, e, d, codeX)

        }

        function ButDescription() {
            let p = Number(formDe.p) //7  3  3  3
            let q = Number(formDe.q) //5 11 13 17
            let m = p * q
            let n = (p - 1) * (q - 1)
            let e = Find_e(n) //3 //e взаимнопростое с m и n 1<e<n (отдельный алгоритм)
            let d = Find_d(n, e)//27//(1/e)%n

            let MasCode = formDe.endeString.split(' ')
            console.log("Расшифруемое число: ", MasCode)
            console.log("m = ", m, "\nn = ", n, "\ne = ", e, "\nd = ", d,)

            //Преобразование с использованием закрытого ключа
            let res = ''
            let codeX = 0;
            for (let i = 0; i < (MasCode.length - 1); i++) {
                codeX = (Math.pow(Number(MasCode[i]), d)) % m
                console.log("Расшифровываем:", Number(MasCode[i]), "\nВозведение в степень: ", Math.pow(Number(MasCode[i]), d), "\ncodeX = ", codeX);
                console.log(Number(MasCode[i]), Math.pow(Number(MasCode[i]), d), codeX)
                res = res + FindLetter(codeX) + " "
            }


            console.log("Результат", res)
            setResultStr(res)

            //console.log(p, q, m, n, e, d, res)


        }

        return (
            <div>
                <Header name={"RSA"}/>
                <div className="EnDeBody">
                    <InputData labelText="Введите строку для шифровки/расшифровки" nameInput="endeString"
                               idInput="endeInpStr" onChangeFunction={changeHandler}/>
                    <InputData labelText="Введите простое число p" nameInput="p"
                               idInput="enP" onChangeFunction={changeHandler}/>
                    <InputData labelText="Введите простое число q != p" nameInput="q"
                               idInput="enQ" onChangeFunction={changeHandler}/>

                    <Button nameBtn="Зашифровать" onClickFunction={ButEncription}/>
                    <Button nameBtn="Расшифровать" onClickFunction={ButDescription}/>

                    <div id="enRes">
                        <label className="form-label">Результат шифровки/расшифровки</label>
                        <input type="text" className="form-control" name="enRes" value={resultStr}/>
                    </div>

                </div>
            </div>
        )
}