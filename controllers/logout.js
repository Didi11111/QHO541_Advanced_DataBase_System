module.exports = (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Error logging out");
        }
        
        // Optionally clear client-side cookies associated with the session
        res.clearCookie('connect.sid'); // 'connect.sid' is the default name for the session ID cookie set by express-session. 
        // Redirect the user to the main page or login page
        res.redirect('/login');
    });
};
