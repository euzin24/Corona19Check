import { Line } from 'react-chartjs-2';

const BarChart = ({data, selectedSido})=>{
  const value = []
  const date = []

  for(let i in data){
    if(data[i].gubun===selectedSido){
      value.push(data[i].defCnt);
      date.push(data[i].createDt.slice(5, 10))
    }
  }

  const dataEx = {
    labels: date, //x축
    datasets: [
      {
        label: `${selectedSido}의 확진자 수`,
        data: value, //value
        lineTension: 0,
        backgroundColor: "rgba(0, 128, 255, 0.1)",
        borderWidth: 1,
        borderColor: "#0080FF",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: true,
      mode: "nearest",
      position: "average",
      intersect: false,
    }
  };

  const legend = {
    display: true,
    labels: {
      fontColor: "black",
    },
    position: "top"
  };

  return (
    <>
      <Line height="300px" data={dataEx} options={options} legend={legend}></Line>
    </>
  )
}

export default BarChart;