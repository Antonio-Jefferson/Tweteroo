import express from "express"
import cors from "cors"

const server = express()
server.use(cors())
server.use(express.json())

const users = [];
const tweetsUsers = [];

server.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    const isEmpty = !username || !avatar
    const isString = typeof username !== "string" || typeof avatar !== "string"
    const existUser = users.find((user) => user.username === username);

    if (existUser) {
        return res.status(400).json("Usuário já existente!");
    } else {
        if (isEmpty || isString) {
            return res.status(400).json("Todos os campos são obrigatórios!")
        } else {
            res.status(201).send("OK")
            const newUser = { username, avatar };
            users.push(newUser)
        }
    }

})

server.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
    const isEmpty = !username || !tweet
    const isString = typeof username !== "string" || typeof tweet !== "string"

    if (!users.find(user => user.username === username)) {
        return res.status(400).send('UNAUTHORIZED');
    } else {
        if (isEmpty || isString) {
            return res.status(400).json("Todos os campos são obrigatórios!")
        } else {

            const { avatar } = users.find((user) => user.username === username)
            const newTweet = { username, tweet, avatar };
            tweetsUsers.push(newTweet);
            res.status(201).send("OK")
        }
    }
})

server.get("/tweets", (req, res) => {
    if (tweetsUsers.length === 0) {
        return res.send(tweetsUsers)
    }
    if (tweetsUsers.length > 10) {
        let lastTweets = tweetsUsers.slice(-10);
        return res.status(200).send(lastTweets)
    } else {
        return res.status(200).send(tweetsUsers)
    }
})

server.get("/tweets/:username", (req, res)=>{
    const {username} = req.params
    const allTweetsUser = tweetsUsers.filter((tweets)=> tweets.username === username)
    res.status(200).send(allTweetsUser)
})

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))