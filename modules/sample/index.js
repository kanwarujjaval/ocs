class Sample {

    constructor() {
        console.log("here");
        this.foo = 1;
        console.log(this.foo);
    }

    getSample(req, res) {
        let a = 1 + this.foo;
        console.log('asd', a);
        console.log('req', req);
        console.log('res', res);
    }
}

let sample = new Sample();

module.exports = [
    {
        path: '/sample',
        method: 'GET',
        handler: (req, res) => {
            return sample.getSample(req, res)
        }
    }
];