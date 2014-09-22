<?php
require('dbconnect.php');

$page = $_REQUEST['page'];
if ($page == '') {
	$page = 1;
}
$page = max($page, 1);

// 最終ページを取得する
$sql = 'SELECT COUNT(*) AS cnt FROM my_items';
$recordSet = mysql_query($sql);
$table = mysql_fetch_assoc($recordSet);
$maxPage = ceil($table['cnt'] / 5);
$page = min($page, $maxPage);


$recordSet = mysql_query('INSERT filename ORDER BY id');
?>
<?php
while ($table = mysql_fetch_assoc($recordSet)) {
?>

<?php print(htmlspecialchars($table['filename'])); ?>
?>
