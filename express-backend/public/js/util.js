const { marked } = require('marked');

const handleArticleList = function(articleList) {
  const list = articleList.slice()
  const listLen = list.length

  for (let i = 0; i < listLen; i++) {
    const content = list[i].content.toString()
    const number = content.length
    const time = Math.floor(number / 150)
    const date = list[i].date
    const dateStr = date.toLocaleDateString().replace('/', '-').replace('/', '-')
    
    list[i].readTime = `${number} 字约 ${time} 分钟`
    list[i].date = dateStr
    list[i].content = content
  }

  return list
}

const handleArticle = function(article) {
  const content = article.content.toString()
  const number = article.content.length
  const time = Math.floor(number / 150)
  const date = article.date
  const dateStr = date.toLocaleDateString().replace('/', '-').replace('/', '-')
  
  article.readTime = `${number} 字约 ${time} 分钟`
  article.date = dateStr
  article.content = marked.parse(content)

  return article
}

const handleArchivesList = function(articleList) {
  const list = articleList.slice()
  const map = new Map()
  const listLen = list.length

  for (let i = 0; i < listLen; i++) {
    const year = list[i].date.getFullYear()
    const content = list[i].content.toString()
    const number = content.length
    const time = Math.floor(number / 150)
    const date = list[i].date
    const dateStr = date.toLocaleDateString().replace('/', '-').replace('/', '-')
    
    list[i].content = content
    list[i].readTime = `${number} 字约 ${time} 分钟`
    list[i].date = dateStr

    if(map.has(year)) {
      map.get(year).push(list[i])
    } else {
      map.set(year, [list[i]])
    }

  }

  return map
}

module.exports = {
  handleArticleList,
  handleArticle,
  handleArchivesList
}