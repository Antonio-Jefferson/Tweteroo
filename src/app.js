import express from "express"
import cors from "cors"

const server = express()
server.use(cors())
server.use(express.json())

const users = [];
const tweetsUser = [];

server.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    const newUser = { username, avatar };
    users.push(newUser)
    res.send("OK")
})

server.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    if (!users.find(user => user.username === username)) {
        return res.status(400).send('UNAUTHORIZED');
    }
    const { avatar } = users.find((user) => user.username === username)
    const newTweet = { username, tweet, avatar };
    tweetsUser.push(newTweet);
    res.send("OK")
})

server.get("/tweets", (req, res) => {
    let lastTweets = tweetsUser[tweetsUser.length - 10];
    res.status(200).send(lastTweets)
})

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))