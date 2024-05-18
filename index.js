// index.js
require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors')
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');


// local module
// const { getAllEmployeesRoute, createEmployeeRoute, getEmployeeByIdRoute, updateEmployeeRoute, deleteEmployeeRoute } = require('./routes/employeeRoutes');
const assetRoutes = require('./routes/assetRoutes');
const assetCategory = require('./routes/assetCategoryRoute');
const assetHistory = require('./routes/assetHistory');
const employeeRoutes=require('./routes/employeeRoutes')
// const view=require('./view/index.jade')


const sequelize = require('./config/db');

const app = express();
//set view engine
app.set("view engine","jade")
const PORT = process.env.PORT || 8000;
app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Define routes
app.get('/',(req,res)=>{
  res.render('employees/layout')
})
app.use('/employees', employeeRoutes);
// app.use('/assets', assetRoutes);
// app.use('/assetcategory', assetCategory);
// app.use('/assethistory', assetHistory);


// Sync database and start server
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
