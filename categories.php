<?php

//$distance.


$con = mysql_connect('210.169.191.238', 'dbuser', 'dbpass'); if (!$con) { exit('cannot connect to mysql.'); }
$result = mysql_select_db('touchTalk', $con); if (!$result) { exit('error'); }
$result = mysql_query('SET NAMES utf8', $con); if (!$result) { exit('error'); }
$query = "SELECT * FROM categories ";
//クエリ実行
$result = mysql_query($query);
//条件にあうデータを格納する配列
$findAry = array();
while ($row = mysql_fetch_assoc($result)) {   
        //指定距離内なら配列追加 (今回は5km)
            array_push($findAry ,array( "id" => $row["id"],
                                    "name" => mb_convert_encoding(htmlspecialchars($row["name"]),"sjis-win" , "UTF-8") , //DB,PHPがUFT8のため携帯向けのshift-jisに変換
                                     "engname" => mb_convert_encoding(htmlspecialchars($row["engname"]),"sjis-win" , "UTF-8") ,
                                    ,));

}

?>