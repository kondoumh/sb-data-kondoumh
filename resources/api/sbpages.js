exports.handler = async (e) => {

  const project = e.headers.project
  if (!project) {
    return {
      statusCode: 400,
      body: JSON.stringify({error: "Project name is required!"}),
    };
  }

  const skip = e.headers.skip ? e.headers.skip : 0;
  const limit = e.headers.limit ? e.headers.limit : 100;
  const sortBy = e.headers.sortby ? e.headers.sortby : "updated";

  const fetch = require("node-fetch").default;
  const url = `https://scrapbox.io/api/pages/${project}?skip=${skip}&limit=${limit}&sort=${sortBy}`;
  const res = await fetch(url);
  const data = await res.json();
  data.timestamp = Date.now();
  if (res.status !== 200) {
    return {
      statusCode: res.status,
      body: JSON.stringify(data),
    }
  }
  console.log(data.projectName + " : " + data.count);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
