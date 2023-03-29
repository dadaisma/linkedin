
export const apiWrapper = (url, method, body = {}, headers = {}) => {
  const URL_BACKEND = window.location.hostname === 'job-link.netlify.app' ? 'https://joblink.up.railway.app/' : 'http://localhost:3001/';
  const options = {
    method: method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    //,        body: method === "GET"?"": JSON.stringify(body),
  };

  //if (method === "POST" || method === "PATCH") options.body = JSON.stringify(body);
  if (body && JSON.stringify(body) !=="{}") options.body = JSON.stringify(body);
  
  return fetch(URL_BACKEND + url, options).then((response) => {
    //console.log("apiWrapper (body): " + JSON.stringify(body));
    //console.log("apiWrapper (status): " + response.status);
    //console.log("apiWrapper (url): " + url);

    if (response.status >= 200 && response.status < 400) {
      //console.log("apiWrapper response OK");
      return response.json();
    } else {
      //console.log("apiWrapper response Not OK");
      return Promise.reject();
    }
  });
};
