import axios from "axios";

const API_KEY = "uYetCHN5SYBMH788ybSBRrnDgSo8aTe3vKQQ3EYYIqqWX7TkRXA8k2obhvf5rp5oku7Jgmgz9lgLEuT%2FMnUNiA%3D%3D";
const CORS_BRIDGED = "https://cors.bridged.cc/"

export const getCovid19InfStateJson = async()=>{
    console.log("전체 현황 axios get")
    const url = `${CORS_BRIDGED}http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=20200315&endCreateDt=20200315`
    try{
        const res = await axios.get(url);
        const data = await res.json();
        console.log(data);
    }catch(e){
        console.error(e);
    }
}

export const getCovid19SidoInfStateJson = async()=>{
    console.log("시도별 현황 axios get")
    const url = `${CORS_BRIDGED}http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=20200410&endCreateDt=20200411`
    try{
        const res = await axios.get(url);
        console.log(res);
    }catch(e){
        console.error(e);
    }
}

export const getCovid19VaccineCenter = async()=>{
    console.log("예방접종 센터 getCovid19VaccineCenter")
    const url = `${CORS_BRIDGED}https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=284&serviceKey=${API_KEY}`
    try{
        const res = await axios.get(url);
        return res.data.data;
    }catch(e){
        console.error(e);
    }
}