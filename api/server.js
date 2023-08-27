const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
 
const app = express();
app.use(express.json());
app.use(cors());
async function startServer() {
try{
    await mongoose.connect("mongodb+srv://<username>:<password>@cluster0.o0jf83i.mongodb.net/?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
});
app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
} catch (error) {
  console.error('Error connecting to the database:', error);
}
}
startServer();

// try {
//     mongoose.connect("mongodb+srv://sreeragv9539:QKj1r51HexWfzyBs@cluster0.o0jf83i.mongodb.net/?retryWrites=true&w=majority");
//     console.log("DB connected");
// } catch(err){
//     console.log("DB connection Failed");
// }

   

const Todo = require('./models/Todo');
app.get('/todos', async(req,res)=>{
    const todos = await Todo.find();
    res.json(todos);
});
app.post('/todo/new',(req,res)=>{
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();
    res.json(todo);
});

app.delete('/todo/delete/:id', async(req,res) =>{
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
});

app.get('/todo/complete/:id',async(req,res)=>{
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);

});

app.get("/", (req,res)=>{
    res.send("Hello");
});

