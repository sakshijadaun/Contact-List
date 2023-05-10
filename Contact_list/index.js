//const mongoDB = "mongodb://127.0.0.1:27017/Contact_list
const express=require('express');
const path=require('path');
const port=3000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname , 'views'));
app.use(express.urlencoded());
app.use(express.static('assest'));

//MiddleWare
/*app.use(function(req,res,next){
    req.name="Sakshi";
    //console.log('middleware 1 called');
    next();
});

//Middleware2
app.use(function(req,res,next){
     console.log("Called from Middleware1:", req.name);
    //console.log("Middleware 2 called");
    next();
})*/

var contactList = [
    {
        name: "Arpan",
        phone: "11111111"
    },
    {
        name: "Tony Stark",
        phone: "000000000"
    },
    {
        name: "James leo",
        phone: "999999999"
    }
]

app.get('/', function(req,res){
    //console.log(__dirname);
    //res.send("<h1>Cool! It is running</h1>");
   
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in Fetching Elements');
            return;
        }
        return res.render('home',{
            title:"My Contact List",
            contact_list: contacts
    });
   
    });
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title:"Let play with ejs"
    });
});

app.post('/create-contact',function(req,res){
    //return res.redirect('/practice');
    //console.log(req.body)
    //contactList.push({
        //name:req.body.name,
        //phone:req.body.phone
    //});
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }
        console.log('********',newContact);
        return res.redirect('back');
    });
    //return res.redirect('/');
});


app.get('/delete-contact/',function(req,res){
    //console.log(req.query);
    //Get the id from query in URL
    let id=req.query.id;
    //Find the Contact in the database and delete the contact using the Id
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('There is an error to delete the contact');
            return;
        }
    
    
    //let contactIndex=contactList.findIndex(contact => contact.phone == phone);
    //if(contactIndex != 1){
        //contactList.splice(contactIndex,1);
    //}
    return res.redirect('back');
  });

});


app.listen(port, function(err){
    if(err){
        console.log('Error in running the server',err);
    }
    console.log('yup! My server is running',port);
});