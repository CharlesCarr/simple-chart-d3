import { useEffect, useState } from "react";

export interface Cd {
  borough: string;
  cd_number: string;
  cd_name: string;
  _1970_population: string;
  _1980_population: string;
  _1990_population: string;
  _2000_population: string;
  _2010_population: string;
}

const useFetchData = () => {
  const [data, setData] = useState<Cd[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const URL = "https://data.cityofnewyork.us/resource/xi7c-iiu2.json";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);

        if (!response.ok) {
          const message = `${response.status} ${response.statusText}`;
          throw new Error(message);
        }

        const data = await response.json();
        console.log(data);
        setData(data);
        setLoading(false);
      } catch (err: any) {
        // only network errors (so throw error from above check)
        console.error(err);
        setError(`An error has occurred - ${err}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
