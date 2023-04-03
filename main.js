const feeds = [
    {
        url:'https://news.google.com/news/rss',
        name:'Google news'
    },
    {
        url:'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
        name:'New York Times'
    },
    {
        url:'https://www.theguardian.com/world/rss',
        name:'The Guardian'
    },
    {
        url:'https://www.aljazeera.com/xml/rss/all.xml',
        name:'Al Jazeera'
    },
    {
        url:'https://feeds.bbci.co.uk/news/rss.xml',
        name:'BBC News'
    },
    {
        url:'https://cdn.feedcontrol.net/8/1114-wioSIX3uu8MEj.xml',
        name:'Reuters'
    },
    {
        url:'http://rss.cnn.com/rss/cnn_topstories.rss',
        name:'CNN'
    },
    {
        url:'https://www.yahoo.com/news/rss',
        name:'Yahoo News'
    },
    
    {
        url:'https://www.ft.com/?format=rss',
        name:'Financial Times'
    },
    {
        url:'https://www.espn.com/espn/rss/news',
        name:'ESPN'
    },
    
    {
        url:'https://feeds.simplecast.com/qm_9xx0g',
        name:'Crime Junkie'
    },
    {
        url:'https://rss.art19.com/apology-line',
        name:'The Apology Line'
    },
    {
        url:'https://feeds.megaphone.fm/WWO3519750118',
        name:'The Dan Bongino Show'
    }
    
];

const feedList = document.getElementById('feeds');
const sub = document.getElementById('sub')

loadFeeds(feeds);

sub.addEventListener("click", function() {
    
    var popup = document.createElement("div");
    popup.innerHTML = "Add a new Resource <br><br>";
    var input1 = document.createElement("input");
    var input2 = document.createElement("input");
    var submitButton = document.createElement("button");

    submitButton.style.position = "absolute";
    submitButton.style.top = "75%";
    submitButton.style.left = "40%";

    popup.style.position = "absolute";
    popup.style.top = "50%";
    popup.style.left = "60%";
    popup.style.height ="25%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "darkorange";
    popup.style.padding = "20px";
    popup.style.borderRadius = "5px";
    popup.style.boxShadow = "0px 0px 5px 0px rgba(0,0,0,0.75)";


    input1.setAttribute("type","text")
    input2.setAttribute("type","text")
    input1.setAttribute("placeholder","Enter RSS feed title")
    input2.setAttribute("placeholder","Enter RSS feed URL")
    submitButton.setAttribute("type","button")
    submitButton.innerHTML = "Submit"

    submitButton.addEventListener("click",function() {
    const url = input2.value;
    const title = input1.value;

    if(title.trim() ===''){
        showError('Title cannot be empty.Please enter a title.');
        return;
    }
    if(url.trim() ===''){
        showError('URL cannot be empty.Please enter a URL.');
        return;
    }
    if(!isValidUrl(url)) {
        showError('Invalid URL.Please enter a valid URL.');
        return;
    }  

    document.body.removeChild(popup)

    const newFeed = {url:url, name:title};
    feeds.unshift(newFeed);

    loadFeeds(feeds);

})
    popup.appendChild(input1);
    popup.appendChild(input2);
    popup.appendChild(submitButton);

    document.body.appendChild(popup)
})

function loadFeeds(feeds) {

    feedList.innerHTML = '';
    for(let i=0;i<10;i++) {
        const feedUrl = feeds[i].url;
        const feedName = feeds[i].name;

        const feedTitle = document.createElement('h2');
        feedTitle.style.color = 'darkorange';
        feedTitle.textContent = feedName;
        feedList.appendChild(feedTitle);

        const feedurl = document.createElement('h4');
        feedurl.style.color = 'skyblue';
        feedurl.style.textDecoration = 'underline';
        feedurl.style.cursor = 'pointer'
        feedurl.textContent = feedUrl;
        feedList.appendChild(feedurl);

        const br = document.createElement('br')
        feedList.appendChild(br);

        feedurl.addEventListener("click", function(){

            fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`)
                .then(response => response.json())
                .then(data => {
                const feedItems = data.items;

                const feedListItems = document.createElement('ul');

                for (let j=0;j<feedItems.length;j++) {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.style.color = 'lightblue';
                    link.textContent = feedItems[j].title;
                    link.href = feedItems[j].link;
                    listItem.appendChild(link);
                    feedListItems.appendChild(listItem);
                }
                feedurl.replaceWith(feedListItems);
            })
            .catch(error => console.log(error))
    })
}
}

function isValidUrl(url) {
    const rssRegex = /^https?:\/\/(?:www\.)?.+(\.(rss|xml))?(?:$|\/|\?)/i;
    return rssRegex.test(url);
}

function showError(message) {
    const errorContainer = document.createElement('div');
    errorContainer.style.color = 'red';
    errorContainer.style.fontSize = '20px'
    errorContainer.classList.add('error');
    errorContainer.textContent=message;
    document.body.appendChild(errorContainer);
    setTimeout(() => {
        document.body.removeChild(errorContainer);
    }, 3000);
}
