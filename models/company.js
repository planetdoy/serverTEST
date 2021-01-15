const Sequelize = require('sequelize');

module.exports = class Company extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            registration : {
                type : Sequelize.INTEGER,
                allowNull : false,
                unique : true
            },
            name : {
                type : Sequelize.STRING(100),
                allowNull : false
            }
        },
        {
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:'Company',
            tableName:'companies',
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    }

    static associate(db){
        db.Company.hasMany(db.Car,{foreignKey:'company_id', sourceKey: 'registration'});
    };
};