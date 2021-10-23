<div id="hotel_container">
    <h1 id="hotelName"><&>name<&></h1>
    <button data-id="<&>id<&>" class="favourite hotel single">❤️</button>
    <br>
    <br>
    <div class="singleHotelContent">
        <div class="hotelInfos">

            <div class="leftBar">
                <p class="card-text"><%>price<%>: ab <&>price<&>€</p>
                <p class="card-text stars"><%>stars<%>: <&>stars<&><span class="noStars"><&>noStars<&></span></p>
                <br>
                <table id="equipment"></table>
                <br>
                <a id="websiteLink">
                    <button class="moreButton"><%>visit<%></button>
                </a>
                <hr class="seperator">
                <div class="contactElements">
                    <h3 class="headline3"><%>contact<%></h3>
                    <p class="contactParagraph"><%>phone<%>: <span id="phoneNumber"></span></p>
                    <p class="contactParagraph"><%>mail<%>: <span id="mailAddress"></span></p>
                </div>
            </div>

            <div class="rightBar">
                <hr class="seperator2">
                <p id="hotelDescription"></p>
                <br>

                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner" id="hotel_gallery">

                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>

                <h3 class="headline3"><%>approach<%></h3>
                <div class="row">
                    <div class="col-4">
                        <p id="streetAddress"></p>
                    </div>
                    <div class="col-8" id="map">

                    </div>
                </div>
            </div>

        </div>

    </div>
</div>