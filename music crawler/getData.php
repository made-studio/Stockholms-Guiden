<?php
require "conn.php";
//Select music from US top 100
$query = "SELECT genreName, genreTotal FROM genres";
$result = $conn->query($query);

if ($result) {
    $php_data_array = array();
    while ($row = $result->fetch_assoc()) {
        $php_data_array[] = $row;
    }
    echo "<script>var my_2d = " . json_encode($php_data_array) . ";</script>";
} else {
    echo "Error: " . $conn->error;
}

//Select music from Sweden top 100
$query_new = "SELECT genreName, genresTotal FROM genresswe";
$result_new = $conn->query($query_new);
if ($result_new) {
    $new_php_data_array = array();
    while ($row = $result_new->fetch_assoc()) {
        $new_php_data_array[] = $row;
    }
    echo "<script>var my_new_2d = " . json_encode($new_php_data_array) . ";</script>";
} else {
    echo "Error: " . $conn->error;
}

//Select music from UK top 100
$query_uk = "SELECT genreName, genresTotal FROM genresuk";
$result_uk = $conn->query($query_uk);
if ($result_uk) {
    $uk_php_data_array = array();
    while ($row = $result_uk->fetch_assoc()) {
        $uk_php_data_array[] = $row;
    }
    echo "<script>var my_uk_2d = " . json_encode($uk_php_data_array) . ";</script>";
} else {
    echo "Error: " . $conn->error;
}

//Retrieve top us songs
$top3songs = "SELECT songname FROM songsus ORDER BY idsongs";

// Execute the query
$topResults = $conn->query($top3songs);

$topSong1;
$topSong2;
$topSong3; 

    for ($i = 0; $i < $topResults->num_rows; $i++) {
        $row = $topResults->fetch_assoc();
        if ($i == 0) {
            $topSong1 = $row['songname'];
        } elseif ($i == 1) {
            $topSong2 = $row['songname'];
        } elseif ($i == 2) {
            $topSong3 = $row['songname'];
        }
    }


$html = file_get_contents('index.html');
$arr = explode("<!-- ==xxx== -->", $html);
$newArr = str_replace(['---$key---','---$key2---','---$key3---'], ["$topSong1","$topSong2","$topSong3"], $arr[1]);
echo $arr[0];
echo $newArr."<br>";
echo $arr[2];

?>