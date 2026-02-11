export default (req, res) => {
  res.status(200).json( adsFlamengo )
}


export const adsFlamengo = [
{
    "anuncios":{ 
      "created_at": "2020-07-31T11:37:16.964Z",
      "ordemExibicao": [ {"id":"020202020"}, {"id":"020202020"},{"id":"020202020"},{"id":"030303030"},{"id":"01010101"}],
      "anuncio":[
        {
        "id": "01010101" ,
        "urlVideo" : "https://www.youtube.com/watch?v=JIalPVuKJPs",
        "urlBanner" : "https://http2.mlstatic.com/D_NQ_NP_898772-MLB33001615067_112019-O.jpg",
        "urlCTA": "https://www.flamengo.com.br/",
        "descCTA": "Contrate Aqui",
        "tituloAnuncio": "Vamos Flamengo",
        "descAnuncio": "Participe do Programa Sócio Torcedor",
        "urlAvatar": "https://logodownload.org/wp-content/uploads/2016/09/flamengo-logo-escudo-novo-1.png",
        "nomeAnunciante": "Flamengo"
        }
        ]
    }
}]