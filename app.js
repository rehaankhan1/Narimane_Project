const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/html');

	const routeMap = {
		'': 'index.html',
        'first': 'first/index.html',
        'second': 'second/index.html',
        'json': 'json/data.json',
		'about': 'about/about.html',
		'services': 'services/services.html'
	}

    const string1 = req.url.slice(1).substr(0, req.url.slice(1).indexOf('?'))

    

    console.log(req.url.slice(1));
    console.log(req.url)
    var rePattern = new RegExp(/json*/);
    var arrMatches = req.url.slice(1).match(rePattern);
    console.log(`yo ${arrMatches}`)




    function paramsToObject(entries) {
        const result = {}
        for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
          result[key] = value;
        }
        return result;
      }
      const urlParams = new URLSearchParams(req.url.slice(5));
    const entries = urlParams.entries(); //returns an iterator of decoded [key,value] tuples
    const params = paramsToObject(entries); //{abc:"foo",def:"[asf]",xyz:"5"}
    console.log(params);//json
   // fs.writeFile('json/data.json', params)
   fs.writeFile('json/data.json', JSON.stringify(params), (err) => {
    if (err)
      console.log(err);
    else {
      console.log("File written successfully\n");
      console.log("The written has the following contents:");
      console.log(fs.readFileSync("json/data.json", "utf8"));
    }
  });
    // Put the object into storage
   // localStorage.setItem('testObject', JSON.stringify(params));  
  // console.log(req.url.slice(5))//?value=10&color=blue


  // routeMap['json'] =   routeMap['json'] + req.url.slice(5)
  //console.log('Hi')
  /// console.log(routeMap['json'])
  // console.log(req.url)
  // console.log(req.url.slice(1))
   
  // console.log(string1)
  // console.log(routeMap[`${string1}`])






        if(string1=='json')
        render(res, routeMap[`${string1}`]);
        else
        render(res, routeMap[req.url.slice(1)]);
});

function render(res, htmlFile) {
  	fs.stat(`./${htmlFile}`,  (err, stats) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
       
  		if(stats) {
		  	fs.createReadStream(htmlFile).pipe(res);
  		} else {
                res.statusCode = 404;
                res.end('Sorry, page not found');
              
            
  		}
  	});
}

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});