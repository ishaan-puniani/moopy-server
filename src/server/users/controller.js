/**
 * Created by ishaan.puniani on 2016-11-20.
 */

module.exports = {
    getAll: function (req, res) {
        res.send( [
                {
                    "id": 1,
                    "name": "Michael Jackson",
                    "github": "mjackson",
                    "twitter": "mjackson",
                    "worksOn": "React Router"
                },
                {
                    "id": 2,
                    "name": "Ryan Florence",
                    "github": "ryanflorence",
                    "twitter": "ryanflorence",
                    "worksOn": "React Router"
                },
                {
                    "id": 3,
                    "name": "Dan Abramov",
                    "github": "gaearon",
                    "twitter": "dan_abramov",
                    "worksOn": "Redux"
                },
                {
                    "id": 4,
                    "name": "Matt Zabriskie",
                    "github": "mzabriskie",
                    "twitter": "mzabriskie",
                    "worksOn": "Axios"
                },
                {
                    "id": 5,
                    "name": "Tobias Koppers",
                    "github": "sokra",
                    "worksOn": "Webpack"
                },
                {
                    "id": 6,
                    "name": "Sebastian McKenzie",
                    "github": "kittens",
                    "twitter": "sebmck",
                    "worksOn": "Babel"
                }
            ]
        );

    },
    getMyDhashboards: function (req, res) {
        console.log("hi");
    }
};
