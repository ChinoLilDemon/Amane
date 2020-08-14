import fs = require('fs');
import * as db from './db-handler';

db.insertPrefix("2", ">").then(()=>{
    db.findPrefix("2").then(v=>{
        console.log(v.prefix);
        db.removePrefix("2").catch(console.log);

        db.findPrefix("2").then(v => {
            if(v){
                console.log(v.prefix);
                db.removePrefix("2").catch(console.log);
            }
        }).catch(console.log);
    }).catch(console.log);
}).catch(console.log);