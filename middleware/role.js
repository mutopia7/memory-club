function isAuth(req, res , next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).json({ msg: `You are not authorized to view this page`})
    }
}

function isVip(req, res , next) {
    if (req.isAuthenticated() && (req.user.role === 'vip' || req.user.role === 'admin')) {
        next()
    } else {
        res.status(401).render("notVip.ejs", {user:req.user})
    }
}

function isAdmin(req, res , next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        next()
    } else {
        res.status(401).render("notAdmin.ejs", {user: req.user})
    }
}

module.exports = {
    isAuth,
    isVip,
    isAdmin
}