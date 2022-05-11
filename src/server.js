const app = require('./app')

require('./mock/db')

app.listen(process.env.PORT || 3000, () => {
  console.log("App is running 🚀")
})