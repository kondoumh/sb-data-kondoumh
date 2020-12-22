exports.handler = async (e) => {

  const project = e.headers.project
  if (!project) {
    return {
      statusCode: 400,
      body: JSON.stringify({error: "Project name is required!"}),
    };
  }
  const title = e.headers.title
  if (!title) {
    return {
      statusCode: 400,
      body: JSON.stringify({error: "Page title is required!"}),
    };
  }

  const fetch = require("node-fetch").default;
  const url = `https://scrapbox.io/api/pages/${project}/${title}`;
  const res = await fetch(url);
  const data = await res.json();
  if (res.status !== 200) {
    return {
      statusCode: res.status,
      body: JSON.stringify(data),
    }
  }
  let pageInfo = {}
  pageInfo.title = data.title;
  pageInfo.user = data.user.displayName;
  pageInfo.image = data.image;
  pageInfo.descriptions = data.descriptions;
  pageInfo.views = data.views;
  pageInfo.linked = data.linked;
  pageInfo.collaborators = data.collaborators.map(c => c.displayName);
  return {
    statusCode: 200,
    body: JSON.stringify(pageInfo),
  };
};
