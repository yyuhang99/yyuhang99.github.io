const header = document.querySelector(".header");
const searchBar = document.querySelector(".search-bar")
const searchButton = document.querySelector(".search");
const textBox = document.querySelector(".textbox");
const imageDisplay = document.querySelector(".image-display");

var firstSearch = false;

function search(){
    var keyword = textBox.value;
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
    {
        tags: keyword,
        tagmode: "any",
        format: "json"
    },
    function(data){
        if (!firstSearch){
            console.log("first");
            searchBar.style.top = "25%";
        }
        var rnd = Math.floor(Math.random() * data.items.length);
        var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
        imageDisplay.style.background = "url('" + image_src + "')";
        imageDisplay.style.backgroundRepeat = "no-repeat";
        imageDisplay.style.backgroundSize = "cover";
        imageDisplay.style.backgroundPosition = "center";
    });
}

searchButton.addEventListener("click", search);
