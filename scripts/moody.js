//Source for peridically changing image: https://stackoverflow.com/questions/24856567/changing-images-periodically-in-javascript
var myMood= document.getElementById("mood");
        var images=[
            "images/websiteImage4.webp",
            "images/websiteImage5.webp"
        ];



        function change(){
                myMood.src= images.reverse()[0];
        }

        setInterval(change,2000);    