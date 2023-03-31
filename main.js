let newsFeed = [
    {title:"Google News Feed", url: "http://news.google.com/?output=rss"},
    {title:"BBC News Feed", url: "http://www.bbc.co.uk/news/10628494"},
    {title:"CBN World News", url: "http://www.cbn.com/cbnnews/world/feed/"},
    {title:"Daily Telegraph List", url: "https://www.dailytelegraph.com.au/help-rss"},
    {title:"CBN US News", url: "http://www.cbn.com/cbnnews/us/feed/"},
    {title:"Yahoo.com News", url: "http://news.yahoo.com/rss/"},
    {title:"BBC Technology News", url: "http://feeds.bbci.co.uk/news/technology/rss.xml"},
    {title:"BBC Business News", url: "http://feeds.bbci.co.uk/news/business/rss.xml"},
    {title:"BBC UK News", url: "http://feeds.bbci.co.uk/news/rss.xml"},
    {title:"The West Australian", url: "https://thewest.com.au/rss-feeds"}

];

function begin(){
    let newsList = document.getElementById("news-list")
    newsList.innerHTML =" ";
    for(let i =0;i<10;i++){
        let newsItem = newsFeed[i];
        let listItem = document.createElement("li"); 
        let listurl = document.createElement("li");
        let link = document.createElement("a");
        link.style.color = "navy";
        let url = newsItem.url;
        link.href = url;
        link.innerHTML = url ;
        listItem.textContent = newsItem.title;
        listurl.appendChild(link)
        newsList.appendChild(listItem);
        newsList.appendChild(listurl);
        listItem.style.border = "1px dotted black"
        
}
}

let submitBtn=document.getElementById("submit-btn");
submitBtn.addEventListener("click",function(){
    /*
    var t = prompt("Enter the News Title");
    var u = prompt("Enter the News URL");
    var o ={};
    o.title = t;
    o.url = u;
    newsFeed.unshift(o);
    begin();
    */

    var popup = document.createElement("div");
    popup.innerHTML = "Add a new Resource <br><br>";
    var input1 = document.createElement("input");
    var input2 = document.createElement("input");
    var submitButton = document.createElement("button");

    popup.style.position = "absolute";
    popup.style.top = "50%";
    popup.style.left = "60%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "lightcoral";
    popup.style.padding = "20px";
    popup.style.borderRadius = "5px";
    popup.style.boxShadow = "0px 0px 5px 0px rgba(0,0,0,0.75)";

    input1.setAttribute("type","text")
    input2.setAttribute("type","text")
    input1.setAttribute("placeholder","Enter title")
    input2.setAttribute("placeholder","Enter url")
    submitButton.setAttribute("type","button")
    submitButton.innerHTML = "Submit"
    submitButton.addEventListener("click",function() {
        var t = input1.value;
        var u = input2.value;
        document.body.removeChild(popup)
        var o ={};
        o.title = t;
        o.url = u;
        newsFeed.unshift(o);
        begin();
    })
    popup.appendChild(input1);
    popup.appendChild(input2);
    popup.appendChild(submitButton);

    document.body.appendChild(popup)
    
});

