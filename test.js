var http = require('http')

function message(message){
  console.log("message: " + message);
}

function follow(id){
  console.log("following: ", id)
  var options = {
    hostname: 'letsrevolutionizetesting.com',
    port: 80,
    path: '/challenge.json?id='+id,
    method: 'GET',
  }
  var req = http.request(options, function(res,req){
    res.on('data', function (chunk) {
      var json = JSON.parse(chunk.toString());
      var regex = /id=(.*?)&?$/
      //do appropriate action
      if(json.follow){
        follow(regex.exec(json.follow)[1]);
      }else if(json.message){
        message(json.message);
      }
    });
  });

  req.on('error', function(e){
    console.log(e.message)
  });

  req.end();
}

follow(756775492);
// follow(503047199);


