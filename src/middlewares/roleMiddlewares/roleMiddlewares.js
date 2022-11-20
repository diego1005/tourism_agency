const { Role } = require('../../database/models');

module.exports = {
    roleExist: async (req, res, next) => {
        const { id } = req.params;
        const role = await Role.findOne({ where: { id } });
        if (!role) {
            res.status(404).json({
                msg: "Invalid or nonexistent role",
                status: "not found"
            })
        } else {
            next();
        }
    }
}