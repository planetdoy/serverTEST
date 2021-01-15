const Sequelize = require("sequelize");

module.exports = class File extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            file_name : {
                type : Sequelize.STRING(50),
                allowNull : false
            },
            original_name : {
                type : Sequelize.STRING(45),
                allowNull : false
            },
            title : {
                type : Sequelize.STRING(45),
                allowNull : false
            },
            path : {
                type : Sequelize.STRING(50),
                allowNull : false
            },
            mimetype :{
                type : Sequelize.STRING(10),
                allowNull : false
            },
            size : {
                type : Sequelize.INTEGER,
                allowNull : false
            }
        },
        {
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'File',
            tableName:'files',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    }
    static associate(db){
        db.File.belongsTo(db.Car,{foreignKey:'car_id', targetKey:'vin'});
    };
};