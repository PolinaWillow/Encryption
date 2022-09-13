import React, {useState} from 'react'
import 'bootstrap'
import "../css/EnDe.css"
import {HeaderDe} from "../components/HeaderDe";

export const Decription = () =>{
    const [form, setForm] = useState({
        deString: ''
    })
    const [resultStr, setResultStr] = useState([])
    const [checkedBox1, setChecked1] = useState(false)
    const [checkedBox2, setChecked2] = useState(false)

    const changeCheckbox1 = async ()=>{
        setChecked1(!checkedBox1)
    }
    const changeCheckbox2 = async ()=>{
        setChecked2(!checkedBox2)
    }

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const ButDecription =() =>{
        let arres = Object.assign([], resultStr)
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
        if ((checkedBox1===true) &&(checkedBox2===true)){
            FullAlph = Alph3.slice()
        }else if(checkedBox1 ===true){
            FullAlph = Alph1.slice()
        }else if(checkedBox2 ===true){
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

            setResultStr(arres)
        }
        console.log("Результат: ", resultStr);

    }

    return(
        <div>
            <HeaderDe/>
            <div className="EnDeBody">
                <div id = "deString">
                    <label className="form-label">Введите строку для расшифровки</label>
                    <input type="text" className="form-control" name = "deString" id="deInpStr" onChange={changeHandler}/>
                </div>
                <div id = "deCheck">
                    <div>
                        <input className="form-check-input me-1" type="checkbox" onChange={changeCheckbox1}/>
                        <span>Исключить 'Ё'</span>
                    </div>
                    <div>
                        <input className="form-check-input me-1" type="checkbox" onChange={changeCheckbox2}/>
                        <span>Исключить 'Й'</span>
                    </div>
                </div>
                <div className="EnDeButton">
                    <button type="button" className ="btn btn-light" onClick={ButDecription}>Расшифровать</button>
                </div>
                <div id = "deRes">
                    <label className="form-label">Варианты расшифровки</label>
                    <input type="text" className="form-control" name = "enRes" value={resultStr}/>
                </div>

            </div>
        </div>
    )
}