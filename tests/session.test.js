const assert = require('assert');
const User = require('../src/model/user.model');
const helper = require('../src/helpers/helper');

describe('Session', function() {
    let user = {
        email_address: 'nitesh@gmail.com',
        password: 'admin',
        name: 'Nitesh Kaushik',
    }

    let userId;
    let encryptedPassword;
    before(async function() {
        await User.deleteMany({});
        const password = helper.generateHash(user.password);
        const savedUser = await User.create({...user, password: password});
        userId = savedUser._id;
        encryptedPassword = password;
    });

    it('Login with valid credentials', async function() {
        const savedUser = await User.findOne({email_address: user.email_address});
        if(savedUser) {
            let matched = helper.isPasswordValid(user.password, savedUser.password);  
            assert(matched);              
        }
        
    });

    it('Login with invalid credentials', async function() {
        const savedUser = await User.findOne({email_address: user.email_address});
        if(savedUser) {
            let matched = helper.isPasswordValid(user.password, encryptedPassword + 'random'); 
            assert(!matched); 
        }
        
    });

    after(async function(){
        await User.deleteMany({});
    });
});