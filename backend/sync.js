const { sequelize } = require('./server/models');

(async () => {
    try {
        await sequelize.sync(); // Cambia a false o alter según sea necesario
        console.log('Base de datos sincronizada');

        // Puedes agregar lógica para crear registros de ejemplo aquí, si lo deseas
    } catch (error) {
        console.error('Error sincronizando la base de datos:', error);
    } finally {
        await sequelize.close();
    }
})();