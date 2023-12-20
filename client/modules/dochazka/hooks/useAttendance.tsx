import { useState } from 'react';
import axios from 'axios'; // or use fetch

const useAttendance = () => {
  const [data, setData] = useState(null);

  const formatData = (rawData: any) => {
    // Format rawData here
    const formattedData = rawData; // replace this with actual formatting logic
    setData(formattedData);
  };

  const sendData = async () => {
    if (!data) return;
    try {
      const response = await axios.post('http://your-api-url.com', data); // replace with your API URL
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return { formatData, sendData };
};

export default useAttendance;