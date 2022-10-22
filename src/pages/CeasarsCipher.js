import React, {useState} from 'react'
import 'bootstrap'
import "../css/MainCipherBlock.css"
import "../css/EnDe.css"

import {Header} from "../components/Header";
import {Button} from "../components/Button";
import {InputData} from "../components/InputData";

import {Link} from "react-router-dom"
import {EncriptionCeasar, DecriptionCeasar} from "../js/CaesarsAlgorithm";

export const CeasarsCipher = () =>{
    const [form, setForm] = useState({
        enString: '', enCoef: '', deString: ''
    })

    const [resultStr, setResultStr] = useState('')
    const [checkedBox1, setChecked1] = useState(false)
    const [checkedBox2, setChecked2] = useState(false)

    const [resultStrDe, setResultStrDe] = useState([])
    const [checkedBox3, setChecked3] = useState(false)
    const [checkedBox4, setChecked4] = useState(false)

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const changeCheckbox1 = async ()=>{
        setChecked1(!checkedBox1)
    }
    const changeCheckbox2 = async ()=>{
        setChecked2(!checkedBox2)
    }
    const changeCheckbox3 = async ()=>{
        setChecked3(!checkedBox3)
    }
    const changeCheckbox4 = async ()=>{
        setChecked4(!checkedBox4)
    }

    const ButEncription = async () =>{
        let codeAlf = 0;
        if ((checkedBox1===true) &&(checkedBox2===true)){
            codeAlf = 3;
        }else if(checkedBox1 ===true){
            codeAlf = 1
        }else if(checkedBox2 ===true){
            codeAlf = 2
        }
        console.log(codeAlf)

        let enStr = form.enString.toUpperCase()
        let coef = Number(form.enCoef)

        let res = EncriptionCeasar(enStr, coef, codeAlf)
        console.log("Результат: ", res);
        setResultStr(res)
    }

    const ButDescription = async ()=>{
        let arres = Object.assign([], resultStrDe)
        arres.length=0
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

        let FullAlph =new Array()
        if ((checkedBox3===true) &&(checkedBox3===true)){
            FullAlph = Alph3.slice()
        }else if(checkedBox3 ===true){
            FullAlph = Alph1.slice()
        }else if(checkedBox4 ===true){
            FullAlph = Alph2.slice()
        }else {
            FullAlph = Alph0.slice()
        }
        console.log(FullAlph)

        let deStr = form.deString.toUpperCase()

        for (let i=0; i<FullAlph.length; i++){
            let resStr = new Array()

            //Сдвиг алфавита
            let coef = i
            let copyAlf = FullAlph.slice()
            for (let j=0;j<=i;j++){
                let buf = copyAlf[FullAlph.length-1]
                copyAlf.pop()
                copyAlf.unshift(buf)
            }


            //Расшифровка
            for(let j=0; j<deStr.length; j++){
                if(deStr.charAt(j)===' '){
                    resStr.push(' ')
                }else{
                    resStr.push(FullAlph[copyAlf.indexOf(deStr.charAt(j))])
                }
            }

            //console.log("Результат: i =", i," ", resStr);
            resStr.push(' ')
            let res = resStr.join("")

            arres.push(res)

            setResultStrDe(arres)
        }
        console.log("Результат: ", resultStrDe);

    }

    return (
        <div >
            <Header name="Цезаря"/>
            <div className="row">
                <div className="encription col-xs-6">
                    <InputData labelText="Введите строку для шифрования" nameInput="enString"
                               idInput="enInpStr" onChangeFunction={changeHandler}/>
                    <InputData labelText="Введите коэффициент шифрования" nameInput="enCoef"
                               idInput="enCoef" onChangeFunction={changeHandler}/>

                    <div id = "enCheck">
                        <div>
                            <input className="form-check-input me-1" type="checkbox" onChange={changeCheckbox1}/>
                            <span>Исключить 'Ё'</span>
                        </div>
                        <div>
                            <input className="form-check-input me-1" type="checkbox" onChange={changeCheckbox2}/>
                            <span>Исключить 'Й'</span>
                        </div>
                    </div>

                    <Button nameBtn = "Зашифровать" onClickFunction = {ButEncription}/>

                    <div id = "enRes">
                        <label className="form-label">Результат шифрования</label>
                        <input type="text" className="form-control" name = "enRes" value={resultStr}/>
                    </div>
                </div>

                <div className="decription col-xs-6">
                    <InputData labelText="Введите строку для расшифровки" nameInput="deString"
                               idInput="deInpStr" onChangeFunction={changeHandler}/>

                    <div id = "deCheck">
                        <div>
                            <input className="form-check-input me-1" type="checkbox" onChange={changeCheckbox3}/>
                            <span>Исключить 'Ё'</span>
                        </div>
                        <div>
                            <input className="form-check-input me-1" type="checkbox" onChange={changeCheckbox4}/>
                            <span>Исключить 'Й'</span>
                        </div>
                    </div>

                    <Button nameBtn = "Расшифровать" onClickFunction = {ButDescription}/>
                    <div id = "deRes">
                        <label className="form-label">Варианты расшифровки</label>
                        <p>{resultStrDe}</p>
                    </div>
                </div>
            </div>

        </div>
    )

}

