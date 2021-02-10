const clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey:process.env.CLARIFAI_API_KEY
});

// If the model isnt working change it to that
// .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
const handleAPICall = (req,res) =>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('Unable to make API request'));
}



const handleImage = (req,res,db) =>{
    const { id } = req.body;
    
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries =>{
        res.json(entries[0]);
    }).catch(err => res.status(400).json('Unable to update entries'));

}

module.exports = {
    handleImage:handleImage,
    handleAPICall:handleAPICall
}