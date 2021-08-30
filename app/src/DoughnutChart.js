import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = () => {
  const data = {
    labels: ["서울", "제주", "경남"],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  const options={
    responsive: false,
    radius: "200",
    showDataLables: true
  }
  
  const legend={
    display: true,
    labels: {fontColor: "black"},
    position: "chartArea"
  }

  return(
    <div>
      <Doughnut height="500px" width="500px" data={data} options={options} legend={legend}/>
    </div>
  )
}



export default DoughnutChart;