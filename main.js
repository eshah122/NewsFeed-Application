let newsFeed = ['N1','N2','N3','N4','N5','N6','N7','N8','N9','N10'];

function begin(){
    let newsList = document.getElementById("news-list")
    newsList.innerHTML =" ";
    for(let i =0;i<10;i++){
        let listItem = document.createElement("li");
        listItem.textContent = newsFeed[i];
        newsList.appendChild(listItem);
}
}

let submitBtn=document.getElementById("submit-btn");
submitBtn.addEventListener("click",function(event){
    event.preventDefault();
    let newsInput = document.getElementById("news-input");
    let newsHeadline = newsInput.value.trim();
    newsFeed.unshift(newsHeadline);
    newsInput.value='';
    begin();
    
});

