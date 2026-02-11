import {adsFlamengo} from './ads-flamengo.js';
import {adsGlobal} from './ads-global.js';


export default (req,res) => {

    let _id = req.query.id;

    let _result = adsGlobal;

    if (_id =='flamengo')
      _result =  adsFlamengo;

    res.status(200).json(_result)
}

/*
export async function getStaticProps(context) {
    console.log("-> getStaticProps(context) " + context);
    return {
        props: { "global": adsGlobal, "flamengo": adsFlamengo}, // will be passed to the page component as props
    }
}  

export async function getStaticPaths() {
    console.log("-> getStaticPaths() ");
    return {
      paths: [ { params: { "global": adsGlobal, "flamengo": adsFlamengo} } ],
      fallback: false 
    };
  }
  
*/

  