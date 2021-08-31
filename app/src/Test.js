import { useEffect } from "react"

const Test = ()=>{

  useEffect(()=>{
    const $ = document.querySelector('body')
    const script = document.createElement('script')
    script.src = "./toggle.js"
    $.appendChild(script)
  }, [])

  return(
    <>
      <div>
        <button className="btn-show">메뉴 펼치기</button>
        <button className="btn-hide">메뉴 접기</button>
      </div>
      <div className="description">
        sdkljsaldkjasdj
      </div>
    </>
  )
}

export default Test