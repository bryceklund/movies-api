const app = require('./app');

const PORT = 9001;

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}.`);
});