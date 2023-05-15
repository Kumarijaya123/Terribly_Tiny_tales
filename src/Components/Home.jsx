import React,{useState} from 'react'
import axios from 'axios'
import './Style/home.css'
import List from './List';

export default function Home() {
    const [list,setList]=useState([]);
    const [csv,setMycsv]=useState("Word,Frequency\n");



    //Function To Download the Csv File
    
    //Function To Count the Words And There Frequency
    const getdata=(str,map)=>{

        console.log('called')
        let length=str.length;
        console.log(length)
        let i=0;
        let word="";
        while(i<length){
            if(str[i]===' ' || str[i]==='.' || str[i]==='\n' || str[i]==='(' || str[i]===')' || str[i]==='?'){
                if(word===''){
                    i++
                    continue
                }
                if(!map.has(word)){
                    map.set(word,0);
                }
                map.set(word,map.get(word)+1);
                word="";
            }
            else{
                word+=str[i]
            }
            i++;
        }
        if(!map.has(word)){
            map.set(word,0);
        }
        map.set(word,map.get(word)+1);
        word="";

        let map2=new Map([...map.entries()].sort((a,b)=>b[1]-a[1]))
        return map2
        
}


    const handleData=()=>{
        axios.get('https://www.terriblytinytales.com/test.txt').then((response)=>{
          let map=new Map();
          return Array.from(getdata(response.data,map)).slice(0,20)
        }).then((response=>{
          console.log(response)
          const lists=[];
          lists.push(
            <li>
              <List word={'Words'} frequency={'Frequency Of Words'} heading={true} bg={true}/>
            </li>
          )
          response.forEach(data=>{
            lists.push(
              <li>
                 <List word={data[0]} frequency={data[1]} heading={false} bg={false}/>
              </li>
            );setMycsv(prevState=>{
              let val=data.join(',')
              val+='\n'
              return prevState+val;
            })
          })
          setList(lists)

        })).catch(err=>{
          console.log(err)
        })
    }


    const myDownload=()=>{
      var velemet=document.createElement('a');velemet.href='data:text/csv;charset=utf-8,' + encodeURI(csv);velemet.target='_blank';velemet.download='CSV File.csv';velemet.click()
    }

  return (
    <div className='home'>
        <div className="homeContainer">
            <button onClick={handleData}>Get CSV File</button>
            <button onClick={myDownload}>Download CSV File</button>
        </div>
        <div className='homeTable'>
          <ul style={{listStyle:'none'}}>
            {list}
          </ul>
        </div>
    </div>
  )
}
