const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'productdatabase'
});

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extender: true}));


app.get('/api/get', (req,res)=>{
    const sqlSelect = "SELECT * from products";
    db.query(sqlSelect, (err, result)=>{
        //console.log(result)
        res.send(result);
    });
});

app.get('/api/report', (req,res)=>{
    const sqlSelect = "SELECT p.productName,s.soldProductQuantity from products p, soldproducts s where p.id = s.soldProductID";
    db.query(sqlSelect, (err, result)=>{
        //console.log(result)
        res.send(result);
    });
});


app.post('/api/insert', (req, res)=>{
    const productName = req.body.productName
    const productPrice = req.body.productPrice
    const sqlInsert = "INSERT INTO products(productName, productPrice) VALUES (?,?)";
    db.query(sqlInsert, [productName, productPrice], (err, result)=>{
        console.log(result)
    });
});

app.post('/api/sold', (req, res)=>{
    const productName = req.body.val
    //console.log(productName)
    let exist = false

    const sqlSelect = "SELECT * from soldproducts";
    db.query(sqlSelect, (err, result)=>{
        result.map((item)=>{
            if(productName == item.soldProductID){
                exist = true
            }
        })

        if(exist == true){
            sqlUpdate = "UPDATE soldproducts SET soldProductQuantity = soldProductQuantity + 1 where soldProductID = ?"
            db.query(sqlUpdate, productName, (err, result)=>{
                //console.log(err)
            });
        }

        if(exist==false){
            const sqlInsert = "INSERT INTO soldproducts(soldProductID) VALUES (?)";
            db.query(sqlInsert, productName, (err, result)=>{
                //console.log(err)
            });
        }
    });
    
});


app.delete('/api/delete/:id', (req, res)=>{
    const id = req.params.id
    const sqlDelete = "DELETE FROM products WHERE id = ?"
    db.query(sqlDelete, id, (err, result)=>{
        //console.log(err)
    });
    
})


app.put('/api/update', (req, res)=>{
    const id = req.body.id
    const name = req.body.productName
    const price = req.body.productPrice
    const sqlUpdate = "UPDATE products SET productName = ?,productPrice =? WHERE id = ?"
    db.query(sqlUpdate, [name, price, id], (err, result)=>{
        //console.log(err)
    });
    
})


app.listen(3001, () => {
    console.log('Running on 3001');
});