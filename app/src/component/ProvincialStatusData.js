import { useEffect } from "react";

export default function ProvincialStatusData(props) {
  useEffect(()=>{
    console.log("provincialStatusData renders")
    console.log("useEffect : isLoading changed to", props.isLoading);
  }, [props.isLoading])
  return (
    <>
      Hello World
    </>
  );
}