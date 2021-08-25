import { getCovid19InfStateJson } from "./api";
import { useEffect, useState } from "react";
const Test = () => {
  console.log("test renders")

  // let a = [];
  const [a, setA] = useState([])
  const [isLoading, setIsLoading] = useState(0)

  const getDataPromsise = () => {
    return new Promise ((resolve, reject) => {
      setTimeout(() => {
        resolve(["바나나", "사과", "파인애플"]);
      }, 1000);
    });
  }
    
  useEffect(()=>{
    console.log("useEffect")
    const setData = async ()=>{
      setIsLoading(1)
      
      const data = await getDataPromsise()
      setA(data)
      console.log(a)
      setIsLoading(0)
    }

    setData();
  }, [])

  return (
    <div>
      {isLoading ? 
      (
        <div>loading...</div>
      ) : (
        <ul>
          {a.map((val, idx)=><li key={idx}>{val}</li>)}
        </ul>
      )}
    </div>
  );
}

export default Test