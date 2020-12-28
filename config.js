const appMain = require('@fdt/dev-base');
process.env.NODE_ENV === 'development'
? appMain.appDev()
: appMain.appBuild()
