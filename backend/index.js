const express = require('express');
const { createTodo, updateTodo } = require("./types.js");
const { todo } = require('./db.js');
const cors = require("cors");
require("dotenv").config();

const app = express();


const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/todos', async (req, res) => {
    const todos = await todo.find();
    // console.log(todos);
    res.json({ todos });
})

app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
        return res.status(400).json({
            msg: "You sent the wrong inputs"
        });
    }
    // put in mongoDB

    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    });

    res.json({
        msg: "Todo Created"
    })
})

app.put('/completed', async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        return res.status(400).json({
            msg: "You sent the wrong inputs"
        });
    }
    await todo.updateOne({
        _id: req.body._id
    }, {
        completed: true
    })

    res.json({
        msg: "Todo Marked as completed"
    })
});

app.delete('/delete', async (req, res) => {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        return res.status(400).json({
            msg: "You sent the wrong inputs"
        });
    }
    const toDelete = await todo.findById({
        _id: req.body._id
    })

    await todo.deleteOne(toDelete);

    res.json({
        msg: "Todo Deleted"
    })
});

app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
})