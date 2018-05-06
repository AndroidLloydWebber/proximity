module.exports = function (sequelize, DataTypes) {
    return  sequelize.define("poi", {
        title: DataTypes.STRING,
        address: DataTypes.STRING,
        lat: DataTypes.DECIMAL(9,6),
        lng: DataTypes.DECIMAL(9,6),
        link: DataTypes.STRING,
        category: DataTypes.STRING,
        body: DataTypes.TEXT
    }, {
        tableName: 'poi'
    });
};
