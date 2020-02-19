const express = require("express");
var bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();

// This tells Express to set Handlebars as our template engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');



app.use(express.static("public"));

// parse application/x-www-form-urlencode
app.use(bodyParser.urlencoded({ extended: false}))


app.get("/",(req,res)=>{

    //This loads the index handlebars (Home view) and inject
    res. render("index",{
        title:"Home Page"
    });

    
})

//This 
app.get("/contact-us",(req,res)=>{


    res. render("contactus",{
        title:"Home Page"
    });

    
})

//This route handles the data after the form is submitted
app.post("/contact-us",(req,res)=>{

    const errorMessages =[];

    if(req.body.firstName == "")
    {
        errorMessages.push("PLEASE ENTER A FIRST NAME!!!");
    }

    if(req.body.lastName=="")
    {
        errorMessages.push("ENTER A LAST NAME");
    }

    if(req.body.message=="")
    {
        errorMessages.push("You did not enter a message!!!");
    }

    // There is an error
    if(errorMessages.length > 0)
    {
        res.render("contactus",{
            title:"Contact Us Page",
            messages: errorMessages,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            message: req.body.message
        })
    }

    // There is no error
    else{
        //Welcom, person first name  person lastname, we will contact you shortly!!
        res.render("contactus", {
            title: "Contact Us page",
            message: `Welcom ${req.body.firstName} ${req.body.lastName}`
        })
    }

})


const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Web Server is up and running`);
})