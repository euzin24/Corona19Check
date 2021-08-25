import axios from "axios";

const API_KEY = "uYetCHN5SYBMH788ybSBRrnDgSo8aTe3vKQQ3EYYIqqWX7TkRXA8k2obhvf5rp5oku7Jgmgz9lgLEuT%2FMnUNiA%3D%3D";
const CORS_BRIDGED = "https://cors.bridged.cc/"
const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/"

export const getCovid19InfStateJson = async(date)=>{
    // 유효데이터 2020 01 31
    console.log("전체 현황 axios get")
    const today = "" + date.getFullYear()
                     + ("0" + (1 + date.getMonth())).slice(-2)
                     + ("0" + date.getDate()).slice(-2)
    const url = `${CORS_BRIDGED}http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${today}&endCreateDt=${today}`
    try{
        const res = await axios.get(url);
        return res.data.response.body.items.item
    }catch(e){
        console.error(e);
    }
}

export const getCovid19SidoInfStateJson = async(st, ed)=>{
    console.log("시도별 현황 axios get")
    const stDate = "" + st.getFullYear()
                      + ("0" + (1 + st.getMonth())).slice(-2)
                      + ("0" + st.getDate()).slice(-2)
    const edDate = "" + ed.getFullYear()
                      + ("0" + (1 + ed.getMonth())).slice(-2)
                      + ("0" + ed.getDate()).slice(-2)
    console.log(stDate, edDate)
    const url = `${CORS_BRIDGED}http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&startCreateDt=${stDate}&endCreateDt=${edDate}`
    try{
        const res = await axios.get(url);
        return res.data.response.body.items.item
    }catch(e){
        console.error(e);
    }
}

export const getCovid19VaccineCenter = async()=>{
    console.log("예방접종 센터 getCovid19VaccineCenter")
    const url = `${CORS_BRIDGED}https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=284&serviceKey=${API_KEY}`
    try{
        const res = await axios.get(url);
        console.log(res)
        return res.data.data;
    }catch(e){
        console.error(e);
    }
}