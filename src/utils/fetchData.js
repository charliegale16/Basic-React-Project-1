export const exerciseOptions = {
    method: 'GET',
    params: {limit: 20},
    headers: {
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      'X-RapidAPI-Key': '060b838568msh16d82375f2fa8c3p18f2acjsn962ce50076aa'
    }
  };
  

export const fetchData = async (url,options) => {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}