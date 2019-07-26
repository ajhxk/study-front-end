class Middleware {
    constructor() {
        this.cache = [];
        // 缓存options
        this.options = null;
        this.middlewares = null;
    }

    use(fn) {
        if ('function' !== typeof fn) {
            throw 'middleware must be a function';
        }
        this.cache.push(fn);
        return this;
    }

    next(fn) {
        if (this.middlewares && this.middlewares.length > 0) {
            let ware = this.middlewares.shift();
            ware.call(this, this.options, this.next.bind(this));
        }
    }

    handleRequest(options) {
        // 复制cache中的fn到middlewares中
        this.middlewares = this.cache.map(fn => fn);
        this.options = options;
        this.next();
    }
}

const $p = function (){
    return console.log.apply(console, arguments);
};
const isTest = false;
(function test() {
    if (!isTest) return;

    const mw = new Middleware();
    const do1 = (options, next) => {
        $p(`step1`);
        next();
        $p(`step5`);
    }

    const do2 = (options, next) => {
        $p(`step2`);
        next();
        $p(`step4`);
    }

    const do3 = (options, next) => {
        $p(`step3`);
        next();
        $p(`step3.1`)
    }

    mw.use(do1).use(do2).use(do3);
    mw.handleRequest({ a: 1 });

})();

const isTest2 = true;
(function test2() {
    if (!isTest2) return;

    const mw = new Middleware();
    const do1 = (options, next) => {
        $p(`do1`);
        setTimeout(() => {
            $p(`step1`);
            next();
            $p(`step5`);
        }, 1000);

    }

    const do2 = (options, next) => {
        $p(`do2`);
        setTimeout(() => {
            $p(`step2`);
            next();
            $p(`step4`);
        }, 1000);
    }

    const do3 = (options, next) => {
        $p(`do3`);
        setTimeout(() => {
            $p(`step3`);
            next();
            $p(`step3.1`);
            $p(mw);
        }, 1000);
    }

    mw.use(do1).use(do2).use(do3);
    mw.handleRequest({ a: 1 });

})();