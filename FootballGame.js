
src="https://d3js.org/d3.v5.min.js"

// Make an express server
var express = require("express");
var app = express();app.listen(3000, () => {
 console.log("Server running on port 3000");
});

playedGamesData = initializePlayedGamesData();
upcomingGamesData = initializeUpcomingGamesData();

function initializePlayedGamesData(){
   
    var data = []; 
    var fs = require('fs');
    var csvFilePath = "result_played.csv";
    const csv=require('csvtojson')
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        playedGamesData.push(jsonObj);
    })
    return data; 
}

function initializeUpcomingGamesData(){
   
    var data = []; 
    var fs = require('fs');
    var csvFilePath = "result_upcoming.csv";
    const csv=require('csvtojson')
    csv()
    .fromFile(csvFilePath)
    .then((jsonObj)=>{
        upcomingGamesData.push(jsonObj);
    })
    return data; 
}


//==========================================================================
// Create a simple GET request that returns a list of matches by team.
app.get("/team/:name", (req, res, next) => {
    const teamName = req.params.name;
    res.json(getMatchesByTeam(teamName));
    console.log("getMatchesByTeam - " + teamName);
   });


//==========================================================================
// Create a GET request that returns a list of matches by team filtered by status.
app.get("/team/:name/:status", (req, res, next) => {
    const teamName = req.params.name;
    const matchStatus = req.params.status;
    res.json(getMatchesListByTeamAndStatus(teamName, matchStatus));
    console.log("getMatchesListByTeamAndStatus - " + teamName +", " + matchStatus);
   });
   

//==========================================================================
// Create a simple GET request that returns a list of matches by tournament.
app.get("/tournament/:name", (req, res, next) => {
    const tournamentName = req.params.name;
    res.json(getMatchesByTournament(tournamentName));
    console.log("getMatchesByTournament - " + tournamentName);
   });


//==========================================================================
// Create a simple GET request that returns a list of matches by tournament filtered by status.
app.get("/tournament/:name/:status", (req, res, next) => {
    const tournamentName = req.params.name;
    const matchStatus = req.params.status;
    res.json(getMatchesByTournamentAndStatus(tournamentName, matchStatus));
    console.log("getMatchesByTournamentAndStatus - " + tournamentName + ", " +  matchStatus);

   });
//==========================================================================


function getMatchesByTeam(name){

    var playedGamesFilteredData = playedGamesData[0].filter(a=>a.home_team == name || a.away_team == name);
    
    var upcomingGamesFilteredData = upcomingGamesData[0].filter(a=>a.home_team == name || a.away_team == name);

    var filteredData = playedGamesFilteredData.concat(upcomingGamesFilteredData);

    return filteredData;
}


function getMatchesListByTeamAndStatus(name, status){

    var currData;

    if(status == "played"){
        currData = playedGamesData;
    }
    else if(status == "upcoming"){
        currData = upcomingGamesData;
    }
    var filteredData = currData[0].filter(a=>a.home_team == name || a.away_team == name);
    return filteredData;
}


function getMatchesByTournament(name){

    var playedGamesFilteredData = playedGamesData[0].filter(a=>a.tournament == name);
    
    var upcomingGamesFilteredData = upcomingGamesData[0].filter(a=>a.tournament == name);
    
    var filteredData = playedGamesFilteredData.concat(upcomingGamesFilteredData);

    return filteredData;
}


function getMatchesByTournamentAndStatus(name, status){

    var currData;

    if(status == "played"){
        currData = playedGamesData;
    }
    else if(status == "upcoming"){
        currData = upcomingGamesData;
    }
    var filteredData = currData[0].filter(a=>a.tournament == name);
    return filteredData;
}
