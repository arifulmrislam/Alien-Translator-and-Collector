module.exports = (sequelize, DataTypes) => {
    const Alien = sequelize.define('Alien', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });
    return Alien;
};
