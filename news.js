document.addEventListener("DOMContentLoaded", () => {
const apiKey="f73810f7af6e4e95b77e8e3c18c4fb3d";

const blogcon=document.getElementById("blog-conitainer");
const searchnews=document.getElementById("searchoption");
const searchbu=document.getElementById("searchbutton");

async function fetchrandom(){
    try{
     const apiUrl=`

     https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;
     const response=await fetch(apiUrl);
     const data=await response.json();
     console.log(data);
    return data.articles;
    }catch(error){
       
        console.log("Error in fecthing data",error);
      
        return []
    }
}
searchbu.addEventListener("click",async ()=>{
  const query=searchnews.value.trim();
  if(query !== ""){
    try{
     const articles=await fetchnewsquery(query);
     displaydata(articles);
    
     }catch(error){
        
         console.log("Error in fecthing the query",error);
       
         return []
     }
  }
  
});
async function fetchnewsquery(query){
  try{
    const apiUrl=`
    https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
    const response=await fetch(apiUrl);
    const data=await response.json();
    if(data.length==0){
      alert("No result found");
    }
    else{
      return data.articles;
    }
   
   }catch(error){
      
       console.log("Error in fecthing data",error);
     
       return []
   }
}
function displaydata(articles){
  if (!articles) {
    console.log("No articles to display");
    return;
}
  blogcon.innerHTML="";
  articles = articles.filter(article => article.urlToImage);
  articles.forEach((article)=>{
    const divv=document.createElement("div");
    divv.classList.add("blog-img");
    const img=document.createElement("img");
    img.src = article.urlToImage||'https://via.placeholder.com/150'; 
    img.alt = article.title;
    const title=document.createElement("h2");
    
    const trunkatedtitle=article.title.length>30? article.title.slice(0,30)+"....." : article.title;
    title.textContent=trunkatedtitle;
   
    const description=document.createElement("p");
    
    description.textContent=article.description;

    divv.appendChild(img);
    divv.appendChild(title);
    divv.addEventListener("click",()=>{
      window.open(article.url,"-blank");
    })
    divv.appendChild(description);
    blogcon.appendChild(divv);
  });
}

(async () => {
    try{
     const articles=await fetchrandom();

     displaydata(articles);
    }catch(error){
        console.log("Error in fecthing data",error);
    }
})();
});
