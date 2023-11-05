const search=new URLSearchParams(window.location.search);
const id=search.get("id");
console.log(id);
axios.get(`https://moviesapi.ir/api/v1/movies/${id}`).then(res=>{
    setData(res.data);
}).catch(err=>{console.log(err);});
function setData(data){
    const html=document.documentElement;
    const poster=document.querySelector(".detail_poster");
    const title=document.querySelector(".detail_title");
    const dec=document.querySelector(".detail_des");
    const actor=document.querySelector(".detail_actor");
    const rate=document.querySelector(".detail_rate");
    const runtime=document.querySelector(".detail_runtime");
    const genres=document.querySelector(".detail_genres");

    
    poster.src=data.poster;
    title.innerHTML=data.title;
    dec.innerHTML=data.plot;
    actor.innerHTML=`actors: ${data.actors}`
    rate.innerHTML=data.rated;
    runtime.innerHTML=data.runtime;
    genres.innerHTML=data.genres.join(",");
    html.style.backgroundImage=`url(${data.images[0]})`;
}