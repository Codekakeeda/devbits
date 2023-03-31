import { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom'
import './StockDetails.css'
import CommonChart from '../../common/chart'
// import api_response from '../../../assets/roughWorkFile';

const StockDetails = () => {
  const { id, region } = useParams();



  const [Api_response, setApi_response] = useState({});

  useEffect(() => {
    async function fetchData() {
      const options = await {
        method: 'GET',
        url: `https://yahoo-finance15.p.rapidapi.com/api/yahoo/hi/history/${id}/1mo`,
        params: { diffandsplits: 'false' },
        headers: {
          'X-RapidAPI-Key': '418a344566msh634f86481759a5cp1020d5jsnf06707c3ceba',
          'X-RapidAPI-Host': 'yahoo-finance15.p.rapidapi.com'
        }
      };
      const data = await axios.request(options).then(function (response) {
        console.log(response.data);
        return (response.data);
      }).catch(function (error) {
        console.error(error);
      });
      setApi_response(data);
    }

    fetchData();
  }, []);






  return (
    <div className='max-width stock-details'>
      <h1>{id}</h1>

      <div className='chart-wrapper'>
        <CommonChart api_response={Api_response} />
      </div>
    </div>
  )
}

export default StockDetails
