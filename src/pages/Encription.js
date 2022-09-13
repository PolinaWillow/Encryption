import React, {useState} from 'react'
import 'bootstrap'
import "../css/EnDe.css"
import {HeaderEn} from "../components/HeaderEn"

export const Encription = () =>{
    const [form, setForm] = useState({
        enString: '', enCoef: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const [resultStr, setResultStr] = useState('')
    const [checkedBox1, setChecked1] = useState(false)
    const [checkedBox2, setChecked2] = useState(false)

    const changeCheckbox1 = async ()=>{
        setChecked1(!checkedBox1)
    }
    const changeCheckbox2 = async ()=>{
        setChecked2(!checkedBox2)
    }

    const ButEncription = async () =>{
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

        let enStr = form.enString.toUpperCase()
        let coef = Number(form.enCoef)

        //Сдвиг алфавита
        let copyAlf = FullAlph.slice()
        let i = 0;
        while ((i + coef) < (copyAlf.length)) {
            let buff = copyAlf[i];
            copyAlf[i] = copyAlf[i + coef];
            copyAlf[i + coef] = buff;
            i++;
        }

        //Шифровка
        let resStr = new Array()
        for(let j=0; j<enStr.length; j++){
            if(enStr.charAt(j)===' '){
                resStr.push(' ')
            }else{
                resStr.push(copyAlf[FullAlph.indexOf(enStr.charAt(j))])
            }
        }

        let res = resStr.join("")
        console.log("Результат: ", res);
        setResultStr(res)
    }

 return(
     <div>
         <HeaderEn/>
         <div className="EnDeBody">
             <div id = "enString">
                 <label className="form-label">Введите строку для шифрования</label>
                 <input type="text" className="form-control" name = "enString" id="enInpStr" onChange={changeHandler}/>
             </div>
             <div id = "enCoef">
                 <label className="form-label">Введите коэффициент шифрования</label>
                 <input type="text" className="form-control" name = "enCoef"  onChange={changeHandler}/>
             </div>
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
             <div className="EnDeButton">
                 <button type="button" className ="btn btn-light" onClick={ButEncription}>Зашифровать</button>
             </div>
             <div id = "enRes">
                 <label className="form-label">Результат шифрования</label>
                 <input type="text" className="form-control" name = "enRes" value={resultStr}/>
             </div>

         </div>
     </div>
 )
}