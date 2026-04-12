module.exports.renderSignupForm=(req, res)=>{
    res.render('users/signup.ejs');
}

module.exports.signup=async(req, res)=>{
    try{
        let {email, username, password}= req.body;
        const newUser= new User({email, username});
        const registereduser=await User.register(newUser, password);
        req.login(registereduser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash('success', 'Welcome to  wanderlust');
            res.redirect('/listings');
        })
        

    } catch(e){
        req.flash('error', e.message);
        res.redirect('/signup');
    }
    
}

module.exports.renderLoginForm=(req, res)=>{
    res.render('users/login.ejs');
}

module.exports.login= async(req, res)=>{
        req.flash('success', 'Welcome back! to wanderlusr');
    const redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
}

module.exports.logout= (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash('success', 'You have been logged out!');
        res.redirect('/listings');
    })
}