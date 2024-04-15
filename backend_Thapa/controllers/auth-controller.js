const home = async (req, res) => {
    try {
        res.status(200).send('<h1>This is My Home page</h1>');
    } catch (error) {
        console.log(error);
    }
};

const hello = async (req, res) => {
    try {
        res.status(200).send(
            '<h1>Hello there! this is my Hello Page</h1>'
        );
    } catch (error) {
        console.log('Error:', error);
    }
};

const auth = async (req, res) => {
    try {
        res.status(200).send('<h1>This backend course </h1>');
    } catch (error) {
        console.log('error:', error);
    }
};

const facebook = async (req, res) => {
    try {
        res.status(200).send(
            '<h1>Hello this is my facebook page</h1>'
        );
    } catch (error) {}
};

export { home, auth, hello, facebook };
