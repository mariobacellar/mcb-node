export default (req, res) => {
  res.status(200).json( adsGlobal )
}

export const adsGlobal = [ 
{
    "anuncios":{ 
      "created_at": "2020-07-31T11:37:16.964Z",
      "ordemExibicao": [ {"id":"020202020"}, {"id":"020202020"},{"id":"020202020"},{"id":"030303030"},{"id":"01010101"}],
      "anuncio":[
        {
        "id": "01010101" ,
        "urlVideo" : "https://www.youtube.com/watch?v=FPIiFBJzh68",
        "urlBanner" : "https://www.glassdoor.com.br/blog/app/uploads/sites/13/2019/06/banner-fellows-itau-1200x675.png",
        "urlCTA": "https://www.itau.com.br/",
        "descCTA": "Contrate Aqui",
        "tituloAnuncio": "Programa Fellows",
        "descAnuncio": "Participe do programa Fellow",
        "urlAvatar": "https://img.ibxk.com.br/2014/4/programas/72483767.png",
        "nomeAnunciante": "Itau"
        },
        {
        "id": "020202020",
        "urlVideo" : "https://www.youtube.com/watch?v=GPTXn9D0W2k",
        "urlBanner" : "https://www.santander.com.br/hotsite/sxpj/assets/banner-5-dias_lp.jpg", 
        "urlCTA": "https://www.santander.com.br/",
        "descCTA": "Cadastre Agora",
        "tituloAnuncio": "Nosso PIX",
        "descAnuncio": "SX Santander só você tem",
        "urlAvatar": "https://www.vizolution.com/wp-content/uploads/2020/06/Santander.jpg",
        "nomeAnunciante": "Santander"
        },
        {
        "id": "030303030",
        "urlVideo" : "https://www.youtube.com/watch?v=nv9h_-d9rbc",
        "urlBanner" : "https://i.pinimg.com/originals/f2/81/52/f28152b02070389fcc60112b0e46bf4b.jpg", 
        "urlCTA": "http://localhost:8080/api/https://www.bb.com.br/pbb/pagina-inicial#/",
        "descCTA": "Venha para o BB",
        "tituloAnuncio": "Isenção de Anuidade",
        "descAnuncio": "Cadastre-se no programa de pontos para sua empresa",
        "urlAvatar": "https://i.pinimg.com/originals/77/28/a4/7728a42eed97b969082f03dd13e6b072.png",
        "nomeAnunciante": "Banco do Brasil"
        }
        ]
    }
}]