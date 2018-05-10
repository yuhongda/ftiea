import Vue from 'vue'
import VueRouter from 'vue-router'


export function routerConfig(router, store, type){

    let promise = new Promise(function(resolve, reject) {
        
        const CheckIn = resolve => require.ensure(['./src/pages/CheckIn.vue'], () => resolve(require('./src/pages/CheckIn.vue')), 'checkIn')
        const TheWall = resolve => require.ensure(['./src/pages/TheWall.vue'], () => resolve(require('./src/pages/TheWall.vue')), 'theWall')
        //{importPage}//

        let routes = []

        switch (type) {
            case 'checkIn':
                routes = [
                    { path: '/', component: CheckIn, name: 'checkIn' },
                    //{importRoute}//
                    { path: '*', redirect: '/' }
                ]
                break;
            case 'theWall':
                routes = [
                    { path: '/', component: TheWall, name: 'theWall' },
                    //{importRoute}//
                    { path: '*', redirect: '/' }
                ]
                break;
        }


        router = new VueRouter({
            routes
        })
        
        router.beforeEach((to, from, next) => {

            next()
            
        })

        resolve(router);
    });

    return promise
}

