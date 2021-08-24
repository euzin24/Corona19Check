import { useEffect } from "react";

export default function ProvincialStatusData(props) {
  console.log("시도별현황데이터리스트 renders")

  useEffect(()=>{
    console.log("시도별현황데이터리스트 useEffect")
    console.log("useEffect : isLoading changed to", props.isLoading);
  }, [props.isLoading])
  return (
    <>
      Hello World
    </>
  );
}