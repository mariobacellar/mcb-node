// Module for read and write file
const fs   = require("fs");
const http = require('http');

const servisimDB= "data/"; // This folder represents a database. It contains one folder for each JSON object.

var parser  = require('fast-xml-parser');
var he      = require('he');
var options = {
    attributeNamePrefix   : "@_",
    attrNodeName          : "attr", //default is 'false'
    textNodeName          : "#text",
    ignoreAttributes      : true,
    ignoreNameSpace       : true,
    allowBooleanAttributes: false,
    parseNodeValue        : true,
    parseAttributeValue   : false,
    trimValues            : true,
    cdataTagName          : "__cdata", //default is 'false'
    cdataPositionChar     : "\\c",
    localeRange           : "", //To support non english character in tag/attribute values.
    parseTrueNumberOnly   : true,
    attrValueProcessor    : a => he.decode(a, {isAttributeValue: true}),//default is a=>a
    tagValueProcessor     : a => he.decode(a) //default is a=>a
};


// *****************************************************************************************************************************************************************
// * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 *
// *****************************************************************************************************************************************************************

//Solicitar Analise Cedito Oi Total
global.solicitaranalisecreditooitotalJSON    = "solicitaranalisecreditooitotal";
global.solicitaranalisecreditooitotalURL     = "/clientes/analises/v1/oitotal/credito";
global.solicitaranalisecreditooitotalTIMEOUT = 3.27 * 1000;
var    solicitaranalisecreditooitotalDB      = servisimDB + solicitaranalisecreditooitotalJSON + "/"+ solicitaranalisecreditooitotalJSON;
var    solicitaranalisecreditooitotalFILE    = solicitaranalisecreditooitotalDB + "-";

// Registrar Nova Analise Credito
global.registrarnovaanalisecreditoJSON       = "registrarnovaanalisecredito";
global.registrarnovaanalisecreditoURL        = "/clientes/analises/oitotal/v1/credito/registrar";
global.registrarnovaanalisecreditoTIMEOUT    = 6.6 * 1000;
var    registrarnovaanalisecreditoDB         = servisimDB + registrarnovaanalisecreditoJSON + "/"+ registrarnovaanalisecreditoJSON;
var    registrarnovaanalisecreditoFILE       = registrarnovaanalisecreditoDB + "-";

// Inclui Cliente
global.incluiclienteJSON                     = "incluicliente";
global.incluiclienteURL                      = "/clientes/cadastro/v1/dados/incluir";
global.incluiclienteTIMEOUT                  = 0.14 * 1000;
var    incluiclienteDB                       = servisimDB + incluiclienteJSON + "/"+ incluiclienteJSON;
var    incluiclienteFILE                     = incluiclienteDB + "-";

// Inserir Contato Conta
global.inserircontatocontaJSON               = "inserircontatoconta";
global.inserircontatocontaURL                = "/clientes/contacontato/v1/criar";
global.inserircontatocontaTIMEOUT            = 2.63 * 1000;
var    inserircontatocontaDB                 = servisimDB + inserircontatocontaJSON + "/"+ inserircontatocontaJSON;
var    inserircontatocontaFILE               = inserircontatocontaDB + "-";

// Alterar Contato Conta 
global.alterarcontatocontaJSON               = "alterarcontatoconta";
global.alterarcontatocontaURL                = "/clientes/contacontato/v1/alterar";
global.alterarcontatocontaTIMEOUT            = 1.54 * 1000;
var    alterarcontatocontaDB                 = servisimDB + alterarcontatocontaJSON + "/"+ alterarcontatocontaJSON;
var    alterarcontatocontaFILE               = alterarcontatocontaDB + "-";

// Interacao Ofertas NBA360
global.interacaoofertasnba360JSON            = "interacaoofertasnba360";
global.interacaoofertasnba360URL             = "/interacaoofertasnba360";
global.interacaoofertasnba360TIMEOUT         = 0.18 * 1000;
var    interacaoofertasnba360DB              = servisimDB + interacaoofertasnba360JSON + "/"+ interacaoofertasnba360JSON;
var    interacaoofertasnba360FILE            = interacaoofertasnba360DB + "-";

// Manter Reserva Porta
global.manterreservaportaJSON                = "manterreservaporta";
global.manterreservaportaURL                 = "/recursos/portaadsl/v1/manter";
global.manterreservaportaTIMEOUT             = 13.2 * 1000;
var    manterreservaportaDB                  = servisimDB + manterreservaportaJSON + "/"+ manterreservaportaJSON;
var    manterreservaportaFILE                = manterreservaportaDB + "-";

// Registrar Conta Fatura
global.solicitarreservaportaJSON             = "solicitarreservaporta";
global.solicitarreservaportaURL              = "/recursos/portaadsl/v1/reservar";
global.solicitarreservaportaTIMEOUT          = 10.18 * 1000;
var    solicitarreservaportaDB               = servisimDB + solicitarreservaportaJSON + "/"+ solicitarreservaportaJSON;
var    solicitarreservaportaFILE             = solicitarreservaportaDB + "-";


// Solicitar Reserva Porta 
global.registrarcontafaturaJSON              = "registrarcontafatura";
global.registrarcontafaturaURL               = "/clientes/faturas/v1/registro/registrar";
global.registrarcontafaturaTIMEOUT           = 8.86 * 1000;
var    registrarcontafaturaDB                = servisimDB + registrarcontafaturaJSON + "/"+ registrarcontafaturaJSON;
var    registrarcontafaturaFILE              = registrarcontafaturaDB + "-";
// *****************************************************************************************************************************************************************
// * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 *
// *****************************************************************************************************************************************************************



// ************************************************************************************************************************************************************ 
// Common variabels
// ************************************************************************************************************************************************************ 
var id       = "";
var filename = "";
var content  = null;
// ******************************************************************************


// ************************************************************************************************************************************************************ 
// It load txt file
// ************************************************************************************************************************************************************ 
function loadJSON(content, filename, cache){
	content = null;
	
	if ( Object.keys(cache).length>0 ){
		console.log("- Cache exist ["+Object.keys(cache).length+"]...  Looking for ["+filename+"]");
		for (var i = 0; i < Object.keys(cache).length; i++) { 
			if (cache[i].jsonFile === filename){
				content  = cache[i].jsonContent;
				console.log("- Returnig content ["+JSON.stringify(content)+"] from cache")
				break; 
			}	
		}
	}
	
	// else{
	// 	console.log("- There is no cache yet ... ["+Object.keys(cache).length+"]");
	// }

	if (content == null){
		console.log("- There is no cache for this file ["+filename+"] ... Loading JSON/content.");
		content = JSON.parse( fs.readFileSync(filename, "utf8"));
		
		var item = 0 + Object.keys(cache).length;
		console.log("- Adding item cahce position=["+item+"]");
		
		// Adiciona o json no cache. 
		cache[ item ] = {
			value: item, 
			jsonFile: filename, 
			jsonContent: content
		};
	}	
	return content;
};

// ************************************************************************************************************************************************************ 
// Save JSON file into specific  servisimDB folder
// ************************************************************************************************************************************************************ 
function writeJSON(filename, content){
//	console.log("-> writeJSON");				
	fs.writeFile(filename, content, function (err) {
	  if (err) throw err;
	});
	// console.log("- Saved...filename["+filename+"] - content["+content+"]");
	// console.log("<- writeJSON");				
};

// ************************************************************************************************************************************************************ 
// This function must be modified if you gonna create another JSON objects.
// ************************************************************************************************************************************************************ 
function getFileName(filename, id, kind){
	if (kind == solicitaranalisecreditooitotalJSON) {filename = solicitaranalisecreditooitotalFILE  + id + ".json";}	else 
	if (kind == registrarnovaanalisecreditoJSON   ) {filename = registrarnovaanalisecreditoFILE     + id + ".json";}	else 
	if (kind == incluiclienteJSON                 ) {filename = incluiclienteFILE                   + id + ".json";}	else 
	if (kind == inserircontatocontaJSON           ) {filename = inserircontatocontaFILE             + id + ".json";}	else 
	if (kind == alterarcontatocontaJSON           ) {filename = alterarcontatocontaFILE             + id + ".json";}	else 
	if (kind == interacaoofertasnba360JSON        ) {filename = interacaoofertasnba360FILE          + id + ".json";}	else 
	if (kind == manterreservaportaJSON            ) {filename = manterreservaportaFILE              + id + ".json";}	else 
	if (kind == solicitarreservaportaJSON         ) {filename = solicitarreservaportaFILE           + id + ".json";}	else 
	if (kind == registrarcontafaturaJSON          ) {filename = registrarcontafaturaFILE            + id + ".json";}	else 
	throw new Error("Invalid kind("+kind+") parameterJSON file name.");
	return filename;
};

function getFileNameDataTemplate(kind){
	if (kind == solicitaranalisecreditooitotalJSON) {filename = solicitaranalisecreditooitotalFILE  + "template.json";}	else 
	if (kind == registrarnovaanalisecreditoJSON   ) {filename = registrarnovaanalisecreditoFILE     + "template.json";}	else 
	if (kind == incluiclienteJSON                 ) {filename = incluiclienteFILE                   + "template.json";}	else 
	if (kind == inserircontatocontaJSON           ) {filename = inserircontatocontaFILE             + "template.json";}	else 
	if (kind == alterarcontatocontaJSON           ) {filename = alterarcontatocontaFILE             + "template.json";}	else 
	if (kind == interacaoofertasnba360JSON        ) {filename = interacaoofertasnba360FILE          + "template.json";}	else 
	if (kind == manterreservaportaJSON            ) {filename = manterreservaportaFILE              + "template.json";}	else 
	if (kind == solicitarreservaportaJSON         ) {filename = solicitarreservaportaFILE           + "template.json";}	else 
	if (kind == registrarcontafaturaJSON          ) {filename = registrarcontafaturaFILE            + "template.json";}	else 
	throw new Error("Invalid kind("+kind+") parameterJSON file name.");
	return filename;
};

function getFileNameDataTest(kind,id){
	if (kind == solicitaranalisecreditooitotalJSON) {filename = solicitaranalisecreditooitotalFILE  + id + ".json";}	else 
	if (kind == registrarnovaanalisecreditoJSON   ) {filename = registrarnovaanalisecreditoFILE     + id + ".json";}	else 
	if (kind == incluiclienteJSON                 ) {filename = incluiclienteFILE                   + id + ".json";}	else 
	if (kind == inserircontatocontaJSON           ) {filename = inserircontatocontaFILE             + id + ".json";}	else 
	if (kind == alterarcontatocontaJSON           ) {filename = alterarcontatocontaFILE             + id + ".json";}	else 
	if (kind == interacaoofertasnba360JSON        ) {filename = interacaoofertasnba360FILE          + id + ".json";}	else 
	if (kind == manterreservaportaJSON            ) {filename = manterreservaportaFILE              + id + ".json";}	else 
	if (kind == solicitarreservaportaJSON         ) {filename = solicitarreservaportaFILE           + id + ".json";}	else 
	if (kind == registrarcontafaturaJSON          ) {filename = registrarcontafaturaFILE            + id + ".json";}	else 
	throw new Error("Invalid kind("+kind+") parameterJSON file name.");
	return filename;
};

function getTimeout(kind){
	var ret = 0;
	if (kind == solicitaranalisecreditooitotalJSON  ) {ret = global.solicitaranalisecreditooitotalTIMEOUT;} else 
	if (kind == registrarnovaanalisecreditoJSON   	) {ret = global.registrarnovaanalisecreditoTIMEOUT;   } else 
	if (kind == incluiclienteJSON                   ) {ret = global.incluiclienteTIMEOUT;                 }	else 
	if (kind == inserircontatocontaJSON             ) {ret = global.inserircontatocontaTIMEOUT;           }	else 
	if (kind == alterarcontatocontaJSON             ) {ret = global.alterarcontatocontaTIMEOUT;           }	else 
	if (kind == interacaoofertasnba360JSON        	) {ret = global.interacaoofertasnba360TIMEOUT;        }	else 
	if (kind == manterreservaportaJSON             	) {ret = global.manterreservaportaTIMEOUT;            }	else 
	if (kind == solicitarreservaportaJSON           ) {ret = global.solicitarreservaportaTIMEOUT;         }	else 
	if (kind == registrarcontafaturaJSON            ) {ret = global.registrarcontafaturaTIMEOUT;          }	else 
	throw new Error("Invalid kind("+kind+") parameterJSON file name.");
	return ret;
};

// ************************************************************************************************************************************************************ 
// Read files like '/client/client-1.json e /client/client-2.json'
// The number 1 (in '???-1') is intend to be the 'id' field into JSON object
// ************************************************************************************************************************************************************ 
module.exports.selectFileJsonById = function(req, res, next, cache, kind){

	id       = req.params.id;
	filename = getFileName(filename, id, kind);
	content  = loadJSON(content, filename, cache);


	// REGRA DE NEGÓCIO: Timeout solicitado pela equipe de teste de performace para simular o retorno deste serviço
	new Promise(function(resolve, reject){       
		setTimeout(function(){ resolve("Wating...");}, getTimeout(kind)	);
	}).then( function(value){
        console.log("[selectFileJsonById] - " + `Worker ${process.pid} started` +"  id.......=["+id+"]");
		res.send(content);
		next();	
	});
     
};


// ************************************************************************************************************************************************************ 
// Read files like '/produc/product-10020.json' e '/product/product-10090.json'
// The number 10090 (in '???-10090') is intend to be the 'code' field into JSON object
// ************************************************************************************************************************************************************ 
module.exports.selectFileJsonByCode = function (req, res, next, cache, kind){
	id		= req.body.code;
	filename= getFileName(filename, id, kind);
	content = loadJSON(content, filename, cache);
	console.log("[selectFileJsonByCode] - " + `Worker ${process.pid} started` +"  id.......=["+id+"]");
	res.send(content);
	next();	
};


// ************************************************************************************************************************************************************ 
// Gets the JSON from request.body (content), takes the value from the 'id' field and saves the JSON in the folder indicated by the 'kind' parameter.
// To use this way of writing JSON must have the 'id' field. (req.id). If you don't have it, you can modify this function or create another function similarly.
// The value of 'id' field will be used in file name, eg: client-1.json
// ************************************************************************************************************************************************************ 
module.exports.saveFileJson = function (req, res, next, kind){
	id = req.body.id;
	//console.log("-  id.......=["+id+"]");
	
	filename = getFileName(filename, id, kind);
	//console.log("- filename=["+filename+"]");
	
	// It formats the JSON so that everything is not on one line. 
	// If you want everything on the same line, remove the stringFy parameters by leaving only the req.body	
	content = JSON.stringify(req.body, null, "\t");
	//console.log("- content=["+content+"]");	
	
	writeJSON(filename, content);
	res.send("200");
	next();
};

// ************************************************************************************************************************************************************ 
// This funciton create N response's files from a list of key values stored in ./servisim/massa
// You can call from browser  (Solicitar Analise Credito Oi Total) http://127.0.0.1:8089/clientes/analises/v1/oitotal/credito/breed
// ************************************************************************************************************************************************************ 
module.exports.breed = function (req, res, next, kind){
	console.log("->  [breed] kind=["+kind+"]");

	var fileNameTemplate = getFileNameDataTemplate(kind);

	var contentTemplate  = "";
	if (kind == interacaoofertasnba360JSON){
		contentTemplate = fs.readFileSync(fileNameTemplate, "utf8");
	}else{
       contentTemplate  = JSON.parse( fs.readFileSync(fileNameTemplate, "utf8"));

	} 
	
	console.log("- fileNameTemplate=["+fileNameTemplate+"]");
	console.log("- contentTemplate =["+JSON.stringify(contentTemplate)+"]");

	var fileNameDataIDs = "massa/" + kind + '.txt';
	var contentDataIDs  = JSON.parse( fs.readFileSync(fileNameDataIDs, "utf8"));
	console.log("- fileNameDataIDs =["+JSON.stringify(fileNameDataIDs)+"]");
    console.log("- contentDataIDs  =[" + JSON.stringify(contentDataIDs) + "]");	

	
	for (var i =0; i < contentDataIDs.length; i++) {

		console.log("- contentDataIDs["+i+"] = ("+JSON.stringify(contentDataIDs[i])+")");	

		var id = contentDataIDs[i].id;
		var fileNameDataTest = getFileNameDataTest(kind,id);

		fs.writeFile(fileNameDataTest, JSON.stringify(contentTemplate), function (err) {
			  if (err)throw err;
		});

	 } 

	res.send(contentDataIDs.length +" new breed was generated");
	console.log("<-  [breed] ");
	next();
};


// *****************************************************************************************************************************************************************
// * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 *
// *****************************************************************************************************************************************************************

// --------------------------------------------------
//Solicitar Analise Cedito Oi Total
// --------------------------------------------------
module.exports.solicitarAnaliseCreditoRequest = function (req, res, next, cache, kind){
	id		= req.body.SolicitarAnaliseCreditoRequest.TempNumDocumento;
	filename= getFileName(filename, id, kind);
	content = loadJSON(content, filename, cache);
	console.log( "[solicitarAnaliseCreditoRequest] - " +  `Worker PID=[${process.pid}] started` + " SolicitarAnaliseCreditoRequest.TempNumDocumento.......=["+id+"]");

	// REGRA DE NEGÓCIO: Timeout solicitado pela equipe de teste de performace para simular o retorno deste serviço
	new Promise(function(resolve, reject){       
		setTimeout(function(){ resolve("Wating...");}, solicitaranalisecreditooitotalTIMEOUT );
	}).then( function(value){
		res.send(content);
		next();	
	});
};

// --------------------------------------------------
// Registrar Nova Analise Credito
// --------------------------------------------------
module.exports.registrarNovaAnaliseCreditoRequest = function (req, res, next, cache, kind){
	id		= req.body.DataRequest.RegistrarNovaAnaliseCreditoRequest.NumeroProposta;
	filename= getFileName(filename, id, kind);
	content = loadJSON(content, filename, cache);
	console.log( "[registrarNovaAnaliseCreditoRequest] - " +  `Worker PID=[${process.pid}] started` + " DataRequest.RegistrarNovaAnaliseCreditoRequest.NumeroProposta.......=["+id+"]");

	// REGRA DE NEGÓCIO: Timeout solicitado pela equipe de teste de performace para simular o retorno deste serviço
	new Promise(function(resolve, reject){       
		setTimeout(function(){ resolve("Wating...");}, registrarnovaanalisecreditoTIMEOUT );
	}).then( function(value){
		res.send(content);
		next();	
	});
};

// --------------------------------------------------
// Solicitar Reserva Porta
// --------------------------------------------------
module.exports.solicitarReservaPortaRequest = function (req, res, next, cache, kind){
	id		= req.body.SolicitarReservaPortaRequest.GrupoRequest.matriculaSolicitante;
	filename= getFileName(filename, id, kind);
	content = loadJSON(content, filename, cache);
	console.log( "[solicitarReservaPortaRequest] - " +  `Worker PID=[${process.pid}] started` + " SolicitarReservaPortaRequest.GrupoRequest.matriculaSolicitante.......=["+id+"]");

	// REGRA DE NEGÓCIO: Timeout solicitado pela equipe de teste de performace para simular o retorno deste serviço
	new Promise(function(resolve, reject){       
		setTimeout(function(){ resolve("Wating...");}, solicitarreservaportaTIMEOUT );
	}).then( function(value){
		res.send(content);
		next();	
	});
};

// --------------------------------------------------
// Alterar Contato Conta
// --------------------------------------------------
module.exports.alterarContatoContaRequest = function (req, res, next, cache, kind){
	id		= req.body.DataRequest.AlterarContatoContaRequest.ListaContatos.Contato.EnderecoEmail;
	filename= getFileName(filename, id, kind);
	content = loadJSON(content, filename, cache);
	console.log( "[alterarContatoContaRequest] - " +  `Worker PID=[${process.pid}] started` + " DataRequest.AlterarContatoContaRequest.ListaContatos.Contato.EnderecoEmail.......=["+id+"]");

	// REGRA DE NEGÓCIO: Timeout solicitado pela equipe de teste de performace para simular o retorno deste serviço
	new Promise(function(resolve, reject){       
		setTimeout(function(){ resolve("Wating...");}, alterarcontatocontaTIMEOUT );
	}).then( function(value){
		res.send(content);
		next();	
	});
};

// --------------------------------------------------
// Inclui Cliente 	
// --------------------------------------------------
module.exports.incluiClienteRequest = function (req, res, next, cache, kind){
	id		= req.body.IncluirClienteRequest.NUMDOC;
	filename= getFileName(filename, id, kind);
	content = loadJSON(content, filename, cache);
	console.log( "[incluiClienteRequest] - " +  `Worker PID=[${process.pid}] started` + " IncluirClienteRequest.NUMDOC.......=["+id+"]");

	// REGRA DE NEGÓCIO: Timeout solicitado pela equipe de teste de performace para simular o retorno deste serviço
	new Promise(function(resolve, reject){       
		setTimeout(function(){ resolve("Wating...");}, incluiclienteTIMEOUT );
	}).then( function(value){
		res.send(content);
		next();	
	});
};

// --------------------------------------------------
// Inserir Contato Conta
// --------------------------------------------------
module.exports.inserirContatoContaRequest = function (req, res, next, cache, kind){
	id		= req.body.DataRequest.inserirContatoContaRequest.ListaContatos.Contato.IdUsuario;
	filename= getFileName(filename, id, kind);
	content = loadJSON(content, filename, cache);
	console.log( "[inserirContatoContaRequest] - " +  `Worker PID=[${process.pid}] started` + " DataRequest.inserirContatoContaRequest.ListaContatos.Contato.IdUsuario.......=["+id+"]");

	// REGRA DE NEGÓCIO: Timeout solicitado pela equipe de teste de performace para simular o retorno deste serviço
	new Promise(function(resolve, reject){       
		setTimeout(function(){ resolve("Wating...");}, inserircontatocontaTIMEOUT );
	}).then( function(value){
		res.send(content);
		next();	
	});
};

// --------------------------------------------------
// Manter Reserva Porta 
// --------------------------------------------------
module.exports.manterreservaportaRequest = function (req, res, next, cache, kind){
	id		= req.body.ManutencaofacilidadeNumeroPortaRequest.nrcCliente;
	filename= getFileName(filename, id, kind);
	content = loadJSON(content, filename, cache);
	console.log( "[manterreservaportaRequest] - " +  `Worker PID=[${process.pid}] started` + " ManutencaofacilidadeNumeroPortaRequest.nrcCliente.......=["+id+"]");

	// REGRA DE NEGÓCIO: Timeout solicitado pela equipe de teste de performace para simular o retorno deste serviço
	new Promise(function(resolve, reject){       
		setTimeout(function(){ resolve("Wating...");}, manterreservaportaTIMEOUT );
	}).then( function(value){
		res.send(content);
		next();	
	});
};

// --------------------------------------------------
// Registrar Conta Fatura	
// --------------------------------------------------
module.exports.registrarcontafaturaRequest = function (req, res, next, cache, kind){
	id		= req.body.DataRequest.RegistrarContaFaturaRequest.Telefone.Numero; //Telefone.Numero ou Identificacao.NumeroDocumento
	filename= getFileName(filename, id, kind);
	content = loadJSON(content, filename, cache);
	console.log( "[registrarcontafaturaRequest] - " +  `Worker PID=[${process.pid}] started` + " DataRequest.Telefone.Numero.......=["+id+"]");

	// REGRA DE NEGÓCIO: Timeout solicitado pela equipe de teste de performace para simular o retorno deste serviço
	new Promise(function(resolve, reject){       
		setTimeout(function(){ resolve("Wating...");}, registrarcontafaturaTIMEOUT );
	}).then( function(value){
		res.send(content);
		next();	
	});
};

// --------------------------------------------------
// Interacao Ofertas NBA360	 <?xml version="1.0"?>
// --------------------------------------------------
module.exports.interacaoOfertasNBA360Request = function (req, res, next, cache, kind){

	var xmlData = req.body;
	//console.log("xmlData=["+xmlData+"]");

	var jsonObj = parser.parse(xmlData, options);
	//console.log("jsonObj=["+JSON.stringify(jsonObj)+"]");

	id		= jsonObj.InteracaoOfertasNBA360ConsultaTopOfertas360InputMessage.Customer.ACCOUNT_ID; // XML
	//console.log("id=["+id+"]");
	
	filename= getFileName(filename, id, kind);
	content = fs.readFileSync(filename, "utf8");
	console.log( "[interacaoOfertasNBA360Request] - " +  `Worker PID=[${process.pid}] started` + " InteracaoOfertasNBA360ConsultaTopOfertas360InputMessage.Customer.ACCOUNT_ID......=["+id+"]");

	// REGRA DE NEGÓCIO: Timeout solicitado pela equipe de teste de performace para simular o retorno deste serviço
	new Promise(function(resolve, reject){       
		setTimeout(function(){ resolve("Wating...");}, interacaoofertasnba360TIMEOUT );
	}).then( function(value){
		res.send(content);
		next();	
	});
};

// *****************************************************************************************************************************************************************
// * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 * Oi360 *
// *****************************************************************************************************************************************************************