<?php

function distance( $lat1, $lon1, $lat2, $lon2, $mode=true ) {
  $radLat1 = $lat1 * M_PI / 180.0;
  $radLon1 = $lon1 * M_PI / 180.0;
  $radLat2 = $lat2 * M_PI / 180.0;
  $radLon2 = $lon2 * M_PI / 180.0;
  $radLatAve = ($radLat1 + $radLat2) / 2.0;
  $radLatDiff = $radLat1 - $radLat2;
  $radLonDiff = $radLon1 - $radLon2;
  $sinLat = sin($radLatAve);
  if( $mode) {
    $temp = 1.0 - 0.00669438 * ($sinLat*$sinLat);
    $meridianRad = 6335439.0 / sqrt($temp*$temp*$temp);
    $dvrad = 6378137.0 / sqrt($temp);
  } else {
    $temp = 1.0 - 0.00667478 * ($sinLat*$sinLat);
    $meridianRad = 6334834.0 / sqrt($temp*$temp*$temp);
    $dvrad = 6377397.155 / sqrt($temp);
  }
    $t1 = $meridianRad * $radLatDiff;
    $t2 = $dvrad * Cos($radLatAve) * $radLonDiff;
    $dist = sqrt(($t1*$t1) + ($t2*$t2));
    return $dist;
}

$lat=$_REQUEST['latitude'];
$lon=$_REQUEST['longitude'];

$con = mysql_connect('127.0.0.1', 'dbuser', 'dbpass'); if (!$con) { exit('cannot connect to mysql.'); }

$result = mysql_select_db('touchTalk', $con); if (!$result) { exit('error'); }

$result = mysql_query('SET NAMES utf8', $con); if (!$result) { exit('error'); }

$query = "SELECT * FROM locations WHERE latitude IS NOT NULL AND longitude IS NOT NULL";
//クエリ実行
$result = mysql_query($query);
//条件にあうデータを格納する配列
$findAry = array();
while ($row = mysql_fetch_assoc($result)) {
    if (isset($lat) && isset($lon)){
        //GPSからのクエリの場合距離計算(m)
        $dist = distance( $lat , $lon , $row["latitude"] ,$row["longitude"] ,true);
        //debug
        //echo "dist:" . $dist . " lat:" . $row["latitude"] . " lot:" . $row["longitude"] . "<br>";
        //指定距離内なら配列追加 (今回は5km)
        if ($dist < 5000){
            array_push($findAry ,array( "id" => $row["id"] , 
/*
                                    "name" => mb_convert_encoding(htmlspecialchars($row["name"]),"sjis-win" , "UTF-8") , //DB,PHPがUFT8のため携帯向けのshift-jisに変換
                                     "engname" => mb_convert_encoding(htmlspecialchars($row["engname"]),"sjis-win" , "UTF-8") ,
                                    "latitude" => $row["latitude"] , 
                                    "longitude" => $row["longitude"] ,     ));
*/
                                    "name" => $row["name"] ,
                                    "engname" => $row["engname"],
                                    "latitude" => $row["latitude"] , 
                                    "longitude" => $row["longitude"] ,     ));
        }
    }
}


echo json_encode($findAry);
?>
