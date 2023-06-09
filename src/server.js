const app = require('./app');
const sequelize = require('./utils/connection');
require('./models')

const PORT = process.env.PORT || 8080;

const main = async () => {
    try {
        await sequelize.sync();
        console.log(
            "                                                                                 \n" +
            "   ██████╗ ██████╗ ███╗   ██╗███╗   ██╗███████╗ ██████╗████████╗███████╗██████╗  \n" +
            "  ██╔════╝██╔═══██╗████╗  ██║████╗  ██║██╔════╝██╔════╝╚══██╔══╝██╔════╝██╔══██╗ \n" +
            "  ██║     ██║   ██║██╔██╗ ██║██╔██╗ ██║█████╗  ██║        ██║   █████╗  ██║  ██║ \n" +
            "  ██║     ██║   ██║██║╚██╗██║██║╚██╗██║██╔══╝  ██║        ██║   ██╔══╝  ██║  ██║ \n" +
            "  ╚██████╗╚██████╔╝██║ ╚████║██║ ╚████║███████╗╚██████╗   ██║   ███████╗██████╔╝ \n" +
            "   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝  ╚═══╝╚══════╝ ╚═════╝   ╚═╝   ╚══════╝╚═════╝  \n" +
            "                                                                                   "
        );
        app.listen(PORT);
        console.log(
            `                    ⚡ GREAT, THE PORT \x1b[32;1m${PORT}\x1b[0m IS ALL YOURS!⚡\n` +
            "                                   \x1b[36mJuan Quez\x1b[0m                 "
        );
    } catch (error) {
        console.log(error);
    }
}

main();
