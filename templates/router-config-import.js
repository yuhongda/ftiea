const #{PageName}# = resolve => require.ensure(['./src/pages/#{PageName}#.vue'], () => resolve(require('./src/pages/#{PageName}#.vue')), '#{pageName}#')
//{importPage}//