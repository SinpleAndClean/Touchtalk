<?php

//$distance.


$con = mysql_connect('210.169.191.238', 'dbuser', 'dbpass'); if (!$con) { exit('connot connect to mysql.'); }
$result = mysql_select_db('touchTalk', $con); if (!$result) { exit('error'); }
$result = mysql_query('SET NAMES utf8', $con); if (!$result) { exit('error'); }
$query = "SELECT * FROM locations WHERE latitude IS NOT NULL AND longitude IS NOT NULL";
//�N�G�����s
$result = mysql_query($query);
//�����ɂ����f�[�^���i�[����z��
$findAry = array();
while ($row = mysql_fetch_assoc($result)) {
    if (isset($lat) && isset($lon)){
        //GPS����̃N�G���̏ꍇ�����v�Z(m)
        $dist = distance( $lat , $lon , $row["latitude"] ,$row["longitude"] ,true);
        //debug
        //echo "dist:" . $dist . " lat:" . $row["latitude"] . " lot:" . $row["longitude"] . "<br>";
        //�w�苗�����Ȃ�z��ǉ� (�����5km)
        if ($dist < 5000){
            array_push($findAry ,array( "id" => $row["id"],
                                    "name" => mb_convert_encoding(htmlspecialchars($row["name"]),"sjis-win" , "UTF-8") , //DB,PHP��UFT8�̂��ߌg�ь�����shift-jis�ɕϊ�
                                     "engname" => mb_convert_encoding(htmlspecialchars($row["engname"]),"sjis-win" , "UTF-8") ,
                                    "latitude" => $row["latitude"] , 
                                    "longitude" => $row["longitude"] ,));
        }
    }
}

?>