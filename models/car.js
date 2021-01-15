//car 모델 정의하기
const Sequelize = require("sequelize");

module.exports = class Car extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            // car_id
            vin: {
                type : Sequelize.STRING(45),
                allowNull : false,
                unique : true
            },
            lisence_num : {
                type : Sequelize.STRING(10),
                allowNull : false
            },
            model : {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            location : {
                type : Sequelize.STRING(200),
                allowNull: false
            },
            mile : {
                type : Sequelize.INTEGER,
                allowNull : false
            },
            engine_oil : {
                type : Sequelize.DATE,
                allowNull : false
            },
            classification : {
                type:Sequelize.STRING(10),
                allowNull : false
            },
        },
        {
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Car',
            tableName:'cars',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    }

    static associate(db){
        db.Car.belongsTo(db.Company, {foreignKey:'company_id', targetKey:'registration'});
        db.Car.hasOne(db.File, {foreignKey:'car_id', sourceKey:'vin'});
    };
};