var canned = require('canned')
,   http = require('http')
,   opts = { cors_enabled: true, logger: process.stdout }
,   fs = require('fs')
,   obj = { "foo": "bar3" }
,   arr = []
,   food = ['Pizza', 'Burger','Asiatisch', 'Sushi', 'Indisch', 'Mediterran',
            'Orientalisch', 'Gourmet', 'International'];
function rand_range(from, to, mantissa) {
	mantissa = mantissa || 0;
	return (Math.random()*(to-from+1)+from).toFixed(mantissa);
}

var winner = rand_range(0, food.length-1);

function get_food_index() {
    if (Math.random() > 0.3) {
        return rand_range(0, food.length-1);
    }
    else 
    	return winner;
}

var i = 0;
setInterval(function() {
    var name = food[get_food_index()], 
        geo_lat = rand_range(45, 52, 5), geo_long = rand_range(5, 30, 5),
        price = rand_range(1, 100);
	obj = { id: i, name: name, geo_lat: geo_lat, geo_long: geo_long, price: price };
    arr.push(obj);
    fs.writeFileSync('./canned/orders/index.get.json', JSON.stringify(arr));
    i++;
}, 1000);

var can = canned('/canned', opts);

console.log('Listening at 3000...')
http.createServer(can).listen(3000);
