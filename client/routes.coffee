Pather = require('pather')

path = new Pather()

path.on '/', ->
  require("./index_page.coffee")
