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
        res.status(401).json({ msg: `You are not authorized to view this page because you are not vip user, please go back and change your role in account section`})
    }
}

function isAdmin(req, res , next) {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        next()
    } else {
        res.status(401).json({ msg: `You are not authorized to view this page because you are not Admin user, please go back and change your role in account section`})
    }
}

module.exports = {
    isAuth,
    isVip,
    isAdmin
}