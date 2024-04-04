const express = require("express");

const app = express();
const port = 8000;

var admin = require("firebase-admin");

var serviceAccount = require("./service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wddm-58f4d-default-rtdb.firebaseio.com",
});

var db = admin.firestore();

app.set("view engine", "ejs");
app.use(express.static("public"));
//This will allow to know what page we are currently on
app.use((req, res, next) => {
  app.locals.currentRoute = req.path;
  next();
});

const HTTP_PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static("public")); // Serve static files
// In-memory storage for messages
let messages = [];

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/messages", (req, res) => {
  const messagesRef = db.collection("messages");
  try {
    messagesRef.get().then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data);

      res.render("messages", {
        data, //: JSON.stringify(data),
      });
      //return res.status(201).json(data);
    });
  } catch (error) {
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
});

app.get("/send", (req, res) => {
  res.render("send");
});

app.post("/send", (req, res) => {
  const messagesRef = db.collection("messages");
  const { title, message, email } = req.body;
  try {
    messagesRef
      .add({
        title,
        message,
        user: email,
      })
      .then((snapshot) => {
        res.redirect("messages");
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ general: "Something went wrong, please try again" });
  }
});

app.get("/upload", function (req, res) {
  let someData = [
    {
      name: "Mark",
      age: 100,
      occupation: "professor",
      company: "Humber",
      visible: true,
    },
    {
      name: "Jerome",
      age: 100,
      occupation: "CEO",
      company: "Microsoft",
      visible: true,
    },
  ];
  res.render("upload", {
    data: someData,
  });
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/contact/", (req, res) => {
  res.render("contact");
});

app.get("/blog/", (req, res) => {
  res.render("blog");
});

app.get("/services/", (req, res) => {
  res.render("services");
});

app.get("/about-us", (req, res) => {
  res.render("about-us");
});

app.get("/finder", (req, res) => {
  res.render("finder");
});

// GET route to fetch all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});

// GET route to fetch a single message by ID
app.get("/messages/:id", (req, res) => {
  const { id } = req.params;
  const message = messages.find((m) => m.id === id);
  if (message) {
    res.json(message);
  } else {
    res.status(404).send("Message not found");
  }
});

// POST route to create a new message
app.post("/messages", (req, res) => {
  const { name, email, subject, message } = req.body;
  const newMessage = {
    id: Date.now().toString(), // simple unique ID generator
    name,
    email,
    subject,
    message,
  };
  messages.push(newMessage);
  res.status(201).send(newMessage);
});

// PUT route to update a message by ID
app.put("/messages/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, subject, message } = req.body;
  const index = messages.findIndex((m) => m.id === id);
  if (index !== -1) {
    messages[index] = { ...messages[index], name, email, subject, message };
    // Include a custom message in the response along with the updated message
    res.json({
      message: `Message with id ${id} was updated.`,
      updatedMessage: messages[index],
    });
  } else {
    res.status(404).send("Message not found");
  }
});

// DELETE route to delete a message by ID
app.delete("/messages/:id", (req, res) => {
  const { id } = req.params;
  const index = messages.findIndex((m) => m.id === id);
  if (index !== -1) {
    messages.splice(index, 1);
    // Change to send back a JSON object with a message including the deleted ID
    res.status(200).json({ message: `Message with id ${id} is deleted.` });
  } else {
    res.status(404).send("Message not found");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
