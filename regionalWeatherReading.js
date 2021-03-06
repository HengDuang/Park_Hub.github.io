
var globalNorthTemp = 0, globalEastTemp = 0, globalWestTemp = 0, globalSouthTemp = 0, globalCentralTemp = 0;

function regionalWeatherReading(){
    
    fetch('https://api.data.gov.sg/v1/environment/air-temperature')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                
                document.getElementById("TimeStamp").innerHTML = "Timestamp: " + data.items[0].timestamp;

                var northSideCount = 0, westSideCount = 0, eastSideCount = 0, southSideCount = 0, centralSideCount = 0;
                var northSide = 0, westSide = 0, eastSide = 0, southSide = 0, centralSide = 0;
                var northTemp = 0, westTemp = 0, eastTemp = 0, southTemp = 0, centralTemp = 0, overallTemp = 0;


                for (var i = 0; i < data.metadata.stations.length; i++) {
                    if(data.metadata.stations[i].id == "S100" || data.metadata.stations[i].id == "S104" ){
                        northSideCount++;
                        northSide += data.items[0].readings[i].value;
                    }
                    else if (data.metadata.stations[i].id == "S44" || data.metadata.stations[i].id == "S50" || data.metadata.stations[i].id == "S115" || data.metadata.stations[i].id == "S116" || data.metadata.stations[i].id == "S117" || data.metadata.stations[i].id == "S121" ){
                        westSideCount++;
                        westSide += data.items[0].readings[i].value;
                    }
                    else if(data.metadata.stations[i].id == "S24" || data.metadata.stations[i].id == "S106" || data.metadata.stations[i].id == "S107"){
                        eastSideCount++;
                        eastSide += data.items[0].readings[i].value;
                    }
                    else if(data.metadata.stations[i].id == "S60" || data.metadata.stations[i].id == "S108"){
                        southSideCount++;
                        southSide += data.items[0].readings[i].value;
                    }
                    else if(data.metadata.stations[i].id == "S43" || data.metadata.stations[i].id == "S109" || data.metadata.stations[i].id == "S111"){
                        centralSideCount++;
                        centralSide += data.items[0].readings[i].value;
                    }
                }  

                northTemp = northSide/northSideCount;
                if(northTemp != NaN){
                    globalNorthTemp = northTemp;
                }
                else{
                    northTemp = globalNorthTemp;
                }

                eastTemp = eastSide/eastSideCount;
                if(eastTemp != NaN){
                    globalNorthTemp = eastTemp;
                }
                else{
                    eastTemp = globalEastTemp;
                }

                westTemp = westSide/westSideCount;
                if(westTemp != NaN){
                    globalWestTemp = westTemp;
                }
                else{
                    westTemp = globalWestTemp;
                }

                southTemp = southSide/southSideCount;
                if(southTemp != NaN){
                    globalSouthTemp = southTemp;
                }
                else{
                    southTemp = globalSouthTemp;
                }

                centralTemp = centralSide/centralSideCount;
                if(centralTemp != NaN){
                    globalCentralTemp = centralTemp;
                }
                else{
                    centralTemp = globalCentralTemp;
                }
                var maxTemp = Math.max(northTemp,eastTemp,westTemp,southTemp,centralTemp);
                var minTemp = Math.min(northTemp,eastTemp,westTemp,southTemp,centralTemp);
                //overallTemp = (northTemp+eastTemp+westTemp+southTemp+centralTemp)/5;

                document.getElementById("NorthData").innerHTML = "North Sector: " + northTemp.toFixed(1) + " °C";
                document.getElementById("EastData").innerHTML = "East Sector: " + eastTemp.toFixed(1) + " °C";
                document.getElementById("WestData").innerHTML = "West Sector: " + westTemp.toFixed(1) + " °C";
                document.getElementById("SouthData").innerHTML = "South Sector: " + southTemp.toFixed(1) + " °C";
                document.getElementById("CentralData").innerHTML = "Central Sector: " + centralTemp.toFixed(1) + " °C";
                document.getElementById("OverallWeather").innerHTML = "Overall Weather: " + minTemp.toFixed(1) + "-" + maxTemp.toFixed(1) + " °C";

            })
            .catch(function (err) {
                console.log('error: ' + err);
            });
}