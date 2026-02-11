const  http = require('http');
var    port = process.env.PORT | 3000;

//"[Mario Bacellar] - Asterisk server running on " + port +"\n"
var p1 = new Promise(function(resolve, reject) {       
	setTimeout(function() { 
		resolve
		(	
"ooo        ooooo       .o.       ooooooooo.   ooooo   .oooooo.        oooooooooo.        .o.         .oooooo.   oooooooooooo ooooo        ooooo              .o.       ooooooooo.   "+"\n"+
" 88.       .888'      .888.       888    Y88.  888   d8P'   Y8b        888     Y8b      .888.       d8P    Y8b   888       8  888          888              .888.       888    Y88. "+"\n"+
" 888b     d 888      .8 888.      888   .d88   888  888      888       888     888     .8 888.     888           888          888          888             .8 888.      888   .d88  "+"\n"+
" 8 Y88. .P  888     .8   888.     888ooo88P    888  888      888       888oooo888     .8   888.    888           888oooo8     888          888            .8   888.     888ooo88P   "+"\n"+
" 8   888    888    .88ooo8888.    888 88b.     888  888      888       888     88b   .88ooo8888.   888           888          888          888           .88ooo8888.    888 88b.    "+"\n"+
" 8    Y     888   .8       888.   888   88b.   888   88b    d88        888    .88P  .8       888.   88b    ooo   888       o  888       o  888       o  .8       888.   888   88b.  "+"\n"+
"o8o        o888o o88o     o8888o o888o  o888o o888o   Y8bood8P        o888bood8P   o88o     o8888o   Y8bood8P   o888ooooood8 o888ooooood8 o888ooooood8 o88o     o8888o o888o  o888o "+"\n"+
"                                                                                                                                                                                    "+"\n"+
"                                                                                                                                                                                    "+"\n"+
"                                                                                                                                                                                    "+"\n"+
"      .o.                    .                       o8o                     .oooo.     .oooo.     .oooo.     .o                                                                    "+"\n"+
"     .888.                 .o8                                             .dP  Y88b   d8P' Y8b  .dP  Y88b  o888                                                                    "+"\n"+
"    .8 888.      .oooo.o .o888oo  .ooooo.  oooo d8b oooo  oooo    ooo            8P  888    888       8P     888                                                                    "+"\n"+
"   .8   888.    d88(   8   888   d88   88b  888  8P  888    88b..8P            .d8P   888    888     .d8P    888                                                                    "+"\n"+
"  .88ooo8888.    Y88b.    888   888ooo888  888      888     Y888            .dP      888    888   .dP        888                                                                     "+"\n"+
" .8       888.  o.  )88b   888 . 888    .o  888      888   .o8  88b        .oP     .o  88b  d88  .oP     .o  888                                                                    "+"\n"+
"o88o     o8888o 8  888P'    888   Y8bod8P  d888b    o888o o88    888o      8888888888   Y8bd8P   8888888888 o888o                                                                   "+"\n"+
"                                                                                                                                                                                    "+"\n"+
"                                                                                                                                                                                    "+"\n"
);
		
		
	}, 10*1000);
});


http.createServer(function (req, res) {
	
	res.writeHead(200, {'Content-Type': 'text/plain'});

	p1.then ( 
		function(value){
			var miles = new Date().getMilliseconds();
			var html  = value;
			console.log( '(' + miles +') - Return ['+html+']');
			res.end( html );
		}
	);

}).listen(port, "0.0.0.0");

console.log('Server running at http://localhost:'+port);
