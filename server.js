const dotenv = require('dotenv');
const app = require('./app');
const connectDB = require('./db/db');


dotenv.config({ path: "config.env" });

connectDB();
const PORT = process.env.PORT 
app.listen(PORT, ()=>{
    console.log(`server run on port ${PORT}`)
})