module.exports = function (sequelize, DataTypes) {
    var POI = sequelize.define("POI", {
        title: DataTypes.STRING,
        address: DataTypes.STRING,
        lat: DataTypes.DECIMAL(9,6),
        lng: DataTypes.DECIMAL(9,6),
        link: DataTypes.STRING,
        category: DataTypes.STRING,
        body: DataTypes.TEXT
    });
    return POI;
};
