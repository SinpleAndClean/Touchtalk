<?php

//$distance.


$con = mysql_connect('210.169.191.238', 'dbuser', 'dbpass'); if (!$con) { exit('cannot connect to mysql.'); }
$result = mysql_select_db('touchTalk', $con); if (!$result) { exit('error'); }
$result = mysql_query('SET NAMES utf8', $con); if (!$result) { exit('error'); }
$query = "SELECT * FROM categories ";
//�N�G�����s
$result = mysql_query($query);
//�����ɂ����f�[�^���i�[����z��
$findAry = array();
while ($row = mysql_fetch_assoc($result)) {   
        //�w�苗�����Ȃ�z��ǉ� (�����5km)
            array_push($findAry ,array( "id" => $row["id"],
                                    "name" => mb_convert_encoding(htmlspecialchars($row["name"]),"sjis-win" , "UTF-8") , //DB,PHP��UFT8�̂��ߌg�ь�����shift-jis�ɕϊ�
                                     "engname" => mb_convert_encoding(htmlspecialchars($row["engname"]),"sjis-win" , "UTF-8") ,
                                    ,));

}

?>