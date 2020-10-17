var express = require("express")
var Sequelize = require("sequelize")

//connect to mysql database
//baza de date, username, password
var sequelize = new Sequelize('restaurant', 'alexandracirnaru', '1234', {
    dialect:'mysql',
    host:'127.0.0.1'
})

sequelize.authenticate().then(function(){
    console.log('Success')
}).catch( function(err) {
    console.log(err)
})

//define a new Model
var Categories = sequelize.define('categories', {
    name: Sequelize.STRING,
    description: Sequelize.STRING
})

var Food = sequelize.define('food', {
    category_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.INTEGER,
    image: Sequelize.STRING,
    isMenuOfTheDay: Sequelize.BOOLEAN
})



var ShoppingCartItems= sequelize.define('shoppingCartItems', {
    food_id: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    shoppingCartId: Sequelize.INTEGER
})

Food.belongsTo(Categories, {foreignKey: 'category_id', targetKey: 'id'})

/*ShoppingCartItems.hasMany(Food, {foreignKey: 'food_id'}); */

var app = express()

//access static files
app.use(express.static('public'))
app.use('/admin', express.static('admin'))

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/createdb', (request, response) => {
    sequelize.sync({force: true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        response.status(500).send('could not create tables')
    })
})

app.get('/createdata', (req, res) => {
    //TODO add some test data here
})

async function getCategories(request, response) {
    try {
        let categories = await Categories.findAll();
        response.status(200).json(categories)
    } catch(err) {
        response.status(500).send('something bad happened')
    }
}

async function getFood(request, response) {
    try {
        let food = await Food.findAll();
        response.status(200).json(food)
    } catch(err) {
        response.status(500).send('something bad happened')
    }
}

/*async function getOrders(request, response) {
    try {
        let orders = await Orders.findAll();
        response.status(200).json(orders)
    } catch(err) {
        response.status(500).send('something bad happened')
    }
} */

// get a list of categories
app.get('/categories', getCategories)

// get one category by id
app.get('/categories/:id', function(request, response) {
    Categories.findOne({where: {id:request.params.id}}).then(function(category) {
        if(category) {
            response.status(200).send(category)
        } else {
            response.status(404).send()
        }
    })
})

//create a new category
app.post('/categories', function(request, response) {
    Categories.create(request.body).then(function(category) {
        response.status(201).send(category)
    })
})

app.put('/categories/:id', function(request, response) {
    Categories.findByPk(request.params.id).then(function(category) {
        if(category) {
            category.update(request.body).then(function(category){
                response.status(201).send(category)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/categories/:id', function(request, response) {
    Categories.findByPk(request.params.id).then(function(category) {
        if(category) {
            category.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/food', function(request, response) {
    Food.findAll(
        {
            include: [{
                model: Categories,
                where: { id: Sequelize.col('food.category_id') }
            }]
        }
        
        ).then(
            function(products) {
                response.status(200).send(products)
            }
        )
}) 

//app.get('/food', getFood)

app.get('/food/:id', function(request, response) {
    Food.findByPk(request.params.id, {
            include: [{
                model: Categories,
                where: { id: Sequelize.col('food.category_id') }
            }]
        }).then(
            function(product) {
                response.status(200).send(product)
            }
        )
}) 

app.post('/food', function(request, response) {
    Food.create(request.body).then(function(product) {
        response.status(201).send(product)
    })
})

app.put('/food/:id', function(request, response) {
    Food.findByPk(request.params.id).then(function(product) {
        if(product) {
            product.update(request.body).then(function(product){
                response.status(201).send(product)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/food/:id', function(request, response) {
    Food.findByPk(request.params.id).then(function(product) {
        if(product) {
            product.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/categories/:id/food', function(request, response) {
    Food.findAll({
            where:{category_id: request.params.id},
            
            include: [{
                model: Categories,
                where: { id: Sequelize.col('food.category_id') }
            }]
        }
            ).then(
            function(products) {
                response.status(200).send(products)
            }
        )
})


app.get('/reviews', function(request, response) {

})

app.get('/reviews/:id', function(request, response) {
    
})

app.post('/reviews', function(request, response) {

})

app.put('/reviews/:id', function(request, response) {
    
})

app.delete('/reviews/:id', function(request, response) {
    
})

app.listen(8080)
