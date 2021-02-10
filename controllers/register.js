
const handleRegister = (req, res, db, bcrypt) =>{

    const { username, email, password} = req.body;

    if(!email || !username || !password){
        return res.status(400).json('One or more fields missing');
    }

    const hash = bcrypt.hashSync(password);

    // TRANSACTION
    db.transaction(trx =>{
        trx.insert({
            hash:hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
            return trx('users')
                .returning('*')
                .insert({
                    email:loginEmail[0],
                    username:username,
                    joined: new Date()
                }).then(user =>{
                    res.json(user[0]);
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    }).catch(err => res.status(400).json('Could not register'));
    
}

module.exports = {
    handleRegister:handleRegister
}

