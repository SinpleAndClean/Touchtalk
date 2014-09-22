<?php

//$distance.


$con = mysql_connect('210.169.191.238', 'dbuser', 'dbpass'); if (!$con) { exit('connot connect to mysql.'); }
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
            array_push($findAry ,array( "id" => $row["id"],
                                    "name" => mb_convert_encoding(htmlspecialchars($row["name"]),"sjis-win" , "UTF-8") , //DB,PHPがUFT8のため携帯向けのshift-jisに変換
                                     "engname" => mb_convert_encoding(htmlspecialchars($row["engname"]),"sjis-win" , "UTF-8") ,
                                    "latitude" => $row["latitude"] , 
                                    "longitude" => $row["longitude"] ,));
        }
    }
}

?>