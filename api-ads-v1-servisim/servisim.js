const cluster = require('cluster');
const numCPUs = require('os').cpus().length;


if (cluster.isMaster) {

	console.log(`Master PID=[${process.pid}] is running` + " ... Qtd CPUs = ["+numCPUs+"]");

	// Fork workers
	for (let i = 0; i < numCPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		console.log(`Worker ${worker.process.pid} died`);
	});

}else{
	
	const cache       = []; // A simple cache for immediate returns the files already loaded.
	const servisimLib = require("./lib/servisimLib");
	const restify     = require("restify");
	const server      = restify.createServer( {name:"Servisim :: Service Simulator v0.1 :: Mario Bacellar :: [https://www.linkedin.com/in/mariobacellar]"} );

	server.use(restify.plugins.bodyParser({mapParams: false })); // It is to get JSON from req.body (post, put, ...)

	server.port = process.env.PORT | 8089;


	//Solicitar Analise Cedito Oi Total
	server.get  (global.solicitaranalisecreditooitotalURL+"/breed" , function(req, res, next) { return servisimLib.breed(req, res, next, global.solicitaranalisecreditooitotalJSON);});
	server.get  (global.solicitaranalisecreditooitotalURL+"/:id"   , function(req, res, next) { return servisimLib.selectFileJsonById(req, res, next, cache, global.solicitaranalisecreditooitotalJSON);});
	server.post (global.solicitaranalisecreditooitotalURL          , function(req, res, next) { return servisimLib.solicitarAnaliseCreditoRequest(req, res, next, cache, global.solicitaranalisecreditooitotalJSON);});

	// Registrar Nova Analise Credito
 	server.get  (global.registrarnovaanalisecreditoURL+"/breed"    , function(req, res, next) { return servisimLib.breed(req, res, next, global.registrarnovaanalisecreditoJSON);});
	server.get  (global.registrarnovaanalisecreditoURL+"/:id"      , function(req, res, next) { return servisimLib.selectFileJsonById(req, res, next, cache, global.registrarnovaanalisecreditoJSON);});
	server.post (global.registrarnovaanalisecreditoURL             , function(req, res, next) { return servisimLib.registrarNovaAnaliseCreditoRequest(req, res, next, cache, global.registrarnovaanalisecreditoJSON);});

	// Solicitar Reserva Porta
	server.get  (global.solicitarreservaportaURL+"/breed"          , function(req, res, next) { return servisimLib.breed(req, res, next, global.solicitarreservaportaJSON);});
	server.get  (global.solicitarreservaportaURL+"/:id"            , function(req, res, next) { return servisimLib.selectFileJsonById(req, res, next, cache, global.solicitarreservaportaJSON);});
	server.post (global.solicitarreservaportaURL                   , function(req, res, next) { return servisimLib.solicitarReservaPortaRequest(req, res, next, cache, global.solicitarreservaportaJSON);});

	// Alterar Contato Conta_Request
	server.get  (global.alterarcontatocontaURL+"/breed"            , function(req, res, next) { return servisimLib.breed (req, res, next, global.alterarcontatocontaJSON);});
	server.get  (global.alterarcontatocontaURL+"/:id"              , function(req, res, next) { return servisimLib.selectFileJsonById(req, res, next, cache, global.alterarcontatocontaJSON);});
	server.post (global.alterarcontatocontaURL                     , function(req, res, next) { return servisimLib.alterarContatoContaRequest(req, res, next, cache, global.alterarcontatocontaJSON);});

	// Inclui Cliente 	
	server.get  (global.incluiclienteURL+"/breed"                  , function(req, res, next) { return servisimLib.breed(req, res, next, global.incluiclienteJSON);});
	server.get  (global.incluiclienteURL+"/:id"                    , function(req, res, next) { return servisimLib.selectFileJsonById(req, res, next, cache, global.incluiclienteJSON);});
	server.post (global.incluiclienteURL                           , function(req, res, next) { return servisimLib.incluiClienteRequest(req, res, next, cache, global.incluiclienteJSON);});

	// Inserir Contato Conta
	server.get  (global.inserircontatocontaURL+"/breed"            , function(req, res, next) { return servisimLib.breed(req, res, next, global.inserircontatocontaJSON);});
	server.get  (global.inserircontatocontaURL+"/:id"              , function(req, res, next) { return servisimLib.selectFileJsonById(req, res, next, cache, global.inserircontatocontaJSON);});
	server.post (global.inserircontatocontaURL                     , function(req, res, next) { return servisimLib.inserirContatoContaRequest(req, res, next, cache, global.inserircontatocontaJSON);});

	// Interacao Ofertas NBA360	
	server.get  (global.interacaoofertasnba360URL+"/breed"         , function(req, res, next) { return servisimLib.breed(req, res, next, global.interacaoofertasnba360JSON);});
	server.get  (global.interacaoofertasnba360URL+"/:id"           , function(req, res, next) { return servisimLib.selectFileJsonById(req, res, next, cache, global.interacaoofertasnba360JSON);});
	server.post (global.interacaoofertasnba360URL                  , function(req, res, next) { return servisimLib.interacaoOfertasNBA360Request(req, res, next, cache, global.interacaoofertasnba360JSON);});

	// Manter Reserva Porta
	server.get  (global.manterreservaportaURL+"/breed"             , function(req, res, next) { return servisimLib.breed(req, res, next, global.manterreservaportaJSON);});
	server.get  (global.manterreservaportaURL+"/:id"               , function(req, res, next) { return servisimLib.selectFileJsonById(req, res, next, cache, global.manterreservaportaJSON);});
	server.post (global.manterreservaportaURL                      , function(req, res, next) { return servisimLib.manterreservaportaRequest(req, res, next, cache, global.manterreservaportaJSON);});

	// Registrar Conta Fatura
	server.get  (global.registrarcontafaturaURL+"/breed"           , function(req, res, next) { return servisimLib.breed(req, res, next, global.registrarcontafaturaJSON);});
	server.get  (global.registrarcontafaturaURL+"/:id"             , function(req, res, next) { return servisimLib.selectFileJsonById(req, res, next, cache, global.registrarcontafaturaJSON);});
	server.post (global.registrarcontafaturaURL                    , function(req, res, next) { return servisimLib.registrarcontafaturaRequest(req, res, next, cache, global.registrarcontafaturaJSON);});

	server.listen(server.port, function(){ 
		console.log('%s listening at %s', server.name, server.url);
	});


	console.log(`Worker ${process.pid} started`);

}


