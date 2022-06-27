import React, { useState, useEffect } from "react";
import { IWeatherForecast } from "model/Weather";
import { getPublicContent } from "services/user.service";

const WeatherPublic: React.FC = () => {
  const [content, setContent] = useState<IWeatherForecast[]>([]);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    getPublicContent().then((response) => {
        setError(null)
        setContent(response.data);
      },
      (error) => {
        const errMsg =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent([]);
        setError(errMsg);
      }
    );
  }, []);


  const tableRows = ():JSX.Element[] => {
    return content.map((item,index) => {
         return <tr key={index}>
            <td>{item.Date.toDateString()}</td>
            <td>{item.TemperatureC}</td>
            <td>{item.Summary}</td>
        </tr>
    })
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>Public weather</h3>
        {error ? <h3 className="alert alert-danger">{error}</h3> : 
        <table>
            <thead></thead>
            <tbody>
                {tableRows()}
            </tbody>
        </table>
        }
      </header>
    </div>
  );
};
export default WeatherPublic;