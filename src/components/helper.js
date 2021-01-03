function formatDate(timestamp, adjust = true) {
  let date = new Date()
  if (adjust) {
    date.setTime(timestamp * 1000)
  } else {
    date.setTime(timestamp)
  }
  const params = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false
  }
  return date.toLocaleString(navigator.language, params)
}

async function fetchPageInfo(project, title) {
  this.pageTitle = title
  const res = await fetch('/.netlify/functions/pageInfo', {
    headers: {
      'project': project,
      'title': encodeURIComponent(this.pageTitle)
    }
  })
  const info = await res.json()
  return info
}

export default { formatDate, fetchPageInfo }
