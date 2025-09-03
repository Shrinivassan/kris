import app from './src/app.js'
import connectdb from './src/config/db.config.js';

connectdb();

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
