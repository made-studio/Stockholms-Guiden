<?php
set_time_limit(300);
ini_set('memory_limit', '256M');
header("Content-Type: text/plain");
error_reporting(E_ALL);
ini_set('display_errors', 1);


$linkPattern = '/https:\/\/music.apple.com\/us\/album\/[\p{L}0-9-]+\/[0-9]+/iu';

//Crawls albums and extracts genre
function crawl($linkPattern, $link, $conn, $genresCountry) {
    $seenLinks = array();
    $html = file_get_contents($link);
    if ($html === FALSE) {
        echo "Error fetching HTML content";
        return;
    }
    preg_match_all($linkPattern, $html, $linkmatches);
    $uniqueLinks = array_unique($linkmatches[0]);


    //Array av genrer och deras id.
    $genres = [
        "#HIP-HOP/RAP#" => 1,
        "#POP#" => 2,
        "#R&B/SOUL#" => 3,
        "#COUNTRY#" => 4,
        "#MUSICA MEXICANA#" => 5,
        "#ALTERNATIVE#" =>6,
        "#URBANO LATINO#"=>7,
        "#LATIN#"=>8,
        "#AMERICANA#"=>9,
        "#DANCE#"=>10,
        "#ELECTRONIC#"=>11,
        "#ROCK#"=>12,
        "#AFROBEATS#"=>13,
        "#SINGER/SONGWRITER#"=>14,
        "#AFRO-FUSION#"=>15,
        "#SOUNDTRACK#"=>16,
        "#INDIE ROCK#"=>17,
        "#HOUSE#"=>18,
        "#CHILDREN'S MUSIC#"=>19,
        "#HOLIDAY#"=>20,
        "#SPOKEN WORD#"=>21

        
    ];


    foreach ($uniqueLinks as $newLink) {
        if (!in_array($newLink, $seenLinks)) {
            echo $newLink;
            $seenLinks[] = $newLink;


            $newHtml = @file_get_contents($newLink);
            if ($newHtml === FALSE) {
                echo "Error fetching: ".$newLink;
                continue;
            }


            foreach ($genres as $pattern => $id) {
                if (preg_match($pattern, $newHtml)) {
                    echo "Genre ID: " . $id;
                    $stmt = $conn->prepare("UPDATE '$genresCountry' SET genresTotal = genresTotal + 1 WHERE idgenres = ?");
                    $stmt->bind_param("i", $id);
                    if ($stmt->execute()) {
                        echo "Record updated successfully";
                    } else {
                        echo "Error updating record: " . $conn->error;
                    }
                    $stmt->close();
                    break; 
                }
            }
        }
    }
}

//Crawls albums and extracts top songs
function crawlSongs($linkPattern, $link, $conn) {
    $seenLinks = array();
    $html = file_get_contents($link);
    if ($html === FALSE) {
        echo "Error fetching HTML content";
        return;
    }
    preg_match_all($linkPattern, $html, $linkmatches);
    $uniqueLinks = array_unique($linkmatches[0]);
    $i=0;
    foreach ($uniqueLinks as $newLink) {
        if (!in_array($newLink, $seenLinks) && $i < 5) {
            $songName = substr($newLink,33, -11);
            echo $songName;
            $seenLinks[] = $newLink;
            $i++;
            $stmt = $conn->prepare("INSERT INTO songsus (songname) VALUES (?)");
            $stmt->bind_param("s", $songName);
            if ($stmt->execute()) {
                echo "Record updated successfully";
            } else {
                echo "Error updating record: " . $conn->error;
            }
            $stmt->close();
        }
    }
}

$conn = new mysqli("p:localhost", "root", "Matteus@13", "playlist");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";


function updateUK($conn, $linkPattern){
    $link = 'https://music.apple.com/us/playlist/top-100-uk/pl.c2273b7e89b44121b3093f67228918e7';
    $stmt = $conn->prepare("DELETE FROM genresuk;");
    $stmt->execute();
    $genresCountry ="genresuk";
    crawl($linkPattern, $link, $conn,$genresCountry);
    }

function updateUS($conn, $linkPattern){
    $link = 'https://music.apple.com/us/playlist/top-100-usa/pl.606afcbb70264d2eb2b51d8dbcfa6a12';
    $stmt = $conn->prepare("DELETE FROM genres;");
    $stmt->execute();
    $genresCountry ="genres";
    crawl($linkPattern, $link, $conn,$genresCountry);
    }    

    function updateSWE($conn, $linkPattern){
    $link = 'https://music.apple.com/us/playlist/top-100-sweden/pl.5876877c387b4ffb8860ac3ea2c244c3';    
    $stmt = $conn->prepare("DELETE FROM genresswe;");
    $stmt->execute();
    $genresCountry ="genresswe";
    crawl($linkPattern, $link, $conn,$genresCountry);
    }
    
    function updateSongs($conn,$linkPattern){
    $link = 'https://music.apple.com/us/playlist/top-100-uk/pl.c2273b7e89b44121b3093f67228918e7';
    $stmt = $conn->prepare("DELETE FROM songsus;");
    $stmt->execute();
    crawlSongs($linkPattern,$link,$conn);
    }

    //Läser varje månad av top 100 listorna och uppdaterar databasen samt skickar ut ett nytt mail med topplåtar till registrerade mailadresser.
    while (true) {
        $interval = 30 * 24 * 60 * 60;
        $currentTimestamp = time();
        if ($currentTimestamp % $interval === 0) {
            //updateUK($conn,$linkPattern);
            //updateUS($conn,$linkPattern);
            //updateSWE($conn,$linkPattern);
            //updateSongs($conn,$linkPattern);
            //sendToRegistredEmails($conn);
        }
        sleep(24 * 60 * 60);
    }

$conn->close();
?>