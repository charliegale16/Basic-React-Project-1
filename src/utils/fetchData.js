export const exerciseOptions = {
    method: 'GET',
    params: {limit: '1000'},
    headers: {
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
      'X-RapidAPI-Key': 'ab75eb293bmsha6fe53de6100465p1c734ajsn15a4df560bfd'
    }
  };
  

export const fetchData = async (url,options) => {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}